document.querySelector("#reset").addEventListener("click", clear); //clear button
document.querySelector("#del").addEventListener("click", del); //delete button
document.getElementById("equals").addEventListener("click", equals); //equals button
document.getElementById("fullStop").addEventListener("click", period);
let results = document.querySelector(".resultBox"); //the display area
let container = document.querySelector(".gridContainer");
let digits = document.querySelectorAll(".digit"); //array of all numbers
let operator = document.querySelectorAll(".operation"); //array of all operators
let inf = "can't divide by zero";
let fullStop = false;
let firstNum = null;
let secondNum = null;
let currentOp;
let lastPressed;
let clearDisp = false;

//keyboard variables
let digitsLs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let opLs = ["+", "-", "*", "/"];
//results panel
let displayValue = 0;
results.innerText = displayValue;

//add event listener to digit buttons and add to display area

digits.forEach((digit) => {
  digit.addEventListener("click", digitPress);
});

function digitPress(e) {
  lastPressed = "digits";

  if (clearDisp) {
    displayValue = 0;
    clearDisp = false;
  }
  let txtDisp = e.target.textContent;

  if (displayValue === 0) {
    displayValue = txtDisp;
  } else {
    displayValue += txtDisp;
  }
  displayValue = displayValue.slice(0, 11);
  results.innerText = displayValue;
}

//check which variable to store the numbers into

function checkNums() {
  if (lastPressed == "operator") {
    return;
  } else if (lastPressed == "equals") {
    firstNum = displayValue;
  } else {
    if (firstNum == null) {
      firstNum = displayValue;
      clearDisp = true;
      fullStop = false;
    } else if (secondNum == null) {
      secondNum = displayValue;
      clearDisp = true;
      operate(firstNum, secondNum, currentOp);
      firstNum = displayValue;
      secondNum = null;
      fullStop = false;
    }
  }
}

//add event listener to operators and store in variable currentOp
operator.forEach((op) => {
  op.addEventListener("click", doOp);
});

function doOp(e) {
  checkNums();
  currentOp = e.target.textContent;
  if (displayValue == inf) {
    clear((error = true));
  }
  lastPressed = "operator";
}

// the math operators
const add = (num1, num2) => +num1 + +num2;

const multiply = (num1, num2) => +num1 * +num2;

function divide(num1, num2) {
  if (+num2 == 0) {
    results.innerText = displayValue;
  } else {
    +num1 / +num2;
  }
  return inf;
}

const subtract = (num1, num2) => +num1 - +num2;

//Other operator functions
function del() {
  displayValue = displayValue.slice(0, -1);
  console.log(displayValue);
  if (displayValue == "") {
    displayValue = 0;
  }
  results.innerText = displayValue;
}

function clear(e, error = false) {
  if (error == false) {
    results.innerText = 0;
  }
  firstNum = null;
  secondNum = null;
  displayValue = 0;
  fullStop = false;
}

function equals() {
  if (lastPressed == "equals") {
    return;
  } else if (firstNum != null) {
    checkNums();
    operate(firstNum, secondNum, currentOp);
    clearDisp = true;
    lastPressed = "equals";
  }
}

function period() {
  if (fullStop == false) {
    fullStop = true;
    displayValue += ".";
    results.innerText = displayValue;
  }
}

//operate function
function operate(num1, num2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      clear();
      break;
    default:
      console.log("choose an operator");
  }
  displayValue = result;
  results.innerText = displayValue;
}

// using keyboard
// document.addEventListener("keydown", function (e) {
//   if (digitsLs.indexOf(+e.key) != -1*) {
//     digitPress(e, true, e.key);
//   } else if (opLs.indexOf(e.key) != -1) {
//     doOp(e, true, e.key);
//   }
// });

//2nd attempt using keyboard
window.addEventListener("keydown", keyboardPlay);

function keyboardPlay(e) {
  const keyPressed = document.querySelector(`button[data-key="${e.key}"]`);
  console.log(e.key);
}
