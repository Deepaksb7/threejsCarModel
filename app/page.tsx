"use client";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { SpotLight, SpotLightHelper } from "three";
import { Ground } from "./components/Ground";
import { Car } from "./components/Car";
import { Ring } from "./components/Ring";
import { Boxes } from "./components/Boxes";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FloatGrid } from "./components/FloatGrid";

function CarShow() {
  const BlueLightRef = useRef<SpotLight>(null!);
  const PinkLightRef = useRef<SpotLight>(null!);
  useHelper(BlueLightRef as any, SpotLightHelper);
  useHelper(PinkLightRef as any, SpotLightHelper);
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh> */}

      <color args={[0, 0, 0]} attach={"background"} />

      <Suspense fallback={null}>
        <CubeCamera resolution={256} frames={Infinity} >
          {
            (texture) =>(
              <>
                <Environment map={texture} />
                <Car />
              </>
            )
          }
        </CubeCamera>
      </Suspense>

      <Suspense fallback={null}>
        <Ring />
      </Suspense>

      <Suspense fallback={null}>
        <Boxes />
      </Suspense>

      <spotLight
        // ref={PinkLightRef}
        color={[1, 0.25, 0.7]}
        intensity={2.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        decay={0}
      />

      <spotLight
        // ref={BlueLightRef}
        color={[0.14, 0.5, 1]}
        intensity={3}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        decay={0}
      />

      <Suspense fallback={null}>
        <Ground />
      </Suspense>

      <Suspense fallback={null}>
        <FloatGrid />
      </Suspense> 

      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom 
            blendFunction={BlendFunction.ADD}
            intensity={1}
            width={300}
            height={300}
            kernalSize={5}
            luminanceThreshold={0.15}
            luminancePassThreshold={0.025}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0012]}
          />
        </EffectComposer>
      </Suspense>
      
    </>
  );
}

export default function App() {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow />
        </Canvas>
      </Suspense>
    </div>
  );
}
