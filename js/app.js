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
// JSON and Local Storage - Done
// DOM and events - Done
// ---
// Final Draft:
// Incorporate libraries: Sweet alert could be used to decide whether or not to delete one of the added info. Toastify could be used to add a little alert saying it was deleted
// ?
// Maybe incorporate the date class to add a date to each calculated thing. I could use the luxon library for this
// Add a cross button to it so it can be deleted (combine with sweet alert library here)
// Make the initial page not give a NaN BMI but rather have a message there that says "this is where your result will be displayed" or something like that
// ---

// Al body le tengo que agregar esto:
/*
<section class="result-section card">
    <p>asd</p>
</section>
*/
// y dentro del parrafo tiene que estar la informacion del usuario




// Execute this function upon startup
remember();

// Get the form element and trigger a function upon its submission
document.getElementById('form').addEventListener('submit', (e) => {
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

    // Once all is done go to the next function
    showResults();
});