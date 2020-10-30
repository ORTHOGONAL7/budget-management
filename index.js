//declaring the variable
let addText;
let addDescription;
let addValue;
let incomeTotal = 0;
let expenseTotal = 0;
let budget = 0;
let initialExpense = 0;

//adding event listener by clicking the icon
document.getElementById("add-btn").addEventListener("click", function (e) {
  e.preventDefault();
  inputFields();
  display();
});

//adding event listener by pressing the enter key
document.addEventListener("keypress", function (e) {
  //when the user press enter then only it will display the output
  if (e.keyCode === 13) {
    e.preventDefault();
    inputFields();
    display();
  }
});

//taking the input field
function inputFields() {
  addText = document.getElementById("add-text").value;
  addDescription = document.getElementById("add-description").value;
  addValue = parseFloat(document.getElementById("add-value").value); //string to float
}

function display() {
  //addding regex
  let reg = /^([0-9]){0,10}$/;

  if (addText === "inc" && reg.test(addValue)) {
    //taking the total income
    incomeTotal += addValue;

    //displaying the income in table
    document.getElementById(
      "displayIncome"
    ).innerHTML += `<li class="list-group-item">
         <div class="row">
         <div class="col-sm-6 col-6">
           ${addDescription}
         </div>
         <div class="col-sm-6 col-6" style="text-align: right;color: blue; ">
           +${addValue}
         </div>
       </div>
       </li>`;

    //updating the income in ui
    document.getElementById(
      "total-income"
    ).innerHTML = `<b>+${incomeTotal}</b>`;

    //calling updatebudget to update the ui
    updatebudget();
  } else if (addText === "exp" && reg.test(addValue)) {
    //taking the total Expense
    initialExpense = addValue;
    if (expenseTotal + initialExpense <= incomeTotal) {
      expenseTotal += addValue;
      //displaying the expense in table
      document.getElementById(
        "displayExpense"
      ).innerHTML += `<li class="list-group-item">
        <div class="row">
         <div class="col-sm-6 col-6">
         ${addDescription}
         </div>
         <div class="col-sm-6 col-6" style="text-align: right; color:crimson;">
         -${addValue}
         </div>
         </li>`;
    } else {
      document.getElementById(
        "alert"
      ).innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                       <strong>YOU HAVE NO SUFFICIENT BALANCE
                                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                        </div>`;
    }

    //updating the expense in ui
    document.getElementById(
      "total-expense"
    ).innerHTML = `<b>-${expenseTotal}</b>`;

    //calling updatebudget to update the ui
    updatebudget();
  } else {
    document.getElementById(
      "get"
    ).innerHTML = `<sm style="color : red;font-size : 10px;" >ENTER THE VALID  AMOUNT!!</sm>`;
  }

  //clearing the input fields
  document.getElementById("form").reset();
}

//function for updating the budget controller
function updatebudget() {
  let t = expenseTotal;

  if (incomeTotal - expenseTotal >= 0) {
    budget = incomeTotal - expenseTotal;
    document.getElementById(
      "total-expense"
    ).innerHTML = `<b>-${expenseTotal}</b>`;
    document.getElementById("budget").innerHTML = `<h1>+${budget}</h1>`;
  }
}