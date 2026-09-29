import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraController } from './CameraController'
import { MansionArchitecture } from './MansionArchitecture'
import { TorchLight3D } from './TorchLight3D'
import { TorchShaderOverlay } from './TorchShaderOverlay'

export function MansionScene({ currentAct = 1, torchActive = false }) {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.15, 9.6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Brume volumétrique sombre du manoir */}
        <fog attach="fog" args={['#07060a', 1.5, 14]} />

        {/* Ambiance spectrale très faible */}
        <ambientLight color="#1b1030" intensity={0.22} />
        
        {/* Lueur de lune tamisée traversant les voûtes */}
        <directionalLight
          position={[3, 8, 2]}
          color="#382859"
          intensity={0.4}
        />

        <Suspense fallback={null}>
          <CameraController currentAct={currentAct} />
          
          {/* Architecture et meubles gothiques */}
          <MansionArchitecture currentAct={currentAct} />

          {/* Faisceau lumineux 3D de la torche */}
          <TorchLight3D enabled={torchActive} />

          {/* Shader custom plein écran de la lampe torche avec grain et pénombre */}
          <TorchShaderOverlay enabled={torchActive} />
        </Suspense>
      </Canvas>
    </div>
  )
}
