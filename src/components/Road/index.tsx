import { useTexture } from "@react-three/drei";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import MirrorMaterial from "./MirrorMaterial";
import { MirrorTexture } from "./MirrorTexture";
import * as React from "react";

extend({ MirrorMaterial });

export default function Floor() {
  const size = 30;

  return (
    <mesh castShadow receiveShadow rotation-x={Math.PI / -2}>
      <circleGeometry args={[size, size]} />
      <mirrorMaterial />
    </mesh>
  );
}
