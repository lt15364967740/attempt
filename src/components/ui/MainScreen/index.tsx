import { useEffect, useState } from "react";
import styled from "styled-components";
import { ByLine } from "../ByLine";

import { AnimatePresence, motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { useApp } from "@/store/useApp";

export const ByLineContainer = styled(motion.div)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  user-select: none;
`;

export const TitleContainer = styled.h1`
  font-family: "Italiana";
  font-size: 1rem;
  color: white;
  margin: 0;
  font-weight: 400;
`;
export const BestOn = styled.p`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 100;

  color: white;
  font-family: "La Belle Aurore";
  font-size: 1rem;
  margin: 0;
`;

export function MainScreen() {
  const started = useApp((s) => s.started);
  return (
    <AnimatePresence>
      {started && (
        <>
          <ByLineContainer
            key="ByLineContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1, ease: "linear" }}
          >
            <TitleContainer>A storm at midnight</TitleContainer>

            {isMobile && <BestOn>best on desktop</BestOn>}
          </ByLineContainer>
        </>
      )}
    </AnimatePresence>
  );
}
