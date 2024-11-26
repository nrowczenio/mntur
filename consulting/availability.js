Userfront.init("9nyyprwn");

document.addEventListener('DOMContentLoaded', function() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const timeSlots = generateTimeSlots();
    let currentWeekStart = new Date();
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay() + 1);

    const availabilityGrid = document.getElementById('availabilityGrid');
    const currentWeekSpan = document.getElementById('currentWeek');
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');

    function generateTimeSlots() {
        const slots = [];
        for (let hour = 9; hour < 21; hour++) {
            for (let minute of ['00', '30']) {
                slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
            }
        }
        return slots;
    }

    function updateWeekDisplay() {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        currentWeekSpan.textContent = `${currentWeekStart.toDateString()} - ${weekEnd.toDateString()}`;
    }

    function generateGrid() {
        availabilityGrid.innerHTML = '';
        availabilityGrid.appendChild(createCell('Time'));
        weekDays.forEach(day => availabilityGrid.appendChild(createCell(day)));

        timeSlots.forEach(time => {
            availabilityGrid.appendChild(createCell(time));
            weekDays.forEach((day, index) => {
                const date = new Date(currentWeekStart);
                date.setDate(date.getDate() + index);
                const cellId = `${date.toISOString().split('T')[0]}-${time}`;
                availabilityGrid.appendChild(createCheckboxCell(cellId));
            });
        });
    }

    function createCell(content) {
        const cell = document.createElement('div');
        cell.textContent = content;
        cell.classList.add('time-slot');
        return cell;
    }

    function createCheckboxCell(id) {
        const cell = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.classList.add('availability-checkbox');
        const label = document.createElement('label');
        label.htmlFor = id;
        label.classList.add('availability-label');
        cell.appendChild(checkbox);
        cell.appendChild(label);
        return cell;
    }

    prevWeekBtn.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        updateWeekDisplay();
        generateGrid();
    });

    nextWeekBtn.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        updateWeekDisplay();
        generateGrid();
    });

    document.getElementById('availabilityForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const userId = String(Userfront.user.userId).trim();
        const availability = [];
        document.querySelectorAll('.availability-checkbox:checked').forEach(checkbox => {
            availability.push(checkbox.id);
        });

        const data = {
            id: userId,  
            availability: availability
        };

        const apiEndpoint = 'https://uo9ldnrl70.execute-api.eu-west-2.amazonaws.com/prod/items';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                document.getElementById('result').textContent = 'Availability submitted successfully: ' + JSON.stringify(result);
            } else {
                document.getElementById('result').textContent = 'Error submitting availability: ' + response.statusText;
            }
        } catch (error) {
            document.getElementById('result').textContent = 'Error submitting availability: ' + error.message;
        }
    });

    updateWeekDisplay();
    generateGrid();
});