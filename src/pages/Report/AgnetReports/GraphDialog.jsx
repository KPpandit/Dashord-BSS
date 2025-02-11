import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, Grid, Button, TextField, CircularProgress,
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Pagination
} from "@mui/material";
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
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);

    const getColor = (index) => {
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a832a8', '#32a89e', '#a83242'];
        return colors[index % colors.length];
    };

    const handleGraphButtonClick = async () => {
        if (startDate.isAfter(endDate)) {
            alert("Start date cannot be later than End date.");
            return;
        }

        if (endDate.isAfter(dayjs().add(1, "day"))) {
            alert("End date cannot be in the future.");
            return;
        }

        setLoading(true);
        try {
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

        Object.entries(data).forEach(([partnerMsisdn, amounts]) => {
            partnerIds.add(partnerMsisdn);
            Object.entries(amounts).forEach(([amount, records]) => {
                if (!amountMap[amount]) {
                    amountMap[amount] = { amount: parseFloat(amount) };
                }
                amountMap[amount][partnerMsisdn] = (amountMap[amount][partnerMsisdn] || 0) + records.length;
            });
        });

        Object.values(amountMap).forEach(entry => {
            partnerIds.forEach(partnerId => {
                if (!entry[partnerId]) {
                    entry[partnerId] = 0;
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

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedData = graphData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Dialog open={graphDialogOpen} onClose={() => setGraphDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ color: "#253A7D" }}>Resellers Transactions</DialogTitle>
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
                                maxDate={dayjs().add(1, "day")}
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

                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell >Amount</TableCell>
                                {Object.keys(graphData[0] || {}).filter(k => k !== "amount").map((partnerId) => (
                                    <TableCell key={partnerId}>{partnerId}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell >{row.amount}</TableCell>
                                    {Object.keys(row).filter(k => k !== "amount").map((partnerId) => (
                                        <TableCell key={partnerId}>{row[partnerId]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={Math.ceil(graphData.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginTop: 2, display: 'flex', justifyContent: 'center'}}
                />
            </DialogContent>
        </Dialog>
    );
};

export default GraphDialog;