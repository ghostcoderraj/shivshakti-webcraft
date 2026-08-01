import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const GearMesh = ({ position, scale, color, speed = 1 }: { 
  position: [number, number, number]; 
  scale: number;
  color: string;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005 * speed;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

const FloatingSphere = ({ position, scale, color }: { 
  position: [number, number, number]; 
  scale: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color={color} 
          distort={0.3} 
          speed={2} 
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

const FloatingBox = ({ position, scale, color }: { 
  position: [number, number, number]; 
  scale: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const count = 50;
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#D9A85C" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#C8862B" />
      
      {/* Industrial Elements */}
      <GearMesh position={[-3, 1, -2]} scale={0.8} color="#4A3524" speed={1} />
      <GearMesh position={[3.5, -1, -1]} scale={0.6} color="#8A6A45" speed={-0.8} />
      <GearMesh position={[0, 2.5, -3]} scale={0.5} color="#C8862B" speed={1.2} />
      
      {/* Floating Spheres */}
      <FloatingSphere position={[-2.5, -1.5, 0]} scale={0.5} color="#4A3524" />
      <FloatingSphere position={[2.8, 1.8, -1]} scale={0.4} color="#C8862B" />
      
      {/* Floating Boxes */}
      <FloatingBox position={[4, -2, -2]} scale={0.4} color="#8A6A45" />
      <FloatingBox position={[-4, 2, -1]} scale={0.3} color="#4A3524" />
      
      {/* Particles */}
      <Particles />
    </>
  );
};

interface Hero3DSceneProps {
  className?: string;
}

const Hero3DScene = ({ className = "" }: Hero3DSceneProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
