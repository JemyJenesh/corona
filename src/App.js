import React from "react";
import { Label } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Nav from "./components/Nav";
import Home from "./views/Home";
import Hospitals from "./views/Hospitals";
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
        padding: "0 1rem 1rem 1rem",
      }}
    >
      <Nav />
      <Label as="a" color="blue" ribbon size="large">
        Data source: https://nepalcorona.info/api/v1/data/
      </Label>
      <br />
      <Label as="a" color="teal" ribbon="right" size="large">
        Presented by Jenesh
      </Label>
      <br />
      <StateProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/myths" component={Myths} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </StateProvider>
    </Container>
  );
};

export default App;
