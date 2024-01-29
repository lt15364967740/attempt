import { Environment, Lightformer } from "@react-three/drei";

export function Lights() {
  return (
    <>
      <hemisphereLight
        intensity={1}
        args={[0xffffff, 0xffffff, 1.0]}
        color={"#57bcff"}
        position={[0, 50, 0]}
        groundColor={"white"}
      />
      <ambientLight intensity={0.5} />
      <Environment frames={1}>
        <Lightformer
          form="circle"
          rotation-y={Math.PI / 2}
          position={[-5, 3, 4]}
          scale={[0.5, 0.5, 1]}
          intensity={5}
          color="#ffedb1"
        />
        <Lightformer
          rotation-y={Math.PI / 2}
          position={[-5, 2, 1]}
          scale={[0.5, 0.25, 1]}
          intensity={5}
          color="#ffedb1"
        />
        <Lightformer
          form="circle"
          rotation-y={Math.PI / 2}
          position={[-5, 2, 0]}
          scale={[0.5, 0.5, 1]}
          intensity={2}
          color="#cdceff"
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 9]}
          scale={[10, 1, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[50, 2, 0]}
          scale={[100, 2, 1]}
        />
      </Environment>
    </>
  );
}
export default Lights;
