import * as THREE from "three";
import { extend, Object3DNode } from "@react-three/fiber";
import vertex from "@/shader/Drops/drops.vert.glsl";
import fragment from "@/shader/Drops/drops.frag.glsl";
import { RenderTexture, shaderMaterial } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
const textureRepeat = 30 / 2 / 2;

// const tex = useTexture("./texture/TCom_Asphalt_Broken_header.jpg", (t) => {
//   t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
//   t.repeat.set(textureRepeat, textureRepeat);
// });
type MirrorMaterialType = JSX.IntrinsicElements["shaderMaterial"] & {
  uniforms?: {
    u_RainProgress: { value: number };
  };
};
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mirrorMaterial: MirrorMaterialType;
    }
  }
}
const MirrorMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
    u_mouse: new THREE.Vector2(),
    u_color: new THREE.Color(0x000000),
    // texture: tex,
  },
  vertex,
  fragment
);
extend({ MirrorMaterial });
export default MirrorMaterial;
