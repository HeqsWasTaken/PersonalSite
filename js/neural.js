const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

const dpr = window.devicePixelRatio || 1;

function resize(){
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;

  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";

  ctx.setTransform(dpr,0,0,dpr,0,0);
}

resize();
window.addEventListener("resize",resize);

ctx.lineCap = "round";
ctx.lineJoin = "round";

let mouse = {x:null,y:null};
let isTouch = false;

window.addEventListener("touchstart",e=>{
  isTouch = true;
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

window.addEventListener("touchmove",e=>{
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

window.addEventListener("touchend",()=>{
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("mousemove",e=>{
  if(isTouch) return;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave",()=>{
  mouse.x = null;
  mouse.y = null;
});

class Particle{
  constructor(){
    this.x = Math.random()*innerWidth;
    this.y = Math.random()*innerHeight;
    this.vx = (Math.random()-.5)*.4;
    this.vy = (Math.random()-.5)*.4;
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;

    if(this.x<0 || this.x>innerWidth) this.vx*=-1;
    if(this.y<0 || this.y>innerHeight) this.vy*=-1;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);

    ctx.fillStyle = "rgba(139,92,246,.8)";
    ctx.shadowColor = "#8b5cf6";
    ctx.shadowBlur = 8;

    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const particles = [];

for(let i=0;i<90;i++){
  particles.push(new Particle());
}

function connect(){
  for(let a=0;a<particles.length;a++){
    for(let b=a+1;b<particles.length;b++){

      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < 120){
        const opacity = 1 - dist/120;

        const gradient = ctx.createLinearGradient(
          particles[a].x,
          particles[a].y,
          particles[b].x,
          particles[b].y
        );

        gradient.addColorStop(0,"rgba(139,92,246,0)");
        gradient.addColorStop(0.5,`rgba(139,92,246,${opacity*.3})`);
        gradient.addColorStop(1,"rgba(139,92,246,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(particles[a].x,particles[a].y);
        ctx.lineTo(particles[b].x,particles[b].y);
        ctx.stroke();
      }

      if(mouse.x !== null && mouse.y !== null){
        const dxm = particles[a].x - mouse.x;
        const dym = particles[a].y - mouse.y;
        const distm = Math.sqrt(dxm*dxm + dym*dym);

        if(distm < 150){
          ctx.strokeStyle = "rgba(139,92,246,.4)";
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.moveTo(particles[a].x,particles[a].y);
          ctx.lineTo(mouse.x,mouse.y);
          ctx.stroke();
        }
      }
    }
  }
}

function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);

  for(const p of particles){
    p.move();
    p.draw();
  }

  connect();
  requestAnimationFrame(animate);
}

animate();