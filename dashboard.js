// Initialize Userfront with your tenant ID
Userfront.init("9nyyprwn");

// Fetch and display user information after DOM is loaded
document.addEventListener("DOMContentLoaded", async function() {

    try {
        // Ensure the user is authenticated
        if (!Userfront.accessToken()) {
            window.location.href = "login.html";
            return;
        }

        // Get user data from UserFront
        Userfront.user.update().then(() => {
            document.getElementById("user-name").textContent = Userfront.user.name || "User";
            document.getElementById("user-role").textContent = Userfront.user.role || "No role assigned";
            document.getElementById("user-email").textContent = Userfront.user.email || "No email available";
        }).catch((error) => {
            console.error("Error fetching user info:", error);
        });
        // Get user ID from Userfront
        const userId = Userfront.user.userId;

        // Fetch user information from DynamoDB via your backend API

        const apiEndpoint = `https://boqmax7l9f.execute-api.eu-west-2.amazonaws.com/prod/user_data/1`; // Replace with your actual API endpoint

        try {
            const response = await fetch(apiEndpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

        const userData = await response.json();

        // Populate the user info on the dashboard
        document.getElementById("university").innerText = userData.university || 'N/A';
        document.getElementById("degree").innerText = userData.degree || 'N/A';
        document.getElementById("interests").innerText = userData.interests || 'N/A';
        document.getElementById("description").innerText = userData.description || 'N/A';

    } catch (error) {
        console.error("Error fetching user data:", error);
    }

} catch (error) {
    console.error("Error fetching user data:", error);
}
});
