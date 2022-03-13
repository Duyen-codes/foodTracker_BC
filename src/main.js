// class FetchWrapper {
//   constructor(baseURL) {
//     this.baseURL = baseURL;
//   }

//   get(endpoint) {
//     return fetch(this.baseURL + endpoint).then((response) => response.json());
//   }

//   put(endpoint, body) {
//     return this._send("put", endpoint, body);
//   }

//   post(endpoint, body) {
//     return this._send("post", endpoint, body);
//   }

//   patch(endpoint, body) {
//     return this._send("patch", endpoint, body);
//   }

//   delete(endpoint, body) {
//     return this._send("delete", endpoint, body);
//   }

//   _send(method, endpoint, body) {
//     return fetch(this.baseURL + endpoint, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }).then((response) => response.json());
//   }
// }

// const API = new FetchWrapper(
//   "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
// );

// API.get("duyennguyen123").then((data) => console.log(data));
// API.post("duyennguyen123").then((data) => console.log(data));

// IMPORT MODULES
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import Chart from "chart.js/auto";

// CHARTS

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

class FoodObject {
  constructor(name, carb, protein, fat) {
    this.name = name;
    this.carb = carb;
    this.protein = protein;
    this.fat = fat;
  }
}

const cards = document.querySelector(".cards");
const addBtn = document.querySelector(".add-btn");
const logAmount = document.querySelector(".log-amount");
const carbAmount = document.querySelector(".carb-amount");
const proteinAmount = document.querySelector(".protein-amount");
const fatAmount = document.querySelector(".fat-amount");
const cardName = document.querySelector(".card-name");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#food-names").value;
  const carbInput = Number(document.querySelector("#carbs").value);
  const proteinInput = Number(document.querySelector("#protein").value);
  const fatInput = Number(document.querySelector("#fat").value);

  let foodItem = new FoodObject(nameInput, carbInput, proteinInput, fatInput);
  console.log(foodItem);
  logAmount.textContent = carbInput + proteinInput + fatInput + "g";

  const addCard = (foodItem) => {
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
  };
  addCard();
  form.reset();
});

(async () => {
  const rawResponse = await fetch(
    "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ a: 1 }),
    }
  );
  const content = await rawResponse.json();
  console.log(content);
})();
