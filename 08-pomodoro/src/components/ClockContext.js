import { createContext, useReducer, useContext, useEffect } from "react";

// Context for passing down clock type settings
const ClockTypesContext = createContext(null);
const ClockTypesDispatchContext = createContext(null);

/**
 * ClockTypeProvider component provides the state and dispatch function for clock types
 * @param {Object} props - The properties of the component
 * @param {React.Node} props.children - The child nodes of the component
 */
export function ClockTypeProvider({ children }) {
  const [ClockSetting, dispatch] = useReducer(
    ClockSettingReducer,
    localStorage.getItem("ClockSetting")
      ? JSON.parse(localStorage.getItem("ClockSetting"))
      : initialClockSetting
  );

  useEffect(() => {
    console.log("ClockSetting", ClockSetting);
    localStorage.setItem("ClockSetting", JSON.stringify(ClockSetting));
  }, [ClockSetting]);

  return (
    <ClockTypesContext.Provider value={ClockSetting}>
      <ClockTypesDispatchContext.Provider value={dispatch}>
        {children}
      </ClockTypesDispatchContext.Provider>
    </ClockTypesContext.Provider>
  );
}

/**
 * Custom hook to get the current clock type context
 * @returns {Object} The current clock settings
 */
export function useClockType() {
  return useContext(ClockTypesContext);
}

/**
 * Custom hook to get the clock type dispatcher
 * @returns {function} The dispatch function
 */
export function useClockTypeDispatch() {
  return useContext(ClockTypesDispatchContext);
}

/**
 * Reducer function for clock settings, handling different state changes
 * @param {Array} state - The current clock settings state
 * @param {Object} action - The action type and payload
 * @returns {Array} The updated clock settings state
 */
function ClockSettingReducer(state, action) {
  switch (action.type) {
    case "Add new type": {
      if (action.name === "" || action.time === "" || action.rule === "") {
        alert("Please fill in all fields!");
        return state;
      }
      if (state.findIndex((item) => item.name === action.name) !== -1) {
        alert("This type already exists!");
        return state;
      }
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          time: action.time,
          active: false,
          rule: action.rule,
        },
      ];
    }

    case "minus ClockType time": {
      return state.map((item) => {
        if (item.id === action.id && item.time > 0) {
          return {
            ...item,
            time: item.time - 1,
          };
        } else if (item.time === 0) {
          alert("Time cannot be less than 1 minute");
        }
        return item;
      });
    }
    case "plus ClockType time": {
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            time: item.time + 1,
          };
        }
        return item;
      });
    }

    case "Edit ClockType name": {
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            name: action.name,
          };
        }
        return item;
      });
    }
    case "toggle ClockType": {
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            active: true,
          };
        } else {
          return {
            ...item,
            active: false,
          };
        }
      });
    }
    case "Delete ClockType":
      return state.filter((item) => item.id !== action.id);

    case "Change ClockType audio":
      return state.map((item) => {
        if (item.audioActive === false && item.id === action.id) {
          return {
            ...item,
            audio: action.audio,
            audioActive: true,
          };
        }
        return {
          ...item,
          audioActive: false,
        };
      });

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

/**
 * Initial state for clock settings
 * @type {Array}
 */
const initialClockSetting = [
  {
    id: 0,
    name: "Focus",
    time: 25,
    active: true,
    rule: "Countdown",
    audio: "birds",
    audioActive: true,
  },
  {
    id: 1,
    name: "Break",
    time: 5,
    active: false,
    rule: "Countdown",
    audio: "birds",
    audioActive: false,
  },
  {
    id: 2,
    name: "Meditate",
    time: 20,
    active: false,
    rule: "Countup",
    audio: "birds",
    audioActive: false,
  },
];
