const canvas = document.getElementById("solarCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0x333333));
const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);

// Background
const loader = new THREE.TextureLoader();
loader.load('galaxy.jpg.jpg', texture => {
  scene.background = texture;
});

// Planets config
const planetData = [
  { name: 'sun', size: 10, texture: 'sun.jpg.jpg', distance: 0 },
  { name: 'mercury', size: 1, texture: 'mercury.jpg.jpg', distance: 15 },
  { name: 'venus', size: 1.2, texture: 'venus.jpg.jpg', distance: 20 },
  { name: 'earth', size: 1.3, texture: 'earth.jpg.jpg', distance: 26 },
  { name: 'mars', size: 1.1, texture: 'mars.jpg.jpg', distance: 32 },
  { name: 'jupiter', size: 3, texture: 'jupiter.jpg.jpg', distance: 40 },
  { name: 'saturn', size: 2.5, texture: 'saturn.jpg.jpg', distance: 50 },
  { name: 'uranus', size: 2.2, texture: 'uranus.jpg.jpg', distance: 58 },
  { name: 'neptune', size: 2.1, texture: 'neptune.jpg.jpg', distance: 66 },
  { name: 'pluto', size: 0.6, texture: 'pluto.jpg.jpg', distance: 72 },
];

const planets = [];
planetData.forEach((planet, i) => {
  loader.load(planet.texture, texture => {
    const geo = new THREE.SphereGeometry(planet.size, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ map: texture });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = planet.name;
    scene.add(mesh);
    planets.push({ mesh, distance: planet.distance, speed: 0.01 + i * 0.001 });
  });
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  planets.forEach((planetObj, i) => {
    const angle = Date.now() * 0.0001 * planetObj.speed * 500;
    if (planetObj.distance > 0) {
      planetObj.mesh.position.x = Math.cos(angle) * planetObj.distance;
      planetObj.mesh.position.z = Math.sin(angle) * planetObj.distance;
    }
  });
  controls.update();
  renderer.render(scene, camera);
}
animate();
