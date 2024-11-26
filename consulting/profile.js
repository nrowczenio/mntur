Userfront.init("9nyyprwn");

document.getElementById('simpleForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const userId = String(Userfront.user.userId).trim();
    const userName = Userfront.user.name ? Userfront.user.name.trim() : "Unknown User";

    // Collect form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // API endpoint
    const apiEndpoint = 'https://qkcpl1pwyk.execute-api.eu-west-2.amazonaws.com/prod/consultants';

    try {
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId, name: userName, ...data })
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('result').innerHTML = `<p>Profile updated successfully!</p>`;
        } else {
            const errorText = await response.text();
            document.getElementById('result').innerHTML = `<p>Error: ${errorText}</p>`;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
