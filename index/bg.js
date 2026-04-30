const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let w, h, cols, ypos;

function setup() {
  w = canvas.width  = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cols = Math.floor(w / 20) + 1;
  ypos = Array(cols).fill(0);
}

setup();
window.addEventListener("resize", setup);

function matrix() {
  ctx.fillStyle = "rgba(20, 22, 30, 0.08)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#0f0";
  ctx.font = "16px monospace";

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    ypos[ind] = y > h + Math.random() * 10000 ? 0 : y + 20;
  });
}

setInterval(matrix, 30);


