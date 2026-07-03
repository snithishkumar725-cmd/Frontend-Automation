const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const search=document.getElementById("search");
const count=document.getElementById("count");
const themeBtn=document.getElementById("themeBtn");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
render();
}

function render(){

taskList.innerHTML="";

const keyword=search.value.toLowerCase();

tasks
.filter(task=>task.text.toLowerCase().includes(keyword))
.forEach((task,index)=>{

const li=document.createElement("li");

const span=document.createElement("span");
span.innerText=task.text;

if(task.completed)
span.classList.add("completed");

span.onclick=()=>{
task.completed=!task.completed;
save();
};

const actions=document.createElement("div");
actions.className="actions";

const edit=document.createElement("button");
edit.innerText="Edit";

edit.onclick=()=>{

const value=prompt("Edit Task",task.text);

if(value){
task.text=value;
save();
}

};

const del=document.createElement("button");

del.innerText="Delete";

del.style.background="red";

del.onclick=()=>{

tasks.splice(index,1);

save();

};

actions.append(edit,del);

li.append(span,actions);

taskList.appendChild(li);

});

count.innerHTML=
`Completed : ${
tasks.filter(t=>t.completed).length
} / ${tasks.length}`;

}

addBtn.onclick=()=>{

const text=taskInput.value.trim();

if(text==="") return;

tasks.push({

text:text,

completed:false

});

taskInput.value="";

save();

};

search.onkeyup=render;

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

};

render();