import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Button, TextField, CircularProgress } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import dayjs from "dayjs";
import axios from "axios";

const GraphDialogAgentpack = ({ graphDialogOpen, setGraphDialogOpen, tokenValue }) => {
    const [graphData, setGraphData] = useState([]);
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState("monthly");
    const [uniquePartners, setUniquePartners] = useState([]); // Track unique partnerMsisdn values

    const getColor = (index) => {
        const colors = [
            '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a832a8', '#32a89e', '#a83242',
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2',
            '#7f7f7f', '#bcbd22', '#17becf'
        ];
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
            const formattedStartDate = startDate.format('YYYY-MM-DD');
            const formattedEndDate = endDate.format('YYYY-MM-DD');

            const response = await axios.get(
                `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/reports/txns/inward/${formattedStartDate}/${formattedEndDate}`,
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

            // Extract unique partnerMsisdn values
            const partners = new Set();
            transformedData.forEach((entry) => {
                Object.keys(entry).forEach((key) => {
                    if (key !== "date") {
                        partners.add(key);
                    }
                });
            });
            setUniquePartners(Array.from(partners));
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            setLoading(false);
        }
    };

    const transformGraphData = (data) => {
        const groupedData = {};

        // Group data by date and partnerMsisdn
        data.forEach((txn) => {
            const date = dayjs(txn.txnDate).format('YYYY-MM-DD');
            const partnerMsisdn = txn.partnerMsisdn;
            const amount = txn.amount;

            if (!groupedData[date]) {
                groupedData[date] = {};
            }

            if (!groupedData[date][partnerMsisdn]) {
                groupedData[date][partnerMsisdn] = 0;
            }

            groupedData[date][partnerMsisdn] += amount;
        });

        // Convert grouped data into an array format for Recharts
        const chartData = Object.keys(groupedData).map((date) => {
            const entry = { date };
            Object.keys(groupedData[date]).forEach((partnerMsisdn) => {
                entry[partnerMsisdn] = groupedData[date][partnerMsisdn];
            });
            return entry;
        });

        return chartData;
    };

    const handleRangeChange = (range) => {
        setDateRange(range);
        let start, end;
        if (range === "weekly") {
            start = dayjs().startOf('week');
            end = dayjs();
        } else if (range === "monthly") {
            start = dayjs().startOf('month');
            end = dayjs();
        } else if (range === "yearly") {
            start = dayjs().startOf('year');
            end = dayjs();
        }
        setStartDate(start);
        setEndDate(end);
        handleGraphButtonClick();
    };

    return (
        <Dialog open={graphDialogOpen} onClose={() => setGraphDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ color: "#253A7D" }}>Reseller Topup Report</DialogTitle>
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

                    <Grid container spacing={2} sx={{ marginBottom: 2, paddingLeft: 30 }}>
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
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {uniquePartners.map((partnerMsisdn, index) => (
                            <Bar
                                key={partnerMsisdn}
                                dataKey={partnerMsisdn}
                                stackId="a"
                                fill={getColor(index)}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </DialogContent>
        </Dialog>
    );
};

export default GraphDialogAgentpack;