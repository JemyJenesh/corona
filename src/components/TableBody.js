import React, { useContext } from "react";
import { Table } from "semantic-ui-react";
import { store } from "../store/contexts/store";

const TableBody = ({ search }) => {
  const { coronaData } = useContext(store);
  return (
    <Table.Body>
      {coronaData
        .filter(
          (data) =>
            data.country.substring(0, search.length).toLowerCase() ===
            search.toLowerCase()
        )
        .map(
          (data) =>
            data.country !== "" && (
              <Table.Row key={data._id}>
                <Table.Cell>{data.country}</Table.Cell>
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
            )
        )}
    </Table.Body>
  );
};

export default TableBody;
