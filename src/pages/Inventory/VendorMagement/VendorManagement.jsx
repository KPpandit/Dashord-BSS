import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


const VendorManagement = (props) => {
    const columns = [
        { id: 'firstName', name: 'First Name'},
        { id: 'lastName', name: 'Last Name'},
        { id: 'email', name: 'E-mail'},
        { id: 'contact', name: 'Contact' },
        { id: 'address', name: 'Address'},
        { id: 'createDate', name: 'Created Date'},
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/vendors', {
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
                    console.log("From inside if condition");
                    localStorage.removeItem('token');
                    navigate("/");
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
            const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/vendors', {
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
        console.log("xxxx==>"+id)
        console.log("xxxx==>"+id)
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
        navigate('/addVendor');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };
   
    const SelectedRecordDetails = () => {


        if (selectedRecord) {
            return (
                <Grid>
                    <Paper elevation={10}>


                        <Card variant="outlined" sx={{ width: 380, fontFamily: "Roboto" }}>

                            <Box sx={{ p: 1,}}>

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
                                            Vendor ID: {selectedRecord.id}
                                        </Typography>

                                    </Stack>
                                </Grid>

                            </Box>
                            <Grid container>
                                <Grid item xs={12} paddingLeft={1}>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <Typography sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'left' }}>  Name :</Typography>
                                            </Grid>
                                            <Grid item xs={9} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.firstName}{" "}{selectedRecord.maidenName}{" "}{selectedRecord.lastName}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Email :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.email}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Contact No :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.contact}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Address :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.address}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Company Name :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.companyName)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />

                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                  Created Date :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.createDate)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />                                                                       
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} padding={1}>
                                <Grid item xs={12}>
                                    <Button variant="contained"
                                        sx={{ backgroundColor: '#253A7D', width:'100%',boxShadow: 20}}
                                        onClick={() => {
                                            navigate('/EditVendorManagement', { state: { selectObj: selectedRecord } })
                                        }}
                                    >Edit Record</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={() => {
                                            handleOpenConfirmationDialog(selectedRecord.id)
                                            console.log("From teh Customer Delete Button")
                                        }}
                                        sx={{ backgroundColor: '#253A7D', width:'100%',boxShadow: 20,marginY:1 }}
                                        variant="contained">Delete Record</Button>
                                </Grid>




                            </Grid>
                        </Card>

                    </Paper>
                    
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
                                >Vendor Management</Typography>
                            </Grid>
                        </Paper>
                    </Box>
                    <Grid container padding={2}>
                        <Grid item xs={4} sx={{textAlign: 'right', marginY: -0.5 }} >
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
                    <Grid item xs={8} sx={{marginY:1}}>
                        <Button style={{backgroundColor: '#FBB716', color: 'black'}}sx={{marginX:1,boxShadow: 20}}>Export to PDF</Button>
                        <Button style={{backgroundColor: '#FBB716', color: 'black'}}sx={{marginX:1,boxShadow: 20}}>Export to CSV</Button>
                        <Button style={{backgroundColor: '#FBB716', color: 'black'}} sx={{boxShadow: 20}}>Export to Excel</Button>
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

export default VendorManagement;