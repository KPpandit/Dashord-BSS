import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
export default function PrePaidAccount(){
    const columns = [
        { id: 'msisdn', name: 'MISIDNs' },
        { id: 'imsi', name: 'IMSI' },
        { id: '4g_data_octets', name: '4 G Octets' },
        { id: '5g_data_octets', name: '5 G Octets' },
        

    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.17.1.11:9698/api/prepaid/account/get/all/prepaid/account', {
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
    }, [tokenValue]);
    const handleConfirmDelete = () => {
        // Perform the delete operation here using the recordIdToDelete
        // After successful deletion, you can update the UI accordingly
        console.log(`Deleting record with ID: ${recordIdToDelete}`);
    
        // Make an API call to delete the record
        axios.delete(`http://localhost:9696/api/rates/detail/delete/${recordIdToDelete}`, {
            headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Handle success, you can update the UI or take other actions
                console.log(`Record with ID ${recordIdToDelete} deleted successfully.`);
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
            const response = await axios.get('http://172.5.10.2:9696/api/prepaid/account/get/all/prepaid/account', {
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
    const handleOpenConfirmationDialog = (id) => {
        setRecordIdToDelete(id);
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
        navigate('/addRates');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };
   
    const SelectedRecordDetails = () => {

        // const dateObject = new Date(selectedRecord.createDateTime);
        // const created_Date = dateObject.toISOString().split('T')[0];

        // const dateObject1 = new Date( selectedRecord.ekycDate);
        // const ekycDate = dateObject1.toISOString().split('T')[0];
        // console.log("ekyc Date"+ekycDate)

        if (selectedRecord) {
            return (
                <Grid>
                    <Paper elevation={10}>


                        <Card variant="outlined" sx={{ width:340, fontFamily: "Roboto" }}>

                            <Box sx={{ p: 1 }}>

                                <Grid sx={{ padding: 1, backgroundColor: '#253A7D' }}>
                                    <Stack direction="row"
                                        sx={{ borderRadius: '30%', }}
                                        justifyContent="space-between" alignItems="center">
                                        <Typography
                                            style={{
                                                fontSize: '17px',

                                                color: 'white',
                                                marginBottom: '2px',

                                                // Add this line for circular border
                                                backgroundColor: '#253A7D',  // Add this line for background color
                                                padding: '2px',  // Add this line for padding
                                                display: 'inline-block',

                                            }}
                                            gutterBottom component="div">
                                             MSISDN : {selectedRecord.msisdn}  
                                        </Typography>

                                    </Stack>
                                </Grid>

                            </Box>
                            <Grid container>
                                <Grid item xs={12} paddingLeft={1}>

                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Called Station ID :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -1 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.called_station_id)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Monitoring Key :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.monitoring_key)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Action :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -10 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.action)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                   
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Data Type :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -7 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.data_parameter_type}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Voice sec :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -7 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.cs_voice_call_seconds}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Volte Call sec :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -4 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.volte_call_seconds}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Data Available :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -3 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_data_octets_available}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Input Data :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_input_data_octets_available}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Output Data :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -5 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_output_data_octets_available}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Data Consumed :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -1 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_data_octets_consumed}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Call sec available :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_call_seconds_available}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Call sec consumed :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft:0 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_call_seconds_consumed}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    SMS Available :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -3 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_sms_available}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    SMS Consumed :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -1 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.total_sms_consumed}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                </Grid>


                            </Grid>

                           
                        </Card>

                    </Paper>
                    <Grid>

                    </Grid>
                </Grid>
            )
        } else {
            return
            <></>
        }
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
    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container',marginLeft:-1, marginTop: -2.5,width:'79vw' }}>

            <Box sx={{ width: '70%', }}>
            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                        <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                            <Grid>
                                <Typography
                                    style={{

                                        fontSize: '20px',
                                        paddingLeft: 10,
                                        fontWeight: 'bold',

                                    }}
                                >Pre Paid Account</Typography>
                            </Grid>
                        </Paper>
                    </Box>

                    
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

                <Box sx={{
                    paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px',

                }}>
                    <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                        variant="contained" backgroundColor="#253A7D" onClick={handleButtonClick}>
                        Add New
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
}