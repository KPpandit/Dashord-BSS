import { Box, Button, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import White_logo from "../../assets/White_logo.jpg";

export default function AllTransaction() {
    const location = useLocation();
    const { id } = location.state || {};
    const agentId = id?.id;
    const tokenValue = localStorage.getItem('token');

    const columns = [
        { id: 'crmPartnerId', name: 'Reseller ID' },
        { id: 'txnDate', name: 'Date' },
        { id: 'txn_reference', name: 'Reference' },
        { id: 'coreBalance', name: 'Core Balance' },
        { id: 'amount', name: 'Amount Paid' },
        { id: 'discountApplied', name: 'Discount %' },
        { id: 'txn_type', name: 'TXN Type' },
        { id: 'paymentMode', name: 'Payment Mode' },
        { id: 'direction', name: 'Payment Type' },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const getTodayAndTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        return {
            today: formatDate(today),
            tomorrow: formatDate(tomorrow),
        };
    };

    const { today, tomorrow } = getTodayAndTomorrow();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/${agentId}/txns/${startDate}/${endDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );
                setRows(response.data || []);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                setRows([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [agentId, startDate, endDate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        if (name === "startDate") {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.addImage(White_logo, 'PNG', 10, 10, 30, 30);
        doc.setFontSize(10);
        const headers = columns.map((column) => column.name);
        const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const data = paginatedRows.map((row) =>
            columns.map((column) =>
                column.id === "direction"
                    ? row[column.id] === "INWARD" ? "Inward" : "Outward"
                    : column.id === "coreBalance"
                        ? `AUD $${(row.amount / (1 - (parseFloat(row.discountApplied) || 0) / 100)).toFixed(2)}`
                        : column.id === "amount"
                            ? `AUD $${row[column.id]}`
                            : row[column.id]
            )
        );

        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 50,
            styles: { halign: "center", fontSize: 8, fillColor: '#253A7D', textColor: 'white' },
            theme: "grid",
        });

        doc.save("transactions_paginated.pdf");
    };

    return (
        <Box sx={{ display: 'container', marginTop: -3 }}>
            <Box sx={{ width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D' }}>
                    <Grid container justifyContent="space-between" alignItems="center">

                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            {/* Left-aligned heading */}
                            <Grid item xs={6}>
                                <Typography
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    All Transactions
                                </Typography>
                            </Grid>

                            {/* Right-aligned date fields */}
                            <Grid
                                item
                                container
                                xs={6}
                                spacing={2}
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    <TextField
                                        name="startDate"
                                        label="Start Date"
                                        type="date"
                                        value={startDate}
                                        onChange={handleDateChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="endDate"
                                        label="End Date"
                                        type="date"
                                        value={endDate}
                                        onChange={handleDateChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>

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
                        <TableContainer sx={{ maxHeight: 600, marginBottom: '20px' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                                {column.name}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                        <TableRow key={i}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        count={rows.length}
                        component="div"
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

                <Button sx={{ mt: 2, backgroundColor: '#253A7D', color: 'white', fontWeight: 'bold' }} onClick={downloadPDF}>
                    Download PDF
                </Button>
            </Box>
        </Box>
    );
}
