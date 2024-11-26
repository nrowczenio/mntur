// Initialize Userfront
Userfront.init("9nyyprwn");

// 1. Reference the elements on the page
var loginFormEl = document.getElementById("login-form");
var alertEl = document.getElementById("alert");
var emailOrUsernameEl = document.getElementById("email-or-username");
var passwordEl = document.getElementById("password");

// 2. Login with an email/username and password
function formLogin(e) {
  // Prevent the form's default behavior
  e.preventDefault();
  // Reset the alert to empty
  setAlert();
  // Call Userfront.login()
  Userfront.login({
    method: "password",
    emailOrUsername: emailOrUsernameEl.value,
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

// 3. Add an event listener for the login for submit
loginFormEl.addEventListener("submit", formLogin);