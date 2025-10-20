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

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 2
controls.maxDistance = 10

const geometry = new THREE.BoxGeometry()

const material = new THREE.MeshStandardMaterial({ color: 'cyan' })

const cube = new THREE.Mesh(geometry, material)

const torus = new THREE.Mesh(
   new THREE.TorusGeometry(1, 0.3, 20, 20),
   new THREE.MeshBasicMaterial({ color: 'coral' })
)
torus.position.set(3, 0, 0)

scene.add(cube)
scene.add(torus)

// User Interface
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let cubeRotation = 0.005

function onMouseClick(event) {
   mouse.x = (event.clientX / window.innerWidth) * 2 - 1
   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

   raycaster.setFromCamera(mouse, camera)

   const intersects = raycaster.intersectObjects(scene.children)

   if (intersects.length > 0) {
      intersects[0].object.material.color.set('gray')
      cubeRotation = 0
   }
}

window.addEventListener('click', onMouseClick)

function animate() {
   requestAnimationFrame(animate)

   cube.rotation.x += cubeRotation
   cube.rotation.y += cubeRotation

   torus.rotation.x += 0.05
   torus.rotation.y += 0.05

   controls.update()
   renderer.render(scene, camera)
}

animate()
