import React, { useState, useEffect, useContext } from "react";
import { Input, Grid, Loader, Segment } from "semantic-ui-react";

import { store } from "../store/contexts/store";
import GridColumn from "../components/GridColumn";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import Banner from "../components/Banner";

const Home = () => {
  const {
    loadCoronaData,
    coronaData,
    coronaDataLoaded,
    nepalData,
  } = useContext(store);

  const [search, setSearch] = useState("");

  const data = [
    {
      rong: "red",
      color: "#DB2828",
      title: "Deaths",
      value: coronaDataLoaded ? coronaData[0].totalDeaths : 0,
    },
    {
      rong: "green",
      color: "#21BA45",
      title: "Recovered",
      value: coronaDataLoaded ? coronaData[0].totalRecovered : 0,
    },
    {
      rong: "orange",
      color: "#F2711C",
      title: "Critical",
      value: coronaDataLoaded ? coronaData[0].criticalCases : 0,
    },
    {
      rong: "yellow",
      color: "#FBBD08",
      title: "Active",
      value: coronaDataLoaded
        ? coronaData[0].activeCases - coronaData[0].criticalCases
        : 0,
    },
  ];

  useEffect(() => {
    loadCoronaData();
  }, [loadCoronaData]);

  return (
    <>
      <Banner />
      <Grid columns="equal" divided stackable>
        <Grid.Row>
          <GridColumn title="Nepal" data={nepalData} />
          <GridColumn title="World" data={coronaDataLoaded && coronaData[0]} />
        </Grid.Row>
      </Grid>

      {coronaDataLoaded && <Chart data={data} />}

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
