import { Box, Button, Card, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default function AllTransaction() {
    const location = useLocation();
    const { id } = location.state || {};
    const agentId = id?.id;
    const tokenValue = localStorage.getItem('token');

    const columns = [
        { id: 'crmPartnerId', name: 'Partner ID' },
        { id: 'txnDate', name: 'Date' },
        { id: 'txn_reference', name: 'Refrence' },
        { id: 'amount', name: 'Core Balance' },
        { id: 'discountApplied', name: 'Discount' },
        { id: 'txn_type', name: 'Type' },
        { id: 'direction', name: 'Direction' },
    ];

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [rows, setRows] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [highlightedRow, setHighlightedRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [anchorEl, setAnchorEl] = useState(null);  // State for dropdown menu
    const open = Boolean(anchorEl);  // Check if dropdown is open

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const currentDate = selectedDate;
                const response = await axios.get(
                    `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/${agentId}/txns/${currentDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data.length === 0) {
                    setRows([]);
                } else {
                    setRows(response.data);
                }
            } catch (error) {
                console.error('Error fetching data from API:', error);
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [agentId, selectedDate]);

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Function to download data as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("All Transactions", 20, 10);
        let y = 20;
        rows.forEach((row, index) => {
            y += 10;
            doc.text(`Transaction ${index + 1}: ${row.txn_reference} - ${row.amount}`, 20, y);
        });
        doc.save("transactions.pdf");
    };

    // Function to download data as Excel
    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");
        XLSX.writeFile(wb, "transactions.xlsx");
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'container', marginTop: -3 }}>
            <Box sx={{ width: '80%' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -1 }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography style={{ fontFamily: 'Roboto', fontSize: '20px', paddingLeft: 5, fontWeight: 'bold' }}>
                                All Transactions
                            </Typography>
                            <TextField
                                label="Select Datewise Transaction"
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: 200 }}
                            />
                        </Grid>
                    </Paper>
                </Box>

                <Box component="main" sx={{ flexGrow: 1, paddingTop: "1%", width: '100%' }}>
                    <Paper elevation={10}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
                                <CircularProgress sx={{ color: '#FFC50D' }} />
                            </Box>
                        ) : rows.length === 0 ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
                                <Typography>No Transactions Available</Typography>
                            </Box>
                        ) : (
                            <TableContainer sx={{ maxHeight: 600 }}>
                                <Table stickyHeader size="medium" padding="normal">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    style={{ backgroundColor: '#253A7D', color: 'white' }}
                                                    key={column.id}
                                                    sx={{ textAlign: 'left' }}
                                                >
                                                    <Typography fontFamily={'Sans-serif'}>{column.name}</Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowperpage, page * rowperpage + rowperpage).map((row, i) => (
                                            <TableRow
                                                key={i}
                                                onMouseEnter={() => handleRowMouseEnter(row)}
                                                onMouseLeave={handleRowMouseLeave}
                                                sx={highlightedRow === row ? { backgroundColor: '#F4C22E' } : {}}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} sx={{ textAlign: 'left' }}>
                                                        {column.id === 'direction' ? (
                                                            <>
                                                                {row[column.id] === 'INWARD' ? (
                                                                    <>
                                                                          <ArrowDownwardIcon style={{ color: 'green', marginRight: 5 }} sx={{ paddingTop: 0 }} />
                                                                        {row[column.id]}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                      
                                                                        <ArrowUpwardIcon style={{ color: 'red', marginRight: 5 }} sx={{ paddingTop: 0 }} />
                                                                        {row[column.id]}
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            row[column.id]
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        <TablePagination
                            sx={{ color: '#253A7D' }}
                            rowsPerPageOptions={[5, 10, 25]}
                            rowsPerPage={rowperpage}
                            page={page}
                            count={rows.length}
                            component="div"
                            onPageChange={handlechangepage}
                            onRowsPerPageChange={handleRowsPerPage}
                        />
                        {/* Download Menu */}

                    </Paper>
                </Box>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    sx={{ marginTop: 2, marginLeft: 0 ,boxShadow:24,
                        backgroundColor:'white',
                        color:'#253A7D',
                        border: '2px solid #253A7D',
                        '&:hover': {
                            backgroundColor: '#f1f1f1',
                        },
                    }}
                >
                    Download Data
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={downloadPDF}>Download as PDF</MenuItem>
                    <MenuItem onClick={downloadExcel}>Download as Excel</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
