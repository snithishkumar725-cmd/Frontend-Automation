const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const prizes = [
"₹50",
"₹100",
"Try Again",
"₹500",
"Gift",
"₹1000",
"Free Spin",
"₹200"
];

const colors=[
"#ff595e",
"#ffca3a",
"#8ac926",
"#1982c4",
"#6a4c93",
"#ff924c",
"#00c2a8",
"#f72585"
];

let startAngle=0;
let spinning=false;

function drawWheel(){

let arc=(2*Math.PI)/prizes.length;

for(let i=0;i<prizes.length;i++){

let angle=startAngle+i*arc;

ctx.beginPath();
ctx.moveTo(250,250);
ctx.arc(250,250,240,angle,angle+arc);
ctx.fillStyle=colors[i];
ctx.fill();

ctx.save();

ctx.translate(250,250);
ctx.rotate(angle+arc/2);

ctx.fillStyle="#fff";
ctx.font="20px Arial";
ctx.textAlign="right";
ctx.fillText(prizes[i],210,10);

ctx.restore();

}

ctx.beginPath();
ctx.arc(250,250,70,0,2*Math.PI);
ctx.fillStyle="#fff";
ctx.fill();
}

drawWheel();

document.getElementById("spinBtn").onclick=()=>{

if(spinning) return;

spinning=true;

let spinAngle=Math.random()*360+1800;
let current=0;

let animation=setInterval(()=>{

current+=10;

startAngle=(spinAngle*(current/500))*Math.PI/180;

ctx.clearRect(0,0,500,500);
drawWheel();

if(current>=500){

clearInterval(animation);

let degrees=(startAngle*180/Math.PI+90)%360;

let arc=360/prizes.length;

let index=Math.floor((360-degrees)/arc)%prizes.length;

document.getElementById("result").innerHTML=
"🎉 You Won: "+prizes[index];

spinning=false;

}

},20);

};