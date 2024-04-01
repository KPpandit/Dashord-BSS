import { Grid } from "@mui/material";
import React, { useState } from "react";
import Chart from "react-apexcharts";


export default function Test() {
  const [state, setState] = useState({
    options: {
      colors: ["#253A7D", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "Active Accounts",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "In-Active Accunts",
        data: [3, 60, 35, 80, 49, 70, 20, 81],
      },
    ],
  });
  return (
    <div className="App">
      <h1>
        React Charts Demo <i class="fas fa-user"></i>{" "}
      </h1>
      <Grid container spacing={2}>
        <Grid item className="col-12" xs={12}>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="800" // Increase the width here
          />
        </Grid>
        <div className="col-4">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="800"
          />
        </div>
        {/* <div className="col-4">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="450"
          />
        </div> */}
        {/* <div className="col-4">
          <Chart
            options={state.options}
            series={state.series}
            type="radar"
            width="450"
          />
        </div>
        <div className="col-4">
          <Chart
            options={state.options}
            series={state.series}
            type="histogram"
            width="450"
          />
        </div> */}
        {/* <div className="col-4">
          <Chart
            options={state.options}
            series={state.series}
            type="scatter"
            width="450"
          />
        </div> */}
        {/* <div className="col-4">
          <Chart
            options={state.options}
            series={state.series}
            type="heatmap"
            width="450"
          />
        </div> */}
      </Grid>
    </div>
  );
}



// bar
// line
// area
// radar
// histogram
// scatter
// heatmap