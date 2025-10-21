import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight('white', 3)
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

const originalMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })
const highLightMaterial = new THREE.MeshStandardMaterial({
   color: 'cyan',
   emissive: 'white',
   emissiveIntensity: 0.2,
})

const geometry = new THREE.BoxGeometry()
const material = originalMaterial
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// GSAP

// gsap.to(cube.position, {
//    y: 2,
//    x: 1,
//    duration: 1,
//    ease: 'power1.inOut',
//    repeat: -1,
//    yoyo: true,
// })

// END GSAP

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function onMouseOver(event) {
   mouse.x = (event.clientX / window.innerWidth) * 2 - 1
   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

onMouseOver(window)
window.addEventListener('mousemove', onMouseOver)

let isHovered = false

function animate() {
   requestAnimationFrame(animate)

   raycaster.setFromCamera(mouse, camera)

   const intersects = raycaster.intersectObject(cube)

   if (intersects.length > 0 && !isHovered) {
      cube.material = highLightMaterial

      isHovered = true

      // GSAP
      gsap.to(cube.scale, {
         x: 1.5,
         y: 1.5,
         z: 1.5,
         duration: 1.5,
         ease: 'power1.Out',
      })

      gsap.to(cube.rotation, {
         x: cube.rotation.x + 0.7,
         y: cube.rotation.y + 0.7,
         z: cube.rotation.z + 0.7,
         duration: 1.5,
         ease: 'power1.Out',
      })
   } else if (intersects.length == 0 && isHovered) {
      cube.material = originalMaterial

      isHovered = false

      gsap.to(cube.scale, {
         x: 1,
         y: 1,
         z: 1,
         duration: 1.5,
         ease: 'power1.Out',
      })

      gsap.to(cube.rotation, {
         x: cube.rotation.x - 0.7,
         y: cube.rotation.y + 0.7,
         z: cube.rotation.z + 0.7,
         duration: 1.5,
         ease: 'power1.Out',
      })
   }

   controls.update()
   renderer.render(scene, camera)
}

animate()
