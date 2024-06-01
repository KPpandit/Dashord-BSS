import { Box, Button, Card, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
export default function Agent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        { id: 'fristName', name: 'Name' },
        { id: 'creationDate', name: 'Creation Date' },
        { id: 'contact', name: 'Contact' },
        { id: 'documentType', name: 'Document Type' },
        { id: 'isActive', name: 'Status' },
        { id: 'locallity', name: 'Locality' },


    ];
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const tokenValue = localStorage.getItem('token');
    const handleOpenConfirmationDialog = (id) => {
        setRecordIdToDelete(id);
        setConfirmationDialogOpen(true);
    };

    const handleCloseConfirmationDialog = () => {
        setRecordIdToDelete(null);
        setConfirmationDialogOpen(false);
    };
    const [forDelete, SetDelete] = useState(false);



    const handleConfirmDelete = () => {
        // Perform the delete operation here using the recordIdToDelete
        // After successful deletion, you can update the UI accordingly
        console.log(`Deleting record with ID: ${recordIdToDelete}`);

        // Make an API call to delete the record
        axios.delete(`http://172.5.10.2:9090/api/deletepartner/${recordIdToDelete}`
            , {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                // Handle success, you can update the UI or take other actions
                console.log(`Record with ID ${recordIdToDelete} deleted successfully.`);
                SetDelete('deleted');
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
            const response = await axios.get('http://172.5.10.2:9090/api/partners', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            setRows(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("response from Error");

            console.error('Error fetching data from API:', error);
        }
    };
    // Generate sample data


    const [rows, setRows] = useState('');
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
    const handleButtonClick = () => {
        navigate('/newAgent');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
        fetchSellingData(row)

    };
    const [sellingRecord, setSellingRecord] = useState(null);

    useEffect(() => {


        fetchData();

    }, [tokenValue, sellingRecord]);
    const fetchSellingData = async (row) => {

        try {
            const response = await axios.get(`http://172.5.10.2:9090/api/inventory/product/details/partner/${row.id}`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }

            });
            const apiData = response.data;
            setSellingRecord(apiData);
            console.log(sellingRecord, "   from Sim Record");

        } catch (error) {

        }
    };
    const SelectedRecordDetails = () => {


        if (selectedRecord && sellingRecord) {
            return (
                <Grid>
                    <Paper elevation={10}>


                        <Card variant="outlined" sx={{ width: 400 }}>

                            <Box sx={{ padding: 0.3 }}>

                                <Grid sx={{ padding: 0.8, backgroundColor: '#253A7D' }}>
                                    <Stack direction="row"
                                        sx={{ borderRadius: '20%', }}
                                        justifyContent="space-between" alignItems="center">
                                        <Typography
                                            style={{
                                                fontSize: '17px',
                                                fontWeight: '500',
                                                color: 'white',
                                                marginBottom: '0px',

                                                // Add this line for circular border
                                                backgroundColor: '#253A7D',  // Add this line for background color
                                                padding: '4px',  // Add this line for padding
                                                display: 'inline-block',

                                            }}
                                            gutterBottom component="div">
                                            {selectedRecord.fristName} {selectedRecord.lastName}
                                        </Typography>

                                    </Stack>
                                </Grid>

                            </Box>
                            <Grid container>
                                <Grid item xs={12} >


                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Total Comission : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord && selectedRecord.partnerCommission && selectedRecord.partnerCommission.amount !== null
                                                        ? selectedRecord.partnerCommission.amount
                                                        : "no comission"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Bussiness Address : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.businessAddress}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />



                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Document ID : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.documentId)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    EKYC Token : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.token)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Document Type : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.documentType)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />

                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={3}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Email : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.email)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Inactive Reason : </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(selectedRecord.reasonStatus)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5}>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    SIM in Stock : </Typography>
                                            </Grid>
                                            <Grid item xs={2} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(sellingRecord.availableSim)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    SIM Sold: </Typography>
                                            </Grid>
                                            <Grid item xs={2} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(sellingRecord.allocatedSim)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container padding={0.5} spacing={2}>
                                            <Grid item xs={5}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Device in Stock: </Typography>
                                            </Grid>
                                            <Grid item xs={1.8} alignItems={'left'} sx={{ paddingLeft: -2 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(sellingRecord.availableDevice)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>

                                                    Device Sold : </Typography>
                                            </Grid>
                                            <Grid item xs={1} alignItems={'left'} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {String(sellingRecord.allocatedDevice)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>




                                </Grid>


                            </Grid>
                            <div>
                                {/* <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px', marginLeft: '10px', backgroundColor: '#253A7D', boxShadow: 20 }}
                                    onClick={() => navigate('/userCodes', { state: { id: selectedRecord.id } })}
                                >USER CODES</Button> */}
                                {/* <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#253A7D', boxShadow: 20 }}
                                    onClick={() => navigate('/addSubAgent', { state: { id: selectedRecord.id } })}
                                >Add SUB-AGENT</Button> */}
                                <Button variant="contained" 
                                style={{ marginRight: '10px', marginBottom: '10px', marginLeft: '10px', backgroundColor: '#253A7D', boxShadow: 20 }}
                                onClick={() => navigate('/singleAgentComission', { state: { id: selectedRecord } })}
                                >
                                    SHOW COMMISSIONS
                                </Button>
                                <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#253A7D', boxShadow: 20 }}
                                    onClick={() => navigate('/editAgent', { state: { id: selectedRecord.id } })}
                                >EDIT</Button>
                                <Button
                                    variant="contained"
                                    style={{ marginRight: '10px', marginBottom: '10px', marginLeft: '10px', backgroundColor: '#253A7D', boxShadow: 20 }}
                                    onClick={() => handleOpenConfirmationDialog(selectedRecord.id)}
                                >
                                    DELETE
                                </Button>
                            </div>
                        </Card>

                    </Paper>
                    <Grid>

                    </Grid>
                </Grid>
            )
        } else {
            return <></>
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

    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };

    return (

        <Box >
            {isLoading ? (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '60vh' }}

                >
                    <CircularProgress />
                </Grid>

            ) : <Box sx={{ display: 'container', marginTop: -3.5 }}>
                <Box sx={{ width: '70%' }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                        <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: 0.2, marginRight: 0.2 }}>
                            <Grid>
                                <Typography
                                    style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '20px',
                                        paddingLeft: '15px',
                                        fontWeight: 'bold',

                                    }}
                                > Agents List</Typography>
                            </Grid>
                        </Paper>
                    </Box>
                    <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }} >
                        <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.1 }}>
                            <form
                                onSubmit={handleSerch}
                            >

                                <Paper elevation={10} sx={{ marginBottom: 2 }}>
                                    <Grid lg={8}  >
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
                        <Paper elevation={10}>
                            <TableContainer sx={{ maxHeight: 600 }}>
                                <Table stickyHeader size='medium' padding="normal">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} sx={{ textAlign: 'left' }}><Typography fontFamily={'Sans-serif'}>{column.name}</Typography></TableCell>
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
                                                                    ? { backgroundColor: '#FBB716' }
                                                                    : {}
                                                            }
                                                        >
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>
                                                                    {column.id === 'isActive' ? (
                                                                        // Handle rendering of 'Status' column content here
                                                                        // For example:
                                                                        row[column.id] ? 'Active' : 'Inactive'
                                                                    ) : (
                                                                        // Render other column content
                                                                        String(row[column.id])
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

                        <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                            <Button variant="contained"
                                sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                                backgroundColor="#6471B5" onClick={handleButtonClick}>
                                ADD NEW
                            </Button>

                            <Button

                                variant="contained"

                                backgroundColor="#6471B5" onClick={e => navigate('/showCommison')} sx={{ marginLeft: '16px', backgroundColor: '#253A7D', boxShadow: 20 }}>
                                SHOW COMMISSIONS
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ paddingLeft: 3, paddingTop: 1.8 }} >
                    <SelectedRecordDetails />
                </Box>


            </Box>}

        </Box>
    )
};


