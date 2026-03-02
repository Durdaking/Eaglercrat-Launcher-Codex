const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];
for(let i=0;i<120;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5)*0.4,
vy:(Math.random()-.5)*0.4
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="rgba(255,255,255,.4)";
particles.forEach(p=>{
p.x+=p.vx;
p.y+=p.vy;
if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;
ctx.fillRect(p.x,p.y,2,2);
});
requestAnimationFrame(animate);
}
animate();
