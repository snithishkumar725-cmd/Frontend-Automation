let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function renderTasks(filter="all"){

let list=document.getElementById("taskList");

list.innerHTML="";

let count=0;

tasks.forEach((task,index)=>{

if(filter=="active" && task.completed) return;

if(filter=="completed" && !task.completed) return;

count++;

let li=document.createElement("li");

if(task.completed)

li.classList.add("completed");

li.innerHTML=`

<span class="task"
onclick="toggleTask(${index})">

${task.text}

</span>

<div class="actions">

<i class="fa-solid fa-check"
onclick="toggleTask(${index})"></i>

<i class="fa-solid fa-pen"
onclick="editTask(${index})"></i>

<i class="fa-solid fa-trash"
onclick="deleteTask(${index})"></i>

</div>

`;

list.appendChild(li);

});

document.getElementById("count").innerHTML=
count+" Tasks";

saveTasks();

}

function addTask(){

let input=document.getElementById("taskInput");

let value=input.value.trim();

if(value==""){

alert("Enter Task");

return;

}

tasks.push({

text:value,

completed:false

});

input.value="";

renderTasks();

}

function deleteTask(index){

tasks.splice(index,1);

renderTasks();

}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

renderTasks();

}

function editTask(index){

let update=prompt("Edit Task",tasks[index].text);

if(update!=null){

tasks[index].text=update;

renderTasks();

}

}

function searchTask(){

let keyword=document.getElementById("search").value.toLowerCase();

let list=document.querySelectorAll("#taskList li");

list.forEach(li=>{

let text=li.innerText.toLowerCase();

li.style.display=text.includes(keyword)?"flex":"none";

});

}

function filterTask(type){

renderTasks(type);

}

renderTasks();

document.getElementById("taskInput")
.addEventListener("keypress",function(e){

if(e.key==="Enter")

addTask();

});