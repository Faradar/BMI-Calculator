// Execute this function upon startup
remember();

// Add an event listener to the height and weight inputs
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

heightInput.addEventListener('input', limitDigits);
weightInput.addEventListener('input', limitDigits);

// Create a variable to keep track of the last time an alert was shown
let lastAlertTime = 0;

// Get the form element and trigger a function upon its submission
const formSubmit = document.getElementById('form');
formSubmit.addEventListener('submit', (e) => {
    // Stop the form from submitting
    e.preventDefault();

    // Gather the data
    const name = document.getElementById('name').value;
    const height = parseFloat(document.getElementById('height').value) / 100; // Divided by 100 to go from cm to meters
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = calculateBMI(height, weight);
    let date = luxon.DateTime.now();
    date = {
        day: date.day,
        hour: date.hour,
        minute: date.minute,
        monthLong: date.monthLong,
        year: date.year,
        zoneName: date.zoneName
    };

    // Generate a unique userId for the current user
    const userId = generateUserId();

    // Transform the gathered data into an object
    const user = new User(userId, name, height, weight, bmi, date);

    // Add that object to an array
    users.push(user);

    // Save the users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Once all is done go to the next function
    showResults(user);
});