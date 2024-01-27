uniform float u_RainProgress;
varying vec3 v_position;
varying vec2 v_uv;
float sdUnevenCapsule( vec2 p, float r1, float r2, float h ) {
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}
float blur(float steps) {
    vec2 coord = v_uv - 0.5;
    coord *= 10.0;
  
          // 取n个液滴在这个点周围的距离的平均值
    float total = 0.0;
    for (float i = 0.0; i < steps; i++) {
    float dropletDistance = sdUnevenCapsule(coord, 0.05, 0.0, 2.0);
    dropletDistance = 1.0 - smoothstep(0.0, 0.05, dropletDistance);
    total += dropletDistance;
    coord += vec2(0.0, 0.2);
    }
    return total / steps;
}
// 创建一个圆
float sdCircle( vec2 p, float r ) {
    // R圆的搬家 p圆心坐标
    // 计算圆心到点的距离
    return length(p) - r;
}
void main(){
    // v_position 表示顶点坐标 左上角是-1.0 1.0右上角是1.0 1.0 中心0.0 0.0
    // 大于0.5的点是圆内的点 显示红色 小于0.5的点是圆外的点 不显示
    float dropletDistance = blur(5.0);
    float rainProgress = smoothstep(0.0, 0.5, u_RainProgress);
    rainProgress = clamp(rainProgress, 0.0, 1.0);
    float circle =1.0-sdCircle(v_position.xy,0.5);
    gl_FragColor = vec4(0.0,0.0,0.0,dropletDistance * 0.1 * rainProgress * circle);
}
