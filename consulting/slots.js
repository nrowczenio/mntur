async function fetchAvailability() {
    if (!consultantId) {
        alert('No consultant selected. Please select a consultant first.');
        window.location.href = 'consultants.html';
        return;
    }

    const apiEndpoint = 'https://uo9ldnrl70.execute-api.eu-west-2.amazonaws.com/prod/items';

    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const consultantAvailability = data.find(item => item.id === consultantId);

        const slotsContainer = document.getElementById('appointment-cards');
        slotsContainer.innerHTML = ''; // Clear previous content

        let slotsByDate = {};

        consultantAvailability.availability.forEach(slot => {
            const [year, month, day, ...timeParts] = slot.split('-');
            const date = `${year}-${month}-${day}`;
            const time = timeParts.join(':');
            if (!slotsByDate[date]) {
                slotsByDate[date] = [];
            }
            slotsByDate[date].push(time);
        });

        // Sort dates and times
        const sortedDates = Object.keys(slotsByDate).sort();
        sortedDates.forEach(date => {
            const card = document.createElement('div');
            card.className = 'date-card';
            card.innerHTML = `<h2>${formatDate(date)}</h2>`;
            slotsByDate[date].sort().forEach(time => {
                const slot = document.createElement('span');
                slot.className = 'time-slot';
                slot.textContent = time;
                slot.dataset.date = date;
                slot.dataset.time = time;
                slot.addEventListener('click', selectSlot);
                card.appendChild(slot);
            });
            slotsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching availability:', error);
        alert('Error fetching availability. Please try again later.');
    }
}
