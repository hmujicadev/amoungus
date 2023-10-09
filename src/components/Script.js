import * as THREE from 'three' 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

let currentMount = null

//Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(20, 100 / 100 , 0.1, 500)
scene.add(camera)
camera.position.z = 20;
// camera.position.y = 20;
//Renderer
const renderer = new THREE.WebGLRenderer()
// renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)


//Textures
const textureLoader = new THREE.TextureLoader();

// const map = textureLoader.load('./bricks/Wall_Stone_010_basecolor.jpg')
// const aoMap = textureLoader.load('./bricks/Wall_Stone_010_ambientOcclusion.jpg')
// const roughnessMap = textureLoader.load('./bricks/Wall_Stone_010_roughness.jpg')
// const normalMap = textureLoader.load('./bricks/Wall_Stone_010_normal.jpg')
// const heightMap = textureLoader.load('./bricks/Wall_Stone_010_height.png')

//Cube
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1,100 ,100,100);
// const material = new THREE.MeshStandardMaterial({
//   map: map, aoMap: aoMap,
//   roughnessMap: roughnessMap,
//   normalMap: normalMap,
//   displacementMap: heightMap,
//   displacementScale: 0.1,
// })
// const cube = new THREE.Mesh(geometry, material )
// cube.scale.set(3,3,3);
// scene.add(cube)

//Blender
const gltfLoader = new GLTFLoader()
gltfLoader.load('./model/amongus.gltf',
  (gltf) => { 
    scene.add(gltf.scene)
  },
  () => { },
  () => { },
  
)

//lights
const pointLight = new THREE.PointLight(0xffffff, 1.1)
pointLight.position.y = 5;

// scene.add(pointLight)

const directionalLight = new THREE.DirectionalLight(0xffffff,1.3)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// cubemap enviroment light 
const environmentMap = new THREE.CubeTextureLoader()
const envMap = environmentMap.load([
  './envMap/px.png',
  './envMap/nx.png',
  './envMap/py.png',
  './envMap/ny.png',
  './envMap/pz.png',
  './envMap/nz.png',
])
scene.environment = envMap;
scene.background = 0xffffff;
const AO = new THREE.AmbientLight(0xffffff,0.5)
scene.add(AO)

// sphere
// const textureLoader = new THREE.TextureLoader();
// const matcap = textureLoader.load('./textures/textureTest.png')
// const geometry = new THREE.SphereGeometry( 0.8, 32, 16 );
// const material = new THREE.MeshMatcapMaterial( { matcap: matcap } );
// const sphere = new THREE.Mesh(geometry, material);
// sphere.position.x = 2;
// sphere.position.y = 2;
// scene.add(sphere);

//TorusKnotGeometry
// const geometry1 = new THREE.TorusKnotGeometry( 0.4, 0.15, 100, 16 );
// const material1 = new THREE.MeshNormalMaterial({
//   flatShading: true
  
// });
// const torusKnot = new THREE.Mesh( geometry1, material1 );
// scene.add(torusKnot);
// torusKnot.position.set(-2, 0.5, 0);
// torusKnot.scale.x = 0.5;


//Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target = new THREE.Vector3(3, 3, 3)
controls.enableDamping = true;
controls.target.y = 1.5;

//Resize personaje0
const resize = () => {
  renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
  camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
  camera.updateProjectionMatrix()
}

window.addEventListener( 'resize', resize)

  //Render the scene
const animate = () => {
  
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate);
}

animate();


//Funcion que monta la scenario
export const mountScene = (mountRef) => {
 currentMount = mountRef.current
  resize()
  currentMount.appendChild(renderer.domElement);

}

//Funcion que desmonta la scenario
export const cleanUpScene = () => {
  scene.dispose()
  currentMount.removeChild(renderer.domElement)
}