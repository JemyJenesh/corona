const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CORONA_DATA":
      return { ...state, coronaData: action.payload, coronaDataLoaded: true };
    case "LOAD_NEPAL_DATA":
      return { ...state, nepalData: action.payload, nepalDataLoaded: true };
    case "LOAD_QUESTIONS":
      return { ...state, questions: action.payload, questionsLoaded: true };
    case "LOAD_MYTHS":
      return { ...state, myths: action.payload, mythsLoaded: true };
    default:
      return state;
  }
};

export default reducer;
