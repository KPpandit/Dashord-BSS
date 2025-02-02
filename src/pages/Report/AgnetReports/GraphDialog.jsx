import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Button, TextField, CircularProgress } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import dayjs from "dayjs";
import axios from "axios";

const GraphDialog = ({ graphDialogOpen, setGraphDialogOpen, tokenValue }) => {
    const [graphData, setGraphData] = useState([]);
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState("monthly");

    const getColor = (index) => {
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a832a8', '#32a89e', '#a83242'];
        return colors[index % colors.length];
    };

    const handleGraphButtonClick = async () => {
        if (startDate.isAfter(endDate)) {
            alert("Start date cannot be later than End date.");
            return;
        }

        if (endDate.isAfter(dayjs())) {
            alert("End date cannot be in the future.");
            return;
        }

        setLoading(true);
        try {
            // Format dates to YYYY-DD-MM for API call
            const formattedStartDate = startDate.format('YYYY-MM-DD');
            const formattedEndDate = endDate.format('YYYY-MM-DD');

            const response = await axios.get(
                `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/reports/txns/outward/${formattedStartDate}/${formattedEndDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const transformedData = transformGraphData(response.data);
            setGraphData(transformedData);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            setLoading(false);
        }
    };

    const transformGraphData = (data) => {
        const amountMap = {};
        const partnerIds = new Set();
    
        // Loop through each partner's data
        Object.entries(data).forEach(([partnerMsisdn, amounts]) => {
            partnerIds.add(partnerMsisdn); // Store all partner IDs
            Object.entries(amounts).forEach(([amount, records]) => {
                if (!amountMap[amount]) {
                    amountMap[amount] = { amount: parseFloat(amount) };
                }
                amountMap[amount][partnerMsisdn] = (amountMap[amount][partnerMsisdn] || 0) + records.length;
            });
        });
    
        // Ensure every partner ID is included in all data points
        Object.values(amountMap).forEach(entry => {
            partnerIds.forEach(partnerId => {
                if (!entry[partnerId]) {
                    entry[partnerId] = 0; // Add missing partner IDs with zero transactions
                }
            });
        });
    
        return Object.values(amountMap);
    };
    
    

    const handleRangeChange = (range) => {
        setDateRange(range);
        let start, end;
        if (range === "weekly") {
            start = dayjs().startOf('week');
            end = dayjs(); // Set the end date to current date (not future)
        } else if (range === "monthly") {
            start = dayjs().startOf('month');
            end = dayjs(); // End date is always current date
        } else if (range === "yearly") {
            start = dayjs().startOf('year');
            end = dayjs(); // End date is always current date
        }
        setStartDate(start);
        setEndDate(end);
        
        // Trigger API call whenever range is changed
        handleGraphButtonClick();
    };

    return (
        <Dialog open={graphDialogOpen} onClose={() => setGraphDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ color: "#253A7D" }}>Transaction Count by Amount</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={5} sx={{ marginBottom: 2, paddingTop: 2, paddingLeft: 15 }}>
                        <Grid item xs={4}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                maxDate={endDate}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                maxDate={dayjs()}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ marginTop: 0.2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGraphButtonClick}
                                sx={{ height: 50, backgroundColor: "#253A7D" }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Submit"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginBottom: 2,paddingLeft:30 }}>
                        <Grid item sx={4}>
                            <Button
                                variant={dateRange === "weekly" ? "contained" : "outlined"}
                                onClick={() => handleRangeChange("weekly")}
                            >
                                Weekly
                            </Button>
                        </Grid>
                        <Grid item sx={4}>
                            <Button
                                variant={dateRange === "monthly" ? "contained" : "outlined"}
                                onClick={() => handleRangeChange("monthly")}
                            >
                                Monthly
                            </Button>
                        </Grid>
                        <Grid item sx={4}>
                            <Button
                                variant={dateRange === "yearly" ? "contained" : "outlined"}
                                onClick={() => handleRangeChange("yearly")}
                            >
                                Yearly
                            </Button>
                        </Grid>
                    </Grid>
                </LocalizationProvider>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="amount" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {Object.keys(graphData[0] || {}).filter(k => k !== "amount").map((partnerId, index) => (
                            <Bar key={partnerId} dataKey={partnerId} stackId="a" fill={getColor(index)} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </DialogContent>
        </Dialog>
    );
};

export default GraphDialog;
