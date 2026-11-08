/**
 * Canvas Particle System: Subtle Golden Dust & Shimmer
 */
function initParticles() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const particleCount = 28;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1;
      this.speedY = Math.random() * 0.4 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.008 + 0.002;
      this.growing = Math.random() > 0.5;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      if (this.growing) {
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.8) this.growing = false;
      } else {
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0.15) this.growing = true;
      }

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let isRunning = true;
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
  });

  function animate() {
    if (isRunning) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener('DOMContentLoaded', initParticles);

