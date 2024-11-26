// Initialize Userfront
Userfront.init("9nyyprwn");

// 1. Reference the elements on the page
var signupFormEl = document.getElementById("signup-form");
var alertEl = document.getElementById("alert");
var usernameEl = document.getElementById("username");
var emailEl = document.getElementById("email");
var passwordEl = document.getElementById("password");

// 2. Sign up with a username, email, and password
function formSignup(e) {
  // Prevent the form's default behavior
  e.preventDefault();
  // Reset the alert to empty
  setAlert();
  // Call Userfront.signup()
  Userfront.signup({
    method: "password",
    username: usernameEl.value,
    email: emailEl.value,
    password: passwordEl.value,
  }).catch(function(error) {
    setAlert(error.message);
  });
}

// Set the alert element to show the message
function setAlert(message) {
  alertEl.innerText = message;
  alertEl.style.display = message ? "block" : "none";
}

// 3. Add an event listener for the signup form submit
signupFormEl.addEventListener("submit", formSignup);
