// === THREE.js Fluid Background Simulation ===
const canvas = document.getElementById('fluid-bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

// Create a shader-based fluid surface
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float iTime;
  uniform vec2 iMouse;
  uniform vec2 iResolution;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime * 0.3;
    float wave = sin(uv.x * 3.0 + t) + cos(uv.y * 4.0 - t * 2.0);
    float intensity = smoothstep(0.2, 1.5, abs(wave));

    vec3 col = mix(color1, color2, intensity);
    col = mix(col, color3, 0.5 + 0.5 * sin(t + uv.x * 2.0));

    gl_FragColor = vec4(col, 1.0);
  }
`;

const uniforms = {
  iTime: { value: 0 },
  iMouse: { value: new THREE.Vector2(0, 0) },
  iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  color1: { value: new THREE.Color('#5227FF') },
  color2: { value: new THREE.Color('#FF9FFC') },
  color3: { value: new THREE.Color('#B19EEF') }
};

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  transparent: true
});

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(plane);

// Animation
let mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX / window.innerWidth;
  mouse.y = 1.0 - e.clientY / window.innerHeight;
  uniforms.iMouse.value.copy(mouse);
});

function animate(t) {
  uniforms.iTime.value = t * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate(0);

// Resize handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
});
