import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "stats.js";

import * as dat from "lil-gui";

import "./style.css";

// Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector(".canvas");

// Камера
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};

const parametres = {
  color: 0xff0000,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const contrlos = new OrbitControls(camera, canvas);
contrlos.enableDamping = true;

const stats = new Stats();
stats.showPanel(0);

scene.add(camera);
document.body.appendChild(stats.dom);

const gui = new dat.GUI({ closeFolders: true });

// Объектs
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: parametres.color,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
const scaleFolder = gui.addFolder("Scale");

scaleFolder.add(mesh.scale, "x").min(0).max(5).step(0.1).name("Box scale x");
scaleFolder.add(mesh.scale, "y").min(0).max(5).step(0.1).name("Box scale y");
scaleFolder.add(mesh.scale, "z").min(0).max(5).step(0.1).name("Box scale z");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(parametres, "color").onChange(() => {
  material.color.set(parametres.color);
});

//const geometry = new THREE.CircleGeometry(1, 20, 0, Math.PI);

//const geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

//const geometry = new THREE.ConeGeometry(1, 2, 32, 1, true, 0, Math.PI);

/* const geometry = new THREE.CylinderGeometry(
  0.5,
  1,
  2,
  32,
  4,
  true,
  0,
  Math.PI / 2
); */

//const geometry = new THREE.RingGeometry(0.5, 1, 32, 10, 0, Math.PI);

//const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100, Math.PI);

//const geometry = new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1, 6);

//const geometry = new THREE.DodecahedronGeometry(1, 0);

//const geometry = new THREE.OctahedronGeometry(1, 0);

//const geometry = new THREE.TetrahedronGeometry(1, 0);

//const geometry = new THREE.IcosahedronGeometry(1, 0);

/* const geometry = new THREE.SphereGeometry(
  1,
  32,
  16,
  0,
  Math.PI / 2,
  0,
  Math.PI / 2
); */

/* const geometry = new THREE.BufferGeometry();

const amount = 50;

const points = new Float32Array(amount * 3 * 3);
for (let i = 0; i < amount * 3 * 3; i++) {
  points[i] = (Math.random() - 0.5) * 4;
}
const pointsFuffer = new THREE.BufferAttribute(points, 3);

geometry.setAttribute("position", pointsFuffer);

const material = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material); */

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = event.clientY / sizes.height - 0.5;
});

const tick = () => {
  stats.begin();
  contrlos.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
  stats.end();
};

tick();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});
