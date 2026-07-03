const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const toggle = document.getElementById("toggle");
const error = document.getElementById("error");

// Show / Hide password
toggle.addEventListener("change", () => {
if (toggle.checked) {
password.type = "text";
} else {
password.type = "password";
}
});

// Login validation
form.addEventListener("submit", function(e){
e.preventDefault();

const user = username.value.trim();
const pass = password.value.trim();

// Simple demo credentials
const validUser = "admin";
const validPass = "1234";

if(user === "" || pass === ""){
error.textContent = "Please fill all fields";
return;
}

if(user === validUser && pass === validPass){
error.style.color = "green";
error.textContent = "Login Successful!";

// Save login status (demo)
localStorage.setItem("loggedIn", "true");

setTimeout(() => {
alert("Welcome " + user);
}, 500);

} else {
error.style.color = "red";
error.textContent = "Invalid username or password";
}

});