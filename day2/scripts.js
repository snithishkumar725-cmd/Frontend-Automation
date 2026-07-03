let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

function displayStudents() {
studentList.innerHTML = "";

students.forEach((student, index) => {
studentList.innerHTML += `
<tr>
<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.phone}</td>
<td>${student.course}</td>
<td>
<button class="delete" onclick="deleteStudent(${index})">Delete</button>
</td>
</tr>
`;
});
}

form.addEventListener("submit", function(e){
e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const course = document.getElementById("course").value;

if(!name || !email || !phone || !course){
alert("Please fill all fields");
return;
}

const student = { name, email, phone, course };

students.push(student);

localStorage.setItem("students", JSON.stringify(students));

form.reset();

displayStudents();
});

function deleteStudent(index){
students.splice(index, 1);
localStorage.setItem("students", JSON.stringify(students));
displayStudents();
}

displayStudents();