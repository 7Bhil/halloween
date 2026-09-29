import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function MansionArchitecture({ currentAct = 1 }) {
  const dustParticlesRef = useRef()
  const candleFlameRef = useRef()

  // Particules de poussière en suspension dans l'air froid
  const dustCount = 60
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = Math.random() * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Animation de la poussière en lévitation
    if (dustParticlesRef.current) {
      const positions = dustParticlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < dustCount; i++) {
        positions[i * 3 + 1] -= 0.003
        positions[i * 3] += Math.sin(t * 0.5 + i) * 0.002
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 6
        }
      }
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Vacillement de la bougie du portail (Acte 1)
    if (candleFlameRef.current) {
      const flick = Math.sin(t * 9) * 0.12 + Math.cos(t * 17) * 0.08
      candleFlameRef.current.scale.y = 1 + flick * 0.4
      candleFlameRef.current.scale.x = 1 - flick * 0.2
    }
  })

  return (
    <group>
      {/* Sol en dalles de pierre sombre */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[18, 36]} />
        <meshStandardMaterial
          color="#0a080d"
          roughness={0.9}
          metalness={0.1}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </mesh>

      {/* Colonnes gothiques jalonnant le couloir */}
      {[-2.5, 2.5].map((x) =>
        [-6, -2, 2, 6, 10].map((z, idx) => (
          <group key={`${x}-${z}-${idx}`} position={[x, 1.8, z]}>
            {/* Fût de la colonne octogonale */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.32, 0.38, 4.6, 8]} />
              <meshStandardMaterial color="#14111a" roughness={0.85} flatShading />
            </mesh>
            {/* Chapiteau gothique */}
            <mesh position={[0, 2.3, 0]}>
              <boxGeometry args={[0.9, 0.35, 0.9]} />
              <meshStandardMaterial color="#1a1524" roughness={0.8} flatShading />
            </mesh>
            {/* Base moulurée */}
            <mesh position={[0, -2.1, 0]}>
              <boxGeometry args={[1.0, 0.4, 1.0]} />
              <meshStandardMaterial color="#14111a" roughness={0.9} flatShading />
            </mesh>
          </group>
        ))
      )}

      {/* Murs latéraux du manoir */}
      <mesh position={[-3.8, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[36, 6]} />
        <meshStandardMaterial color="#0c0a11" roughness={0.95} />
      </mesh>
      <mesh position={[3.8, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[36, 6]} />
        <meshStandardMaterial color="#0c0a11" roughness={0.95} />
      </mesh>

      {/* ACTE 1 : Portail et bougie d'accueil */}
      <group position={[0, 0, 8]}>
        {/* Socle de la bougie */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 8]} />
          <meshStandardMaterial color="#181320" roughness={0.8} />
        </mesh>
        {/* Corps en cire */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.4, 10]} />
          <meshStandardMaterial color="#e9e4d0" roughness={0.5} />
        </mesh>
        {/* Flamme */}
        <mesh ref={candleFlameRef} position={[0, 0.88, 0]}>
          <coneGeometry args={[0.04, 0.14, 8]} />
          <meshBasicMaterial color="#ff6a1a" />
        </mesh>
        <pointLight position={[0, 0.9, 0]} color="#ff7a29" intensity={1.8} distance={4} />
      </group>

      {/* ACTE 2 : La Bibliothèque (étagères et silhouette d'horloge) */}
      <group position={[0, 0, 3]}>
        {/* Bibliothèque murale gauche */}
        <mesh position={[-3.2, 1.5, 0]}>
          <boxGeometry args={[0.7, 3.4, 4.2]} />
          <meshStandardMaterial color="#1a1226" roughness={0.85} flatShading />
        </mesh>
        {/* Horloge figeée à droite */}
        <group position={[3.1, 1.2, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 2.4, 0.6]} />
            <meshStandardMaterial color="#211633" roughness={0.7} flatShading />
          </mesh>
          <mesh position={[-0.31, 0.6, 0]}>
            <circleGeometry args={[0.22, 12]} />
            <meshStandardMaterial color="#e9e4d0" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ACTE 3 : Le Grand Miroir des Âmes */}
      <group position={[0, 1.6, -2]}>
        {/* Cadre gothique sculpté */}
        <mesh>
          <boxGeometry args={[2.2, 3.4, 0.12]} />
          <meshStandardMaterial color="#1b1030" roughness={0.6} metalness={0.4} flatShading />
        </mesh>
        {/* Surface sombre du miroir */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[1.8, 3.0]} />
          <meshStandardMaterial
            color="#08060d"
            roughness={0.1}
            metalness={0.9}
            emissive="#1b1030"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* ACTE 4 : La Citrouille sur son autel de pierre */}
      <group position={[0, 0, -7]}>
        {/* Autel de pierre */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.7, 8]} />
          <meshStandardMaterial color="#15111d" roughness={0.9} flatShading />
        </mesh>
        {/* Citrouille sculptée stylisée */}
        <mesh position={[0, 1.0, 0]} scale={[0.6, 0.5, 0.6]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#d94f06" roughness={0.7} flatShading />
        </mesh>
        {/* Tige de la citrouille */}
        <mesh position={[0, 1.35, 0]} rotation={[0.2, 0, 0.1]}>
          <cylinderGeometry args={[0.04, 0.06, 0.22, 6]} />
          <meshStandardMaterial color="#223318" roughness={0.8} />
        </mesh>
        {/* Lueur interne incandescente de la citrouille */}
        <pointLight position={[0, 1.05, 0]} color="#ff7a1a" intensity={2.8} distance={5} />
      </group>

      {/* Nuage de poussière spectral en suspension */}
      <points ref={dustParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustCount}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#c8c2ab"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
