// IMPORT MODULES
// import snackbar from "snackbar";
// import "snackbar/dist/snackbar.min.css";
import Chart from "chart.js/auto";
import { FetchWrapper } from "./fetch-wrapper.js";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

class FoodObject {
  constructor(name, carb, protein, fat) {
    this.name = name;
    this.carb = carb;
    this.protein = protein;
    this.fat = fat;
  }
}

const cards = document.querySelector(".cards");
const logAmount = document.querySelector(".log-amount");
const carbAmount = document.querySelector(".carb-amount");
const proteinAmount = document.querySelector(".protein-amount");
const fatAmount = document.querySelector(".fat-amount");
const cardName = document.querySelector(".card-name");
const form = document.querySelector("form");

const getInputs = (e) => {
  e.preventDefault();
  console.log("submit");
  const nameInput = document.querySelector("#food-names").value;
  const carbInput = Number(document.querySelector("#carbs").value);
  const proteinInput = Number(document.querySelector("#protein").value);
  const fatInput = Number(document.querySelector("#fat").value);

  let foodItem = new FoodObject(nameInput, carbInput, proteinInput, fatInput);
  foodItem = { nameInput, carbInput, proteinInput, fatInput };
  console.log(foodItem);
  logAmount.textContent = carbInput + proteinInput + fatInput + "g";

  renderCard(foodItem);
};

form.addEventListener("submit", getInputs);

const renderCard = ({ nameInput, carbInput, proteinInput, fatInput }) => {
  cards.innerHTML += `
  <div class="card-item">
  <h3 class="card-name">${nameInput}</h3>
  <p><span>${carbInput + proteinInput + fatInput}g</span> calories</p>
  <ul class="nutrition-details">
    <li>
      <p>Carbs</p>
      <p class="carb-amount">${carbInput}g</p>
    </li>
    <li>
      <p>Protein</p>
      <p class="protein-amount">${proteinInput}g</p>
    </li>
    <li>
      <p>Fat</p>
      <p class="fat-amount">${fatInput}g</p>
    </li>
  </ul>
</div>`;
  form.reset();
};
// (async () => {
//   const rawResponse = await fetch(
//     "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/",
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ a: 1 }),
//     }
//   );
//   const content = await rawResponse.json();
//   console.log(content);
// })();
