import { useReducer } from 'react'
import './App.css'
import reducer from './reducer/reducer.jsx';
import OperationButton from './components/OperationButton'
import DigitButton from './components/DigitButton'

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete-digit",
  EVALUETE: "evaluate",
}

export function evaluate ({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
    case "%":
      computation = prev%current
      break

  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand==null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{
    currentOperand, previousOperand, operation
  }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">   
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">       
          {formatOperand(currentOperand) || 0}
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationButton operation="%" dispatch={dispatch}/>
        <OperationButton operation="÷" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button className='span-two' onClick={() => dispatch({type: ACTIONS.EVALUETE})}
          >=</button>
      </div>
    </div>
  )
}

export default App
