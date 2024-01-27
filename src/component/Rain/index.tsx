import * as React from 'react';
import { Drops } from "./Drops";
// import { Splashes } from "./Splashes";
// import { useRainSounds } from "./useRainSounds";

export function Rain({children}:any) {
    const splashRef = React.useRef<THREE.Group>(null!);
    const dropsRef = React.useRef<THREE.Group>(null!);
    return (
        <group>
            <Drops ref={dropsRef}/>
            {/* <Splashes ref={splashRef}>{

            }
            </Splashes> */}
        </group>
    )
}