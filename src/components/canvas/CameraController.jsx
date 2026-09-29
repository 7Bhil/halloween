import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const ACT_CONFIGS = {
  1: {
    pos: new THREE.Vector3(0, 1.15, 9.6),
    target: new THREE.Vector3(0, 0.85, 7.8),
  },
  2: {
    pos: new THREE.Vector3(0.4, 1.45, 5.0),
    target: new THREE.Vector3(-0.4, 1.2, 2.2),
  },
  3: {
    pos: new THREE.Vector3(0, 1.6, 0.8),
    target: new THREE.Vector3(0, 1.6, -2.0),
  },
  4: {
    pos: new THREE.Vector3(0, 1.7, -4.6),
    target: new THREE.Vector3(0, 1.1, -7.0),
  },
}

export function CameraController({ currentAct = 1 }) {
  const { camera } = useThree()
  const currentTarget = useRef(new THREE.Vector3(0, 0.85, 7.8))

  useFrame((_, delta) => {
    const config = ACT_CONFIGS[currentAct] || ACT_CONFIGS[1]

    camera.position.lerp(config.pos, Math.min(delta * 2.2, 1))
    currentTarget.current.lerp(config.target, Math.min(delta * 2.5, 1))
    camera.lookAt(currentTarget.current)
  })

  return null
}
