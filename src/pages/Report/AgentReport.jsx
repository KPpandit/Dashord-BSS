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
import GraphDialog from './AgnetReports/GraphDialog';
import GraphDialogAgentpack from './AgnetReports/GraphDialogAgentpack';

const AllAgentReport = () => {
    const columns = [
        { id: 'partnerId', name: 'Reseller ID' },
        { id: 'msisdn', name: 'Reseller MSISDN' },
        { id: 'totalCoreBalance', name: 'Total Core Balance' },
        { id: 'txnReference', name: 'Transaction Reference' },
        { id: 'status', name: 'Status' },
    ];

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Active');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [graphDialogOpen, setGraphDialogOpen] = useState(false);
    const [graphDialogOpen1, setGraphDialogOpen1] = useState(false);

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
    }, [tokenValue, activeFilter, navigate]);

    const handleGraphIconClick = (row) => {
        navigate('/analysisAgent', { state: { selectedRecord: row } });
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
                           Reseller Amount <EqualizerIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#F6B625', color: 'white' }}
                            onClick={() => setGraphDialogOpen1(true)}
                        >
                           Reseller Topup <EqualizerIcon />
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="reseller balance report">
                        <TableHead sx={{ backgroundColor: '#253A7D' }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell sx={{ color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                            No records exist
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.partnerId}>
                                        <TableCell>{row.partnerId}</TableCell>
                                        <TableCell>{row.msisdn}</TableCell>
                                        <TableCell>{row.totalCoreBalance}</TableCell>
                                        <TableCell>{row.txnReference}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {rows.length > 0 && (
                        <TablePagination
                            sx={{ backgroundColor: '#253A7D', color: 'white' }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                </TableContainer>

                <Box sx={{ display: 'container', marginTop: 2.5 }}>
                    <GraphDialog
                        graphDialogOpen={graphDialogOpen}
                        setGraphDialogOpen={setGraphDialogOpen}
                        tokenValue={tokenValue} 
                    />
                </Box>
                <Box sx={{ display: 'container', marginTop: 2.5 }}>
                    <GraphDialogAgentpack
                        graphDialogOpen={graphDialogOpen1}
                        setGraphDialogOpen={setGraphDialogOpen1}
                        tokenValue={tokenValue} 
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AllAgentReport;