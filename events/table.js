Userfront.init("9nyyprwn");
const userId = Userfront.user.userId;

document.addEventListener("DOMContentLoaded", fetchEvents);

async function fetchEvents() {
    const apiEndpoint = 'https://6uos5rwyaa.execute-api.eu-west-2.amazonaws.com/prod/items'; // Replace with your actual API endpoint

    try {
        const response = await fetch(apiEndpoint);
        const items = await response.json();

        // Sort items by eventDate and startTime in chronological order
        items.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.startTime}`);
            const dateB = new Date(`${b.date} ${b.startTime}`);
            return dateA - dateB;
        });

        const eventCardsContainer = document.getElementById('event-cards');
        eventCardsContainer.innerHTML = '';

        items.forEach(item => {
            console.log(item)
            if (item.active !== false) { // Assuming all active events should be shown
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <h2>${item.name || 'Unnamed Event'}</h2>
                    <p><strong>Date:</strong> ${item.date}</p>
                    <p><strong>Start Time:</strong> ${item.startTime}</p>
                    <p><strong>End Time:</strong> ${item.endTime}</p>
                    <button class="apply-button" onclick="applyItem('${item.id}', '${item.name}', '${item.date}', '${item.startTime}', '${item.endTime}')">Apply</button>
                `;
                eventCardsContainer.appendChild(card);
            }
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        alert('Error fetching events. Please try again later.');
    }
}



async function applyItem(itemId, itemName, itemDate, itemStart, itemEnd) {
    const apiEndpoint = 'https://m1e5wvuc3f.execute-api.eu-west-2.amazonaws.com/prod/application'; // Replace with actual API endpoint

    try {
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: `${itemId}.${userId}`,
                userId,
                eventId: itemId,
                eventName: itemName,
                eventDate: itemDate,
                eventStart: itemStart,
                eventEnd: itemEnd,
                userEmail: "nrowczenio@gmail.com" // Replace with dynamic user email if available
            })
        });

        if (response.ok) {
            alert('Successfully applied for the event.');
        } else {
            const errorMessage = await response.text();
            alert(`Error applying for event: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error applying for event:', error);
        alert('Error applying for event. Please try again later.');
    }
}
