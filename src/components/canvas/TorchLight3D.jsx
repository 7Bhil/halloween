import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function TorchLight3D({ enabled = true }) {
  const { camera } = useThree()
  const lightRef = useRef()
  const targetRef = useRef(new THREE.Object3D())
  const mouseNorm = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMove = (e) => {
      mouseNorm.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNorm.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        mouseNorm.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        mouseNorm.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('touchmove', handleTouch)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])

  useFrame((state) => {
    if (!lightRef.current || !enabled) return

    const t = state.clock.getElapsedTime()
    // Micro-scintillement de l'ampoule
    const flicker = Math.sin(t * 12) * 0.15 + Math.cos(t * 22) * 0.1

    lightRef.current.intensity = (enabled ? 3.5 : 0) + flicker
    lightRef.current.position.copy(camera.position)

    // Raycast directionnel dans la scène
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouseNorm.current, camera)
    const targetPos = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(6))

    targetRef.current.position.lerp(targetPos, 0.2)
    lightRef.current.target = targetRef.current
  })

  return (
    <>
      <primitive object={targetRef.current} />
      <spotLight
        ref={lightRef}
        color="#ffeedd"
        intensity={enabled ? 3.5 : 0}
        angle={Math.PI / 5.5}
        penumbra={0.7}
        distance={18}
        decay={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />
    </>
  )
}
