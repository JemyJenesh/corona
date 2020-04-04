import React from "react";
import { Table } from "semantic-ui-react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const DataTable = ({ search }) => {
  return (
    <Table celled>
      <TableHeader />
      <TableBody search={search} />
      <TableFooter />
    </Table>
  );
};

export default DataTable;
