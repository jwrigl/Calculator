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

function buildCalculator() {
    buildOutputScreen()
    buildNumberGrid()
    buildOperatorGrid()
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

}

function buildOperatorGrid() {
    let container = document.querySelector("#operatorContainer");
    let operators = ["*","+","-","/"];
    for (i=0;i<4;i++) {
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
        div.innerText=`test${i}`
        container.appendChild(div)
    }

}

function inputListener() {
    let buttons = document.querySelectorAll(".calculatorButtons");
    let numberRegex = /^\d$/
    let operatorRegex = /^[+\-*/]$/
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if(numberRegex.test(btn.innerText)) {
                console.log(btn.innerText)
            }

            if(operatorRegex.test(btn.innerText)) {
                console.log(btn.innerText)
            }




        } )
    })

}

buildCalculator()
inputListener()