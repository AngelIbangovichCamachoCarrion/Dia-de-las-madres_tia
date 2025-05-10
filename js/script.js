const card = document.getElementById('card');
const music = document.getElementById('music');
const button = document.querySelector('.card__front .btn');
const backButton = document.querySelector('.card__back .btn');
const musicToggle = document.getElementById('musicToggle');

let confettiEnabled = false;

function toggleCard() {
  card.classList.toggle('flipped');
  if (!card.classList.contains('flipped')) {
    music.pause();
    music.currentTime = 0;
  } else {
    music.play();
  }
  confettiEnabled = card.classList.contains('flipped');
}

button.addEventListener('click', toggleCard);
backButton.addEventListener('click', toggleCard);

musicToggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = '🔊';
  } else {
    music.pause();
    musicToggle.textContent = '🔇';
  }
});

const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const confetti = [];
const colors = ['#ff69b4', '#ff1493', '#00bfff', '#7cfc00', '#ffd700', '#ff6347'];

for (let i = 0; i < 30; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1.5 + 0.5
  });
}

for (let i = 0; i < 60; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: -Math.random() * canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: Math.random() * 360
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    ctx.beginPath();
    ctx.moveTo(h.x, h.y);
    ctx.bezierCurveTo(h.x + h.size / 2, h.y - h.size / 2,
                      h.x + h.size, h.y + h.size / 3,
                      h.x, h.y + h.size);
    ctx.bezierCurveTo(h.x - h.size, h.y + h.size / 3,
                      h.x - h.size / 2, h.y - h.size / 2,
                      h.x, h.y);
    ctx.fillStyle = 'rgba(255, 105, 180, 0.7)';
    ctx.fill();

    h.y += h.speed;
    if (h.y > canvas.height) {
      h.y = -h.size;
      h.x = Math.random() * canvas.width;
    }
  });

  if (confettiEnabled) {
    drawConfetti();
  }

  requestAnimationFrame(drawHearts);
}

function drawConfetti() {
  confetti.forEach(c => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotate * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.fillRect(0, 0, c.size, c.size);
    ctx.restore();

    c.y += c.speed;
    c.rotate += 5;

    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
      c.color = colors[Math.floor(Math.random() * colors.length)];
    }
  });
}

drawHearts();
