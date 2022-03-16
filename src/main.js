// IMPORT MODULES
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import Chart from "chart.js/auto";
import { FetchWrapper } from "./fetch-wrapper";

// Queries
const cards = document.querySelector(".cards");
const form = document.querySelector("form");

// Fetch API

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

// Post Data

function postData(foodName, carbs, protein, fat) {
  let body = {
    fields: {
      fat: {
        integerValue: fat,
      },
      protein: {
        integerValue: protein,
      },
      carbs: {
        integerValue: carbs,
      },
      foodName: {
        stringValue: foodName,
      },
    },
  };

  // posting data to firebase API
  API.post("helsinki123", body);
}

// RENDER CARD

const renderCard = () => {
  API.get("helsinki123").then((data) => {
    data.documents.forEach((item) => {
      let foodTotalCalo =
        Number(item.fields.carbs.integerValue) * 4 +
        Number(item.fields.protein.integerValue) * 4 +
        Number(item.fields.fat.integerValue) * 9;
      cards.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card-item">
      <h3 class="card-name">${item.fields.foodName.stringValue}</h3>
      <p><span>${foodTotalCalo}</span> calories</p>
      <ul class="nutrition-details">
        <li>
          <p>Carbs</p>
          <p class="carb-amount">${
            item.fields.carbs.integerValue || item.fields.carb.integerValue
          }g</p>
        </li>
        <li>
          <p>Protein</p>
          <p class="protein-amount">${item.fields.protein.integerValue}g</p>
        </li>
        <li>
          <p>Fat</p>
          <p class="fat-amount">${item.fields.fat.integerValue}g</p>
        </li>
      </ul>
    </div>`
      );
    });
  });

  form.reset();
};

// Show card on page load
renderCard();

// Get total calories of carbs, protein, fat
let logAmount = document.querySelector(".log-amount");
function getCalo() {
  API.get("helsinki123").then((data) => {
    let carbs = data.documents.reduce(function (sum, current) {
      return sum + Number(current.fields.carbs.integerValue);
    }, 0);

    let carbsCalo = carbs * 4;
    let protein = data.documents.reduce(function (sum, current) {
      return sum + Number(current.fields.protein.integerValue);
    }, 0);
    let proteinCalo = protein * 4;
    let fat = data.documents.reduce(function (sum, current) {
      return sum + Number(current.fields.fat.integerValue);
    }, 0);
    let fatCalo = fat * 9;
    let totalCalo = carbs * 4 + protein * 4 + fat * 9;
    console.log(carbsCalo, proteinCalo, fatCalo);
    logAmount.textContent = totalCalo;
    createChart(carbsCalo, proteinCalo, fatCalo);
  });
}
getCalo();

function createChart(carbsCalo, proteinCalo, fatCalo) {
  const nutriChart = document.getElementById("nutriChart").getContext("2d");
  const chart = new Chart(nutriChart, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [carbsCalo, proteinCalo, fatCalo],
          backgroundColor: ["yellow", "green", "orange"],
        },
      ],
    },
    options: {},
  });
}

// Get inputs from form
const getInputs = (e) => {
  // e.preventDefault();
  const nameInput = document.querySelector("#food-names").value;
  const carbInput = Number(document.querySelector("#carbs").value);
  const proteinInput = Number(document.querySelector("#protein").value);
  const fatInput = Number(document.querySelector("#fat").value);

  if (nameInput !== "" && carbInput && proteinInput && fatInput) {
    snackbar.show("Food added successfully");

    postData(nameInput, carbInput, proteinInput, fatInput);
    renderCard();
    getCalo();
    snackbar.show("Food added successfully");
  }
};

// Event Listener
form.addEventListener("submit", getInputs);

// Create chart
