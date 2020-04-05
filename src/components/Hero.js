import React from "react";
import { Segment, Label, Header, Image, Divider } from "semantic-ui-react";
import police from "../assets/police.jpg";

const Hero = () => (
  <Segment>
    <Label color="blue" ribbon size="large">
      Data source: https://nepalcorona.info
    </Label>
    <br />
    <br />
    <Label color="teal" ribbon="right" size="large">
      Presented by Jenesh
    </Label>
    <br />
    <Header as="h2" textAlign="center">
      Stay safe inside your home.
      <Header.Subheader>Only go out in emergency!</Header.Subheader>
    </Header>
    <Divider horizontal className="m-1">
      Or
    </Divider>
    <Image src={police} rounded fluid centered className="m-1" />
  </Segment>
);

export default Hero;
