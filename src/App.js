import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Nav from "./components/Nav";
import Home from "./views/Home";
import Myths from "./views/Myths";
import Questions from "./views/Questions";

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
        <Route path="/myths" component={Myths} />
        <Route path="/questions" component={Questions} />
      </Switch>
    </Container>
  );
};

export default App;
