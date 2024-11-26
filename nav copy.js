// nav.js
document.addEventListener("DOMContentLoaded", function () {
  // Define the HTML for the navigation
  const navHTML = `
  <nav>
  <div class="wrapper">
  <div class="logo">
  <a href="#"><img src="mntur.png" alt="Mentorship Logo"></a>
</div>
    <input type="radio" name="slider" id="menu-btn">
    <input type="radio" name="slider" id="close-btn">
    <ul class="nav-links">
      <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
      <li><a href="https://www.mntur.io/index.html">Home</a></li>
      <li><a href="https://www.mntur.io/dashboard.html">Dashboard</a></li>
      <li><a href="https://www.mntur.io/about.html">About</a></li>
      <li>
        <a href="#" class="desktop-item">Settings</a>
        <input type="checkbox" id="showDrop">
        <label for="showDrop" class="mobile-item">Settings</label>
        <ul class="drop-menu">
          <li><a href="https://www.mntur.io/consulting/profile.html">Profile</a></li>
        </ul>
      </li>
      <li>
        <a href="#" class="desktop-item">Community</a>
        <input type="checkbox" id="showMega">
        <label for="showMega" class="mobile-item">Community</label>
        <div class="mega-box">
          <div class="content">
            <div class="row">
              <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt="">
            </div>
            <div class="row">
              <header>Events</header>
              <ul class="mega-links">
                <li><a href="https://www.mntur.io/events/table.html">Schedule</a></li>
                <li><a href="https://www.mntur.io/events/upcoming.html">Tickets</a></li>
              </ul>
            </div>
            <div class="row">
              <header>Mentorship</header>
              <ul class="mega-links">
                <li><a href="https://www.mntur.io/consulting/consultants.html">Consultants</a></li>
                <li><a href="https://www.mntur.io/events/appointments.html">Appointments</a></li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li><a href="https://www.mntur.io/feedback.html">Feedback</a></li>
      <li><a href="#" id="logout-button">Logout</a></li> 
    </ul>
    <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
  </div>
</nav>
  `;

  // Insert the navigation HTML into the placeholder
  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) {
    navPlaceholder.innerHTML = navHTML;
  } else {
    console.error("Navigation placeholder not found.");
  }

  // Initialize any additional functionality, such as the logout button
  initializeLogoutButton();
});

// Function to initialize the logout button
function initializeLogoutButton() {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Call the logout function (e.g., from Userfront)
      Userfront.logout();
    });
  }
}
