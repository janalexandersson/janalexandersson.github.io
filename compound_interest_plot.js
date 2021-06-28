(function() {
  "use strict";

  function clearContents(tag) {
    while (tag.firstChild) {
      tag.removeChild(tag.firstChild);
    }
  }


  function addValueToRow(rowTag, value) {
    var newValue = document.createElement("td");
    newValue.appendChild(document.createTextNode(value));
    rowTag.appendChild(newValue);
  }


  function formatMoney(value) {
    return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  function main() {
    var rowcount = 20;
    var initialInvestment = 1000;
    var monthlyContribution = 500;
    var annualInterestRate = 7 / 100.0;
    var interestFactor = 1 + annualInterestRate / 12.0;
    var balance = [];
    var x = [];
    var totalDeposit = [];
    var monthCount = 0;
    var yearInterest = [];
    var perviousYearInterest = 0;
    for (var row = 1; row <= rowcount; row += 1) {
      x[row - 1] = row;
      monthCount = 12 * row;
      totalDeposit[row - 1] = initialInvestment + 12.0 * monthlyContribution * row;
      balance[row - 1] = initialInvestment * Math.pow(interestFactor, monthCount + 1) + monthlyContribution * (
        (Math.pow(interestFactor, monthCount + 1) - 1) /
        (interestFactor - 1) - 1);
      yearInterest[row - 1] = balance[row - 1] - totalDeposit[row - 1];
      console.log(yearInterest);
    }
  
    var trace1 = {
      x: x,
      y: totalDeposit,
      name: 'Total Deposit',
      type: 'bar'
    };
  
    var balanceMinusDeposit = balance.map(function(item, index) {
      return item - totalDeposit[index];
    })
  
    var trace2 = {
      x: x,
      y: yearInterest,
      name: 'Total Interest',
      type: 'bar'
    };
  
  
    var data = [trace1, trace2];
    console.log(data);
  
    var layout = {
      title: 'Balance',
      barmode: 'stack',
      showlegend: true,
      displayModeBar: false
    };
    Plotly.newPlot('invest', data, layout, {
      displayModeBar: false
    });

//    for (var i = 0; i < inputBoxes.length; i += 1) {
//      inputBoxes[i].oninput = updateTable;
//    }
  }

  window.addEventListener("load", main, false);

})();