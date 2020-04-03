import React, { useState, useEffect } from "react";
import axios from "axios";

import { Statistic, Header, Label, Table, Container } from "semantic-ui-react";
import StatItem from "./components/StatItem";

const App = () => {
  const [infectionData, setInfectionData] = useState({});
  const [globalData, setGlobalData] = useState([]);

  useEffect(() => {
    globalData.length === 0 &&
      axios("https://nepalcorona.info/api/v1/data/world").then(res => {
        setGlobalData(res.data);
      });
    globalData.filter(data =>
      data.country === "Nepal" ? setInfectionData(data) : null
    );
  }, [globalData]);

  return (
    <Container
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1rem"
      }}
    >
      <Header as="h1">Covid-19 cases in Nepal:</Header>
      <Statistic.Group horizontal>
        <StatItem color="red" label="Deaths" data={infectionData.totalDeaths} />
        <StatItem
          color="yellow"
          label="Active Cases"
          data={infectionData.activeCases}
        />
        <StatItem
          color="green"
          label="Recovered"
          data={infectionData.totalRecovered}
        />
        <StatItem
          color="grey"
          label="Total Cases"
          data={infectionData.totalCases}
        />
      </Statistic.Group>

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
          {globalData.map(data => (
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
      {infectionData.latest_sit_report && (
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
      )}
    </Container>
  );
};

export default App;
