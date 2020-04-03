import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Statistic,
  Input,
  Header,
  Label,
  Table,
  Container,
  Grid,
  Loader,
  Segment
} from "semantic-ui-react";
import StatItem from "./components/StatItem";

const App = () => {
  const [search, setSearch] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState({});
  const [globalData, setGlobalData] = useState([]);

  const cases = {
    Deaths: "totalDeaths",
    Active: "activeCases",
    Recovered: "totalRecovered",
    Total: "totalCases",
    Critical: "criticalCases"
  };

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
    <Container
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem"
      }}
    >
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

      {/* <Table unstackable basic="very" celled collapsing textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {countryData === null ? (
                <Loader active inline />
              ) : (
                countryData.country
              )}
            </Table.HeaderCell>
            <Table.HeaderCell>Cases</Table.HeaderCell>
            <Table.HeaderCell>World</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(cases).map((key, value) => (
            <Table.Row key={key}>
              <Table.Cell
                error={
                  key === "Deaths" &&
                  countryData !== null &&
                  countryData[cases[key]] > 0
                }
                warning={
                  key === "Critical" &&
                  countryData !== null &&
                  countryData[cases[key]] > 0
                }
                positive={
                  key === "Recovered" &&
                  countryData !== null &&
                  countryData[cases[key]] > 0
                }
              >
                {countryData !== null ? (
                  countryData[cases[key]]
                ) : (
                  <Loader active inline />
                )}
              </Table.Cell>
              <Table.Cell width="4">
                <b>{key}</b>
              </Table.Cell>
              <Table.Cell
                error={key === "Deaths"}
                warning={key === "Critical"}
                positive={key === "Recovered"}
              >
                {globalData.length > 0 ? (
                  globalData[0][cases[key]]
                ) : (
                  <Loader active inline />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table> */}
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
      <br />
      {/* {infectionData.latest_sit_report && (
        <>
          <Label color="teal">
            Updated At
            <Label.Detail>
              {new Date(
                infectionData.latest_sit_report.updated_at
              ).toLocaleTimeString()}
              <span style={{ display: "inline-block", width: ".75rem" }} />
              {new Date(
                infectionData.latest_sit_report.updated_at
              ).toLocaleDateString()}
            </Label.Detail>
          </Label>
          <br />
          <Label color="brown">
            Reported Date
            <Label.Detail>{infectionData.latest_sit_report.date}</Label.Detail>
          </Label>
        </>
      )} */}
    </Container>
  );
};

export default App;
