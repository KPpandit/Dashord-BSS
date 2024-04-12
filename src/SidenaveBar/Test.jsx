import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Grid } from "@mui/material";
import axios from "axios";

export default function Test() {
  const [chartData, setChartData] = useState({
    options: {
      colors: ["#FAC22E"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Customer Count",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9098/customer/graph",{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
          }
      });
        const data = response.data;

        // Extract dates and counts from the API response
        const categories = Object.keys(data);
        const counts = Object.values(data);

        // Update chartData state with fetched data
        setChartData({
          options: {
            ...chartData.options,
            xaxis: {
              categories: categories,
            },
          },
          series: [
            {
              ...chartData.series[0],
              data: counts,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="App">
      <Grid>
         <i className="fas fa-user"></i>{" "}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="800"
          />
        </Grid>
      </Grid>
    </div>
  );
}
