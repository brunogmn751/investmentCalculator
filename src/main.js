import {generateReturnsArray} from "./investmentGoals"

const calculateBtn = document.getElementById("calculate-btn");

function renderProgression(){
    const startingAmount = Number(document.querySelector("#initial-investment").value);
    const timeAmount = Number(document.querySelector("#time-amount").value);
    const additionalContribution = Number(document.querySelector("#additional-contributions").value);
    const returnRate = Number(document.querySelector("#return-rate").value);
    const taxRate = Number(document.querySelector("#tax-rate").value);
    const returnRatePeriod = document.querySelector("#evaluation-period"). value;
    const timePeriod = document.querySelector("#time-period-select").value;
    
    const returnsArray = generateReturnsArray(startingAmount, timeAmount, timePeriod,additionalContribution,returnRate,returnRatePeriod);

    console.log(returnsArray)
};

calculateBtn.addEventListener('click', renderProgression);



