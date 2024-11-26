// Initialize Userfront with your tenant ID
Userfront.init("9nyyprwn");

// Function to show role-based buttons
function showRoleBasedButtons() {
    Userfront.user.update().then(() => {
        const roleButtonsContainer = document.getElementById('role-buttons');
        
        // Clear any existing buttons
        roleButtonsContainer.innerHTML = '';

        // Add buttons based on the user's role
        if (Userfront.user.hasRole("admin")) {
            roleButtonsContainer.innerHTML += `<button onclick="window.location.href='./form.html'">Request an Event</button>`;
            roleButtonsContainer.innerHTML += `<button onclick="window.location.href='./request.html'">Manage Events</button>`;
        } else if (Userfront.user.hasRole("contributor")) {
            roleButtonsContainer.innerHTML += `<button onclick="window.location.href='./form.html'">Request an Event</button>`;
        }
        // No buttons added for 'viewer' role
    }).catch((error) => {
        console.error("Error updating user:", error);
    });
}

// Call the function once the page has loaded
document.addEventListener("DOMContentLoaded", showRoleBasedButtons);
