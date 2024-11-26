document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const feedbackData = Object.fromEntries(formData.entries());

    const apiEndpoint = 'https://your-api-endpoint.com/feedback'; // Replace with actual endpoint

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });

        if (response.ok) {
            document.getElementById('result').innerHTML = '<p>Thank you for your feedback!</p>';
        } else {
            document.getElementById('result').innerHTML = `<p>Error: ${await response.text()}</p>`;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
