import React from "react";
import { Grid, Image } from "semantic-ui-react";

import cp from "../assets/cp.png";
import cs from "../assets/cs.jpg";

const Banner = () => {
  return (
    <Grid columns="equal" stackable>
      <Grid.Column>
        <Image src={cp} size="medium" rounded />
      </Grid.Column>
      <Grid.Column>
        <Image src={cs} size="medium" rounded />
      </Grid.Column>
    </Grid>
  );
};

export default Banner;
