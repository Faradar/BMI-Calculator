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
// Incorporate libraries - Done
// Funcion async-await, con fetch a un archivo JSON y que haga uso del try ... catch. Posiblemente agregar un finally.
// una idea es usar la libreria de sweet alert para cuando la respuesta este mal, tipo si el fetch no llega
// implementar email js para enviar mails y demas? mas en la clase 16. es un api que permite que te manden un mail
// Ver si hay errores 404, si los hay hacerlos lindos (tipo con un sweet alert)
// El flujo del local storage tiene que ser setitem, getitem y el remove. Son 3 pasos.
// Sin codigo comentado
// Sin console log
// Revisar que todo lo de la primera, second y third draft sigue estando completo
// Hacer una revision final del powerpoint de la clase 17 para revisar que cumpli con todo lo pedido de ahi tambien
// limit the amount of digits you can put in the height and weight inputs, add a possible comma to this limitation. Maybe add a sweet alert popup when you try to write while on the limit
// add good commentary to the html, sass and js code
// ---


// 1. Tengo que guardar los datos calculados al local storage
// 2. tengo que hacer que esos datos aparezcan usando el local storage
// 3. tengp que hacer que esos datos sean recordados y sigan existiendo en otra sesion
// 4. tengo que hacer que esos datos sean eliminados cuando aprete el boton de eliminar


// Execute this function upon startup
remember();

// Add an event listener to the height and weight inputs
const heightInput = document.getElementById('height');
heightInput.addEventListener('input', limitDigits);

const weightInput = document.getElementById('weight');
weightInput.addEventListener('input', limitDigits);

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
        monthLong: date.monthLong,
        year: date.year,
        zoneName: date.zoneName,
        hour: date.hour,
        minute: date.minute
    };

    // Generate a unique userId for the current user
    const userId = generateUserId();

    // Transform the gathered data into an object
    const user = new User(userId, name, height, weight, bmi, date);

    // Add that object to an array
    users.push(user);

    // Once all is done go to the next function
    showResults(user);
});