const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function heartPosition(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return {
    x: width / 2 + x * 15,
    y: height / 3 - y * 15
  };
}

class Particle {
  constructor() {
    const t = Math.random() * Math.PI * 2;
    const pos = heartPosition(t);

    this.x = pos.x;
    this.y = pos.y;
    this.size = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    this.alpha = 1;
    this.color = Math.random() > 0.5 ? "#ff4fa3" : "#ff9acb";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.01;

    if (this.alpha <= 0) {
      const t = Math.random() * Math.PI * 2;
      const pos = heartPosition(t);

      this.x = pos.x;
      this.y = pos.y;
      this.alpha = 1;
    }
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particles = [];

  for (let i = 0; i < 800; i++) {
    particles.push(new Particle());
  }
}

initParticles();

function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

animate();

const btnCarta = document.getElementById("btnCarta");
const carta = document.getElementById("carta");

btnCarta.addEventListener("click", () => {
  carta.style.display = "block";
  btnCarta.style.display = "none";

  setTimeout(() => {
    carta.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 150);
});

const fechaInicio = new Date("2025-06-06T00:00:00");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = ahora - fechaInicio;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("tiempo").textContent =
    `${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
}

setInterval(actualizarContador, 1000);
actualizarContador();