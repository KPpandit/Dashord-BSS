import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Broadband(props) {
    const columns = [
        { id: 'serialNumber', name: 'Serial Number' },
        // { id: 'brand', name: 'Brand' },
        { id: 'vendorId', name: 'Vendor ID' },
        { id: 'macAddress', name: 'Mac Address' },
        { id: 'cpeUsername', name: 'User Name' },
        // { id: 'cpePassword', name: 'Password'},
        { id: 'activationDate', name: 'Activation  Date' },
        
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
            const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/routers', {
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
        navigate('/addVendor');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };
    const [saveFileName, setSaveFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSaveFile = () => {
        if (selectedFile) {
            // Perform logic to set the file name
            const fileName = selectedFile.name; // Using the selected file name
            setSaveFileName(fileName);

            // Depending on your requirement, you can perform additional actions such as saving the file
            // Here, I'm just logging the selected file details
            console.log('Selected File:', selectedFile);

            // Assuming you want to upload the file using axios
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('https://bssproxy01.neotel.nr/crm/api/router/upload/excel?vendorId=1', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your authorization token here
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                toast.success('File uploaded successfully:', { autoClose: 2000 });
                console.log('File uploaded successfully:', response.data);
            }).catch(error => {
                // toast.success('File uploaded successfully:', { autoClose: 2000 });
                console.error('Error uploading file:', error.response.data);
                toast.error(error.response.data.Database_error, { autoClose: 3000 });
            });
        } else {
            console.error('No file selected.');
        }
    };

    const SelectedRecordDetails = () => {


        if (selectedRecord) {
            return (
                <Grid>
                    <Paper elevation={10}>


                        <Card variant="outlined" sx={{ width: 380, fontFamily: "Roboto" }}>

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
                                            Manufactorer : {selectedRecord.deviceManufactorer}
                                        </Typography>

                                    </Stack>
                                </Grid>

                            </Box>
                            <Grid container>
                                <Grid item xs={12} paddingLeft={1}>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'left' }}>
                                                    Serial Number :</Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.serialNumber}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Brand :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.brand}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Allocation :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.allocationDate}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Creation Time:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.creationTime}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Device Static IP :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }} >
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.deviceStaticIp}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />

                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Device Status :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: 0 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.deviceStatus}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} padding={1}>
                                {/* <Grid item xs={12}>
                                    <Button variant="contained"
                                        sx={{ backgroundColor: '#253A7D', width:'100%',boxShadow: 20}}
                                        onClick={() => {
                                            navigate('/EditVendorManagement', { state: { selectObj: selectedRecord } })
                                        }}
                                    >Edit Record</Button>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Button
                                        onClick={() => {
                                            handleOpenConfirmationDialog(selectedRecord.id)
                                            console.log("From teh Customer Delete Button")
                                        }}
                                        sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20, marginY: 1 }}
                                        variant="contained">Assign Broadband</Button>
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
                            >Broad Band</Typography>
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

                <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                        variant="contained" backgroundColor="#253A7D" onClick={handleButtonClick}>
                        Add New SIM
                    </Button>
                    <Grid item xs={8} sx={{ marginY: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TextField type="file"
                                onChange={handleFileChange}
                            />
                            <Button style={{ backgroundColor: '#FBB716', color: 'black' }} sx={{ marginX: 1, boxShadow: 20 }}
                                onClick={handleSaveFile}
                            >Save File</Button>
                        </Box>
                    </Grid>
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

