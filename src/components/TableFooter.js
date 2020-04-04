import React, { useContext } from "react";
import { Table } from "semantic-ui-react";
import { store } from "../store/contexts/store";

const TableFooter = () => {
  const { coronaData } = useContext(store);
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>World</Table.HeaderCell>
        <Table.HeaderCell>{coronaData[0].totalCases}</Table.HeaderCell>
        <Table.HeaderCell warning>
          {coronaData[0].newCases === 0 ? "" : "+" + coronaData[0].newCases}
        </Table.HeaderCell>
        <Table.HeaderCell>{coronaData[0].totalDeaths}</Table.HeaderCell>
        <Table.HeaderCell error={coronaData[0].newDeaths > 0}>
          {coronaData[0].newDeaths === 0 ? "" : "+" + coronaData[0].newDeaths}
        </Table.HeaderCell>
        <Table.HeaderCell>{coronaData[0].activeCases}</Table.HeaderCell>
        <Table.HeaderCell positive>
          {coronaData[0].totalRecovered}
        </Table.HeaderCell>
        <Table.HeaderCell error>{coronaData[0].criticalCases}</Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default TableFooter;
