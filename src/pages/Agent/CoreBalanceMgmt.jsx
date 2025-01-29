import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


export default function CoreBalanceMgmt(props) {
    const columns = [
        { id: 'id', name: 'Partner ID' },
        { id: 'fristName', name: 'Name' },
        // { id: 'lastName', name: '' },
        { id: 'email', name: 'Email' },
        { id: 'contact', name: 'Contact' },
        { id: 'documentType', name: 'Doc Type' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {

        fetchData(); // Invoke the fetchData function when the component mounts
    }, [tokenValue]);
    const handleConfirmDelete = () => {
        // Perform the delete operation here using the recordIdToDelete
        // After successful deletion, you can update the UI accordingly
        console.log(`Deleting record with ID: ${recordIdToDelete}`);

        // Make an API call to delete the record
        axios.delete(`https://bssproxy01.neotel.nr/crm/api/delete/vendor/vendorId/${recordMsisdnToDelete}`, {
            headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Handle success, you can update the UI or take other actions
                fetchData();
                SetDelete('deleted');

                // Fetch updated data after successful deletion
                fetchData();
            })
            .catch(error => {
                // Handle error, you can display an error message or take other actions
                console.error(`Error deleting record with ID ${recordIdToDelete}:`, error);
            });

        // Close the confirmation dialog
        setConfirmationDialogOpen(false);
    };
    const fetchData = async () => {

        try {
            const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/partners', {
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
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const [recordMsisdnToDelete, setRecordMsisdnToDelete] = useState(null);

   

    const handleCloseConfirmationDialog = () => {
        setRecordIdToDelete(null);
        setConfirmationDialogOpen(false);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
    const navigate = useNavigate();
    // const [balance, setBalance] = useState(null);
    // const fetchSellingData = async (row) => {
    //     // https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/1/balance
    //     try {
    //         const response = await axios.get(`https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/${row.id}/balance`);
    //         const apiData = response.data;
    //         setBalance(apiData);
    //             // coreBalance=apiData
    //         console.log(balance, "   from SCore balance");

    //     } catch (error) {

    //     }
    // };
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleRowClick = (row) => {
        setSelectedRecord(row);
        fetchSellingData(row)
    };

    const SelectedRecordDetails = () => {
        if (!selectedRecord && !balance) return <></>;

        console.log(balance, "  balance value from inside of SelectedRecordDetails");

        // Define info fields
        const infoFields = [
            { label: "Bussiness Address", value: selectedRecord.businessAddress },
            { label: "Bussiness Nature", value: selectedRecord?.businessNature },
            { label: "Document Id", value: selectedRecord?.documentId },
            { label: "Token", value: selectedRecord?.token },
          
            // { label: "Device Status", value: selectedRecord?.deviceStatus },
            ...(balance
                ? [{ label: "Core Balance", value:  Math.round(balance.totalCoreBalance) }]
                : [{ label: "Core Balance", value: "Loading..." }]),
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
                                    Partner ID: {selectedRecord?.id}
                                </Typography>
                            </Grid>
                        </Box>
                        <Grid container>
                            <Grid item xs={12} paddingLeft={1}>
                                {infoFields.map(renderInfoField)}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} padding={1}>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() =>  navigate("/partner/allTransation", { state: { id: selectedRecord } })}
                                    sx={{
                                        backgroundColor: "#253A7D",
                                        width: "100%",
                                        boxShadow: 20,
                                        marginY: 1,
                                    }}
                                    variant="contained"
                                >
                                    View All Transactions
                                </Button>
                            </Grid>
                        </Grid>
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
                            >Core Balance Management</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Grid container padding={2}>
                    <Grid item xs={12} sx={{ textAlign: 'right' }} >
                        <form onSubmit={handleSerch}>
                            <Paper elevation={10} sx={{ marginBottom: 1}}>
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
                                                                ) :column.id === 'fristName' ? (
                                                                    <>
                                                                        {/* Display both firstName and lastName */}
                                                                        {String(row.fristName || '')}{" "}
                                                                        {String(row.lastName || '')}
                                                                    </>
                                                                ) : (
                                                                    // Render this content if the condition is false
                                                                    <>{String(row[column.id])}</>
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

            <Box sx={{ paddingLeft: 3, paddingTop: 1.5 }} >
                <SelectedRecordDetails />
            </Box>
            <Dialog
                open={confirmationDialogOpen}
                onClose={handleCloseConfirmationDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
};

