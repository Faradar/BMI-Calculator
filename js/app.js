// First Draft:
// At least one conditional - Done
// At least one cycle - Done
// At least one function - Done
// ---
// Second Draft:
// HTML and CSS Structure needs to start approaching the final page - Done
// JS Variables - Done
// Essential functions - Done
// JS Objects - Done
// Arrays - Done
// Search and filter methods on the Array - Done
// ---
// Third Draft:
// JSON and Local Storage - In Progress
// DOM and events - In Progress
// Maybe add the date class? (class 8)
// ---

// Create a class for the users
class User{
    constructor(name, height, weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }
}

// Declare array to store user objects
let users = [];

// Get necessary DOM elements
const form = document.getElementById('form');

// Add an event listener for when the form is submitted
form.addEventListener('submit', getPersonData);

// Function to gather a persons data and enter those values into an array
function getPersonData(e) {
    // Stop the form from submitting
    e.preventDefault();

    // Gather the data
    let name = document.getElementById('name').value;
    let height = parseFloat(document.getElementById('height').value) / 100; // Divided by 100 to go from cm to meters
    let weight = parseFloat(document.getElementById('weight').value);

    // Transform the gathered data into an object
    let user = new User(name, height, weight);

    // Add that object to an array
    users.push(user);

    showResults();
}

function showResults() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let bmiResults = calculateBMI(user);
        let [bmi, healthyBmiFloor, healthyBmiCeil] = bmiResults; //Destructured the array
        document.getElementById('bmiNumber').innerText = bmi;

        // Conditional that checks the resulting bmi and provides the type of weight associated with it
        if (isNaN(bmi) || bmi <= 0) {
            document.getElementById('bmiNumber').innerText = "Impossible";
            document.getElementById('bmiText').innerHTML = `${user.name}, the numbers you provided seem to be wrong. Please make sure you are entering the correct positive numbers for your height and weight.`;
        } else if (bmi < 18.5) {
            document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you're <span class="input-section__weight-name">underweight</span>. The ideal weight for your height is between <span class="input-section__weight-number">${healthyBmiFloor}kg - ${healthyBmiCeil}kg</span>`;
        } else if (bmi >= 18.5 && bmi < 25) {
            document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you have a <span class="input-section__weight-name">healthy weight</span>. The ideal weight for your height is between <span class="input-section__weight-number">${healthyBmiFloor}kg - ${healthyBmiCeil}kg</span>`;
        } else if (bmi >= 25 && bmi < 30) {
            document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you're <span class="input-section__weight-name">overweight</span>. The ideal weight for your height is between <span class="input-section__weight-number">${healthyBmiFloor}kg - ${healthyBmiCeil}kg</span>`;
        } else {
            document.getElementById('bmiText').innerHTML = `${user.name}, your BMI suggests you're <span class="input-section__weight-name">obese</span>. The ideal weight for your height is between <span class="input-section__weight-number">${healthyBmiFloor}kg - ${healthyBmiCeil}kg</span>`;
        }
    }
}

// Function to calculate the BMI of the user
function calculateBMI(user) {
    let bmi = (user.weight / Math.pow(user.height, 2)).toFixed(1);
    let healthyBmiFloor = (18.5 * Math.pow(user.height, 2)).toFixed(1);
    let healthyBmiCeil = (24.9 * Math.pow(user.height, 2)).toFixed(1);
    let bmiResults = [bmi, healthyBmiFloor, healthyBmiCeil]
    return bmiResults;
}