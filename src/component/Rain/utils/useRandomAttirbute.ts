import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
export const useRandomAttribute = () => {
  const uniforms = React.useMemo(
    () => ({
       u_RainProgress: { value: 1.0 },
    }),
    []
  );
  return uniforms;
};
