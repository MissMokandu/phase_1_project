const carTypeContainer = document.querySelector(".car-types-container");
const loadingMessage = document.getElementById("loading-message");
const carSearchInput = document.getElementById("car-search");
const API_URL = "http://localhost:3002/cars";

    let allCars = [];

    function handleCarMouseOut(event) {
      const hoveredCarDiv = event.currentTarget;
      hoveredCarDiv.style.border = "1px solid #ddd";

      const searchTerm = carSearchInput.value.toLowerCase(); // FIXED: define searchTerm
      const filteredCars = allCars.filter((car) => {
        return (
          car.name.toLowerCase().includes(searchTerm) ||
          car.description.toLowerCase().includes(searchTerm)
        );
      });

      carTypeContainer.innerHTML = "";

      if (filteredCars.length === 0) {
        carTypeContainer.innerHTML =
          '<p style="text-align: center; margin-top: 20px;">No cars match your search.</p>';
      } else {
        filteredCars.forEach((car) => {
          renderCar(car);
        });
      }
    }

    function renderCar(car) {
      const carTypeDiv = document.createElement("div");
      carTypeDiv.classList.add("car-type-item");
      carTypeDiv.addEventListener("click", handleCarClick);
      carTypeDiv.addEventListener("mouseover", handleCarMouseOver);
      carTypeDiv.addEventListener("mouseout", handleCarMouseOut);

      carTypeDiv.innerHTML = `
       <div>
         <h5 id="${car.id}">${car.name}</h5>
           <img src="${car.image}" alt="${car.name}"/>
           <p>${car.description}</p>
         <ul>
          ${car.key_aspects.map((aspect) => `<li>${aspect}</li>`).join("")}
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
        loadingMessage.textContent = "loading car types";
        loadingMessage.style.display = "block";
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const cars = await response.json();
        allCars = cars;

        cars.forEach((car) => renderCar(car));
      } catch (error) {
        console.error(`Error fetching or rendering cars:`, error);
        loadingMessage.textContent = `Failed to load, please try again later`;
      }
    }

    function handleSearchInput(event) {
      const searchTerm = event.target.value.toLowerCase();

      const filteredCars = allCars.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm) ||
          car.description.toLowerCase().includes(searchTerm)
      );

      carTypeContainer.innerHTML = "";

      if (filteredCars.length === 0) {
        carTypeContainer.innerHTML = `
          <p style="text-align: center; margin-top: 20px;">
            No cars match your search.
          </p>`;
      } else {
        filteredCars.forEach((car) => renderCar(car));
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      fetchAndRenderCars();
      carSearchInput.addEventListener("input", handleSearchInput);
    });

    // Placeholder handlers (add logic later)
    function handleCarClick() {}
    function handleCarMouseOver() {}