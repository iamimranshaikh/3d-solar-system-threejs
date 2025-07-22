const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("solarCanvas"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const ambient = new THREE.AmbientLight(0x404040, 2);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00 })
);
scene.add(sun);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x3399ff })
);
scene.add(earth);

let angle = 0;
function animate() {
  requestAnimationFrame(animate);
  angle += 0.02;
  earth.position.x = Math.cos(angle) * 15;
  earth.position.z = Math.sin(angle) * 15;
  renderer.render(scene, camera);
}
animate();
