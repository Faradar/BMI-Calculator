// Function to enter the last used values automatically
async function remember() {
    // Call the function to get the data from the JSON file and await its result
    const peopleData = await fetchData();

    // Fill the cards for each user
    peopleData.forEach((person) => {
        insertData(person);
    });

    // Retrieve the users array from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    // Check if the storedUsers array exists and is not empty
    if (Array.isArray(storedUsers) && storedUsers.length > 0) {
        // Update the existing users array with the data in the storedUsers array
        users = [...storedUsers];

        // Get the last user from the users array
        const lastUser = users[users.length - 1];

        // Fill in the input fields with the last user's data
        document.getElementById('name').value = lastUser.name;
        document.getElementById('height').value = lastUser.height * 100; // Multiplied by 100 to go from meters to cm
        document.getElementById('weight').value = lastUser.weight;

        // Fill the cards for each user
        users.forEach(user => {
            insertData(user);
        });
    }
}

// Limit the height and weight inputs to prevent silly numbers
function limitDigits(event) {
    const input = event.target;
    const value = input.value;
    const maxLength = value.includes('.') ? 4 : 3;

    // Remove any non-digit characters from the input
    const digitsOnly = value.replace(/[^\d.,]/g, '');

    // Limit the number of digits to maxLength
    const limitedValue = digitsOnly.slice(0, maxLength);

    // Update the input value with the limited digits
    input.value = limitedValue;
}

// Function to calculate the BMI of the user
function calculateBMI(height, weight) {
    let bmiResults = {
        bmi: (weight / Math.pow(height, 2)).toFixed(1),
        healthyBmiFloor: (18.5 * Math.pow(height, 2)).toFixed(1),
        healthyBmiCeil: (24.9 * Math.pow(height, 2)).toFixed(1)
    };
    return bmiResults;
}

function generateUserId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8; // Adjust the length of the generated ID as needed
    let userId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        userId += characters.charAt(randomIndex);
    }

    return userId;
}

function showResults(user) {
    const { bmi, healthyBmiFloor: hf, healthyBmiCeil: hc } = user.bmi; // Destructured the object and used aliases

    //This applies to all but one possibility in the conditional below
    document.getElementById('bmiNumber').innerText = bmi;

    // Conditional that checks the resulting bmi and provides the type of weight associated with it in the DOM
    if (isNaN(bmi) || bmi <= 0) { // If the bmi results in a silly value
        document.getElementById('bmiNumber').innerText = "Wrong";
        document.getElementById('bmiText').innerHTML = `${user.name}, the numbers you provided seem to be wrong. Please make sure you are entering the correct positive numbers for your height and weight.`;
    } else if (bmi < 18.5) {
        document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you're <span class="input-section__weight-name">underweight</span>. The ideal weight for your height is between <span class="input-section__weight-number">${hf}kg - ${hc}kg</span>`;
    } else if (bmi >= 18.5 && bmi < 25) {
        document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you have a <span class="input-section__weight-name">healthy weight</span>. The ideal weight for your height is between <span class="input-section__weight-number">${hf}kg - ${hc}kg</span>`;
    } else if (bmi >= 25 && bmi < 30) {
        document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you're <span class="input-section__weight-name">overweight</span>. The ideal weight for your height is between <span class="input-section__weight-number">${hf}kg - ${hc}kg</span>`;
    } else {
        document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you're <span class="input-section__weight-name">obese</span>. The ideal weight for your height is between <span class="input-section__weight-number">${hf}kg - ${hc}kg</span>`;
    }

    // Save the users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    insertData(user);
}

function insertData(user) {
    const userDiv = document.createElement('div');
    const date = user.date;
    const formattedTimer = formatTimer(date.hour, date.minute);
    let ordinalIndicator;

    // Change the ordinal indicator depending on the day
    if (date.day === 1) {
        ordinalIndicator = 'st';
    } else if (date.day === 2) {
        ordinalIndicator = 'nd';
    } else if (date.day === 3) {
        ordinalIndicator = 'rd';
    } else {
        ordinalIndicator = 'th';
    }

    userDiv.innerHTML = `
        <div class="result-section__div card">
            <p>${user.name} calculated their BMI the ${date.day}${ordinalIndicator} of ${date.monthLong} ${date.year} on ${date.zoneName} at ${formattedTimer} and had a result of <span class="result-section__bmi">${user.bmi.bmi}</span></p>
            <button type="button" class="result-section__button"><i class="fa-solid fa-square-xmark" style="color: #f59942;"></i></button>
        </div>
    `;

    document.getElementById('resultData').appendChild(userDiv);

    const deleteButton = userDiv.querySelector('.result-section__button');
    // Set the data-id attribute to the user's unique identifier
    deleteButton.setAttribute('data-id', user.id);
    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        const userId = deleteButton.getAttribute('data-id');

        // Find the index of the user with the matching userId in the users array
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            // Remove the user from the users array
            users.splice(userIndex, 1);

            // Update the local storage with the updated users array
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Remove the parent div when the button is clicked
        userDiv.remove();
        Toastify({
            text: "Deleted",
            duration: 700,
            style: {
                background: "#f59942"
            }
        }).showToast();
    });
}

function formatTimer(hours, minutes) {
    // Convert hours and minutes to strings
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Combine the formatted hours and minutes with a colon between them
    const formattedTimer = `${formattedHours}:${formattedMinutes}hs`;

    return formattedTimer;
}

// Retrieve data from JSON file
async function fetchData() {
    try {
        const response = await fetch('./JSON/people.json');

        // Check if the server response is successful
        if (!response.ok) {
            throw new Error('Error getting JSON file');
        }

        const data = await response.json();

        // data.people.forEach((person) => {
        //     insertData(person);
        // });

        // Process the data and return the result
        return data.people;
    } catch (error) {
        // Error handling
        console.error('Error getting the data:', error.message);
        return []; // Return an empty array if there was an error
    } finally {
        // Code that will always be executed, whether there is an error or not
        console.log('The fetchData function has finished');
    }
}