import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';

export default function OnBoardCustomerReports() {
    const [chartData1, setChartData1] = useState({
        options: {
            labels: []
        },
        series: [0, 0]
    });

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
    const [pieChartData, setPieChartData] = useState([]);
    const [categoryType, setCategoryType] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9098/customer/graph", {
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
                const response = await axios.get("http://localhost:9098/customer/chart", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                const data = response.data;
    
                // Normalize keys to lowercase
                const normalizedData = {};
                Object.keys(data).forEach(key => {
                    normalizedData[key.toLowerCase()] = data[key];
                });
    
                // Extract counts from the normalized data
                const seriesData = ["prepaid", "postpaid"].map(label => normalizedData[label] || 0);
    
                // Update chartData1 state with fetched data
                setChartData1({
                    options: {
                        labels: ["PrePaid", "PostPaid"]
                    },
                    series: seriesData
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount
     // Empty dependency array ensures useEffect runs only once on component mount
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    console.log("start date value and end date value ", startdate, "------>end date ", enddate)

    const handleDateRange = () => {

        const type = 'pre-paid';

        // Construct the API URL
        const apiUrl = `http://localhost:9098/customer/bydatefilter/${type}?startDate=${startdate}&endDate=${enddate}`;

        // Make the API call
        fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                console.log('API response:', data);
                // setdata(data);
                console.log(data + "----value sech datas")
                // rowchange(data);
                setRows(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    };
    const handleCategory = async (categoryType) => {
        try {
            const response = await axios.get(`http://localhost:9098/customer/graph/Data?startDate=${startdate}&endDate=${enddate}`, {
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
    }

    const options = {

        labels: ["Pre-Paid", "Post-Paid"]
    };
    const series = [2, 4]
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
                            >On Board Customers Report</Typography>
                        </Grid>
                        {/* <Grid item xs={4.5}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="Category"
                                    id="demo-simple-select"
                                     value={categoryType}
                                    label="Category"
                                     onChange={(e)=>setCategoryType(e.target.value)}
                                >
                                    <MenuItem value={"Weeks"}>Weeks</MenuItem>
                                    <MenuItem value={"Months"}>Months</MenuItem>
                                    <MenuItem value={"Years"}>Years</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={1} >
                        <Button sx={{marginTop:1,backgroundColor:'#253A7D'}} onClick={handleCategory} variant="contained">Apply</Button>

                        </Grid> */}
                    </Grid>
                </Paper>
            </Box>
            <Grid lg={4} sx={{ width: '100%' }}>


                <Paper elevation={10} sx={{ marginBottom: 2, paddingBottom: 0.1, paddingTop: 0.5 }}>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={4}>
                            {/* First date field */}
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
                            {/* Second date field */}
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
                            {/* Search button */}
                            <Button
                                variant="contained"

                                // onClick={handleSearch}
                                fullWidth
                                style={{ height: '100%', backgroundColor: '#F6B625', color: 'black' }}
                                onClick={handleCategory}
                            >
                                Apply
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
                {/* <Grid paddingBottom={1}>
                            <Button type='submit' backgroundColor={'blue'} onSubmit={handleSerch} padding={2}> <SearchIcon /> Search</Button>
                            </Grid> */}

            </Grid>
            <Grid container spacing={2} padding={2}>
                <Paper elevation={10} >
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
                        <Grid item xs={12}>
                            <Paper>
                                <Typography>Hello</Typography>
                            </Paper>

                        </Grid>
                       
                        <Grid item xs={6} >
                                 
                            <Chart
                                options={chartData1.options}
                                series={chartData1.series}
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
