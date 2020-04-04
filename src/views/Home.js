import React, { useState, useEffect, useContext } from "react";
import {
  Statistic,
  Input,
  Header,
  Grid,
  Loader,
  Segment,
} from "semantic-ui-react";

import StatItem from "../components/StatItem";
import { store } from "../store/contexts/store";
import DataTable from "../components/DataTable";

const Home = () => {
  const {
    loadCoronaData,
    coronaData,
    coronaDataLoaded,
    nepalData,
  } = useContext(store);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCoronaData();
  }, []);

  return (
    <>
      <Grid columns="equal" divided stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              Cases in Nepal
            </Header>
            <Statistic.Group horizontal>
              <StatItem
                color="red"
                label="Deaths"
                data={nepalData.totalDeaths}
              />
              <StatItem
                color="yellow"
                label="Active Cases"
                data={nepalData.activeCases}
              />
              <StatItem
                color="green"
                label="Recovered"
                data={nepalData.totalRecovered}
              />
              <StatItem
                color="grey"
                label="Total Cases"
                data={nepalData.totalCases}
              />
            </Statistic.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              Cases in the World:
            </Header>
            <Statistic.Group horizontal>
              <StatItem
                color="red"
                label="Deaths"
                data={coronaDataLoaded ? coronaData[0].totalDeaths : undefined}
              />
              <StatItem
                color="yellow"
                label="Active Cases"
                data={coronaDataLoaded ? coronaData[0].activeCases : undefined}
              />
              <StatItem
                color="green"
                label="Recovered"
                data={
                  coronaDataLoaded ? coronaData[0].totalRecovered : undefined
                }
              />
              <StatItem
                color="grey"
                label="Total Cases"
                data={coronaDataLoaded ? coronaData[0].totalCases : undefined}
              />
            </Statistic.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Segment style={{ display: "flex" }} vertical>
        <Input
          icon="search"
          placeholder="Search..."
          style={{ marginLeft: "auto", display: "inline-block" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Segment>

      {coronaDataLoaded ? (
        <DataTable search={search} />
      ) : (
        <Loader active inline="centered" />
      )}
    </>
  );
};

export default Home;
