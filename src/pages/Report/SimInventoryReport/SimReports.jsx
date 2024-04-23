import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function SimReports() {
    const [chartData, setChartData] = useState({
        options: {
            colors: ["#253A7D"],
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

    const [pieChartData, setPieChartData] = useState({
        options: {
            labels: ["M2M", "non-M2M"]
        },
        series: [0, 0]
    });

    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');

    useEffect(() => {
        fetchData();
    }, [startdate, enddate]);

    const fetchData = async () => {
        try {
            const response1 = await axios.get(`http://localhost:9098/sim/getall/sim/bydate`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data1 = response1.data;

            const categories = Object.keys(data1);
            const counts = Object.values(data1);

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

            const response2 = await axios.get(`http://localhost:9098/sim/getall/sim/byType`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data2 = response2.data;

            setPieChartData({
                options: {
                    labels: ["M2M", "non-M2M"]
                },
                series: [data2.M2M || 0, data2['non-M2M'] || 0]
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCategory = async (categoryType) => {
        try {
            const response = await axios.get(`http://localhost:9098/sim/getall/sim/graph/bydateRange?startDate=${startdate}&endDate=${enddate}`, {
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
        try {
            const response2 = await axios.get(`http://localhost:9098/sim/getall/sim/byType/byDateRange?startDate=${startdate}&endDate=${enddate}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data2 = response2.data;

            setPieChartData({
                options: {
                    labels: ["M2M", "non-M2M"]
                },
                series: [data2.M2M || 0, data2['non-M2M'] || 0]
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className="App">
            <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: -3, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    paddingTop: '8px'
                                }}
                            >SIM Activation Report</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Grid lg={4} sx={{ width: '100%' }}>
                <Paper elevation={10} sx={{ marginBottom: 2, paddingBottom: 0.1, paddingTop: 0.5 }}>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={4}>
                            <TextField
                                label="Start Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startdate}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="End Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={enddate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                style={{ height: '100%', backgroundColor: '#F6B625', color: 'black' }}
                                onClick={handleCategory}
                            >
                                Apply
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container spacing={2} padding={2}>
                <Paper elevation={10}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Chart
                                options={chartData.options}
                                series={chartData.series}
                                type="bar"
                                width="1400"
                                height={"400"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Chart
                                options={pieChartData.options}
                                series={pieChartData.series}
                                type="donut"
                                width={"100%"}
                                height={300}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
