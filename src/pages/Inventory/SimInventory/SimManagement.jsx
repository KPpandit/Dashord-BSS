import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Sim_manage = (props) => {
    const columns = [
        { id: 'msisdn', name: 'Msisdn' },
        { id: 'imsi', name: 'IMSI' },
        { id: 'category', name: 'Category' },
        { id: 'partnerId', name: 'Agent ID' },
        { id: 'specialNumber', name: 'Special Number' },
        // { id: 'activationDate', name: 'Activation Date' },
        { id: 'simType', name: 'Sim Type' },
        { id: 'sellingPriceUsd', name: 'Selling Price' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/siminventories', {
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
        axios.delete(`http://172.17.1.20:9696/api/hss/detail/delete?imsi=${recordIdToDelete}&msisdn=${recordMsisdnToDelete}`, {
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
            const response = await axios.get('http://172.17.1.20:9696/api/sim/mgmt/detail/get/all', {
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
    const handleButtonClick = () => {
        navigate('/addsim_management');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };

    const SelectedRecordDetails = () => {
        if (!selectedRecord) return <></>;

        const DetailRow = ({ label, value }) => (
            <Box sx={{ p: 1 }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                            {label}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ marginLeft: 0 }}>
                        <Typography sx={{ fontSize: '17px', textAlign: 'left' }} gutterBottom variant="body2">
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider light />
            </Box>
        );

        return (
            <Grid>
                <Paper elevation={10}>
                    <Card variant="outlined" sx={{ maxWidth: 360, fontFamily: "Roboto" }}>
                        <Box sx={{ p: 1 }}>
                            <Grid sx={{ padding: 1, backgroundColor: '#253A7D' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography
                                        style={{
                                            fontSize: '17px',
                                            color: 'white',
                                            marginBottom: '2px',
                                            backgroundColor: '#253A7D',
                                            padding: '2px',
                                            display: 'inline-block',
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {selectedRecord.msisdn}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Box>
                        <Grid container>
                            <Grid item xs={12} paddingLeft={1}>
                                <Divider light />
                                <DetailRow label="IMSI :" value={selectedRecord.imsi} />
                                <DetailRow label="Category :" value={selectedRecord.category} />
                                <DetailRow label="P-IMSI :" value={selectedRecord.pimsi} />
                                <DetailRow label="Batch Date :" value={selectedRecord.batchDate} />
                                <DetailRow label="Vendor Id :" value={selectedRecord.vendorId} />
                                <DetailRow label="Vendor Name :" value={selectedRecord.vendorName} />
                                <DetailRow label="Buying Price :" value={String(selectedRecord.buyingPriceUsd)} />
                                <DetailRow label="Auth ID :" value={String(selectedRecord.auth_id)} />
                                <DetailRow label="Allocation Date :" value={selectedRecord.allocationDate} />
                                <DetailRow label="Other taxes :" value={selectedRecord.otherTaxes} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} padding={1}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20 }}
                                    onClick={() => navigate('/editSim', { state: { selectObj: selectedRecord } })}
                                >
                                    Edit Record
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#253A7D', width: '100%', boxShadow: 20, marginY: 1 }}
                                    onClick={() => handleOpenConfirmationDialog(selectedRecord.imsi, selectedRecord.msisdn)}
                                >
                                    Delete Record
                                </Button>
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
            .get(`http://172.17.1.20:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
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

            axios.post('https://bssproxy01.neotel.nr/crm/api/sim/upload/excel?vendorId=1', formData, {
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


    return (
        <Box sx={{ display: 'container', marginTop: -2.5 }}>
        <ToastContainer position="bottom-left" />
        <Box sx={{ width: '78%' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', marginX: -0.8 }}>
                    <Grid>
                        <Typography sx={{ fontSize: '20px', paddingLeft: 1, fontWeight: 'bold', color: '#253A7D' }}>
                            SIM/e-SIM Management
                        </Typography>
                    </Grid>
                </Paper>
            </Box>
            <Grid container padding={2}>
                <Grid item xs={12} sx={{ textAlign: 'right', marginY: -0.5 }}>
                    <form onSubmit={handleSerch}>
                        <Paper elevation={10} sx={{ marginBottom: 2 }}>
                            <TextField
                                onClick={handleSerch}
                                label="Search"
                                type="text"
                                fullWidth
                                name="value"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
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
                                            key={column.id}
                                            sx={{ textAlign: 'left', backgroundColor: '#253A7D', color: 'white' }}
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
                                                sx={highlightedRow === row ? { backgroundColor: '#F6B625' } : {}}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>
                                                        {column.id === 'ekycDate'
                                                            ? ''
                                                            : String(row[column.id])}
                                                    </TableCell>
                                                ))}
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
            <Box
                sx={{
                    paddingLeft: '16px',
                    paddingBottom: '16px',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                    variant="contained"
                    onClick={handleButtonClick}
                >
                    Add New SIM
                </Button>
                <Grid item xs={8} sx={{ marginY: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TextField type="file" onChange={handleFileChange} />
                        <Button
                            sx={{ backgroundColor: '#FBB716', color: 'black', marginX: 1, boxShadow: 20 }}
                            onClick={handleSaveFile}
                        >
                            Save File
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Box>
        <Box sx={{ paddingLeft: 1, paddingTop: 1.9 }}>
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

export default Sim_manage;