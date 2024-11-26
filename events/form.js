document.getElementById('simpleForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    

    // Define the API endpoint
    const apiEndpoint = 'https://6uos5rwyaa.execute-api.eu-west-2.amazonaws.com/prod/items';

    try {
        // Send a PUT request
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
