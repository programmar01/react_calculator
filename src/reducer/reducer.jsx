import { evaluate, ACTIONS} from "../App";

export default function reducer (state, {type, payload}) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.digit === "0" &&  state.currentOperand === "0") return state;
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }

            if (payload.digit === "." && state.currentOperand.includes(".")) return state;

            return {
                ...state,
                    currentOperand: `${state.currentOperand || ""}${payload.digit}`
                }

                case ACTIONS.ADD_OPERATION:
                if (state.currentOperand == null && state.previousOperand == null) return state;
                if (state.previousOperand == null) {
                    return {
                        ...state,
                        operation: payload.operation,
                        previousOperand: state.currentOperand,
                        currentOperand: null
                    };
                }

                if (state.currentOperand == null) {
                    return {
                        ...state,
                        operation: payload.operation
                    }
                }
                
                return {
                    ...state,
                    previousOperand: evaluate(state),
                    operation: payload.operation,
                    currentOperand: null
                };

            case ACTIONS.EVALUETE:
                if (
                    state.operation == null ||
                    state.currentOperand == null ||
                    state.previousOperand == null 
                ) return state;

                return {
                   ...state,
                    overwrite: true,
                    previousOperand: null,
                    operation: null,
                    currentOperand: evaluate(state),                   
                };
            case ACTIONS.DELETE_DIGIT:
                if (state.overwrite) {
                    return {
                        ...state,
                        overwrite: false,
                        currentOperand: null
                    }
                }
                if (state.currentOperand == null) return state;
                if (state.currentOperand.length === 1) {
                    return {
                        ...state,
                        currentOperand: null
                    }
                }
                return {
                    ...state,
                    currentOperand: state.currentOperand.slice(0, -1)
                };
            case ACTIONS.CLEAR:
                return {

                };
    }
}