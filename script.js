function add(numberOne, numberTwo) {
    return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
}

function multiply(numberOne, numberTwo) {
    return numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
    if (numberTwo === 0) {
        console.log("Error 404, Chuck Norris not found.");
    }
    else {
        return numberOne / numberTwo;
    }
}  

function clear() {
    outputs = document.querySelector(".outputText")
    outputs.forEach(output => {
        output.style.innerText=""
    })
}

function buildCalculator() {
    buildOutputScreen()
    buildNumberGrid()
    buildOperatorGrid()
    buildMiscButtons()
}

function buildNumberGrid() {
    let container = document.querySelector("#numberContainer");
    for (i=9;i>=0;i--) {
        let btn = document.createElement("button");
        btn.setAttribute("id",i);
        btn.setAttribute("class","numberButtons");
        btn.classList.add("calculatorButtons")
        btn.innerText=i
        container.appendChild(btn)
    }
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(3, 3rem)";
    container.style.gridTemplateRows = "repeat(4, 3rem)";

}

function buildOperatorGrid() {
    let container = document.querySelector("#operatorContainer");
    let operators = ["*","+","-","/",".","="];
    for (i=0;i<operators.length;i++) {
        let btn = document.createElement("button");
        btn.setAttribute("id",operators[i]);
        btn.setAttribute("class","operatorButtons");
        btn.classList.add("calculatorButtons")
        btn.innerText=operators[i];
        container.appendChild(btn)
    }
    container.style.display = "grid";
    container.style.gridTemplateColumns=`repeat(1, 3rem)`;

}

function buildOutputScreen() {
    let container = document.querySelector("#outputContainer");
    for (i=0;i<2;i++) {
        let div = document.createElement("div");
        div.setAttribute("id",`output${i}`);
        div.setAttribute("class","outputText");
        div.innerText=`test${i}`;
        container.appendChild(div)
    }

}

function buildMiscButtons() {
    let container = document.querySelector("#miscContainer");
    buildClearButton(container)
    buildDeleteLastButton(container)
    
}

function buildDeleteLastButton(container) {
    let btn = document.createElement("button")
    btn.setAttribute("id","deleteLast");
    btn.setAttribute("class","miscButtons");
    btn.classList.add("calculatorButtons")
    btn.innerText="Backspace"
    container.appendChild(btn)
}

function buildClearButton (container) {
    let btn = document.createElement("button")
    btn.setAttribute("id","clear");
    btn.setAttribute("class","miscButtons");
    btn.classList.add("calculatorButtons")
    btn.innerText="CE";
    container.appendChild(btn)
}

function updateOutput(outputText) {
    console.log("run")
    outputOne = document.querySelector("#output1")
    outputOne.setAttribute("data","outputText")
    outputOne.innerText=outputText
}

function relayOutput() {
    outputZero = document.querySelector("#output0")
    outputOne = document.querySelector("#output1")
    outputZero.innerText=outputOne.innerText;
}

function round(result){
    resultString = result.toString()
    if(resultString.length > 5) {
        result = result.toFixed(5)
        return result
    }
    else {
        return result;
    }
    
}
function runCalculation (calculation) {
    calculation[0] = parseFloat(calculation[0]);
    calculation[2] = parseFloat(calculation[2]);
    console.log(calculation);
    let result = 0;
    switch (calculation[1]) {
        case "+":
            result = add(calculation[0],calculation[2]);
            result = round(result);
            return result;
        case "-":
            result = subtract(calculation[0],calculation[2]);
            result = round(result);
            return result;
        case "*":
            result = multiply(calculation[0],calculation[2]);
            result = round(result);
            return result;
        case "/":
            result = divide(calculation[0],calculation[2]);
            result = round(result);
            return result;
        default:
          console.log("Invalid operator");
      }
}

function inputListener() {
    let buttons = document.querySelectorAll(".calculatorButtons");
    let calculation = [];
    let numberOne = "";
    let numberRegex = /^\d$/ ;
    let operatorRegex = /^[+\-*/]$/ ;
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if(numberRegex.test(btn.id)) {
                console.log(btn.id);
                if(numberOne !== "0") {
                    numberOne = numberOne + btn.id;
                    updateOutput(numberOne)
                }
            }

            if(btn.id === "=") {
                console.log("=");
                console.log(calculation.length)
                if(calculation.length !== 2 ) {
                    console.log("Please enter an additional operand/operator")
                }
                else {
                    calculation.push(numberOne)
                    let result = runCalculation(calculation)
                    console.log("result"+result)
                    updateOutput(result)
                    //resets calculation list
                    calculation = []
                    calculation = [result]
                }
            }

            if(btn.id ==="clear") {
                numberOne = ""
                calculation = [];
                updateOutput(" ")
                relayOutput()
                updateOutput("0")

            }

            if(btn.id === "deleteLast") {
                numberOne = numberOne.slice(0,-1)
                updateOutput(numberOne)
                

            }

            if(btn.id === ".") {
                if (numberOne.includes(".")) {
                    console.log("Number already contains decimal")
                    return;
                }
                numberOne = numberOne + btn.id;
                updateOutput(numberOne)
            }

            if(operatorRegex.test(btn.id)) {
                outputOne = document.querySelector("#output1");
                //test if operator already been assigned
                if (operatorRegex.test(outputOne.data)){
                    return;
                }
                //checks if no number has been assigned
                else if(numberOne === "") {
                    console.log("Please enter a number");
                }
                else {
                    relayOutput()
                    updateOutput(btn.id)
                    //only push numberOne at the start of a new calculation 
                    if (calculation.length !== 1) {
                        calculation.push(numberOne)
                    }
                    calculation.push(btn.id)
                    numberOne = "";
                }
                console.log(btn.id);

            }





        } )
    })

}



buildCalculator()
inputListener()