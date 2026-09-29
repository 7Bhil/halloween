import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_enabled;
  varying vec2 vUv;

  // Bruit pseudo-aléatoire pour le grain de film argentique
  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    
    // Normalisation avec correction du ratio d'aspect
    vec2 pNorm = u_pointer;
    vec2 stAspect = vec2(st.x * aspect, st.y);
    vec2 pAspect = vec2(pNorm.x * aspect, pNorm.y);

    float dist = distance(stAspect, pAspect);

    // Scintillement naturel et irrégulier de la lampe torche
    float flicker = sin(u_time * 8.5) * 0.02 + cos(u_time * 19.3) * 0.015 + sin(u_time * 31.0) * 0.008;
    float radius = (0.28 + flicker) * u_enabled;
    float penumbra = 0.22;

    // Atténuation douce du faisceau lumineux
    float light = 1.0 - smoothstep(radius, radius + penumbra, dist);

    // Bruit de film discret (grain cinéma)
    float grain = (random(st * (u_time + 10.0)) - 0.5) * 0.05;

    // Vignette périphérique profonde
    float vignette = 1.0 - smoothstep(0.4, 0.95, distance(st, vec2(0.5)));

    // Couleur d'obscurité du manoir (#07060a)
    vec3 darkColor = vec3(0.027, 0.023, 0.039) + grain;
    
    // Teinte ambrée légère sur les bords du faisceau
    vec3 beamTint = vec3(1.0, 0.42, 0.1) * 0.04;

    // Opacité du masque : 0 dans le faisceau (laisse voir la 3D), 0.96 dans le noir
    float alpha = (1.0 - light) * 0.96;
    alpha = clamp(alpha + (1.0 - vignette) * 0.2, 0.0, 0.98);

    gl_FragColor = vec4(darkColor + beamTint * light, alpha);
  }
`

export function TorchShaderOverlay({ enabled = true }) {
  const { size } = useThree()
  const meshRef = useRef()
  const pointerSmooth = useRef(new THREE.Vector2(0.5, 0.5))
  const pointerTarget = useRef(new THREE.Vector2(0.5, 0.5))

  const uniforms = useMemo(
    () => ({
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_pointer: { value: new THREE.Vector2(0.5, 0.5) },
      u_time: { value: 0 },
      u_enabled: { value: enabled ? 1.0 : 0.0 },
    }),
    []
  )

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height)
  }, [size, uniforms])

  useEffect(() => {
    uniforms.u_enabled.value = enabled ? 1.0 : 0.0
  }, [enabled, uniforms])

  useEffect(() => {
    const handleMove = (e) => {
      pointerTarget.current.x = e.clientX / window.innerWidth
      pointerTarget.current.y = 1.0 - e.clientY / window.innerHeight
    }

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        pointerTarget.current.x = e.touches[0].clientX / window.innerWidth
        pointerTarget.current.y = 1.0 - e.touches[0].clientY / window.innerHeight
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
    if (!meshRef.current) return
    const mat = meshRef.current.material

    // Lissage fluide du pointeur
    pointerSmooth.current.lerp(pointerTarget.current, 0.15)
    mat.uniforms.u_pointer.value.copy(pointerSmooth.current)
    mat.uniforms.u_time.value = state.clock.getElapsedTime()
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} renderOrder={999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}
