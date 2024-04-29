import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function AgentComission(props) {
    const columns = [
        { id: 'fristName', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'commissionType', name: 'Commission Type' },
        { id: 'totalPayments', name: 'Total Payment' },
        { id: 'locallity', name: 'Locality' },
        { id: 'contact', name: 'Contact' },
        { id: 'creationDate', name: "Creation Date" },
        { id: 'partnerCommission.amount', name: 'Commission Amount' }, // Include partner commission amount here

    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [search, setsearch] = useState()
    // Generate sample data

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // console.log("record==>",selectedRecord)
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9098/agent/partners/byCommission', {
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
    }, [tokenValue, selectedPhoto]);


    const handleClickOpen = (row) => {
        setSelectedRecord(row)
        // setOpen(true);
    };



    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/newCustomer');
    };

    const handleRowClick = (row) => {
        setSelectedRecord(row);
        setOpenDialog(true);
        // fetchPhoto1(row)
        navigate('/individualagentreport', { state: { selectedRecord: row } })


    };



    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`http://172.5.10.2:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
            .then((res) => {
                setdata(res.data);
                console.log(value + "----value sech datas")
                rowchange(res.data);
                setValue(value);
            })
    }

    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row)
    };


    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [serach, setSearch] = useState('');
    const handleDateRange = () => {


        // Construct the API URL
        const apiUrl = `http://localhost:9098/agent/partners/byCommission/bydate/range?search=${serach}&startDate=${startdate}&endDate=${enddate}`;
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
                            >All Agent by Commission</Typography>
                        </Grid>
                    </Paper>
                </Box>

                <Grid lg={4} >
                    <form
                        onSubmit={handleSerch}
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
                                    {rows && rows
                                        .slice(page * rowperpage, page * rowperpage + rowperpage)
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
                                                            {column.id === 'partnerCommission.amount' ? (
                                                                // Render partner commission amount if column ID is 'partnerCommission.amount'
                                                                <>{row.partnerCommission.amount}</>
                                                            ) : (
                                                                // Render other column data
                                                                <>{row[column.id]}</>
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>


                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
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

                    </Paper>
                </Box>
            </Box>










        </Box>
    )
};


