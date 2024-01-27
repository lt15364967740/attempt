import React from "react";
import * as THREE from "three";
import DropsMaterial from "./dropsMaterial";
import { extend, useFrame } from "@react-three/fiber";
import { useRandomAttribute } from "../utils/useRandomAttirbute";
interface DropsProps {
  count?: number;
}
extend({ DropsMaterial });
export const Drops = React.forwardRef<THREE.Group, DropsProps>(
  ({ count = 2000 }, fref) => {
    const dropsRef = React.useRef<THREE.InstancedMesh>(null!);
    const dropsMaterialRef = React.useRef<THREE.ShaderMaterial>(null!);
    const gemotryRef = useRandomAttribute();
    const _dummy = React.useMemo(() => new THREE.Object3D(), []);
    const initialY = React.useMemo(() => new Float32Array(count).fill(0), []);
    const angles = React.useMemo(() => new Float32Array(count).fill(0), []);

    React.useEffect(() => {
      const dropsMesh = dropsRef.current;
      for (let i = 0; i < count; i++) {
        _dummy.position.set(
          THREE.MathUtils.randFloatSpread(5),
          THREE.MathUtils.randFloat(-0.1, 5),
          THREE.MathUtils.randFloatSpread(5)
        );

        _dummy.updateMatrix();
        dropsMesh.setMatrixAt(i, _dummy.matrix);
      }
      dropsMesh.instanceMatrix.needsUpdate = true;
    }, []);

    useFrame(({ camera, clock }, dt) => {
      const dropsMesh = dropsRef.current;

      for (let i = 0; i < count; i++) {
        dropsMesh.getMatrixAt(i, _dummy.matrix);
        _dummy.matrix.decompose(
          _dummy.position,
          _dummy.quaternion,
          _dummy.scale
        );

        _dummy.rotation.y = Math.atan2(
          camera.position.x - _dummy.position.x,
          camera.position.z - _dummy.position.z
        );
        _dummy.rotation.x = angles[i];
        _dummy.position.y -= dt * 5;

        if (_dummy.position.y <= 0) {
          _dummy.position.set(
            THREE.MathUtils.randFloatSpread(5),
            THREE.MathUtils.randFloat(-0.1, 5),
            THREE.MathUtils.randFloatSpread(5)
          );
          initialY[i] = _dummy.position.y;
          angles[i] = THREE.MathUtils.randFloatSpread(
            THREE.MathUtils.degToRad(20)
          );
          _dummy.scale.setScalar(THREE.MathUtils.randFloat(0.1, 0.5));
        }

        _dummy.updateMatrix();
        dropsMesh.setMatrixAt(i, _dummy.matrix);
      }
      dropsMesh.instanceMatrix.needsUpdate = true;
    });
    return (
      <group ref={fref}>
        <instancedMesh ref={dropsRef} args={[, , count]} renderOrder={0}>
          <planeGeometry args={[0.5, 1]} />
          <dropsMaterial
            ref={dropsMaterialRef}
            attach="material"
            uniforms={{
              ...gemotryRef,
            }}
          />
        </instancedMesh>
      </group>
    );
  }
);
