document.addEventListener('DOMContentLoaded', () => {
  Userfront.init("9nyyprwn");
  const apiUrl = 'https://m1e5wvuc3f.execute-api.eu-west-2.amazonaws.com/prod/application'; // API endpoint

  async function fetchEvents() {
      const loggedInUserId = Userfront.user.userId;

      try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();
          const filteredData = data.filter(item => item.userId === loggedInUserId);

          // Sort events by eventDate and startTime
          filteredData.sort((a, b) => {
              const dateA = new Date(`${a.eventDate}T${a.startTime}`);
              const dateB = new Date(`${b.eventDate}T${b.startTime}`);
              return dateA - dateB;
          });

          displayEventCards(filteredData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  function displayEventCards(events) {
      const eventCardsContainer = document.getElementById('event-cards');
      eventCardsContainer.innerHTML = '';

      events.forEach(event => {
          const card = document.createElement('div');
          card.className = 'event-card';
          card.innerHTML = `
              <h2>${event.eventName}</h2>
              <p><strong>Date:</strong> ${event.eventDate}</p>
              <p><strong>Start Time:</strong> ${event.startTime}</p>
              <p><strong>End Time:</strong> ${event.endTime}</p>
              <button class="remove-button" onclick="removeEvent('${event.id}')">Remove</button>
          `;
          eventCardsContainer.appendChild(card);
      });
  }

  async function removeEvent(eventId) {
      const deleteUrl = `${apiUrl}/${eventId}`; // Assuming DELETE endpoint follows this structure
      try {
          const response = await fetch(deleteUrl, { method: 'DELETE' });
          if (response.ok) {
              alert('Event removed successfully.');
              fetchEvents(); // Refresh the list
          } else {
              alert(`Failed to remove event: ${await response.text()}`);
          }
      } catch (error) {
          console.error('Error removing event:', error);
          alert('Failed to remove event. Please try again later.');
      }
  }

  fetchEvents();
});
