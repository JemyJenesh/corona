import React from "react";
import { Statistic, Header, Grid } from "semantic-ui-react";
import StatItem from "./StatItem";

const GridColumn = ({
  title,
  data: { totalDeaths, activeCases, totalRecovered, totalCases, criticalCases },
}) => {
  return (
    <Grid.Column>
      <Header as="h1" textAlign="center">
        Cases in the {title}:
      </Header>
      <Statistic.Group horizontal>
        <StatItem color="red" label="Deaths" data={totalDeaths} />
        <StatItem color="orange" label="Critical Cases" data={criticalCases} />
        <StatItem color="yellow" label="Active Cases" data={activeCases} />
        <StatItem color="green" label="Recovered" data={totalRecovered} />
        <StatItem color="grey" label="Total Cases" data={totalCases} />
      </Statistic.Group>
    </Grid.Column>
  );
};

export default GridColumn;
