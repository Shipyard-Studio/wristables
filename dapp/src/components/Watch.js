import React, {Suspense} from 'react';
import { useGLTF, BakeShadows, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { Canvas } from "@react-three/fiber"
// import Model from './Model'
// import Model from './Test'

const Watch = () => {

    function Model() {
        const { scene } = useGLTF("1.gltf")
        return <primitive object={scene} />;
    }


  return (
    <div className='w-10/12 h-1/2 mx-auto'>
    <Canvas 
        shadows dpr={[1, 2]} 
        camera={{ fov: 75, near: 0.1, far: 2000, position: [700, -100, 200] }}
        onCreated={(state) => (state.gl.shadowMap.autoUpdate = false)}
    >
      <ambientLight intensity={4} />
      {/* <spotLight position={[1, 5, 3]} angle={0.2} penumbra={1} intensity={3} castShadow shadow-mapSize={[2048, 2048]} /> */}
      {/* <spotLight position={[0, 10, -10]} intensity={2} angle={0.04} penumbra={2} castShadow shadow-mapSize={[1024, 1024]} /> */}
      <Suspense fallback={null}>
        <Model 
            frames={1} 
            // limit={50}
            position={[0, 0, 0]}
            castShadow
            receiveShadow
        />
        {/* <ContactShadows frames={1} rotation-x={[Math.PI / 2]} position={[0, -0.4, 0]} far={1} width={1.5} height={1.5} blur={3} /> */}
        <Environment preset="night" />
        {/* <BakeShadows /> */}
      </Suspense>
      <OrbitControls 
        // zoomSpeed={0.1}
        // autoRotate
        // autoRotateSpeed={0.0}
        // rotateSpeed={2}
        // dampingFactor={0.5}
        // minPolarAngle={-Math.PI / 2}
        // maxPolarAngle={Math.PI / 1.7}
        // makeDefault 
        />
    </Canvas>
    </div>
  );
};

export default Watch;