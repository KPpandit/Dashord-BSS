import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import blanPhoto from '../../assets/blanPhoto.png'
import { TokenContext } from '../../TokenContext';
const Customer = (props) => {
    const { token } = useContext(TokenContext);
    console.log(token + "token value from Context API")
    const columns = [
        { id: 'firstName', name: 'Name' },
        { id: 'ekycStatus', name: 'Ekyc Status' },
        { id: 'ekycToken', name: 'Ekyc Token' },
        { id: 'ekycDate', name: 'Ekyc Date' },
        { id: 'phonePhoneNumber', name: 'Phone No' },
        // { id: 'ekycStatus', name: 'Ekyc Status' },
        { id: 'customerType', name: 'Customer Type' },

    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    const [abc, setAbc] = useState(false)
    const [delete1, SetDelete] = useState([])

    const handleConfirmDelete = () => {
        // Perform the delete operation here using the recordIdToDelete
        // After successful deletion, you can update the UI accordingly
        console.log(`Deleting record with ID: ${recordIdToDelete}`);

        // Make an API call to delete the record
        axios.delete(`http://172.5.10.2:9090/api/deletecustomer/${recordIdToDelete}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Handle success, you can update the UI or take other actions
                SetDelete(prevState => prevState === 'deleted' ? 'not-deleted' : 'deleted');
                fetchData();
                console.log(`Record with ID ${recordIdToDelete} deleted successfully.`);
                setAbc(true);

                // Fetch updated data after successful deletion

            })
            .catch(error => {
                // Handle error, you can display an error message or take other actions
                console.error(`Error deleting record with ID ${recordIdToDelete}:`, error);
                SetDelete(prevState => prevState === 'deleted' ? 'not-deleted' : 'deleted');
                setAbc(true);
            });

        // Close the confirmation dialog
        setConfirmationDialogOpen(false);
    };

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
        navigate('/newCustomer');
    };
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.5.10.2:9090/api/customers/pack/details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    }, [tokenValue, delete1]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.5.10.2:9090/api/customers/pack/details', {
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
    const handleRowClick = (row) => {
        setSelectedRecord(row);

        fetchPhoto1(row);
    };
    const fetchPhoto1 = async (row) => {

        try {
            const photoResponse = await axios.get(`http://172.5.10.2:9090/api/image/${row.id}`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
            });

            if (photoResponse.status === 200) {
                const imageBlob = new Blob([photoResponse.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setSelectedPhoto(imageUrl);
            } else {
                console.error('Failed to fetch photo details.');
            }
        } catch (error) {
            setSelectedPhoto(null);
            console.log('Failed to load the Photo', error);
        }
    };
    const SelectedRecordDetails = () => {




        if (selectedRecord) {

            return (
                <Grid>
                    <Paper elevation={10}>


                        <Grid xs={12}>
                            <Card variant="outlined" sx={{ maxWidth: 400, fontFamily: "Roboto" }}>

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
                                                {selectedRecord.firstName}
                                            </Typography>

                                        </Stack>
                                    </Grid>

                                </Box>
                                <Grid container>
                                    <Grid item xs={12} paddingLeft={1}>

                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={7.3} >
                                                    <Grid container spacing={1.5} >
                                                        <Grid item xs={3} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Title :
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            {selectedRecord.personTitle}
                                                        </Grid>
                                                        <Grid item xs={3.6} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Name :
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            {selectedRecord.firstName} {selectedRecord.lastName}
                                                        </Grid>

                                                        <Grid item xs={4.1} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Gender :
                                                        </Grid>
                                                        <Grid item xs={7}>
                                                            <Typography sx={{ textAlign: 'left' }}>
                                                                {selectedRecord.gender}
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item xs={6.1} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            EKYC Status :
                                                        </Grid>
                                                        <Grid item xs={5} sx={{ textAlign: 'left' }}>
                                                            <Typography sx={{ textAlign: 'left' }}>
                                                                {selectedRecord.ekycStatus}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={3.6} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Email :
                                                        </Grid>
                                                        <Grid item xs={8} sx={{ textAlign: 'left' }}>
                                                            <Typography sx={{ textAlign: 'left' }} gutterBottom >
                                                                {selectedRecord.email}
                                                            </Typography>
                                                        </Grid>
                                                        <Divider light />

                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4} sx={{ paddingRight: 1 }}>
                                                    {selectedPhoto ? (
                                                        <img
                                                            src={selectedPhoto}
                                                            alt="Selected"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '200px',
                                                                paddingBottom: '0px',
                                                                border: '5px solid grey', // Set border style, adjust color and width as needed
                                                                borderRadius: '15px', // Optional: Add border-radius for rounded corners
                                                                transition: 'transform 0.2s', // Animation
                                                            }}
                                                            className="zoom"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={blanPhoto}
                                                            alt="Blank"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '250px',
                                                                paddingBottom: '0px',
                                                                border: '5px solid grey', // Set border style, adjust color and width as needed
                                                                borderRadius: '15px', // Optional: Add border-radius for rounded corners
                                                                transition: 'transform 0.2s', // Animation
                                                            }}
                                                            className="zoom"
                                                        />
                                                    )}
                                                    <style>{`
                                                    .zoom:hover {
                                                    transform: scale(1.5); /* (100% zoom) */
                                                    }
                                                `}</style>
                                                </Grid>


                                            </Grid>

                                        </Grid>



                                        <Divider light />

                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Created Date :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -4 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2"
                                                    >
                                                        {/* {new Date(selectedRecord.createDateTime).toISOString().split('T')[0]} */}
                                                        {/* {selectedRecord.createDateTime} */}
                                                        {selectedRecord.createDateTime}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />

                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Monthly Limit :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -4 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2">
                                                        {selectedRecord.monthlyLimit}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />

                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        LandLine No. :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -4 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2">
                                                        {selectedRecord.landlineNumber}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />
                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Ekyc Status :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2">
                                                        {selectedRecord.ekycStatus}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />
                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Ekyc Date :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2">
                                                        {selectedRecord.ekycDate}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />
                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Ekyc Token :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2">
                                                        {selectedRecord.ekycToken}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />
                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Payment Status :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -2 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2">
                                                        {String(selectedRecord.paymentStatus)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />
                                    </Grid>


                                </Grid>

                                <Grid container spacing={1} padding={1}>
                                    <Grid item sx={6}>
                                        <Button variant="contained"
                                            sx={{ backgroundColor: '#253A7D' }}
                                            onClick={() => navigate('/addPayment', { state: { id: selectedRecord.id, name: selectedRecord.name } })}
                                        >Make Payment</Button>
                                    </Grid>
                                    <Grid item sx={6}>
                                        <Button
                                            onClick={() => navigate("/createOrder", { state: { customerObject: selectedRecord } })}
                                            sx={{ backgroundColor: '#253A7D' }}
                                            variant="contained">Create Order</Button>
                                    </Grid>
                                    <Grid item sx={6}>
                                        <Button variant="contained"
                                            sx={{ backgroundColor: '#253A7D' }}
                                            onClick={() => {
                                                navigate('/editCustomer', { state: { id: selectedRecord.id, type: selectedRecord.customerType } })
                                            }}
                                        >Edit</Button>
                                    </Grid>
                                    <Grid item sx={6}>
                                        <Button
                                            onClick={() => {
                                                handleOpenConfirmationDialog(selectedRecord.id)
                                                console.log("From teh Customer De;eet Button")
                                            }}
                                            sx={{ backgroundColor: '#253A7D' }}
                                            variant="contained">Delete</Button>
                                    </Grid>
                                    {console.log(selectedRecord.customerType + "account type")}
                                    {selectedRecord.customerType === "Post-Paid" || selectedRecord.customerType === "post-paid" ? <Grid item sx={6}>
                                        <Button
                                            onClick={() => {
                                                navigate('/custInvoice', { state: { id: selectedRecord.simInventory.msisdn, type: selectedRecord.customerType } })
                                            }}
                                            sx={{ backgroundColor: '#253A7D' }}
                                            variant="contained">Invoice</Button>
                                    </Grid> : <></>}





                                </Grid>
                            </Card>
                        </Grid>

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
        setHighlightedRow(row)
        console.log("from hnadle row mouse enter");
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container', marginTop: -2.5 }}>

            <Box sx={{ width: '70%', }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',

                                }}
                            >Customer List</Typography>
                        </Grid>
                    </Paper>
                </Box>

                <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.5 }}>
                    <form
                        onSubmit={handleSerch}
                    >

                        <Paper elevation={10} sx={{ marginBottom: 2 }}>
                            <Grid lg={8} >
                                <TextField
                                    onClick={handleSerch}
                                    label="Search"
                                    type='text'
                                    fullWidth
                                    name='value'
                                    // onChange={(e) => setValue(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                // onSubmit={handleSerch}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

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
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                    <TableRow
                                                        key={i}
                                                        onClick={() => handleRowClick(row)}
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

                                                                {column.id === 'ekycDate' ? (
                                                                    // Render this content if the condition is true
                                                                    <>{
                                                                        row[column.id]

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
};

export default Customer;
