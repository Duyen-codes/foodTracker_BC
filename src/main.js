// IMPORT MODULES
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import Chart from "chart.js/auto";
import { FetchWrapper } from "./fetch-wrapper";

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

function postData(name, carb, protein, fat) {
  let body = {
    fields: {
      fat: {
        integerValue: fat,
      },
      protein: {
        integerValue: protein,
      },
      carb: {
        integerValue: carb,
      },
      foodName: {
        stringValue: name,
      },
    },
  };

  // posting data to firebase API
  API.post("duyen", body);
}

// RENDER CARD

const renderCard = () => {
  API.get("duyen").then((data) => {
    data.documents.forEach((item) => {
      cards.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card-item">
      <h3 class="card-name">${item.fields.name.stringValue}</h3>
      <p><span>${item.fields.name.stringValue}</span> calories</p>
      <ul class="nutrition-details">
        <li>
          <p>Carbs</p>
          <p class="carb-amount">${item.fields.carb.integerValue}g</p>
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

// Get inputs from form

const getInputs = (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#food-names").value;
  const carbInput = Number(document.querySelector("#carbs").value);
  const proteinInput = Number(document.querySelector("#protein").value);
  const fatInput = Number(document.querySelector("#fat").value);

  if (nameInput !== "" && carbInput && proteinInput && fatInput) {
    snackbar.show("Food added successfully");

    postData(nameInput, carbInput, proteinInput, fatInput);
    renderCard();
  }
};

// Event Listener
form.addEventListener("submit", getInputs);
