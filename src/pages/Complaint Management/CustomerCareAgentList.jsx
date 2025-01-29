import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


export default function CustomerCareAgentList(props) {
  

    const columns = [
        { id: 'agent.id', name: 'Agent ID' },
        { id: 'agent.fullName', name: 'Name' },
        { id: 'agent.type', name: 'Type' },
        { id: 'gender', name: 'Gender' },
        { id: 'agent.agentStatus', name: 'Status' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {

        fetchData(); // Invoke the fetchData function when the component mounts
    }, [tokenValue]);

    const fetchData = async () => {

        try {
            const response = await axios.get('https://bssproxy01.neotel.nr/tickets//api/agentconfig', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            setRows(response.data);
        } catch (error) {
            console.log("response from Error");

            console.error('Error fetching data from API:', error);
        }
    };
    // const [rows, rowchange] = useState(generateData());
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
    const navigate = useNavigate();
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleRowClick = (row) => {
        setSelectedRecord(row);
        // fetchSellingData(row)
    };

    const SelectedRecordDetails = () => {
        if (!selectedRecord && !balance) return <></>;

        console.log(selectedRecord, "  balance value from inside of SelectedRecordDetails");

        // Define info fields
        const infoFields = [
            { label: "Name", value: selectedRecord?.agent.fullName },
            { label: "Email", value: selectedRecord?.agentEmail },
            { label: "Contact Number", value: selectedRecord?.agent.mobileNo },
            { label: "Address", value: selectedRecord?.agent.address },
            { label: "Gender", value: selectedRecord?.gender == "f" ? "Female" : "Male" },
            { label: "Type", value: selectedRecord?.agent.type },
            { label: "Document Id", value: selectedRecord?.agent.documentId },
            { label: "Agent Chat Handle", value: selectedRecord?.agentChatHandle},
            { label: "DOB", value: selectedRecord?.agent.dob },

        ];

        // Render each field
        const renderInfoField = ({ label, value }) => (
            <Box key={label} sx={{ p: 1 }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography sx={{ fontWeight: 500, fontSize: "17px", textAlign: "left" }}>
                            {label}:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: "17px", textAlign: "left" }}>{value}</Typography>
                    </Grid>
                </Grid>
                <Divider light />

            </Box>

        );

        // Render the card
        return (
            <Grid>
                <Paper elevation={10}>
                    <Card variant="outlined" sx={{ width: 380, fontFamily: "Roboto" }}>
                        <Box sx={{ p: 1 }}>
                            <Grid sx={{ padding: 1, backgroundColor: "#253A7D" }}>
                                <Typography
                                    sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        padding: "2px",
                                        backgroundColor: "#253A7D",
                                        display: "inline-block",
                                    }}
                                >
                                    Agent ID: {selectedRecord?.id}
                                </Typography>
                            </Grid>
                        </Box>
                        <Grid container>
                            <Grid item xs={12} paddingLeft={1}>
                                {infoFields.map(renderInfoField)}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} padding={1}>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => navigate("/CustomerCareAgentList/CustomerCareAgentConfig", { state: { id: selectedRecord } })}
                                    sx={{
                                        backgroundColor: "#253A7D",
                                        width: "100%",
                                        boxShadow: 20,
                                        marginY: 1,
                                    }}
                                    variant="contained"
                                >
                                    Add Configuration
                                </Button>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <Button
                                    onClick={() =>  navigate("/CustomerCareAgentList/CustomerCareAgentConfig", { state: { id: selectedRecord } })}
                                    // onClick={() => {
                                    //     setOpenPopup1(true);
                                    //     console.log(selectedRecord);
                                    // }}
                                    sx={{
                                        backgroundColor: "#253A7D",
                                        width: "100%",
                                        boxShadow: 20,
                                        marginY: 1,
                                    }}
                                    variant="contained"
                                >
                                    Update Availability
                                </Button>                                
                            </Grid> */}
                        </Grid>
                    </Card>
                </Paper>

            </Grid>

        );
    };

    // Fetch function
    const [balance, setBalance] = useState(null);
  
    //     try {
    //         const response = await axios.get(`https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/${row.id}/balance`);
    //         setBalance(response.data); // Update state with fetched data
    //         console.log(response.data, "  fetched balance data");
    //     } catch (error) {
    //         console.error("Error fetching balance data:", error);
    //     }
    // };




    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`https://bssproxy01.neotel.nr/crm/api/vendor/mgmt/detail/search?keyword=${value}`)
            .then((res) => {
                setdata(res.data);
                console.log(value + "----value sech datas")
                rowchange(res.data);
                setValue(value);
            })
    }
    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container', marginTop: -2.5 }}>

            <Box sx={{ width: '70%', }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', marginLeft: 0, marginRight: 0 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    color: '#253A7D',


                                }}
                            >Agents</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Grid container padding={2}>
                    <Grid item xs={12} sx={{ textAlign: 'right' }} >
                        <form onSubmit={handleSerch}>
                            <Paper elevation={10} sx={{ marginBottom: 1 }}>
                                <TextField
                                    onClick={handleSerch}
                                    label="Search"
                                    type='text'
                                    fullWidth
                                    name='value'

                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton

                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Paper>
                        </form>
                    </Grid>
                </Grid>

                <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                    <Paper elevation={10}>
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
                                                <Typography>{column.name}</Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows &&
                                        rows
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => (
                                                <TableRow
                                                    key={i}
                                                    onClick={() => handleRowClick(row)}
                                                    onMouseEnter={() => handleRowMouseEnter(row)}
                                                    onMouseLeave={handleRowMouseLeave}
                                                    sx={
                                                        highlightedRow === row
                                                            ? { backgroundColor: '#F6B625' }
                                                            : {}
                                                    }
                                                >
                                                    {columns.map((column) => {
                                                        // Function to get the value from nested or top-level properties
                                                        const getValue = (row, path) => {
                                                            return path.split('.').reduce((obj, key) => obj?.[key], row);
                                                        };

                                                        const value = getValue(row, column.id);

                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                sx={{ textAlign: 'left', fontSize: '17px' }}
                                                            >
                                                                {column.id === 'gender' ? (
                                                                    value === 'f' ? 'Female' : 'Male'
                                                                ) : value ? (
                                                                    String(value).replace(/\b\w/g, (char) => char.toUpperCase())
                                                                ) : (
                                                                    'N/A'
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            ))}
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

                <Box sx={{
                    paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px',

                }}>
                    <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                        variant="contained" backgroundColor="#253A7D"
                        onClick={() => navigate("/addNewCustomerCareAgent", { state: { id: selectedRecord } })}
                    >
                        Create New Agent
                    </Button>
                </Box>

            </Box>

            <Box sx={{ paddingLeft: 3, paddingTop: 1.5 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};

