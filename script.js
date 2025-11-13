// Background config
if (typeof config !== "undefined") {
  config.BACK_COLOR = { r: 10, g: 0, b: 26 };
  config.COLORFUL = true;
  config.SHADING = true;
  config.CURL = 30;
  config.PRESSURE = 0.8;
  config.DENSITY_DISSIPATION = 0.97;
  config.VELOCITY_DISSIPATION = 0.99;
  config.SPLAT_RADIUS = 0.25;
}

// Node click handling
document.querySelectorAll('.node').forEach(node => {
  node.addEventListener('click', () => {
    const target = node.dataset.target;
    if (target) {
      window.location.href = `sections/${target}`;
    }
  });
});
