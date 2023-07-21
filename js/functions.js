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
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
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

    userDiv.innerHTML = `
    <div>
        <p>${user.name} calculo su BMI el dia (insertarfecha) y tuvo un resultado de ${user.bmi}</p>
        <button class="agregar-carrito">Agregar al carrito</button>
    </div>
    `

    document.getElementById('resultData').appendChild(userDiv);
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