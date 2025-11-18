import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Sphere } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  name: string;
  orbitRadius: number;
  speed: number;
  info: string;
}

function Planet({ position, size, color, name, orbitRadius, speed, info }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (orbitRef.current && orbitRadius > 0) {
      orbitRef.current.rotation.y += speed * 0.001;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Orbit Ring */}
      {orbitRadius > 0 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[orbitRadius - 0.05, orbitRadius + 0.05, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      )}
      
      {/* Planet */}
      <mesh
        ref={meshRef}
        position={[orbitRadius, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={orbitRadius === 0 ? 0.8 : (hovered ? 0.4 : 0.15)}
          roughness={0.7}
          metalness={0.2}
        />
        
        {/* Atmosphere glow */}
        <mesh scale={1.1}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      </mesh>

      {/* Info popup */}
      {(hovered || clicked) && (
        <Html position={[orbitRadius, 0, 0]} center distanceFactor={15}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/98 backdrop-blur-md border-2 border-primary/50 rounded-xl p-5 min-w-[250px] shadow-2xl"
          >
            <h3 className="font-bold text-xl mb-2 text-primary">{name}</h3>
            <p className="text-sm text-foreground leading-relaxed mb-3">{info}</p>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="bg-muted px-2 py-1 rounded">Orbit: {orbitRadius} AU</span>
              <span className="bg-muted px-2 py-1 rounded">Speed: {speed} km/s</span>
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
}

const SolarSystem = () => {
  const [showInfo, setShowInfo] = useState(true);

  const planets = [
    {
      name: "Sun",
      position: [0, 0, 0] as [number, number, number],
      size: 2,
      color: "#FDB813",
      orbitRadius: 0,
      speed: 0,
      info: "The Sun is the star at the center of our Solar System. It provides light and heat to all planets."
    },
    {
      name: "Mercury",
      position: [4, 0, 0] as [number, number, number],
      size: 0.4,
      color: "#8C7853",
      orbitRadius: 0.39,
      speed: 4.74,
      info: "Mercury is the smallest planet and closest to the Sun. A year on Mercury is just 88 Earth days!"
    },
    {
      name: "Venus",
      position: [6, 0, 0] as [number, number, number],
      size: 0.9,
      color: "#FFC649",
      orbitRadius: 0.72,
      speed: 3.50,
      info: "Venus is the hottest planet in our solar system, even hotter than Mercury! It has thick clouds of sulfuric acid."
    },
    {
      name: "Earth",
      position: [8, 0, 0] as [number, number, number],
      size: 1,
      color: "#4A90E2",
      orbitRadius: 1,
      speed: 2.98,
      info: "Earth is our home! It's the only known planet with life. 71% of Earth's surface is covered by water."
    },
    {
      name: "Mars",
      position: [10, 0, 0] as [number, number, number],
      size: 0.5,
      color: "#E27B58",
      orbitRadius: 1.52,
      speed: 2.41,
      info: "Mars is called the Red Planet due to iron oxide on its surface. It has the largest volcano in the solar system!"
    },
    {
      name: "Jupiter",
      position: [14, 0, 0] as [number, number, number],
      size: 1.8,
      color: "#C88B3A",
      orbitRadius: 5.2,
      speed: 1.31,
      info: "Jupiter is the largest planet in our solar system. It's so big that all other planets could fit inside it!"
    },
    {
      name: "Saturn",
      position: [18, 0, 0] as [number, number, number],
      size: 1.5,
      color: "#FAD5A5",
      orbitRadius: 9.54,
      speed: 0.97,
      info: "Saturn is famous for its beautiful rings made of ice and rock. It's the second-largest planet."
    },
    {
      name: "Uranus",
      position: [21, 0, 0] as [number, number, number],
      size: 1.2,
      color: "#4FD0E7",
      orbitRadius: 19.19,
      speed: 0.68,
      info: "Uranus rotates on its side! It's an ice giant with a blue-green color from methane in its atmosphere."
    },
    {
      name: "Neptune",
      position: [24, 0, 0] as [number, number, number],
      size: 1.2,
      color: "#4166F5",
      orbitRadius: 30.07,
      speed: 0.54,
      info: "Neptune is the windiest planet with speeds up to 1,200 mph! It's the farthest planet from the Sun."
    }
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#000000] to-[#0a0a1f] relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">3D Solar System Explorer</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
            className="text-white hover:bg-white/20"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 max-w-md z-10 shadow-2xl">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            How to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click and drag to rotate the view</li>
            <li>• Scroll to zoom in and out</li>
            <li>• Hover over planets to see their names</li>
            <li>• Click on planets to learn more about them</li>
          </ul>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 8, 35], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 30, 100]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" distance={50} decay={2} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFA500" distance={100} decay={1.5} />
        
        {/* Stars background */}
        <Stars 
          radius={300} 
          depth={60} 
          count={8000} 
          factor={8} 
          saturation={0.5}
          fade 
          speed={0.5} 
        />
        
        {/* Planets with orbits */}
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}

        {/* Sun glow effect */}
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#FDB813" transparent opacity={0.1} />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.5}
          minDistance={8}
          maxDistance={100}
          autoRotate={false}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
