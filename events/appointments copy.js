document.addEventListener('DOMContentLoaded', () => {

    console.log("DOMContentLoaded event triggered");
    Userfront.init("9nyyprwn");

    const apiUrl = 'https://rv1flrqz8c.execute-api.eu-west-2.amazonaws.com/prod/items';
  
    async function fetchData() {
      console.log("fetchData function started"); // Check if this message appears

      const loggedInUserId = Userfront.user.userId;
      
      try {
        console.log("Attempting to fetch data from:", apiUrl); // Another check before the fetch call
        const response = await fetch(apiUrl);
        console.log("Fetch response received", response);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log("Data fetched from API:", data); 
        
        const filteredData = data.filter(item => item.userId === loggedInUserId);

        if (Array.isArray(data) && data.length > 0) {
          generateTableRows(filteredData);
        } else {
          document.getElementById('table-body').innerHTML = '<tr><td colspan="8">No data found</td></tr>';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    function generateTableRows(data) {
      console.log("generateTableRows function called"); // Check if this is reached
      const tbody = document.getElementById('table-body');
      tbody.innerHTML = ''; 
  
      const fields = ['itemName', 'startTime', 'endTime', 'date', 'userId', 'consultantName'];
      data.forEach(item => {
        const row = document.createElement('tr');
        fields.forEach(field => {
          const cell = document.createElement('td');
          cell.textContent = item[field] || 'N/A'; 
          row.appendChild(cell);
        });
        tbody.appendChild(row);
      });
    }
  
    fetchData();
  });
  