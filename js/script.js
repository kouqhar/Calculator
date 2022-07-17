const calculator = document.querySelector(`.calculator__keys`)
const keys = calculator.querySelectorAll(`button`)
const displayInputs = document.querySelector(`#display-inputs`)
const inputs = document.querySelector(`#inputs`)
let finalCalcusArr = []
let numberPressed = ""

keys.forEach(key => {
  key.addEventListener("click", e => {
    const keyPressed = e.target.textContent;
    
    if(inputs.textContent === "0") inputs.textContent = ""
    if(Number(keyPressed) >= 0 || keyPressed === ".") {
      if(numberPressed.length < 1 && Number(keyPressed) === 0) {
        inputs.textContent = "0"
        return
      } else{
        if(numberPressed.includes(".") && keyPressed === ".") return;
        else{
          numberPressed += keyPressed
          inputs.insertAdjacentText("beforeend", keyPressed);
        }
      }
    }
    else {
      operations(keyPressed)
    }
  })
})

const operationsFunction = operator => {
  const lastOperator = finalCalcusArr.at(-1)
  inputs.textContent = ""
  const firstDes = numberPressed[0]
  const lastDes = numberPressed.at(-1)
  const des = "."
  let operatorsCount = 0

  if(numberPressed.length > 0) {
    if(firstDes === des && lastDes === des) {
      numberPressed = ""
      return
    }
    else if(firstDes !== des && lastDes === des)
      finalCalcusArr.push(numberPressed + "0")
    else if(lastDes !== des && firstDes === des)
      finalCalcusArr.push("0" + numberPressed)
    else
      finalCalcusArr.push(numberPressed)

    finalCalcusArr.push(operator)
    numberPressed = ""
    displayInputs.textContent = finalCalcusArr.join(" ");
  }
  if(lastOperator !== "undefined" && lastOperator !== operator){
    finalCalcusArr[finalCalcusArr.length - 1] = operator
    displayInputs.textContent = finalCalcusArr.join(" ");
  }
  if(operator === "="){
    finalCalcusArr[finalCalcusArr.length - 1] = null
    displayInputs.textContent = finalCalcusArr.join(" ");
    const res = finalCalcusArr.map(elem => {
      if(Number(elem) >= 0) return elem
      else operatorsCount ++
    })
    
    orderOfOperations("×", "multiply", operatorsCount)
    orderOfOperations("÷", "divide", operatorsCount)
    orderOfOperations("+", "add", operatorsCount)
    orderOfOperations("−", "subtract", operatorsCount)
    let finalResult = finalCalcusArr[0]
    if(finalResult.toString().includes(".")) 
      finalResult = finalResult.toFixed(4)
    inputs.textContent = finalResult
  }
}

const basicCal = (operand1, operator, operand2) => {
    let resultNum = 0
    operand1 = Number(operand1)
    operand2 = Number(operand2)
    switch (operator) {
      case "add":
        resultNum = operand1 + operand2;
        break;
      case "subtract":
        resultNum = operand1 - operand2;
        break;
      case "multiply":
        resultNum = operand1 * operand2;
        break;
      case "divide":
        resultNum = operand1 / operand2;
        break;
      default:
        resultNum = 0;
    }
  return resultNum
}

const orderOfOperations = (symbol, operation, operatorsCount) => {
  for(let i = 1; i <= operatorsCount; i++){
      const findSymbol = finalCalcusArr.indexOf(symbol)
      
      if(findSymbol >= 0){
        const backOne = finalCalcusArr[findSymbol - 1] 
        const nextOne = finalCalcusArr[findSymbol + 1]
        const result = basicCal(backOne, operation, nextOne)
        finalCalcusArr.splice(findSymbol - 1, 3, result)
      }
    }
}

const operations = operator => {
  switch(operator){
    case "AC":
      finalCalcusArr = []
      numberPressed = ""
      displayInputs.innerHTML = ""
      inputs.innerHTML = "0"
      break;
    case "÷":
      operationsFunction("÷")
      break;
    case "×":
      operationsFunction("×")
      break;
    case "−":
      operationsFunction("−")
      break;
    case "+":
      operationsFunction("+")
      break;
    case "=":
      operationsFunction("=")
      break;
    default:
      console.log("Hello World!");
  }
}