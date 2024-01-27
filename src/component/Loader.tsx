import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import { useApp } from "@/store/useApp";
export function Loader() {
  const { active, progress } = useProgress();
  const advance = useThree((s) => s.advance);
  const isRender = React.useRef(true);
  React.useEffect(() => {
    if (progress === 100 || !active) {
      advance(Date.now());
      console.log(advance);
    }
  }, []);
  useFrame(() => {
    if (isRender.current) {
      useApp.setState({ loaded: true });
      isRender.current = false;
    }
  });
  return null!;
}
