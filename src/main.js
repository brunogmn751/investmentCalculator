import { generateReturnsArray } from "./investmentGoals";
import { Chart } from "chart.js/auto";
import { createTable } from "./table.js";

// const calculateBtn = document.getElementById("calculate-btn");
const form = document.querySelector("#investment-form");
const resetBtn = document.querySelector("#reset-btn");
const finalMoneyChart = document.querySelector("#final-money-distribution");
const progressionChart = document.querySelector("#progression");

let doughnutChartReference;
let progressionChartReference;

const columnsArray = [
  {columnLabel: "Month", accessor: "month"},
  {columnLabel: "Invested Amount", accessor: "investedAmount", format: (numberInfo) => formatCurrency(numberInfo)},
  {columnLabel: "Monthly Returns", accessor: "interestReturns", format: (numberInfo) => formatCurrency(numberInfo)},
  {columnLabel: "Total Returns", accessor: "totalInterestReturns", format: (numberInfo) => formatCurrency(numberInfo)},
  {columnLabel: "Total Amount", accessor: "totalAmount", format: (numberInfo) => formatCurrency(numberInfo)}
]

function formatCurrency(value) {
  return value.toLocaleString("pt-br", {style:"currency", currency:"BRL"});
}

function resetCharts() {
  if (doughnutChartReference && progressionChartReference){
    doughnutChartReference.destroy();
    progressionChartReference.destroy()
  }
}

function renderProgression() {
  resetCharts();

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
  const taxRate =
    Number(document.querySelector("#tax-rate").value.replace(",", ".")) / 100;
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


  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  // doughnutChartReference = new Chart(finalMoneyChart, {
  //   type: "doughnut",
  //   data: {
  //     labels: ["Invested Amount", "Returns", "Taxes"],
  //     datasets: [
  //       {
  //         data: [
  //           formatCurrency(finalInvestmentObject.investedAmount),
  //           formatCurrency(
  //             finalInvestmentObject.totalInterestReturns * (1 - taxRate),
  //           ),
  //           formatCurrency(
  //             finalInvestmentObject.totalInterestReturns * taxRate,
  //           ),
  //         ],
  //         backgroundColor: [
  //           "rgb(54, 162, 235)",
  //           "rgb(255, 99, 132)",
  //           "rgb(255, 205, 86)",
  //         ],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   },
  // });

  // progressionChartReference = new Chart(progressionChart, {
  //   type: "bar",
  //   data: {
  //     labels: returnsArray.map((investmentObject) => investmentObject.month),
  //     datasets: [
  //       {
  //         label: "Invested Amount",
  //         backgroundColor: "rgb(54, 162, 235)",
  //         data: returnsArray.map((investmentObject) =>
  //           formatCurrency(investmentObject.investedAmount),
  //         ),
  //       },
  //       {
  //         label: "Returns",
  //         backgroundColor: "rgb(255, 99, 132)",
  //         data: returnsArray.map((investmentObject) =>
  //           formatCurrency(investmentObject.intererestReturns),
  //         ),
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     scales: {
  //       x: {
  //         stacked: true,
  //       },
  //       y: {
  //         stacked: true,
  //       },
  //     },
  //   },
  // });

  console.log(returnsArray)
  createTable(columnsArray, returnsArray, "results-table")
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
  resetCharts();
});

// calculateBtn.addEventListener("click", renderProgression);
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (document.querySelector(".error")) {
    return;
  }

  renderProgression();
});
