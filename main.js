import * as THREE from 'three';

// Inisialisasi Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Membuat Partikel
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00ff88,
    transparent: true,
    blending: THREE.AdditiveBlending
});

const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleMesh);

camera.position.z = 5;

// Interaksi (Mouse & Touch)
let mouseX = 0;
let mouseY = 0;

function onInteraction(event) {
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;
    
    mouseX = (x / window.innerWidth) - 0.5;
    mouseY = (y / window.innerHeight) - 0.5;
}

window.addEventListener('mousemove', onInteraction);
window.addEventListener('touchstart', onInteraction);
window.addEventListener('touchmove', onInteraction);

// Animasi Loop
function animate() {
    requestAnimationFrame(animate);

    particleMesh.rotation.y += 0.002;
    particleMesh.rotation.x += 0.002;

    // Efek mengikuti sentuhan
    particleMesh.position.x += (mouseX - particleMesh.position.x) * 0.05;
    particleMesh.position.y += (-mouseY - particleMesh.position.y) * 0.05;

    renderer.render(scene, camera);
}

// Responsif saat layar diputar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

