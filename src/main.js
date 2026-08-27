import { generateReturnsArray } from "./investmentGoals";

// const calculateBtn = document.getElementById("calculate-btn");
const form = document.querySelector("#investment-form");
const resetBtn = document.querySelector("#reset-btn");

function renderProgression() {
  const startingAmount = Number(
    document.querySelector("#initial-investment").value.replace(",", "."),
  );
  const timeAmount = Number(
    document.querySelector("#time-amount").value.replace(",", "."),
  );
  const additionalContribution = Number(
    document.querySelector("#additional-contributions").value.replace(",", "."),
  );
  const returnRate = Number(
    document.querySelector("#return-rate").value.replace(",", "."),
  );
  const taxRate = Number(
    document.querySelector("#tax-rate").value.replace(",", "."),
  );
  const returnRatePeriod = document.querySelector("#evaluation-period").value;
  const timePeriod = document.querySelector("#time-period-select").value;

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timePeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod,
  );

  console.log(returnsArray);
}

function validateInput(event) {
  const inputValue = event.target.value.replace(",", ".");
  const parentElement = event.target.parentElement;
  const grandParentElement = parentElement.parentElement;

  if (inputValue === "") {
    return;
  }

  if (isNaN(inputValue) || Number(inputValue) <= 0) {
    if (parentElement.classList.contains("error")) {
      return;
    }
    const errorSpanElement = document.createElement("span");
    errorSpanElement.classList.add("text-red-600");
    errorSpanElement.textContent = "Insira um valor numérico maior do que 0";
    parentElement.classList.add("error");
    grandParentElement.appendChild(errorSpanElement);
  } else if (parentElement.classList.contains("error")) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("span").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

resetBtn.addEventListener("click", () => {
  const errorInputs = document.querySelectorAll(".error");
  for (const errorDiv of errorInputs) {
    errorDiv.classList.remove("error");
    errorDiv.parentElement.querySelector("span").remove();
  }
});

// calculateBtn.addEventListener("click", renderProgression);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  if (document.querySelector(".error")) {
    return;
  }

  renderProgression();
});
