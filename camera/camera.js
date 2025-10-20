import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight('white', 1)
dirLight.position.set(5, 5, 5)
scene.add(dirLight)

const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   100
)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Camera control
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 2
controls.maxDistance = 10

const geometry = new THREE.BoxGeometry()

const material = new THREE.MeshStandardMaterial({ color: 'cyan' })

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

function animate() {
   requestAnimationFrame(animate)

   cube.rotation.x += 0.005
   cube.rotation.y += 0.005

   controls.update()
   renderer.render(scene, camera)
}

animate()
