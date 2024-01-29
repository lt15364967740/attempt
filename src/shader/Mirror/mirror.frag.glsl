#define MAX_RADIUS 3
#define DOUBLE_HASH 0
#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(.1031, .1030, .0973)

uniform sampler2D uRenderTexture;
uniform sampler2D uDepthTexture;
uniform vec2 uCameraNearFar;
uniform vec2 u_Resolution;
uniform float uTime;

varying vec3 v_Position;
varying vec2 vUv;
varying vec3 vViewVector;
varying vec3 vCameraPosition;

vec3 csm_PuddleNormal;
float csm_PuddleNormalMask;

// 获取屏幕的深度值
float getDepth(vec2 screenPosition) {
    return texture2D( uDepthTexture, screenPosition ).x;
}
// 获取屏幕的颜色值
float getViewZ(float depth) {
    return perspectiveDepthToViewZ(depth, uCameraNearFar.x, uCameraNearFar.y);
}
// 获取屏幕的位置
vec3 getWorldSpacePosition(vec2 uv) {
    vec3 viewVector = -vViewVector;
    float screenPositionZ = getViewZ(gl_FragCoord.z);
    float sceneDepthZ = getViewZ(getDepth(uv));

    viewVector = viewVector / screenPositionZ;
    viewVector = viewVector * sceneDepthZ;
    viewVector = viewVector + vCameraPosition;

    return viewVector;
}
 float getPuddle(vec2 uv) {
    gln_tFBMOpts puddleNoiseOpts = gln_tFBMOpts(1.0, 0.5, 2.0, 0.5, 1.0, 3, false, false);
    float puddleNoise = gln_sfbm((uv + vec2(3.0, 0.0)) * 0.2, puddleNoiseOpts);
    puddleNoise = gln_normalize(puddleNoise);
    puddleNoise = smoothstep(0.0, 0.7, puddleNoise);
    return puddleNoise;
}
float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
    p3 += dot(p3, p3.yzx+19.19);
    return fract((p3.xx+p3.yz)*p3.zy);
}
void main() {
    // 转换到屏幕坐标，左下角为0 0 右上角为1 1 左上角为0 1 右下角为1 0
    vec2 screenUV = gl_FragCoord.xy / u_Resolution;
    // 获取模型片元的位置 中间为0 0 0
    vec2 worldUV = v_Position.xz;
    worldUV.x += 0.5;
    worldUV.y += 0.5;
    // worlduv 为模型的位置，screenUV为屏幕的位置 worlduv 
    // puddles 水旋涡
    float puddleMask = getPuddle(worldUV * 4.0);
    float smoothStepPuddleMask = smoothstep(0.7, 1.0, puddleMask);

    // Roughness
    float roughness = smoothstep(0.25, 1.0, 1.0 - smoothStepPuddleMask);
    roughness = clamp(roughness, 0.0, 0.15);
    csm_Roughness = roughness;

    // Normals 
    // Make puddles smooth
    csm_PuddleNormal = vNormal;
    csm_PuddleNormalMask = smoothstep(0.6, 1.0, puddleMask);

    // Add ripples
    vec3 rippleNormals = getRipples(worldUV * 8.0);
    csm_PuddleNormal = perturbNormal(csm_PuddleNormal, rippleNormals, 0.75);

    // Add wind noise
    gln_tFBMOpts noiseNormalNoiseOpts = gln_tFBMOpts(1.0, 0.5, 2.0, 0.5, 1.0, 4, false, false);
    vec3 noiseNormalPosition = vPosition * 40.0;
    noiseNormalPosition.y += uTime * 5.0;
    float windNoiseX = gln_sfbm(noiseNormalPosition, noiseNormalNoiseOpts);
    float windNoiseY = gln_sfbm(noiseNormalPosition + 0.5, noiseNormalNoiseOpts);
    float windNoiseZ = gln_sfbm(noiseNormalPosition + 1.0, noiseNormalNoiseOpts);
    vec3 windNormal = vec3(windNoiseX, windNoiseY, windNoiseZ);
    csm_PuddleNormal = perturbNormal(csm_PuddleNormal, windNormal, 0.05);

    // Color
    // Darken puddles
    vec3 puddleColor = vec3(0.5);
    puddleColor = mix(csm_DiffuseColor.rgb, csm_DiffuseColor.rgb * puddleColor, smoothStepPuddleMask);
    csm_DiffuseColor.rgb = puddleColor;

    // Reflection
    vec2 reflectionUV = screenUV;
    reflectionUV.y = 1.0 - reflectionUV.y;
    reflectionUV += rippleNormals.xy * 0.025;

    vec3 reflectionColor = texture2D(uRenderTexture, reflectionUV).rgb;
    vec3 reflectionColorHsv = rgbToHsv(reflectionColor);
    reflectionColorHsv.b *= 2.0;
    reflectionColor = hsvToRgb(reflectionColorHsv);
          
    vec3 worldSpacePosition = getWorldSpacePosition(reflectionUV);
    float worldSpaceHeight = mapLinear(1.0 - -worldSpacePosition.y, -3.0, 1.0, 0.0, 1.0);
    worldSpaceHeight = clamp(worldSpaceHeight, 0.0, 1.0);
    worldSpaceHeight = smoothstep(0.2, 1.0, worldSpaceHeight);

    float fresnel = getFresnel(1.0);
    float reflectionLowerBound = mapLinear(fresnel, 0.0, 1.0, 0.0, 0.2);

    float reflectionPuddleMask = clamp(smoothStepPuddleMask, reflectionLowerBound, 1.0);
    vec3 fadedReflectionColor = reflectionColor * worldSpaceHeight * reflectionPuddleMask;
    fadedReflectionColor = clamp(fadedReflectionColor, 0.0, 1.0);

    csm_DiffuseColor.rgb = csm_DiffuseColor.rgb + fadedReflectionColor;

    // csm_FragColor.rgb = vec3(worldSpaceHeight);
}
         