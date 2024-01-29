"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/post";
// import { Clouds } from "./components/Cloud";
// import { Grass } from "./components/Grass";
import Lights from "@/components/lights";
// import { Rail } from "./components/Rail";
// import { Rain } from "./components/Rain";
import Road from "@/components/Road";
// import { Rocks } from "./components/Rocks";
// import { Sign } from "./components/Sign";
import { MainScreen } from "@/components/ui/MainScreen";
import { StartScreen } from "@/components/ui/StartScreen";
import { useApp } from "@/store/useApp";
import Car from "@/components/model/car/car";

function Thing() {
  return (
    <group>
      <Car></Car>
      {/* <Rain> */}
      <Road />
      {/* </Rain> */}
      {/* <Grass />
      <Rail />
      <Bicycle />
      <Sign />
      <Rocks />
      <Clouds /> */}
    </group>
  );
}

export default function App() {
  const loaded = useApp((s) => s.loaded);

  return (
    <>
      <StartScreen />
      <MainScreen />
      <Canvas
        shadows
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease-in" }}
      >
        <Suspense>
          <color attach="background" args={["#15151a"]} />

          <OrbitControls
            makeDefault
            target={[0, 1, 0]}
            maxPolarAngle={Math.PI / 2}
            dampingFactor={0.05}
          />
          <PerspectiveCamera position={[4.94, 2.42, -1.88]} makeDefault />

          <Lights />
          <Post />
          <Thing />

          <Loader />
        </Suspense>
      </Canvas>
    </>
  );
}
