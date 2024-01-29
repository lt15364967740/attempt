import { useTexture } from "@react-three/drei";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import MirrorMaterial from "./MirrorMaterial";
import { MirrorTexture } from "./MirrorTexture";
import * as React from "react";

extend({ MirrorMaterial });

export default function Floor() {
  const size = 30;
  const textureRepeat = 30 / 2 / 2;
  const tex = useTexture("./texture/TCom_Asphalt_Broken_header.jpg", (t) => {
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(textureRepeat, textureRepeat);
  });

  return (
    <mesh castShadow receiveShadow rotation-x={Math.PI / -2}>
      <circleGeometry args={[size, size]} />
      <meshBasicMaterial map={tex}></meshBasicMaterial>
      {/* <mirrorMaterial /> */}
    </mesh>
  );
}
