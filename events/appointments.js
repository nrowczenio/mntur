async function fetchAppointments() {
  const apiUrl = 'https://your-api-url.com/appointments'; // Use your actual API endpoint
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const cardsContainer = document.getElementById('appointment-cards');
      cardsContainer.innerHTML = '';

      data.forEach(appointment => {
          const card = document.createElement('div');
          card.className = 'appointment-card';
          card.innerHTML = `
              <h2>${appointment.itemName}</h2>
              <p><strong>Date:</strong> ${appointment.date}</p>
              <p><strong>Start Time:</strong> ${appointment.startTime}</p>
              <p><strong>End Time:</strong> ${appointment.endTime}</p>
              <p><strong>Consultant:</strong> ${appointment.consultantName || 'N/A'}</p>
              <button class="remove-button" onclick="removeAppointment('${appointment.id}')">Remove</button>
          `;
          cardsContainer.appendChild(card);
      });
  } catch (error) {
      console.error('Error fetching appointments:', error);
  }
}

async function removeAppointment(appointmentId) {
  try {
      const response = await fetch(`https://your-api-url.com/appointments/${appointmentId}`, { method: 'DELETE' });
      if (response.ok) {
          alert('Appointment removed successfully.');
          fetchAppointments(); // Refresh the list
      } else {
          alert('Failed to remove appointment.');
      }
  } catch (error) {
      console.error('Error removing appointment:', error);
  }
}

// Ensure fetchAppointments is called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', fetchAppointments);
