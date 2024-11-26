document.addEventListener("DOMContentLoaded", function () {
  // Initialize Userfront
  Userfront.init("9nyyprwn");

  // 1. Reference the button
  var buttonEl = document.getElementById("logout-button");

  // 2. Enable the button if the user is logged in
  if (Userfront.tokens.accessToken) {
    buttonEl.disabled = false;
  }

  // 3. Log out the user
  function logout(e) {
    // Prevent the form's default behavior
    e.preventDefault();
    // Call Userfront.logout()
    Userfront.logout();
  }

  // 4. Add an event listener for the button click
  buttonEl.addEventListener("click", logout);
});