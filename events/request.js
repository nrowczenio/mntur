async function fetchItems() {
    const apiEndpoint = 'https://6uos5rwyaa.execute-api.eu-west-2.amazonaws.com/prod/items'; // Replace with your actual endpoint

    try {
        const response = await fetch(apiEndpoint);
        const items = await response.json();

        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            const itemLabel = document.createElement('label');
            itemLabel.textContent = `ID: ${item.id}, Name: ${item.name}, Attendees: ${item.attendees}, Date: ${item.date}, StartTime: ${item.startTime}, EndTime: ${item.endTime}`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.active;
            checkbox.addEventListener('change', () => toggleActive(item.id, item.name, item.attendees, item.date, item.startTime, item.endTime, checkbox.checked));

            itemDiv.appendChild(itemLabel);
            itemDiv.appendChild(checkbox);
            itemList.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

async function toggleActive(itemId, itemName, itemAttendees, itemDate, itemStartTime, itemEndTime, isActive) {
    const apiEndpoint = `https://6uos5rwyaa.execute-api.eu-west-2.amazonaws.com/prod/items`; // Replace with your actual endpoint

    try {
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemId,
                                 name: itemName, 
                                 attendees: itemAttendees,
                                 date: itemDate,
                                 startTime: itemStartTime,
                                 endTime: itemEndTime,
                                 active: isActive })
        });

        if (response.ok) {
            console.log(`Item ${itemId} updated successfully`);
        } else {
            console.error(`Error updating item ${itemId}:`, response.statusText);
        }
    } catch (error) {
        console.error('Error updating item:', error);
    }
}