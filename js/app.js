// First Draft:
// At least one conditional
// At least one cycle
// At least one function
// ---
// Second Draft:
// HTML and CSS Structure needs to start approaching the final page
// JS Variables
// Essential functions
// JS Objects
// Arrays
// Search and filter methods on the Array
// ---

// Create main variables
let height;
let weight;

// Cycle that checks that the entered values in the prompts are correct
do {
    height = (parseInt(prompt("Enter your height in cm"))) / 100; // Divided by 100 to go from cm to meters
} while (validate(height));

do {
    weight = parseInt(prompt("Enter your weight in kg"));
} while (validate(weight));

// Create the bmi constants
const bmi = (weight / Math.pow(height, 2)).toFixed(1);
const healthyBmiFloor = (18.5 * Math.pow(height, 2)).toFixed(1);
const healthyBmiCeil = (24.9 * Math.pow(height, 2)).toFixed(1);

// Conditional that checks the resulting bmi and provides the type of weight associated with it
if (bmi < 18.5) {
    alert(`Your BMI is: ${bmi}\nYour BMI suggests you're an underweight. Your ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
} else if (bmi >= 18.5 && bmi < 25) {
    alert(`Your BMI is: ${bmi}\nYour BMI suggests you're a healthy weight. Your ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
} else if (bmi >= 25 && bmi < 30) {
    alert(`Your BMI is: ${bmi}\nYour BMI suggests you're an overweight. Your ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
} else {
    alert(`Your BMI is: ${bmi}\nYour BMI suggests you're an obese. Your ideal weight for your height is between ${healthyBmiFloor}kg - ${healthyBmiCeil}kg`);
}

// function that validates whether the parameter is a positive number.
function validate(number) {
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