import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Popup from '../Popup/Popup';
import Addhss from './AddHss';
import AddHssBulk from './AddHssBulk';
import { FourSquare } from 'react-loading-indicators';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EditCallAndSmsService from './EditHSSServices/EditCallAndSmsService';

const AdddHssSubscriber = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        { id: 'imsi', name: 'IMSI' },
        { id: 'msisdn', name: 'MSISDN' },
        { id: 'serviceCapability.Attach.LTE', name: '4G' },
        { id: 'serviceCapability.Attach.NR', name: '5G' },
        { id: 'serviceCapability.Attach.IMS', name: 'Calls' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.17.1.11:9697/api/hss/detail/get/all/subscribers', {
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

        console.log(`Deleting record with ID: ${recordIdToDelete}`);


        axios.delete(`http://172.17.1.11:9697/api/hss/detail/delete?imsi=${recordIdToDelete}&msisdn=`, {
            headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                console.log(`Record with ID ${recordIdToDelete} deleted successfully.`);
                SetDelete('deleted');


                fetchData();
            })
            .catch(error => {

                console.error(`Error deleting record with ID ${recordIdToDelete}:`, error);
            });

        // Close the confirmation dialog
        setConfirmationDialogOpen(false);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.17.1.11:9697/api/hss/detail/get/all/subscribers', {
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

    const handleOpenConfirmationDialog = (id, msisdn) => {
        setRecordIdToDelete(id);
        setRecordMsisdnToDelete(msisdn)
        console.log("xxxx==>" + id)
        console.log("xxxx==>" + msisdn)
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

    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };

    

    const SelectedRecordDetails = () => {
        const handleBlockServices = (imsi) => {
            axios.put(`http://172.17.1.11:9697/api/hss/detail/block/subscriber/`+imsi, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {

                console.log(`Record blocked Succesfully successfully.`);
                toast.success('All Services of this '+imsi+' are now blocked', { autoClose: 2000 });


                fetchData();
            })
            .catch(error => {

                console.error(`Erroor about the block API `, error);
            });
        }
        const handleUnBlockServices = (imsi) => {
            axios.put(`http://172.17.1.11:9697/api/hss/detail/unblock/subscriber/`+imsi, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {

                console.log(`Record Un-blocked Succesfully`);
                toast.success('All Services of this '+imsi+' are now Un-blocked', { autoClose: 2000 });


                fetchData();
            })
            .catch(error => {

                console.error(`Erroor about the block API `, error);
            });
        }

        if (selectedRecord) {
            return (
                <Grid>
                    <Paper elevation={10}>


                        <Card variant="outlined" sx={{ maxWidth: 420, fontFamily: "Roboto", width: '380px' }}>

                            <Box sx={{ p: 1, }}>

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
                                            IMSI: {selectedRecord.imsi}
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
                                                <Typography sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'left' }}>  IMSI :</Typography>
                                            </Grid>
                                            <Grid item xs={7} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.imsi}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    MSISDN :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.msisdn}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={12} >
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px' }}>
                                                    CALL  :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    OutGoing :  {String(selectedRecord.serviceCapability.Voice.Outgoing)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    Incoming :  {String(selectedRecord.serviceCapability.Voice.Incoming)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px'}}>
                                                    SMS  :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    Outgoing :  {String(selectedRecord.serviceCapability.SMS.OutgoingSms)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    SMS Service :  {String(selectedRecord.serviceCapability.SMS.OutgoingServiceSms)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    Incoming Sms :  {String(selectedRecord.serviceCapability.SMS.IncomingSms)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={12} >
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px' }}>
                                                    DATA Service  :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    4 G :  {String(selectedRecord.serviceCapability.DataService.LTE)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{ marginLeft: 0 }}>

                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    5 G :  {String(selectedRecord.serviceCapability.DataService.NR)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>


                            </Grid>

                            <Grid container spacing={1} padding={1}>
                                <Grid item xs={6}>
                                    <Button variant="contained"
                                        sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20 }}
                                        onClick={() => {
                                            handleBlockServices(selectedRecord.imsi)
                                        }}
                                    >Block Services</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained"
                                        sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20 }}
                                        onClick={() => {
                                            handleUnBlockServices(selectedRecord.imsi)
                                        }}
                                    >Active Services</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained"
                                        sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20 }}
                                        onClick={(e) => {
                                            setOpenPopup3(true);
                                        }}
                                    >Edit Call and SMS Service</Button>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Button
                                        onClick={() => {
                                            handleOpenConfirmationDialog(selectedRecord.imsi, selectedRecord.msisdn)
                                            console.log("From teh Customer Delete Button")
                                        }}
                                        sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20, marginY: 1 }}
                                        variant="contained">Delete Record</Button>
                                </Grid> */}




                            </Grid>
                        </Card>

                    </Paper>
                    <Popup
                    title="EDIT CALL AND SMS SERVICE"
                    openPopup={openPopup3}
                    setOpenPopup={setOpenPopup3}
                >
                    <EditCallAndSmsService result={selectedRecord.imsi} onClose={closePopup3} />
                    {/* <AddInventory /> */}
                </Popup>
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
            .get(`http://172.17.1.11:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
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
    const [openPopup, setOpenPopup] = useState(false);
    const closePopup = () => {
        setOpenPopup(false);
    };
    const [openPopup2, setOpenPopup2] = useState(false);
    const closePopup2 = () => {
        setOpenPopup2(false);
    };
    const [openPopup3, setOpenPopup3] = useState(false);
    const closePopup3 = () => {
        setOpenPopup3(false);
    };
    return (<Box >
        {isLoading ? (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: '60vh' }}

            >
                <FourSquare color="#FAC22E" size="medium" text="Load..." textColor="#253A7D" />
            </Grid>

        ) :
            <Box sx={{ display: 'container', marginTop: -2.5 }}>
             <ToastContainer position="bottom-left" />
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
                                >Add Subscriber</Typography>
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
                                                                console.log(column.id.serviceCapability + "from customer row"),

                                                                <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>
                                                                    {column.id === 'serviceCapability.Attach.LTE' ? (
                                                                        // First condition for serviceCapability.Attach.LTE
                                                                        <> {row.serviceCapability?.Attach?.LTE ? "Active" : "Inactive"} </>
                                                                    ) : column.id === 'serviceCapability.Attach.NR' ? (
                                                                        // Second condition for anotherProperty
                                                                        <> {row.serviceCapability?.Attach?.NR ? "Active" : "InActive"} </>
                                                                    ) :
                                                                        column.id === 'serviceCapability.Attach.IMS' ? (
                                                                            // Second condition for anotherProperty
                                                                            <> {row.serviceCapability?.Attach?.IMS ? "Active" : "InActive"} </>
                                                                        ) :

                                                                            (
                                                                                // Default condition
                                                                                <> {row[column.id]} </>
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                        <Button
                            sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                            variant="contained"
                            onClick={(e) => {
                                setOpenPopup(true);
                            }}
                        >
                            Add New Subscriber
                        </Button>
                        <Button
                            sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                            variant="contained"
                            onClick={(e) => {
                                setOpenPopup2(true);
                            }}
                        >
                            Add Subscriber in Bulk
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
                <Popup
                    title="Add Subscriber"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Addhss onClose={closePopup} />
                    {/* <AddInventory /> */}
                </Popup>
                <Popup
                    title="Add Subscriber in Bulk"
                    openPopup={openPopup2}
                    setOpenPopup={setOpenPopup2}
                >
                    <AddHssBulk onClose={closePopup2} />
                    {/* <AddInventory /> */}
                </Popup>
               
            </Box>

        }

    </Box>
    )
};

export default AdddHssSubscriber;
