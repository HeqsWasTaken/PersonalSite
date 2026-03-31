const carousel = document.getElementById("carousel");

const total = 3;
let currentIndex = 0;
let currentAngle = 0;

function normalize(i){
  return (i + total) % total;
}

function shortest(from,to){
  let diff = to - from;
  if(diff > total/2) diff -= total;
  if(diff < -total/2) diff += total;
  return diff;
}

function apply(anim=true){
  carousel.style.transition = anim ? "transform 1s ease" : "none";
  carousel.style.transform = `rotateY(${currentAngle}deg)`;
}

function rotateTo(target){
  target = normalize(target);
  const step = shortest(currentIndex,target);
  currentIndex = target;
  currentAngle += step * -120;
  apply(true);
}

function next(){ rotateTo(currentIndex + 1); }
function prev(){ rotateTo(currentIndex - 1); }

let startX = 0;
let touching = false;

carousel.addEventListener("touchstart",e=>{
  startX = e.touches[0].clientX;
  touching = true;
  carousel.style.transition = "none";
});

carousel.addEventListener("touchmove",e=>{
  if(!touching) return;
  const x = e.touches[0].clientX;
  const diff = startX - x;
  carousel.style.transform = `rotateY(${currentAngle - diff * .2}deg)`;
});

carousel.addEventListener("touchend",e=>{
  if(!touching) return;

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if(Math.abs(diff) > 40){
    diff > 0 ? next() : prev();
  }else{
    apply(true);
  }

  touching = false;
});