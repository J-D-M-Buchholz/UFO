import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(10, 0.1, 10);
const material = new THREE.MeshBasicMaterial({
  color: 0x42ecf5,
  transparent: true,
  opacity: 0,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 0;
scene.add(cube);

let mixer;

let ufo;

const gloader = new GLTFLoader();
gloader.load("./models/alien_tetrahedron_puzzle/scene.gltf", (gltf) => {
  console.log(gltf);
  ufo = gltf.scene;
  mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  scene.add(gltf.scene);
});

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

let pic = [
  "./distant_sunset/distant_sunset_ft.jpg",
  "./distant_sunset/distant_sunset_bk.jpg",
  "./distant_sunset/distant_sunset_up.jpg",
  "./distant_sunset/distant_sunset_dn.jpg",
  "./distant_sunset/distant_sunset_rt.jpg",
  "./distant_sunset/distant_sunset_lf.jpg",
];

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 49) {
    pic = [
      "./ulukai/corona_ft.png",
      "./ulukai/corona_bk.png",
      "./ulukai/corona_up.png",
      "./ulukai/corona_dn.png",
      "./ulukai/corona_rt.png",
      "./ulukai/corona_lf.png",
    ];
  }
});

const loader = new THREE.CubeTextureLoader();
const texture = loader.load(pic);
scene.background = texture;

camera.position.z = 5;

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
animate();
