import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Nav from "./components/Nav";
import Home from "./views/Home";
import Myths from "./views/Myths";
import Questions from "./views/Questions";
import { StateProvider } from "./store/contexts/store";

const App = () => {
  return (
    <Container
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem 1rem 1rem"
      }}
    >
      <Nav />
      <StateProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/myths" component={Myths} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </StateProvider>
    </Container>
  );
};

export default App;
