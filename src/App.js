import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Home from "./views/Home";
import Hospitals from "./views/Hospitals";
import Myths from "./views/Myths";
import Questions from "./views/Questions";

import { StateProvider } from "./store/contexts/store";
import Hero from "./components/Hero";
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
      <Hero />
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
