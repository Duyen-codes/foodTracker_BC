class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint, body) {
    return this._send("put", endpoint, body);
  }

  post(endpoint, body) {
    return this._send("post", endpoint, body);
  }

  patch(endpoint, body) {
    return this._send("patch", endpoint, body);
  }

  delete(endpoint, body) {
    return this._send("delete", endpoint, body);
  }

  _send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

API.get("duyennguyen123").then((data) => console.log(data));

class FoodObject {
  constructor(name, carb, protein, fat) {
    this.name = name;
    this.carb = carb;
    this.protein = protein;
    this.fat = fat;
  }
}

const nameInput = document.querySelector("#food-names").value;
const carbInput = Number(document.querySelector("#carbs").value);
const proteinInput = Number(document.querySelector("#protein").value);
const fatInput = Number(document.querySelector("#fat").value);
const addBtn = document.querySelector(".add-btn");
const logAmount = document.querySelector(".log-amount");
const carbAmount = document.querySelector(".carb-amount");
const proteinAmount = document.querySelector(".protein-amount");
const fatAmount = document.querySelector(".fat-amount");
const cardName = document.querySelector(".card-name");

function getInputs() {
  let foodItem = new FoodObject(nameInput, carbInput, proteinInput, fatInput);
  console.log(foodItem);
  logAmount.textContent = carbInput + proteinInput + fatInput + "g";
  carbAmount.textContent = carbInput + "g";
  proteinAmount.textContent = proteinInput + "g";
  fatAmount.textContent = fatInput + "g";
  cardName.textContent = nameInput;
}

addBtn.addEventListener("click", getInputs);
