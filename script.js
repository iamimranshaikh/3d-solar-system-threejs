// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 10, 40);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("solarCanvas"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xffcc00,
  emissive: 0xffaa00,
  emissiveIntensity: 1
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Earth
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x3399ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Orbit logic
let angle = 0;
function animate() {
  requestAnimationFrame(animate);

  // Earth orbits Sun
  angle += 0.01;
  earth.position.x = Math.cos(angle) * 15;
  earth.position.z = Math.sin(angle) * 15;

  renderer.render(scene, camera);
}
animate();
