document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://qkcpl1pwyk.execute-api.eu-west-2.amazonaws.com/prod/consultants'; // Replace with your actual API endpoint

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const itemsList = document.getElementById('items-list');

            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'consultant-card';
                itemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.education}, ${item.experience}</p>
                    <p>${item.industry}</p>
                    <i>${item.desc}</i>
                    <button 
                        class="book-slot-btn" 
                        onclick="window.location.href='slots.html?consultantId=${item.id}'"
                    >
                        Book Slot
                    </button>
                    <hr>
                `;
                itemsList.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
