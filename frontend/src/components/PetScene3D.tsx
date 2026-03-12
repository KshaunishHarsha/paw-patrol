"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function PawShape({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.1}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function HeartShape({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2}>
      <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI]}>
        <shapeGeometry args={[heartShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ];
      const speed = 0.2 + Math.random() * 0.5;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ position, speed, offset });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.offset) * 0.3,
        p.position[1] + Math.cos(time * p.speed + p.offset) * 0.4,
        p.position[2]
      );
      const s = 0.02 + Math.sin(time * 2 + p.offset) * 0.01;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#FF9500" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF5E6" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#FF9500" />
      <pointLight position={[3, -1, 3]} intensity={0.3} color="#FF6B6B" />

      {/* Main paw shapes */}
      <PawShape position={[-1.5, 0.5, 0]} color="#FF9500" scale={1.2} />
      <PawShape position={[1.8, -0.3, -1]} color="#FF6B6B" scale={0.9} />
      <PawShape position={[0, 1.2, -0.5]} color="#9DCFA8" scale={0.7} />
      <PawShape position={[-0.5, -1, 0.5]} color="#87CEEB" scale={0.6} />

      {/* Hearts */}
      <HeartShape position={[2.5, 1.5, -1]} color="#FF6B6B" />
      <HeartShape position={[-2, -0.5, -0.5]} color="#FF9500" />

      {/* Floating particles */}
      <Particles />
    </>
  );
}

export default function PetScene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
