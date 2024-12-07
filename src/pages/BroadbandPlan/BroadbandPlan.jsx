import React from "react";
import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


export default function BroadbandPlan(props) {
    const columns = [
        { id: 'plan_name', name: 'Plan Name' },
        { id: 'plan_code', name: 'Plan Code' },
        { id: 'total_data_limit', name: 'Data Limit' },
        { id: 'validity', name: 'Validity' },
        { id: 'plan_status', name: 'Status' },
        { id: 'plan_creation_time', name: 'Craetion Time' },
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
            const response = await axios.get('https://bssproxy01.neotel.nr/abmf-ftth/api/broadband/plan/get/all', {
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

    const handleOpenConfirmationDialog = (id) => {
        setRecordIdToDelete(id);
        setRecordMsisdnToDelete(id)
        console.log("xxxx==>" + id)
        console.log("xxxx==>" + id)
        setConfirmationDialogOpen(true);
    };

    const handleCloseConfirmationDialog = () => {
        setRecordIdToDelete(null);
        setConfirmationDialogOpen(false);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/broadband-plan/addBroadbandPlan');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };

    const SelectedRecordDetails = () => {
        if (!selectedRecord) return null;

        const details = [
            { label: "Plan Name", value: selectedRecord.plan_name, isHeader: true },
            { label: "Max Downlaode Width", value: selectedRecord.max_download_band_width },
            { label: "Max Uploade Width", value: selectedRecord.max_upload_band_width },
            { label: "Min Download Bandwidth", value: selectedRecord.min_download_bandwidth },
            { label: "Min Upload Bandwidth", value: selectedRecord.min_upload_bandwidth },
            { label: "Is Carry Forward", value: String(selectedRecord.is_carry_forward) },
            { label: "Plan Created By", value: String(selectedRecord.plan_created_by) },
            { label: "Plan Approved By", value: String(selectedRecord.plan_approved_by) },
        ];

        // FUP Policy Details
        const fupDetails = [
            { label: "Is FUP Enabled", value: selectedRecord.fup_policy.is_fup_enabled ? "Yes" : "No" },
            { label: "FUP Data Tariff", value: selectedRecord.fup_policy.fup_data_tariff || "N/A" },
            { label: "Step Down Download Bandwidth", value: selectedRecord.fup_policy.step_down_download_bandwidth || "N/A" },
            { label: "Step Down Upload Bandwidth", value: selectedRecord.fup_policy.step_down_upload_bandwidth || "N/A" },
        ];

        return (
            <Grid sx={{ paddingTop: 1 }}>
                <Paper elevation={10}>
                    <Card variant="outlined" sx={{ width: 380, fontFamily: "Roboto" }}>
                        {/* Display main details */}
                        {details.map((detail, index) => (
                            <React.Fragment key={index}>
                                {detail.isHeader ? (
                                    <Box sx={{ p: 1, backgroundColor: "#253A7D" }}>
                                        <Typography
                                            sx={{
                                                fontSize: 17,
                                                color: "white",
                                                padding: "2px",
                                                fontWeight: "bold",
                                                display: "inline-block",
                                            }}
                                        >
                                            {detail.label}: {detail.value}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <Typography sx={{ fontWeight: 500, fontSize: 17 }}>
                                                    {detail.label}:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontSize: 17 }}>{detail.value}</Typography>
                                            </Grid>
                                        </Grid>
                                        {index !== details.length - 1 && <Divider light />}
                                    </Box>
                                )}
                            </React.Fragment>
                        ))}

                        {/* Display FUP Policy details */}
                        <Box sx={{ p: 1, backgroundColor: "#253A7D" }}>
                            <Typography
                                sx={{
                                    fontSize: 17,
                                    color: "white",
                                    padding: "2px",
                                    fontWeight: "bold",
                                    display: "inline-block",
                                }}
                            >
                                FUP Policy:
                            </Typography>
                        </Box>
                        {fupDetails.map((fup, index) => (
                            <Box sx={{ p: 1 }} key={index}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography sx={{ fontWeight: 500, fontSize: 17 }}>
                                            {fup.label}:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{ fontSize: 17 }}>{fup.value}</Typography>
                                    </Grid>
                                </Grid>
                                {index !== fupDetails.length - 1 && <Divider light />}
                            </Box>
                        ))}

                        {/* Button to assign broadband */}
                        <Grid container spacing={1} padding={1}>
                            <Grid item xs={12}>
                               
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </Grid>
        );
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
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    color: '#253A7D',


                                }}
                            >Broad Band Plan</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Grid container padding={2}>
                    <Grid item xs={4} sx={{ textAlign: 'right', marginY: -0.5 }} >
                        <form onSubmit={handleSerch}>
                            <Paper elevation={10} sx={{ marginBottom: 2 }}>
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
                    <Grid item xs={8} sx={{ marginY: 1 }}>
                        <Button style={{ backgroundColor: '#FBB716', color: 'black' }} sx={{ marginX: 1, boxShadow: 20 }}>Export to PDF</Button>
                        <Button style={{ backgroundColor: '#FBB716', color: 'black' }} sx={{ marginX: 1, boxShadow: 20 }}>Export to CSV</Button>
                        <Button style={{ backgroundColor: '#FBB716', color: 'black' }} sx={{ boxShadow: 20 }}>Export to Excel</Button>
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

                <Box sx={{
                    paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px',

                }}>
                    <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                        variant="contained" backgroundColor="#253A7D" onClick={handleButtonClick}>
                        Create Plan
                    </Button>
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

