import { useReducer } from "react";

function prepareInitData(defaultValue) {
    const values = Array.isArray(defaultValue) ? defaultValue : [true, false];
    const valueIndex = values.findIndex((item) => item === defaultValue);
    const currentIndex = valueIndex !== -1 ? valueIndex : 0;
    const value = values[currentIndex];
    return { values, currentIndex, value };
}

function reducer(state, action) {
    let currentIndex;
    switch (action.type) {
        case "nextValue":
            currentIndex =
                state.currentIndex < state.values.length - 1
                    ? state.currentIndex + 1
                    : 0;
            return {
                ...state,
                currentIndex,
                value: state.values[currentIndex],
            };
        case "setValue":
            const findIndex = state.values.findIndex(
                (item) => item === action.payload
            );
            currentIndex = findIndex !== -1 ? findIndex : 0;
            return {
                ...state,
                currentIndex,
                value: state.values[currentIndex],
            };
    }
    throw Error("Unknown action.");
}

export default function useToggle(defaultValue) {
    const [state, dispatch] = useReducer(
        reducer,
        prepareInitData(defaultValue)
    );

    function toggleValue(v) {
        if (v !== undefined) {
            dispatch({ type: "setValue", payload: v });
        } else {
            dispatch({ type: "nextValue" });
        }
    }
    return [state.value, toggleValue];
}
