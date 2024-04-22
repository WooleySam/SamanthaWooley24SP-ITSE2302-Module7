//first adding an event listener to validate the form upon submission
//EVENT LISTENER
document
  .getElementById("shirt_form")
  .addEventListener("submit", purchaseCalculation);

//VARIABLES
var firstName = document.getElementById("first_name");
var lastName = document.getElementById("last_name");
function nameValidation() {
  var firstName = document.getElementById("first_name");
  var lastName = document.getElementById("last_name");
  if (firstName.value === "") {
    alert("Please enter your first name!");
    firstName.focus();
    return false;
  }
  if (lastName.value === "") {
    alert("Please enter your last name!");
    lastName.focus();
    return false;
  }
  if (firstName.value != "" && lastName.value != "") {
    return true;
  }
}

//function that accepts the event of "submit" as an argument
function purchaseCalculation(event) {
  //preventing page from reloading immediately
  event.preventDefault();
  //calling name validation function
  //BOOLEAN
  var namesPresent = nameValidation();
  var itemPresent = itemValidation();
  //trying to add a validating function for at least one of the items checked + radio boxes
  if (namesPresent === true && itemPresent === true) {
    //calling the full receipt print function to print a full receipt + sending the subtotal
    //calling the form tabulation for the subtotal value so I can pass it to the printreceipt function
    var total = formTabulation();
    //figure out some way to validate that the total is a number before passing it to the receipt function
    fullReceipt(total);
  }
}
//validating that an item is acutally checked before calling form tabulation and receipt print
function itemValidation() {
  var tankTop = document.getElementById("tank_top");
  var shortSleeve = document.getElementById("short_sleeve");
  var longSleeve = document.getElementById("long_sleeve");
  var expressShipping = document.getElementById("ExpressShipping");
  var standardShipping = document.getElementById("StandardShipping");
  //IF AND ELSE STATEMENTS
  if (
    tankTop.checked === false &&
    shortSleeve.checked === false &&
    longSleeve.checked === false
  ) {
    alert("Please make an item selection!");
    return false;
  }
  if (expressShipping.checked === false && standardShipping.checked === false) {
    alert("Please choose your shipping type!");
    return false;
  } else {
    return true;
  }
}
function formTabulation() {
  //this function will take values from check boxes and tabulate the totals
  var tankTop = document.getElementById("tank_top");
  var shortSleeve = document.getElementById("short_sleeve");
  var longSleeve = document.getElementById("long_sleeve");
  var expressShipping = document.getElementById("ExpressShipping");
  var standardShipping = document.getElementById("StandardShipping");
  //using checkbox values to get item prices
  if (tankTop.checked === true) {
    var tankPrice = parseInt(tankTop.value);
  }
  if (tankTop.checked === false) {
    var tankPrice = 0.0;
  }
  if (shortSleeve.checked === true) {
    var shortPrice = parseInt(shortSleeve.value);
  }
  if (shortSleeve.checked === false) {
    var shortPrice = 0;
  }
  if (longSleeve.checked === true) {
    var longPrice = parseInt(longSleeve.value);
  }
  if (longSleeve.checked === false) {
    var longPrice = 0;
  }
  if (expressShipping.checked === true) {
    var shipCost = parseInt(expressShipping.value);
  }
  if (standardShipping.checked === true) {
    var shipCost = parseInt(standardShipping.value);
  }
  //ARITHMETIC
  var subTotal = tankPrice + shortPrice + longPrice + shipCost;
  return subTotal;
}

function fullReceipt(total) {
  //CONSTANTS
  const FULLNAME = document.querySelector("#ThanksBox");
  const ORDERDETAILS1 = document.querySelector("#OrderBox1");
  const ORDERDETAILS2 = document.querySelector("#OrderBox2");
  const ORDERDETAILS3 = document.querySelector("#OrderBox3");
  //STRING METHOD
  FULLNAME.innerHTML =
    "Thank you " + firstName.value.concat(" ", lastName.value);
  //changing inner html of blank order details boxes to display items purchased
  if (document.getElementById("tank_top").checked === true) {
    ORDERDETAILS1.innerHTML = "You've ordered 500 tank tops.";
  }
  if (document.getElementById("short_sleeve").checked === true) {
    ORDERDETAILS2.innerHTML = "You've ordered 500 short sleeves.";
  }
  if (document.getElementById("long_sleeve").checked === true) {
    ORDERDETAILS3.innerHTML = "You've ordered 500 long sleeves.";
  }
  // LET - this will not be reassigned
  let fullReceiptPrint = document.querySelector("#fullReceipt");
  fullReceiptPrint.innerHTML = "Your total is: $" + total + ".00";
}
