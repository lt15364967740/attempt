import * as THREE from "three";
import * as React from "react";
import { applyProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
export default function mcLaren(props: JSX.IntrinsicElements["group"]) {
  const { scene, nodes, materials } = useGLTF("./model/car.glb");

  return <primitive object={scene} {...props} />;
}
