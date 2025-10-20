import * as THREE from 'three'

const scene = new THREE.Scene()

// Light (никогда не применяется к MeshBasicMaterial!!!)
// const ambientLight = new THREE.AmbientLight('white', 1) // рассеянный свет
// scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight('white', 10) // свет как у солнца
dirLight.position.set(-5, 5, 2)
scene.add(dirLight)

const dirLight2 = new THREE.DirectionalLight('white', 1) // свет как у солнца
dirLight2.position.set(5, -5, 0)
scene.add(dirLight2)

// const pointLight = new THREE.PointLight('yellow', 10, 100)
// pointLight.position.set(2, 2, 2)
// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3)
// scene.add(pointLightHelper)

// const spotLight = new THREE.SpotLight('white', 4)
// spotLight.position.set(1, 1, 3)
// scene.add(spotLight)

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

const geometry = new THREE.BoxGeometry()

const material = new THREE.MeshStandardMaterial({ color: 'cyan' })

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

function animate() {
   requestAnimationFrame(animate)

   cube.rotation.x += 0.01
   cube.rotation.y += 0.01

   renderer.render(scene, camera)
}

animate()
