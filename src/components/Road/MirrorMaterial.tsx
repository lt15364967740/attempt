import * as THREE from "three";
import { extend, Object3DNode } from "@react-three/fiber";
import vertex from "@/shader/Drops/drops.vert.glsl";
import fragment from "@/shader/Drops/drops.frag.glsl";
import { shaderMaterial } from "@react-three/drei";
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
  },
  vertex,
  fragment,
  (material) => {
    material.side = THREE.DoubleSide;
    material.transparent = true;
  }
);
extend({ MirrorMaterial });
export default MirrorMaterial;
