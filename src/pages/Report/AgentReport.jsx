import {
    Box, Button, CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, Tooltip, Typography, Dialog, DialogTitle, DialogContent, TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Visibility } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const AllAgentReport = () => {
    const columns = [
        { id: 'partnerId', name: 'Reseller ID' },
        { id: 'totalCoreBalance', name: 'Total Core Balance' },
        { id: 'txnReference', name: 'Transaction Reference' },
        { id: 'status', name: 'Status' },
        // { id: 'actions', name: 'Actions' },
    ];

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Active');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [graphData, setGraphData] = useState([]);
    const [graphDialogOpen, setGraphDialogOpen] = useState(false);
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(dayjs());

    const tokenValue = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/reports/all/balance', {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
    
                const filteredData = response.data.filter(row => row.status === `${activeFilter} Account`);
                setRows(filteredData);
                setPage(0); // Reset pagination when data changes
    
                // Fetch the default graph data for the last one month after balance data is fetched
                const formattedStartDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
                const formattedEndDate = dayjs().format('YYYY-MM-DD');
    
                const graphResponse = await axios.get(
                    `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/reports/txns/outward/${formattedStartDate}/${formattedEndDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                );
    
                const transformedData = transformGraphData(graphResponse.data);
                setGraphData(transformedData);
    
            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate("/");
                }
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [tokenValue, activeFilter, navigate]); // Depend on `activeFilter` to refresh data
    

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
            setGraphDialogOpen(true);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            setLoading(false);
        }
    };

    const transformGraphData = (data) => {
        const amountMap = {};

        Object.entries(data).forEach(([partnerId, transactions]) => {
            Object.entries(transactions).forEach(([amount, records]) => {
                if (!amountMap[amount]) {
                    amountMap[amount] = { amount: parseFloat(amount) };
                }
                amountMap[amount][partnerId] = (amountMap[amount][partnerId] || 0) + records.length;
            });
        });

        return Object.values(amountMap);
    };

    const handleGraphIconClick = (row) => {
        navigate('/analysisAgent', { state: { selectedRecord: row } });
    };

    const getColor = (index) => {
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a832a8', '#32a89e', '#a83242'];
        return colors[index % colors.length];
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ display: 'container', marginTop: 2.5 }}>
            <Box sx={{ width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D' }}>
                    <Typography sx={{ fontSize: '20px', paddingLeft: 1, fontWeight: 'bold' }}>
                        Resellers Balance Report
                    </Typography>
                </Paper>

                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: activeFilter === 'Active' ? '#253A7D' : '#F6B625', color: 'white' }}
                            onClick={() => setActiveFilter('Active')}
                        >
                            Active Resellers
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: activeFilter === 'Inactive' ? '#253A7D' : '#F6B625', color: 'white' }}
                            onClick={() => setActiveFilter('Inactive')}
                        >
                            Inactive Resellers
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#F6B625', color: 'white' }}
                            onClick={() => setGraphDialogOpen(true)}
                        >
                            <EqualizerIcon />
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="reseller balance report">
                        <TableHead sx={{backgroundColor:'#253A7D'}}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell sx={{color:'white'}} key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.partnerId}>
                                    <TableCell>{row.partnerId}</TableCell>
                                    <TableCell>{row.totalCoreBalance}</TableCell>
                                    <TableCell>{row.txnReference}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    {/* <TableCell>
                                        <IconButton onClick={() => handleGraphIconClick(row)}
                                            >
                                            <Visibility />
                                        </IconButton>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                    sx={{backgroundColor:'#253A7D',color:'white'}}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>

                <Dialog open={graphDialogOpen} onClose={() => setGraphDialogOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{color:'#253A7D'}}>Transaction Count by Amount</DialogTitle>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={5} sx={{ marginBottom: 2, paddingTop: 2, paddingLeft:15 }}>

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
                                <Grid item xs={4} sx={{marginTop:0.2}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleGraphButtonClick}
                                        sx={{ height:50,backgroundColor:'#253A7D'}}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </LocalizationProvider>



                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="amount" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                {Object.keys(graphData[0] || {}).filter(k => k !== "amount").map((partnerId, index) => (
                                    <Bar key={partnerId} dataKey={partnerId} stackId="a" fill={getColor(index)} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    );
};

export default AllAgentReport;
