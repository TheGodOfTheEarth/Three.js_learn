import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   100
)
camera.position.z = 5

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Texture
const texture = new THREE.TextureLoader().load('./src/textures/texture.jpg')
const textureMaterial = new THREE.MeshBasicMaterial({ map: texture })

// Objects
const geometry = new THREE.BoxGeometry()

const material = new THREE.MeshBasicMaterial({ map: texture })

const cube = new THREE.Mesh(geometry, material)
cube.position.set(-3, 0, 0)

const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32)
const sphereMaterial = new THREE.MeshPhongMaterial({
   color: 'blue',
   emissive: 'white',
   shininess: 100,
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(2, 0, 0)

const torus = new THREE.Mesh(
   new THREE.TorusGeometry(0.7, 0.2, 20, 20),
   new THREE.MeshBasicMaterial({ color: 'coral' })
)
torus.position.set(2, 2, 1)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), textureMaterial)
plane.position.set(-2, 2, 0)

// add Objects to the Scene
scene.add(cube)
scene.add(sphere)
scene.add(torus)
scene.add(plane)

// const render function
function animate() {
   requestAnimationFrame(animate)

   cube.rotation.x += 0.01
   cube.rotation.y += 0.01

   sphere.rotation.x += 0.01
   sphere.rotation.y += 0.01

   torus.rotation.x += 0.01
   torus.rotation.y += 0.01

   renderer.render(scene, camera)
}

animate()
