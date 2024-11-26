Userfront.init("9nyyprwn");


document.getElementById('simpleForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check Userfront data
    const userId = String(Userfront.user.userId).trim();
    const userName = Userfront.user.name ? Userfront.user.name.trim() : "Unknown User";

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    

    // Define the API endpoint
    const apiEndpoint = 'https://qkcpl1pwyk.execute-api.eu-west-2.amazonaws.com/prod/consultants';

    try {
        // Send a PUT request
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId, name: userName, ...data})
        });

        // Handle the response
        if (response.ok) {
            const result = await response.json();
            alert('Form submitted successfully: ' + JSON.stringify(result));
        } else {
            alert('Error submitting form: ' + response.statusText);
        }
    } catch (error) {
        alert('Error submitting form: ' + error.message);
    }
});
