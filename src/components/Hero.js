import React from "react";
import { Segment, Label, Header } from "semantic-ui-react";

const Hero = () => (
  <Segment>
    <Label as="a" color="blue" ribbon size="large">
      Data source: https://nepalcorona.info
    </Label>
    <br />
    <Header as="h2" textAlign="center">
      Stay safe inside your home.
      <Header.Subheader>Only go out in emergency!</Header.Subheader>
    </Header>
    <br />
    <Label as="a" color="teal" ribbon="right" size="large">
      Presented by Jenesh
    </Label>
  </Segment>
);

export default Hero;
