// store.js
import React, { createContext, useReducer } from "react";
import axios from "axios";

const store = createContext();
const { Provider } = store;

const initialState = {
  coronaData: [],
  coronaDataLoaded: false,
  nepalData: {},
  questions: [],
  questionsLoaded: false,
  myths: [],
  mythsLoaded: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CORONA_DATA":
      return { ...state, coronaData: action.payload, coronaDataLoaded: true };
    case "LOAD_NEPAL_DATA":
      console.log(action.payload);
      return { ...state, nepalData: action.payload, nepalDataLoaded: true };
    case "LOAD_QUESTIONS":
      return { ...state, questions: action.payload, questionsLoaded: true };
    case "LOAD_MYTHS":
      return { ...state, myths: action.payload, mythsLoaded: true };
    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    coronaData: state.coronaData,
    coronaDataLoaded: state.coronaDataLoaded,
    loadCoronaData: () => {
      axios("https://nepalcorona.info/api/v1/data/world").then((res) => {
        dispatch({ type: "LOAD_CORONA_DATA", payload: [...res.data] });

        res.data.filter(
          (data) =>
            data.country === "Nepal" &&
            dispatch({ type: "LOAD_NEPAL_DATA", payload: data })
        );
      });
    },
    nepalData: state.nepalData,
    questions: state.questions,
    questionsLoaded: state.questionsLoaded,
    loadQuestions: () => {
      axios("https://nepalcorona.info/api/v1/faqs").then((res) =>
        dispatch({ type: "LOAD_QUESTIONS", payload: [...res.data.data] })
      );
    },
    myths: state.myths,
    mythsLoaded: state.mythsLoaded,
    loadMyths: () => {
      axios("https://nepalcorona.info/api/v1/myths").then((res) =>
        dispatch({ type: "LOAD_MYTHS", payload: [...res.data.data] })
      );
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };
