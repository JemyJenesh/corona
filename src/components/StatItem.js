import React from "react";

import { Statistic, Loader } from "semantic-ui-react";

const StatItem = ({ color, label, data }) => {
  return (
    <Statistic color={color}>
      {data !== undefined ? (
        <Statistic.Value>{data}</Statistic.Value>
      ) : (
        <Loader active inline />
      )}

      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  );
};

export default StatItem;
