import React, { createContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducers/rootReducer";

const store = createContext();
const { Provider } = store;

const initialState = {
  coronaData: [],
  coronaDataLoaded: false,
  nepalData: {},
  hospitals: [],
  hospitalsLoaded: false,
  questions: [],
  questionsLoaded: false,
  myths: [],
  mythsLoaded: false,
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    dispatch: dispatch,
    coronaData: state.coronaData,
    coronaDataLoaded: state.coronaDataLoaded,
    loadCoronaData: () => {
      axios("https://data.askbhunte.com/api/v1/world").then((res) => {
        dispatch({ type: "LOAD_CORONA_DATA", payload: [...res.data] });

        res.data.filter(
          (data) =>
            data.country === "Nepal" &&
            dispatch({ type: "LOAD_NEPAL_DATA", payload: data })
        );
      });
    },
    nepalData: state.nepalData,
    hospitals: state.hospitals,
    hospitalsLoaded: state.hospitalsLoaded,
    loadHospitals: () => {
      axios("https://corona.askbhunte.com/api/v1/hospitals").then((res) =>
        dispatch({ type: "LOAD_HOSPITALS", payload: [...res.data.data] })
      );
    },
    questions: state.questions,
    questionsLoaded: state.questionsLoaded,
    loadQuestions: () => {
      axios("https://corona.askbhunte.com/api/v1/faqs").then((res) =>
        dispatch({ type: "LOAD_QUESTIONS", payload: [...res.data.data] })
      );
    },
    myths: state.myths,
    mythsLoaded: state.mythsLoaded,
    loadMyths: () => {
      axios("https://corona.askbhunte.com/api/v1/myths").then((res) =>
        dispatch({ type: "LOAD_MYTHS", payload: [...res.data.data] })
      );
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };
