"use client";
import { Canvas } from "@react-three/fiber";
import { useApp } from "@/store/useApp";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Post } from "@/component/post";
import { Lights } from "@/component/lights";
import { Loader } from "@/component/loader";
import { Floor } from "@/component/Road/index";
import { Rain } from "@/component/Rain/index";
export default function Home() {
  const loaded = useApp((s) => s.loaded);
  return (
    <Canvas
      shadows
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease-in" }}
    >
      <Suspense>
        <color attach="background" args={["#111111"]} />
        <OrbitControls />
        <Rain />
        <Floor />
        <Lights />
        <Loader />
      </Suspense>
    </Canvas>
  );
}
