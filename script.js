const carTypeContainer = document.querySelector(".car-types-container");
const loadingMessage = document.getElementById("loading-message");
const API_URL = "http://localhost:3001/cars";

function renderCar(car) {
  const carTypeDiv = document.createElement("div");
  carTypeDiv.classList.add("car-type-item");
  carTypeDiv.innerHTML = `
   <div>
     <h5 id="${car.id}">${car.name}</h5>
       <img src="${car.image}" alt="${car.name}"/>
       <p>${car.description}</p>
     <ul>
      ${car.key_aspects.map(aspect => `<li>${aspect}</li>`).join('')}
     </ul>
     <table>
       <thead>
          <tr>
            <th>Car Type</th>
            <th>Pros</th>
            <th>Cons</th>
          </tr>
        </thead>
        <tbody>
         <tr>
            <td>${car.name}</td>
            <td>${car.pros_cons.pros}</td>
            <td>${car.pros_cons.cons}</td>
         </tr>
        </tbody>
     </table>
    </div>`;
carTypeContainer.append(carTypeDiv);
}

async function fetchAndRenderCars() {
    try {
        loadingMessage.textContent ="loading car types";
        loadingMessage.style.display = 'block';
        const response = await fetch(API_URL);

        if(!response.ok){
           throw new Error(`HTTP error! Status: ${response.status}`);
      }

     const cars = await response.json();

     cars.forEach(car => renderCar(car));

    } catch (error) {
    console.error(`Error fetching or rendering cars:`, error);
    loadingMessage.textContent = `Failed to load, please try again later`;
    }
}
document.addEventListener(`DOMContentLoaded`, fetchAndRenderCars);