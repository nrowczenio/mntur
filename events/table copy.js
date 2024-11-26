Userfront.init("9nyyprwn");
const userId = Userfront.user.userId;

async function fetchItems() {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('Please select a date.');
        return;
    }

    const apiEndpoint = `https://6uos5rwyaa.execute-api.eu-west-2.amazonaws.com/prod/items?date=${date}`; // Replace with your actual API endpoint

    try {
        const response = await fetch(apiEndpoint);
        const items = await response.json();

        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        items.forEach(item => {
            if (item.active) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.itemName}</td>
                    <td>${item.date}</td>
                    <td>${item.startTime}</td>
                    <td>${item.endTime}</td>
                    <td><button class="apply-button" onclick="applyItem('${item.id}',
                                                                        '${item.name}',
                                                                        '${item.date}',
                                                                        '${item.startTime}',
                                                                        '${item.endTime}')">Apply</button></td>
                `;
                tableBody.appendChild(row);
            }
        });

    } catch (error) {
        console.error('Error fetching items:', error);
        alert('Error fetching items. Please try again later.');
    }
}

async function applyItem(itemId, itemName, itemDate, itemStart, itemEnd) {
    const apiEndpoint = 'https://m1e5wvuc3f.execute-api.eu-west-2.amazonaws.com/prod/application'; // Replace with your actual API endpoint

    try {
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemId + '.' + userId,
                                 userId: userId,
                                 eventId: itemId, 
                                 eventName: itemName,
                                 eventDate: itemDate,
                                 eventStart: itemStart,
                                 eventEnd: itemEnd,
                                 userEmail: "nrowczenio@gmail.com"})
        });

        if (response.ok) {
            alert('Item applied successfully.');
            // Optionally, update UI to indicate applied status
        } else {
            const errorMessage = await response.text();
            alert(`Error applying item: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error applying item:', error);
        alert('Error applying item. Please try again later.');
    }
}
