// Function to enter the last used values automatically
function remember() {
    // Get the last inputed values in the local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if said values exists, if it does then add them otherwise don't add anything
    document.getElementById('name').value = user?.name || '';
    document.getElementById('height').value = user?.height * 100 || ''; // Multiplied by 100 to go from meters to cm
    document.getElementById('weight').value = user?.weight || '';
}

function showResults() {
    let user = users[users.length - 1];
    let bmiResults = calculateBMI(user);
    let [bmi, healthyBmiFloor, healthyBmiCeil] = bmiResults; //Destructured the array
    user.bmi = bmi;
    document.getElementById('bmiNumber').innerText = bmi;

    // Conditional that checks the resulting bmi and provides the type of weight associated with it in the DOM
    if (isNaN(bmi) || bmi <= 0) { // If the bmi results in a silly value
        document.getElementById('bmiNumber').innerText = "Wrong";
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

    // Save the last inputed values in the local storage
    localStorage.setItem('user', JSON.stringify(user));

    insertData();
}

// Function to calculate the BMI of the user
function calculateBMI(user) {
    let bmi = (user.weight / Math.pow(user.height, 2)).toFixed(1);
    let healthyBmiFloor = (18.5 * Math.pow(user.height, 2)).toFixed(1);
    let healthyBmiCeil = (24.9 * Math.pow(user.height, 2)).toFixed(1);
    let bmiResults = [bmi, healthyBmiFloor, healthyBmiCeil]
    return bmiResults;
}

function insertData() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userDiv = document.createElement('div');
    const date = luxon.DateTime.now();
    const hour = date.hour;
    const minute = date.minute;
    const formattedTimer = formatTimer(hour, minute);
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
            <p>${user.name} calculated their BMI the ${date.day}${ordinalIndicator} of ${date.monthLong} ${date.year} on ${date.zoneName} at ${formattedTimer} and had a result of <span class="result-section__bmi">${user.bmi}</span></p>
            <button type="button" class="result-section__button"><i class="fa-solid fa-square-xmark" style="color: #f59942;"></i></button>
        </div>
    `;

    document.getElementById('resultData').appendChild(userDiv);

    // Add event listener to the delete button
    const deleteButton = userDiv.querySelector('.result-section__button');
    deleteButton.addEventListener('click', () => {
        userDiv.remove(); // Remove the parent div when the button is clicked
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









function getStarWarsCharacters(){

    return fetch('https://swapi.dev/api/people/')
  
          .then(response => response.json())
  
          .then(data => {
  
            debugger
  
            const characters = data.results;
  
   
  
            characters.forEach(character => {
  
              const characterDiv = document.createElement('div');
  
              characterDiv.classList.add('producto');
  
   
  
              characterDiv.innerHTML = `
  
                <div class='card'>
  
                  <h3>${character.name}</h3>
  
                  <p>height:${character.height}</p>
  
                  <p>Mass:${character.mass}</p>
  
                  <p>Genero:${character.gender}</p>
  
                  <button class="agregar-carrito">Agregar al carrito</button>
  
                </div> 
  
              `
  
              productContainer.appendChild(characterDiv)
  
            });
  
          })
  
          .catch(err => console.error(err));
  
  }