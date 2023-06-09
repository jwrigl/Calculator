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
    let container = document.querySelector("#gridContainer");
    for (let i=9;i>=0;i--) {
        let btn = document.createElement("button");
        btn.setAttribute("id",i);
        btn.setAttribute("class","numberButtons");
        btn.style.backgroundColor = "#301D78";
        btn.style.color = "#D42450"
        btn.style.fontSize = "2rem"
        btn.style.fontWeight ="bold"
        btn.style.borderRadius = "1rem"
        btn.classList.add("calculatorButtons")
        btn.innerText=i
        btn.style.gridArea = `number${i}`
        container.appendChild(btn)
    }

}

function buildOperatorGrid() {
    let container = document.querySelector("#gridContainer");
    let operators = ["*","+","-","/",".","="];
    for (let i=0;i<operators.length;i++) {
        let btn = document.createElement("button");
        btn.setAttribute("id",operators[i]);
        btn.setAttribute("class","operatorButtons");
        btn.classList.add("calculatorButtons")
        btn.innerText=operators[i];
        btn.style.backgroundColor = "#301D78";
        btn.style.color = "#D42450"
        btn.style.borderRadius = "1rem"
        btn.style.fontSize = "2rem"
        btn.style.fontWeight ="bold"
        btn.style.gridArea = `operator${i}`
        container.appendChild(btn)
    }

}

function buildOutputScreen() {
    let container = document.querySelector("#outputContainer");
    for (i=0;i<2;i++) {
        let div = document.createElement("div");
        div.setAttribute("id",`output${i}`);
        div.setAttribute("class","outputText");
        div.setAttribute("data","")
        div.style.display = "flex";
        div.style.justifyContent ="right";
        container.style.backgroundColor = "#00A7B5";
        if (i === 1) {
            div.style.fontSize = "2rem"
            div.innerText="0"
        }
        container.style.display="flex"
        container.style.height  = "4rem"
        container.style.padding = "0.5rem"
        container.style.borderRadius = "0.2rem"
        container.style.marginBottom = "1rem"
        container.appendChild(div)
    }


}

function buildMiscButtons() {
    let container = document.querySelector("#gridContainer");
    buildClearButton(container)
    buildDeleteLastButton(container)
    
}

function buildDeleteLastButton(container) {
    let btn = document.createElement("button")
    btn.setAttribute("id","deleteLast");
    btn.setAttribute("class","miscButtons");
    btn.classList.add("calculatorButtons")
    btn.innerText="Del."
    btn.style.backgroundColor = "#D42450";
    btn.style.color = "#301D78"
    btn.style.fontSize = "2rem"
    btn.style.borderRadius = "1rem"
    btn.style.fontWeight ="bold"
    btn.style.gridArea = "deleteButton"
    container.appendChild(btn)
}

function buildClearButton(container) {
    let btn = document.createElement("button")
    btn.setAttribute("id","clear");
    btn.setAttribute("class","miscButtons");
    btn.classList.add("calculatorButtons")
    btn.innerText="CE";
    btn.style.backgroundColor = "#D42450";
    btn.style.fontSize = "2rem"
    btn.style.fontWeight ="bold"
    btn.style.borderRadius = "1rem"
    btn.style.color = "#301D78"
    btn.style.gridArea = "clearButton"
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
    outputZeroData = getOutputData(0)
    if(outputZeroData.includes("=")) {
        return ;
    }
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

    if (outputZeroData)

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

        function hasNonAlphanumericCharacters(str) {
            return /[^a-zA-Z0-9\.]/.test(str);
        }

        function hasEquals(str) {
            return /[\=]/.test(str)
        }

        let outputZeroData = getOutputData("0");
        let outputOneData = getOutputData("1");

        if(!hasEquals(outputZeroData)) {
            if (hasNonAlphanumericCharacters(outputZeroData)) {
                console.log(outputZeroData)
                console.log("Operator already entered");
                return;
            }
        }
        else if (numberOne === "") {
            console.log("Please enter a number");
            return;
        }
        else if (outputOneData === "Over 9000") {
            return ;    
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
        updateOutput("", 1, false);
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
        updateOutput(".", 0, true);
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





buildCalculator()
inputListener()