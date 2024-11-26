let selectedSlot = null;

Userfront.init("9nyyprwn");
const userId = Userfront.user.userId;
const userName = Userfront.user.name;

const urlParams = new URLSearchParams(window.location.search);
const consultantId = urlParams.get('consultantId');

console.log(userId);

async function fetchAvailability() {

    if (!consultantId) {
        alert('No consultant selected. Please select a consultant first.');
        window.location.href = 'consultants.html';
        return;
    }

    const apiEndpoint = 'https://uo9ldnrl70.execute-api.eu-west-2.amazonaws.com/prod/items';

    console.log(userId);

    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        const consultantAvailability = data.find(item => item.id === consultantId);

        const tableBody = document.getElementById('availabilityBody');
        tableBody.innerHTML = '';

        let slotsByDate = {};

        consultantAvailability.availability.forEach(slot => {
            const parts = slot.split('-');
            const date = parts.slice(0, 3).join('-');
            const time = parts.slice(3).join(':');
            
            if (!slotsByDate[date]) {
                slotsByDate[date] = new Set();
            }
            slotsByDate[date].add(time);
        });

        // Sort dates
        let sortedDates = Object.keys(slotsByDate).sort();

        let slotId = 0;
        sortedDates.forEach(date => {
            // Sort times for each date
            let sortedTimes = Array.from(slotsByDate[date]).sort();
            
            const row = document.createElement('tr');
            const timeSlots = sortedTimes.map(time => {
                const id = `${date.replace(/-/g, '')}${time.replace(/:/g, '')}`;
                return `<span class="time-slot" data-id="${id}" data-date="${date}" data-time="${time}">${time}</span>`;
            }).join(', ');
            
            row.innerHTML = `
                <td>${slotId}</td>
                <td>${formatDate(date)}</td>
                <td>${timeSlots}</td>
            `;
            tableBody.appendChild(row);
            slotId++;
        });

        // Add event listeners to time slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', selectSlot);
        });

    } catch (error) {
        console.error('Error fetching availability:', error);
        alert('Error fetching availability. Please try again later.');
    }
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function selectSlot(event) {
    if (selectedSlot) {
        selectedSlot.classList.remove('selected');
    }
    selectedSlot = event.target;
    selectedSlot.classList.add('selected');
}

function addThirtyMinutes(timeString) {
    // Create a Date object for today's date at the given time
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    // Add 30 minutes
    date.setMinutes(date.getMinutes() + 30);
    
    // Format the result back to HH:MM
    return date.toTimeString().slice(0, 5);
}

async function confirmBooking() {
    console.log(userId);
    
    if (!selectedSlot) {
        alert('Please select a time slot before confirming.');
        return;
    }

    const id = selectedSlot.dataset.id;
    const date = selectedSlot.dataset.date;
    const startTime = selectedSlot.dataset.time;
    const endTime = addThirtyMinutes(startTime);


    try {
        const response = await fetch('https://rv1flrqz8c.execute-api.eu-west-2.amazonaws.com/prod/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: "0." + id,
                eventDate: date,
                eventName: "Appointment",
                eventStart: startTime,
                eventEnd: endTime,
                eventUserId: userId,
                eventUserName: userName,
                eventConsultantId: consultantId
            }),
        });

        if (response.ok) {
            alert('Booking confirmed!');
            selectedSlot.classList.remove('selected');
            selectedSlot.classList.add('booked');
            selectedSlot = null;
        } else {
            alert('Failed to book. Please try again.');
        }
    } catch (error) {
        console.error('Error booking slot:', error);
        alert('Error booking slot. Please try again later.');
    }
}

// Fetch availability when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchAvailability();
    document.getElementById('confirmButton').addEventListener('click', confirmBooking);
});