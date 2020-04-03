import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Statistic,
  Input,
  Header,
  Table,
  Grid,
  Loader,
  Segment
} from "semantic-ui-react";

import StatItem from "../components/StatItem";

const Home = () => {
  const [search, setSearch] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState({});
  const [globalData, setGlobalData] = useState([]);

  const getGeoInfo = () => {
    axios.get("https://ipapi.co/json/").then(response => {
      let data = response.data;
      setCountryName(data.country_name);
    });
  };

  useEffect(() => {
    if (countryName === "") getGeoInfo();

    if (globalData.length === 0) {
      axios("https://nepalcorona.info/api/v1/data/world").then(res => {
        setGlobalData(res.data);
      });
    } else if (globalData.length > 0 && countryName !== "") {
      globalData.filter(data =>
        data.country !== "" && data.country === countryName
          ? setCountryData(data)
          : null
      );
    }
  }, [globalData, countryName, countryData]);

  return (
    <>
      <Grid columns="equal" divided stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" textAlign="center">
              Cases in{" "}
              {countryName === "" ? <Loader active inline /> : countryName}:
            </Header>
            <Statistic.Group horizontal>
              <StatItem
                color="red"
                label="Deaths"
                data={countryData.totalDeaths}
              />
              <StatItem
                color="yellow"
                label="Active Cases"
                data={countryData.activeCases}
              />
              <StatItem
                color="green"
                label="Recovered"
                data={countryData.totalRecovered}
              />
              <StatItem
                color="grey"
                label="Total Cases"
                data={countryData.totalCases}
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
                data={
                  globalData.length > 0 ? globalData[0].totalDeaths : undefined
                }
              />
              <StatItem
                color="yellow"
                label="Active Cases"
                data={
                  globalData.length > 0 ? globalData[0].activeCases : undefined
                }
              />
              <StatItem
                color="green"
                label="Recovered"
                data={
                  globalData.length > 0
                    ? globalData[0].totalRecovered
                    : undefined
                }
              />
              <StatItem
                color="grey"
                label="Total Cases"
                data={
                  globalData.length > 0 ? globalData[0].totalCases : undefined
                }
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
          onChange={e => setSearch(e.target.value)}
        />
      </Segment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Total Cases</Table.HeaderCell>
            <Table.HeaderCell>New Cases</Table.HeaderCell>
            <Table.HeaderCell>Total Deaths</Table.HeaderCell>
            <Table.HeaderCell>New Deaths</Table.HeaderCell>
            <Table.HeaderCell>Active Cases</Table.HeaderCell>
            <Table.HeaderCell>Recovered</Table.HeaderCell>
            <Table.HeaderCell>Critical Cases</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {globalData
            .filter(
              data =>
                data.country.substring(0, search.length).toLowerCase() ===
                search.toLowerCase()
            )
            .map(data => (
              <Table.Row key={data._id}>
                <Table.Cell>
                  {data.country === "" ? "World" : data.country}
                </Table.Cell>
                <Table.Cell>{data.totalCases}</Table.Cell>
                <Table.Cell warning={data.newCases > 0}>
                  {data.newCases === 0 ? "" : "+" + data.newCases}
                </Table.Cell>
                <Table.Cell>{data.totalDeaths}</Table.Cell>
                <Table.Cell error={data.newDeaths > 0}>
                  {data.newDeaths === 0 ? "" : "+" + data.newDeaths}
                </Table.Cell>
                <Table.Cell>{data.activeCases}</Table.Cell>
                <Table.Cell positive>{data.totalRecovered}</Table.Cell>
                <Table.Cell error>{data.criticalCases}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        {globalData.length > 0 && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>World</Table.HeaderCell>
              <Table.HeaderCell>{globalData[0].totalCases}</Table.HeaderCell>
              <Table.HeaderCell warning>
                {globalData[0].newCases === 0
                  ? ""
                  : "+" + globalData[0].newCases}
              </Table.HeaderCell>
              <Table.HeaderCell>{globalData[0].totalDeaths}</Table.HeaderCell>
              <Table.HeaderCell error={globalData[0].newDeaths > 0}>
                {globalData[0].newDeaths === 0
                  ? ""
                  : "+" + globalData[0].newDeaths}
              </Table.HeaderCell>
              <Table.HeaderCell>{globalData[0].activeCases}</Table.HeaderCell>
              <Table.HeaderCell positive>
                {globalData[0].totalRecovered}
              </Table.HeaderCell>
              <Table.HeaderCell error>
                {globalData[0].criticalCases}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </>
  );
};

export default Home;
