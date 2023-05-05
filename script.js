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
        div.setAttribute("data","")
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
        output.setAttribute("data",newOutputText)
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

function numberEntry(numberOne,key) {
    //makes sure first entry does not equal zero (stops user entering 0123)
    if(numberOne !== "0") {
        numberOne = numberOne + key;
        updateOutput(numberOne,1,false)
        updateOutput(key,0,true)
        return numberOne;
    }
    else {
        return numberOne;
    }
}

//function deleteLast() {
//    output = document.querySelector("#output1")
//    outputData = output.getAttribute("data")
 //   lastEntry = outputData.charAt(outputdata.length - 1)
//    if(lastEntry)
//}

function getOutputData(outputNumber) {
    output = document.querySelector("#output"+outputNumber)
    outputData = output.getAttribute("data")
    return outputData
}

function deleteLast(numberOne) {
    if (numberOne === "") {
        return "";
    }
    numberOne = numberOne.slice(0,-1)
    updateOutput(numberOne,1,false)

    outputZeroData = getOutputData("0")
    newOutputZeroData=outputZeroData.slice(0,-1)
    updateOutput(newOutputZeroData,0,false)

    return numberOne;
}
function evaluate(calculation,numberOne) {
    console.log("working eval")
    calculation.push(numberOne)
    let result = runCalculation(calculation)
    console.log("result"+result)
    updateOutput(result,1,false)
    updateOutput("="+result,0,true)
    //resets calculation list
    calculation = []
    calculation = [result]
    return calculation;

}

function inputListener() {
    const buttons = document.querySelectorAll(".calculatorButtons");
    let calculation = [];
    let numberOne = "";
    let numberRegex = /^\d$/ ;
    let operatorRegex = /^[+\-*/]$/ ;

    const handleNumber = (key) => {
        numberOne = numberEntry(numberOne, key);
    };

    const handleOperator = (key) => {
        const outputOneData = getOutputData("1");

        if (operatorRegex.test(outputOneData)) {
        console.log("Operator already entered");
        return;
        }

        if (numberOne === "") {
        console.log("Please enter a number");
        return;
        }

        relayOutput();
        updateOutput(key, 1, false);
        updateOutput(key, 0, true);

        if (calculation.length !== 1) {
        calculation.push(numberOne);
        }

        calculation.push(key);
        numberOne = "";
    };

    const handleEquals = () => {
        if (calculation.length !== 2) {
        console.log("Please enter an additional operand/operator");
        return;
        }
        console.log("just before eval")
        calculation = evaluate(calculation, numberOne);
    };

    const handleClear = () => {
        numberOne = "";
        calculation = [];
        updateOutput(" ", 1, false);
        relayOutput();
        updateOutput("0", 1, false);
    };

    const handleDelete = () => {
        numberOne = deleteLast(numberOne);
    };

    const handleDecimal = () => {
        if (numberOne.includes(".")) {
        console.log("Number already contains decimal");
        return;
        }

        numberOne += ".";
        updateOutput(numberOne, 1, false);
    };

    buttons.forEach((btn) => {
        switch (btn.id) {
        case "=":
            btn.addEventListener("click", handleEquals); 
            document.addEventListener("keyup", (e) => {
                console.log("equals"+e)
                if(e.key === "Enter") {
                    console.log("working")
                    handleEquals();
                }
            })
            break;

        case "clear":
            btn.addEventListener("click", handleClear);
            document.addEventListener("keyup", (e) => {

                console.log(e)
                if(e.key === "Escape") {
                    handleClear();
                }
            })
            break;

        case "deleteLast":
            btn.addEventListener("click", handleDelete);
            document.addEventListener("keyup", (e) => {
                console.log(e)
                if(e.key === "Backspace") {
                    handleDelete();
                }
            })
            break;

        case ".":
            btn.addEventListener("click", handleDecimal);
            document.addEventListener("keyup", (e) => {
                console.log(e)
                if(e.key === ".") {
                    handleDecimal();
                }
            })
            break;

        default:
            if (numberRegex.test(btn.id)) {
                btn.addEventListener("click", () => handleNumber(btn.id));
            } else if (operatorRegex.test(btn.id)) {
                btn.addEventListener("click", () => handleOperator(btn.id));
            }
            break;
        }
    });
    
    document.addEventListener("keyup", (e) => {
        if(numberRegex.test(e.key)) {
            handleNumber(e.key)
        }
    })
    document.addEventListener("keyup", (e) => {
        if(operatorRegex.test(e.key)) {
            console.log(e.key)
            handleOperator(e.key)
        }
    })

    
}
    /*document.addEventListener('keyup', (event) => {
           const keyCode = event.keyCode;      
        switch (keyCode) {
          case 13: // enter
            handleEquals();
            break;
          case 27: // esc
            handleClear();
            break;
          case 8: // backspace
            handleDelete();
            break;
          default:
            const key = String.fromCharCode(keyCode);
            console.log(key)
            if (numberRegex.test(key)) {
                btn.addEventListener("keyup", () => handleNumber(btn));
            } else if (operatorRegex.test(key)) {
                btn.addEventListener("keyup", () => handleOperator(btn));
            }
            break;

            const button = document.querySelector("#"+key);
            if (button) {
              handleButtonClick(button);
            }
            break;
        }
      });
}
*/





buildCalculator()
inputListener()