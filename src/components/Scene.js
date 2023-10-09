import React, { useEffect, useRef } from 'react'
import {mountScene,cleanUpScene} from './Script'

const Scene = () => {

  const mountRef = useRef(null)

  useEffect(() => {
    //init Scene
    mountScene(mountRef)

    //cleanup scene
    return () => {
      //clean up scene
      cleanUpScene()
    }
   
  }, [])
  

  return (
    <div className="Contendeor3D" ref={mountRef} style={{ width: '100%', height: '100vh' }}>
     

    </div>
  )
}

export default Scene