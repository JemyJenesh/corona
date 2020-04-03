import React from "react";

import placeComma from "../functions/placeComma";

import { Statistic, Loader } from "semantic-ui-react";

const StatItem = ({ color, label, data }) => {
  if (data) {
    data = placeComma(data);
  }
  return (
    <Statistic color={color}>
      {data !== undefined ? (
        <Statistic.Value>{data}</Statistic.Value>
      ) : (
        <Loader active inline="centered" />
      )}

      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  );
};

export default StatItem;
