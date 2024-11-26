// Initialize Userfront with your tenant ID
Userfront.init("9nyyprwn");

// Reusable function to redirect based on role and target paths
function redirectUser(buttonId, rolePaths) {
    document.getElementById(buttonId).addEventListener("click", function(event) {
        event.preventDefault();  // Prevent the default link behavior
        
        Userfront.user.update().then(() => {
            if (Userfront.user.hasRole("admin")) {
                window.location.href = rolePaths.admin;
            } else if (Userfront.user.hasRole("contributor")) {
                window.location.href = rolePaths.contributor;
            } else if (Userfront.user.hasRole("viewer")) {
                window.location.href = rolePaths.viewer;
            } else {
                window.location.href = rolePaths.fallback; // Fallback for other roles
            }
        }).catch((error) => {
            console.error("Error updating user or redirecting:", error);
        });
    });
}

// Attach the redirection logic to multiple buttons on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    
    

    // Repeat for other buttons like Profile, Settings, Consultants, etc.
    redirectUser("profile-button", {
        admin: "./staff/consulting/profile.html",
        contributor: "./staff/consulting/profile.html",
        viewer: "/user/profile.html",
        fallback: "index.html"
    });

    
    redirectUser("booking-button", {
        admin: "/admin/profile.html",
        contributor: "/staff/profile.html",
        viewer: "/user/profile.html",
        fallback: "index.html"
    });

    

    // You can extend this to Settings, Consultants, and any other buttons
});
