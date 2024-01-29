varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vViewVector;
varying vec3 vCameraPosition;

void main() {
    vUv = uv;
    vPosition = position;

    vec3 _worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vViewVector = cameraPosition - _worldPosition;
    vCameraPosition = cameraPosition;
}