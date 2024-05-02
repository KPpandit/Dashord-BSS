import { Box, Button, Card, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default function AgentReportByPayment(props) {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [

        { id: 'fristName', name: 'First Name' },
        { id: 'lastName', name: 'Last Name' },
        { id: 'email', name: 'Email' },
        { id: 'businessAddress', name: 'Address' },
        { id: 'contact', name: 'Contact' },
        { id: 'token', name: 'Token' },
        { id: 'totalPayments', name: 'Total Payments' },
        { id: 'creationDate', name: 'Creation Date' }

    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    useEffect(() => {
        // console.log("record==>",selectedRecord)
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.5.10.2:9098/agent/partners', {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                // Assuming your API response is an array of objects similar to the data structure in your generateData function
                const apiData = response.data;

                // Update the state with the API data
                setRows(apiData);
                setIsLoading(false);
            } catch (error) {

                if (error.response && error.response.status === 401) {
                    // console.log("From inside if condition");
                    // localStorage.removeItem('token');
                    // navigate("/");
                }

                console.error('Error fetching data from API:', error);
                // Handle error as needed
            }
        };

        fetchData(); // Invoke the fetchData function when the component mounts
    }, [tokenValue]);


    const handleClickOpen = (row) => {
        setSelectedRecord(row)
        // setOpen(true);
    };


    const handleRowClick = (row) => {
        setSelectedRecord(row);
        setOpenDialog(true);
        fetchPhoto1(row)
    };





    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row)
    };



    const [selectedOption, setSelectedOption] = useState(null);
    const handleDownload = () => {
        if (selectedOption === 'pdf') {
            const pdf = new jsPDF();
            // Set column headers
            const headers = Object.keys(rows[0]);
            // Add data to PDF
            pdf.autoTable({
                head: [headers],
                body: rows.map(row => Object.values(row)),
            });
            // Save the PDF
            pdf.save(`${"newpdfway"}.pdf`);
        } else if (selectedOption === 'csv') {
            const headers = Object.keys(rows[0]);
            const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n' +
                rows.map(row => Object.values(row).join(',')).join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "example123.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(csvContent + "-----cvs content")
        } else if (selectedOption === 'xls') {
            // Handle XLS download logic
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const xlsURL = URL.createObjectURL(excelData);
            window.open(xlsURL);
        }
        else if (selectedOption === null) {
            setNotify({
                isOpen: true,
                message: 'Please Select The file Format ',
                type: 'error'
            })
            setTimeout(() => { }, 1000)

        }
    };
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [serach, setSearch] = useState('');

    const handleDateRange = () => {


        // Construct the API URL
        const apiUrl = `http://172.5.10.2:9098/agent/partners/bydate/range?search=${serach}&startDate=${startdate}&endDate=${enddate}`;
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
    return (

        <Box>
            {isLoading ? (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '60vh' }}

                >
                    <CircularProgress />
                </Grid>

            ) :
                <Box sx={{ display: 'container', marginTop: -2.5 }}>

                    <Box sx={{ width: '100%', }}>
                        <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                            <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                                <Grid>
                                    <Typography
                                        style={{

                                            fontSize: '20px',
                                            paddingLeft: 10,
                                            fontWeight: 'bold',

                                        }}
                                    >Agent Report By Payment</Typography>
                                </Grid>
                            </Paper>
                        </Box>

                        <Grid lg={4} >
                            <form

                            >

                                <Paper elevation={10} sx={{ marginBottom: 2, paddingBottom: 0.1, paddingTop: 0.5 }}>
                                    <Grid container spacing={2} padding={1}>
                                        <Grid item xs={3}>
                                            {/* First date field */}
                                            <TextField
                                                label="Search"
                                                type="text"
                                                fullWidth

                                                onChange={(e) => setSearch(e.target.value)}
                                                value={serach}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
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
                                        <Grid item xs={3}>
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

                                        <Grid item xs={3}>
                                            {/* Search button */}
                                            <Button
                                                variant="contained"

                                                // onClick={handleSearch}
                                                fullWidth
                                                style={{ height: '100%', backgroundColor: '#F6B625', color: 'black' }}
                                                onClick={handleDateRange}
                                            >
                                                Apply
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Paper>
                                {/* <Grid paddingBottom={1}>
                            <Button type='submit' backgroundColor={'blue'} onSubmit={handleSerch} padding={2}> <SearchIcon /> Search</Button>
                            </Grid> */}
                            </form>
                        </Grid>
                        <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                            <Paper elevation={10}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader size='medium' padding="normal">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} sx={{ textAlign: 'left' }}><Typography >{column.name}</Typography></TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows &&
                                                rows

                                                    .map((row, i) => {
                                                        return (

                                                            <TableRow
                                                                key={i}
                                                                onClick={() => {
                                                                    handleRowClick(row)
                                                                    handleClickOpen(row)
                                                                }}
                                                                onMouseEnter={() => handleRowMouseEnter(row)}
                                                                //   onMouseLeave={handleRowMouseLeave}
                                                                sx={
                                                                    highlightedRow === row
                                                                        ? { backgroundColor: '#F6B625' }
                                                                        : {}
                                                                }
                                                            >

                                                                {columns.map((column) => (
                                                                    <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>

                                                                        {row[column.id]}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>


                                                        );
                                                    })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </Paper>
                        </Box>
                        <Grid container paddingTop={2}>
                            <Grid item xs={1.2}>
                                <Button variant="contained" sx={{ backgroundColor: '#253A7D', boxShadow: 24 }} onClick={handleDownload}>Download</Button>
                            </Grid>
                            <Grid item xs={1}>
                                <FormControl fullWidth>
                                    <Select sx={{ boxShadow: 24, width: 100, height: 20, paddingY: 2.3, textAlign: 'bottom' }}

                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        required
                                    >

                                        <MenuItem value="pdf">PDF</MenuItem>
                                        <MenuItem value="csv">CSV</MenuItem>
                                        <MenuItem value="xls">Excel</MenuItem>
                                    </Select>

                                </FormControl>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>}
        </Box>
    )
};


