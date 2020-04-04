import React from "react";
import { Table } from "semantic-ui-react";

const TableHeader = () => {
  return (
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
  );
};

export default TableHeader;
