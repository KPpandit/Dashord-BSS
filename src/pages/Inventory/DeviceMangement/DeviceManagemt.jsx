import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


const DeviceManagement = (props) => {
    const columns = [
        { id: 'id', name: 'Device id' },
        { id: 'deviceModel', name: 'Device Model' },
        { id: 'deviceMake', name: 'Device Make' },
        { id: 'manufacturer', name: 'Manufactured' },
        // { id: 'manufactureDate', name: 'Manufactured Date' },
        { id: 'deviceType', name: 'Device Type' },
        { id: 'sellingPriceUsd', name: 'Selling Price' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/deviceinventories', {
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
        axios.delete(`https://bssproxy01.neotel.nr/crm/api/hss/detail/delete?imsi=${recordIdToDelete}&msisdn=${recordMsisdnToDelete}`, {
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
            const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/msisdn/mgmt/detail/get/all', {
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handlePageChange = (event, newPage) => setPage(newPage);
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // const [page, pagechange] = [0];
    // const [rowperpage, rowperpagechange] = [5];

    // const handlechangepage = (event, newpage) => {
    //     pagechange(newpage);
    // };
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
        navigate('/adddevicemanagement');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };

    const SelectedRecordDetails = () => {
        if (!selectedRecord) return null;

        const textStyle = { fontSize: "17px", textAlign: "left" };
        const labelStyle = { fontWeight: "500", ...textStyle };
        const buttonStyle = {
            backgroundColor: "#253A7D",
            width: "100%",
            boxShadow: 20,
        };

        const DetailRow = ({ label, value, xsLabel = 5, xsValue = 7 }) => (
            <Grid container spacing={1} padding={0.5}>
                <Grid item xs={xsLabel}>
                    <Typography sx={labelStyle}>{label}</Typography>
                </Grid>
                <Grid item xs={xsValue}>
                    <Typography sx={textStyle} gutterBottom variant="body2">
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        );

        return (
            <Grid>
                <Paper elevation={10}>
                    <Card variant="outlined" sx={{ width: 360, fontFamily: "Roboto" }}>
                        <Box sx={{ p: 1 }}>
                            <Grid sx={{ padding: 1, backgroundColor: "#253A7D" }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "17px",
                                            color: "white",
                                            backgroundColor: "#253A7D",
                                            padding: "2px",
                                        }}
                                        gutterBottom
                                    >
                                        {selectedRecord.deviceModel}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Box>

                        <Grid container>
                            <Grid item xs={12} paddingLeft={1}>
                                <Divider light />
                                <DetailRow label="Device Make:" value={selectedRecord.deviceMake} />
                                <Divider light />
                                <DetailRow label="Batch ID:" value={selectedRecord.batchId} />
                                <Divider light />
                                <DetailRow label="OS Type:" value={selectedRecord.ostype} />
                                <Divider light />
                                <DetailRow label="Vendor Name:" value={selectedRecord.vendorName} />
                                <Divider light />
                                <DetailRow
                                    label="Vendor Contact:"
                                    value={String(selectedRecord.vendorContact)}
                                />
                                <Divider light />
                                <DetailRow
                                    label="Vendor Address:"
                                    value={String(selectedRecord.vendorAddress)}
                                />
                                <Divider light />
                                <DetailRow
                                    label="Buying Price:"
                                    value={String(selectedRecord.buyingPriceUsd)}
                                />
                                <Divider light />
                                <DetailRow
                                    label="Selling Price:"
                                    value={String(selectedRecord.sellingPriceUsd)}
                                />
                                <Divider light />
                                <DetailRow label="VAT:" value={selectedRecord.vat} xsLabel={2} xsValue={4} />
                                <Divider light />
                                <DetailRow
                                    label="Other Taxes:"
                                    value={String(selectedRecord.otherTaxes)}
                                    xsLabel={4}
                                    xsValue={6}
                                />
                                <Divider light />
                            </Grid>
                        </Grid>

                        {/* <Grid container spacing={1} padding={1}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    sx={buttonStyle}
                                    onClick={() =>
                                        navigate("/Editdevicemanagement", {
                                            state: { selectObj: selectedRecord },
                                        })
                                    }
                                >
                                    Edit Record
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    sx={{ ...buttonStyle, marginY: 1 }}
                                    onClick={() => {
                                        handleOpenConfirmationDialog(
                                            selectedRecord.imsi,
                                            selectedRecord.msisdn
                                        );
                                    }}
                                >
                                    Delete Record
                                </Button>
                            </Grid>
                        </Grid> */}
                    </Card>
                </Paper>
            </Grid>
        );
    };


    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://bssproxy01.neotel.nr/crm/api/vendor/mgmt/detail/search?keyword=${searchValue}`);
            setRows(response.data);
        } catch (error) {
            console.error('Error searching data:', error);
        }
    };


    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    }; const [saveFileName, setSaveFileName] = useState('');
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

            axios.post('https://bssproxy01.neotel.nr/crm/api/device/upload/excel?vendorId=1', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your authorization token here
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                toast.success('File uploaded successfully:', { autoClose: 2000 });
                console.log('File uploaded successfully:', response.data);
            }).catch(error => {
                console.error('Error uploading file:', error);
                toast.error(error.response.data, { autoClose: 2000 });
            });
        } else {
            console.error('No file selected.');
        }
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
                            >Device Management</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Grid container padding={2}>
                    <Grid item xs={4} sx={{ textAlign: 'right', marginY: -0.5 }} >
                        <form onSubmit={handleSearch}>
                            <Paper elevation={10} sx={{ marginBottom: 2 }}>
                                <TextField
                                    onClick={handleSearch}
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
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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


                                                                {String(row[column.id])}
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
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </Paper>
                </Box>

                <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                        variant="contained" backgroundColor="#253A7D" onClick={handleButtonClick}>
                        Add New
                    </Button>
                    <Grid item xs={8} sx={{ marginY: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TextField type="file" onChange={handleFileChange} />
                            <Button style={{ backgroundColor: '#FBB716', color: 'black' }} sx={{ marginX: 1, boxShadow: 20 }} onClick={handleSaveFile}>Save File</Button>
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

export default DeviceManagement;