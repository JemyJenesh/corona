import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "./views/Home";
import Questions from "./views/Questions";
import Nav from "./components/Nav";

const App = () => {
  return (
    <Container
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem"
      }}
    >
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/questions" component={Questions} />
      </Switch>
    </Container>
  );
};

export default App;
