const BASE_URL = "https://api.frankfurter.app/latest?from=USD&to=INR";

const supportedCurrencies = [
  "USD", "EUR", "INR", "GBP", "JPY",
  "AUD", "CAD", "CHF", "CNY", "SGD",
  "NZD", "HKD", "SEK", "NOK", "DKK"
];

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode of supportedCurrencies) {

    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // default selections
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateExchangeRate = async () => {
  const amountInput = document.querySelector(".amount input");
  let amtVal = Number(amountInput.value);

  if (isNaN(amtVal) || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const URL = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    console.log("API response:", data); // ✅ now valid

    const rate = data.rates[to];
    const finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
  } catch (err) {
    msg.innerText = "Conversion failed ❌";
    console.error(err);
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

