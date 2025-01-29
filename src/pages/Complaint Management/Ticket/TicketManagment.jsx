import { Box, Button, Card, CircularProgress, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


export default function TicketManagment(props) {


    const columns = [
        { id: 'id', name: 'Issue ID' },
        { id: 'type', name: 'Type' },
        { id: 'mobileNo', name: 'Mobile No' },
        { id: 'ticketDate', name: 'Ticket Date' },
        { id: 'isTicketOpen', name: 'Ticket Status' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {

        fetchData(); // Invoke the fetchData function when the component mounts
    }, [tokenValue]);

    const fetchData = async () => {

        try {
            const response = await axios.get('https://bssproxy01.neotel.nr/tickets/api/tickets', {
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
        fetchSellingData(row)
    };

    const SelectedRecordDetails = () => {
        if (!selectedRecord && !balance) return <></>;
        const [loading, setLoading] = useState(false);
        console.log(balance, "  balance value from inside of SelectedRecordDetails");
        const handleCloseTicket = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://bssproxy01.neotel.nr/tickets/api/close/ticket/${selectedRecord.id}`
                );
                if (response.status === 200) {
                    toast.success("Ticket closed successfully!", { autoClose: 3000 }); // Display toast for 3 seconds
                    setTimeout(() => {
                        fetchData(); // Call fetchData after 3 seconds
                    }, 3000);
                    // navigate("/CustomerCareAgentList/CustomerCareAgentConfig", { state: { id: selectedRecord } });
                } else {
                    toast.error("Failed to close the ticket. Please try again.");
                }
            } catch (error) {
                toast.error("An error occurred while closing the ticket.");
                console.error(error, '--- from catch');
            } finally {
                setLoading(false);
            }
        };
        // Define info fields
        const infoFields = [
            // { label: "Issue ID", value: selectedRecord.issue.id },
            { label: "Agent Name", value: selectedRecord?.agent.fullName },
            { label: "Contact Number", value: selectedRecord?.mobileNo },
            { label: "Issue Category", value: selectedRecord?.issue.category },
            { label: "Gender", value: selectedRecord?.gender == "f" ? "Female" : "Male" },
            { label: "Type", value: selectedRecord?.type },
            { label: "Ticket Status", value: selectedRecord?.ticketCloseDate === null ? "In Process" : "Closed on  " + selectedRecord?.ticketCloseDate },
            // { label: "Status", value: selectedRecord?.agentStatus.replace(/\b\w/g, (char) => char.toUpperCase())},
            { label: "Issue Details", value: selectedRecord?.issueDeails },

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
                <ToastContainer position="bottom-left" />
                <Paper elevation={10} >
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
                                    ISSUE ID: {selectedRecord?.id}
                                </Typography>
                            </Grid>
                        </Box>
                        <Grid container>
                            <Grid item xs={12} paddingLeft={1}>
                                {infoFields.map(renderInfoField)}
                            </Grid>
                        </Grid>
                        {selectedRecord?.ticketCloseDate === null && (
                            <Grid container spacing={1} padding={1}>
                                <Grid item xs={6}>
                                    <Button
                                        onClick={handleCloseTicket}
                                        disabled={loading}
                                        sx={{
                                            backgroundColor: "#253A7D",
                                            width: "100%",
                                            boxShadow: 20,
                                            marginY: 1,
                                        }}
                                        variant="contained"
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            "Close Ticket"
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Card>
                </Paper>

            </Grid>

        );
    };

    // Fetch function
    const [balance, setBalance] = useState(null);
    const fetchSellingData = async (row) => {
        try {
            const response = await axios.get(`https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/${row.id}/balance`);
            setBalance(response.data); // Update state with fetched data
            console.log(response.data, "  fetched balance data");
        } catch (error) {
            console.error("Error fetching balance data:", error);
        }
    };




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
                            >All Tickets</Typography>
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
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
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
                                                        {columns.map((column) => (
                                                            console.log(column.id + "from customer row"),

                                                            <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>

                                                                {column.id === 'ekycDate' ? (
                                                                    // Render this content if the condition is true
                                                                    <>{
                                                                        // new Date(row[column.id]).toISOString().split('T')[0]

                                                                    }</>
                                                                ) : column.id === 'fristName' ? (
                                                                    <>
                                                                        {/* Display both firstName and lastName */}
                                                                        {String(row.fristName || '')}{" "}
                                                                        {String(row.lastName || '')}
                                                                    </>
                                                                ) : column.id === 'isTicketOpen' ? (
                                                                    <>
                                                                        {String(row.isTicketOpen === 1 ? "Open" : "Close")}
                                                                    </>
                                                                )
                                                                    : (
                                                                        // Render this content if the condition is false
                                                                        <>{String(row[column.id]).replace(/\b\w/g, (char) => char.toUpperCase())}</>
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
                <Box sx={{
                    paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px',

                }}>
                    <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                        variant="contained" backgroundColor="#253A7D"
                        onClick={() => navigate("/ticket/newTicket", { state: { id: selectedRecord } })}
                    >
                        Create New Ticket
                    </Button>
                </Box>

            </Box>

            <Box sx={{ paddingLeft: 3, paddingTop: 1.5 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};

