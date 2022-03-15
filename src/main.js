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
  API.post("duyen", body);

  // Get data back after posting from firebase endpoint
  let json = API.get("duyen");
}

// Object constructor

class FoodObject {
  constructor(name, carb, protein, fat) {
    this.name = name;
    this.carb = carb;
    this.protein = protein;
    this.fat = fat;
  }
}

// Get inputs from form

const getInputs = (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#food-names").value;
  const carbInput = Number(document.querySelector("#carbs").value);
  const proteinInput = Number(document.querySelector("#protein").value);
  const fatInput = Number(document.querySelector("#fat").value);
  console.log("fatInput", fatInput);

  let foodItem = new FoodObject(nameInput, carbInput, proteinInput, fatInput);
  foodItem = { nameInput, carbInput, proteinInput, fatInput };

  if (nameInput !== "" && carbInput && proteinInput && fatInput) {
    snackbar.show("Food added successfully");
    renderCard();
    postData(foodItem);
    API.get("duyen").then((data) => console.log(data)); // data is an object
  }
};

// RENDER CARD

const renderCard = async () => {
  const response = await API.get("duyen").then((data) => {
    data.documents.forEach((item) => {
      cards.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card-item">
      <h3 class="card-name">${item.fields.foodName.stringValue}</h3>
      <p><span>${item.fields.foodName.stringValue}</span> calories</p>
      <ul class="nutrition-details">
        <li>
          <p>Carbs</p>
          <p class="carb-amount">${item.fields.carbs.integerValue}g</p>
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

// Event Listener
form.addEventListener("submit", getInputs);
