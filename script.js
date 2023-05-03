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
        return "Over 9000";
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
    container.style.gridTemplateAreas = `
    "top-left top-right"
    "bottom-left bottom-right"
  `;


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
        div.setAttribute("data","none")
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

function updateOutput(outputText,outputNumber,amend) {
    let output;
    if (outputNumber === 0) {
        output = document.querySelector("#output0")
    }
    else if (outputNumber === 1 ) {
        output = document.querySelector("#output1")
    }

    if (amend === true) {
        outputData = output.getAttribute("data")
        let currentOutputText = outputData;
        let newOutputText = currentOutputText + outputText;
        output.setAttribute("data",outputText)
        output.innerText=newOutputText;
    }

    else {
        output.setAttribute("data",outputText)
        output.innerText=outputText;
    }

}

function relayOutput() {
    outputZero = document.querySelector("#output0")

    outputOne = document.querySelector("#output1")
    outputOneData = outputOne.getAttribute("data")

    outputZero.setAttribute("data",outputOneData)
    outputZero.innerText=outputOneData

    
}

function round(result){
    let resultString = result.toString()
    if (resultString.includes(".")) {
        let splitList = resultString.split(".")
        console.log(splitList.length)
        if(splitList[1].length > 5) {
            result = result.toFixed(5)
            return result;
        }
        else {
            return result;
        }
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

function numberEntry(numberOne,btn) {
    //makes sure first entry does not equal zero (stops user entering 0123)
    if(numberOne !== "0") {
        numberOne = numberOne + btn.id;
        updateOutput(numberOne,1,false)
        updateOutput(numberOne,0,true)
        return numberOne;
    }
    else {
        return numberOne;
    }
}


function inputListener() {
    //select all calculator buttons
    let buttons = document.querySelectorAll(".calculatorButtons");
    //list object to send to runCalculation
    let calculation = [];
    //number entered by user
    let numberOne = "";
    //regex to verify number or operator entry
    let numberRegex = /^\d$/ ;
    let operatorRegex = /^[+\-*/]$/ ;
    //for every calculator button
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            //tests if a number
            if(numberRegex.test(btn.id)) {
                numberOne = numberEntry(numberOne,btn)

            }
            if(btn.id === "=") {
                //checks that there is an operand and operator before the last number entry
                if(calculation.length !== 2 ) {
                    console.log("Please enter an additional operand/operator")
                }
                else {
                    calculation.push(numberOne)
                    let result = runCalculation(calculation)
                    console.log("result"+result)
                    updateOutput(result,1,false)
                    //resets calculation list
                    calculation = []
                    calculation = [result]
                }
            }

            if(btn.id ==="clear") {
                numberOne = ""
                calculation = [];
                updateOutput(" ",1,false)
                relayOutput()
                updateOutput("0",1,false)

            }

            if(btn.id === "deleteLast") {
                numberOne = numberOne.slice(0,-1)
                updateOutput(numberOne,1,false)
                

            }

            if(btn.id === ".") {
                if (numberOne.includes(".")) {
                    console.log("Number already contains decimal")
                    return;
                }
                numberOne = numberOne + btn.id;
                updateOutput(numberOne,1,false)
            }

            if(operatorRegex.test(btn.id)) {
                outputOne = document.querySelector("#output1");
                //test if operator already been assigned
                outputOneData = outputOne.getAttribute("data");
                console.log("output data "+outputOneData)
                if (operatorRegex.test(outputOneData)){
                    console.log("Operator already entered")
                    return;
                }
                //checks if no number has been assigned
                else if(numberOne === "") {
                    console.log("Please enter a number");
                }
                else {
                    //write number entry to sum output
                    relayOutput()
                    //change numberEntry to operator
                    updateOutput(btn.id,1,false)
                    //change sum to amend the operator
                    updateOutput(btn.id,0,true)
                    //only push numberOne at the start of a new calculation 
                    if (calculation.length !== 1) {
                        calculation.push(numberOne)
                    }
                    calculation.push(btn.id)
                    numberOne = "";
                }

            }





        } )
    })

}




buildCalculator()
inputListener()