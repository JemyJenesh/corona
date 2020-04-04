import React from "react";
import { Grid, Segment, Label, Header } from "semantic-ui-react";
import ReactMinimalPieChart from "react-minimal-pie-chart";

const Chart = ({ data }) => {
  return (
    <Grid>
      <Grid.Row centered stretched>
        <Grid.Column width={2}>
          <Header as="h3" textAlign="center">
            Corona Data
          </Header>

          {data.map(({ rong, title, value }) => (
            <Segment>
              <Label color={rong} attached="top">
                {title}
              </Label>
              <Header as="h3" textAlign="center" color={rong}>
                {value}
              </Header>
            </Segment>
          ))}
        </Grid.Column>
        <Grid.Column width={6}>
          <ReactMinimalPieChart
            animate
            animationDuration={500}
            animationEasing="ease-out"
            cx={50}
            cy={50}
            data={data}
            label={({ data, dataIndex }) =>
              Math.round(data[dataIndex].percentage) + "%"
            }
            labelPosition={70}
            labelStyle={{
              fontFamily: "sans-serif",
              fontSize: "5px",
            }}
            lengthAngle={360}
            lineWidth={20}
            paddingAngle={0}
            radius={50}
            rounded={false}
            startAngle={0}
            viewBoxSize={[100, 100]}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Chart;
