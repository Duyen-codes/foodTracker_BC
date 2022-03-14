// IMPORT MODULES
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import Chart from "chart.js/auto";
import { FetchWrapper } from "./fetch-wrapper";

class FoodObject {
  constructor(name, carb, protein, fat) {
    this.name = name;
    this.carb = carb;
    this.protein = protein;
    this.fat = fat;
  }
}

// Queries
const cards = document.querySelector(".cards");
const logAmount = document.querySelector(".log-amount");
const carbAmount = document.querySelector(".carb-amount");
const proteinAmount = document.querySelector(".protein-amount");
const fatAmount = document.querySelector(".fat-amount");
const cardName = document.querySelector(".card-name");
const form = document.querySelector("form");
// Add chart
const ctx = document.querySelector("#myChart").getContext("2d");

// Fetch API

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

// Post Data

function postData({ nameInput, carbInput, proteinInput, fatInput }) {
  let fat;
  let protein;
  let carbs;
  let foodname;
  let body = {
    fields: {
      fat: {
        integerValue: fatInput,
      },
      protein: {
        integerValue: proteinInput,
      },
      carbs: {
        integerValue: carbInput,
      },
      foodName: {
        stringValue: nameInput,
      },
    },
  };

  // posting data to firebase API
  console.log(API.post("duyen", body));

  // Get data back after posting from firebase endpoint
  let json = API.get("duyen");
  API.get(json).then((data) => {
    console.log(data);
  });
}

// Get inputs from form

const getInputs = (e) => {
  e.preventDefault();
  console.log("submit");
  const nameInput = document.querySelector("#food-names").value;
  const carbInput = Number(document.querySelector("#carbs").value);
  const proteinInput = Number(document.querySelector("#protein").value);
  const fatInput = Number(document.querySelector("#fat").value);

  let foodItem = new FoodObject(nameInput, carbInput, proteinInput, fatInput);
  foodItem = { nameInput, carbInput, proteinInput, fatInput };
  logAmount.textContent = carbInput + proteinInput + fatInput + "g";

  renderCard(foodItem);
  postData(foodItem);
  createChart(foodItem);
};

const createChart = ({ carbInput, proteinInput, fatInput }) => {
  console.log("createChart: ", carbInput, proteinInput, fatInput);
  const data = {
    labels: ["carb", "protein", "fat"],
    datasets: [
      {
        label: "Nutrients",
        backgroundColor: ["yellow", "orange", "green"],
        data: [carbInput, proteinInput, fatInput],
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {},
  };

  const myChart = new Chart(ctx, config);
  return myChart;
};

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

// Event Listener
form.addEventListener("submit", getInputs);
