import React, { useState, useEffect, useContext } from "react";
import { Input, Grid, Loader, Segment } from "semantic-ui-react";

import { store } from "../store/contexts/store";
import DataTable from "../components/DataTable";
import GridColumn from "../components/GridColumn";

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
          <GridColumn title="Nepal" data={nepalData} />
          <GridColumn title="World" data={coronaDataLoaded && coronaData[0]} />
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
