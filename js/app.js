// First Draft:
// At least one conditional - Done
// At least one cycle - Done
// At least one function - Done
// ---
// Second Draft:
// HTML and CSS Structure needs to start approaching the final page - In progress
// JS Variables - Done
// Essential functions - Done
// JS Objects - Done
// Arrays - Done
// Search and filter methods on the Array - In progress
// ---

// Create a class for the users
class User{
    constructor(name, age, height, weight) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }
}

// Declare array to store user objects
let users = [];

getPersonData();
showResults();

// Function to gather a persons data and enter those values into an array
function getPersonData() {
    let name = prompt("Enter your name:");
    let age;
    let height;
    let weight;

    // Cycles that check that the entered values in the prompts are correct
    do {
        age = parseInt(prompt("Enter your age:"));
    } while (validateNumber(age));

    do {
        height = (parseFloat(prompt("Enter your height in cm"))) / 100; // Divided by 100 to go from cm to meters
    } while (validateNumber(height));

    do {
        weight = parseFloat(prompt("Enter your weight in kg"));
    } while (validateNumber(weight));

    // Transform the gathered data into an object
    let user = new User(name, age, height, weight);

    // Add that object to an array
    users.push(user);
}

// Function that validates whether the argument is a positive number.
function validateNumber(number) {
    if (isNaN(number)) {
        alert("You did not enter a number, please try again");
        return true;
    } else if (number <= 0) {
        alert("Positive numbers only please");
        return true;
    } else {
        return false;
    }
}

function showResults() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let bmiResults = calculateBMI(user);
        let bmi = bmiResults[0];
        let healthyBmiFloor = bmiResults[1];
        let healthyBmiCeil = bmiResults[2];

        // Conditional that checks the resulting bmi and provides the type of weight associated with it
        if (bmi < 18.5) {
            alert(`${user.name}, your BMI is: ${bmi}\nIt suggests you're underweight. The ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
        } else if (bmi >= 18.5 && bmi < 25) {
            alert(`${user.name}, your BMI is: ${bmi}\nIt suggests you have a healthy weight. The ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
        } else if (bmi >= 25 && bmi < 30) {
            alert(`${user.name}, your BMI is: ${bmi}\nIt suggests you're overweight. The ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
        } else {
            alert(`${user.name}, your BMI is: ${bmi}\nIt suggests you're obese. The ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
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