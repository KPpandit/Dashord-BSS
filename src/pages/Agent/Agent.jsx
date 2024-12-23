import { Box, Button, Card, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Riple } from 'react-loading-indicators';
export default function Agent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        { id: 'id', name: 'ID' },
        { id: 'fristName', name: 'Name' },
        { id: 'creationDate', name: 'Creation Date' },
        { id: 'contact', name: 'Contact' },
        { id: 'locallity', name: 'Locality' },
        { id: 'isActive', name: 'Status' },
        { id: 'documentId', name: 'Document ID' },

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
        axios.delete(`https://bssproxy01.neotel.nr/crm/api/deletepartner/${recordIdToDelete}`
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
            const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/partners', {
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
        navigate('/partner/newPartner');
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
            const response = await axios.get(`https://bssproxy01.neotel.nr/crm/api/inventory/product/details/partner/${row.id}`, {
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
        const [showAssignedFields, setShowAssignedFields] = useState(false);

        if (selectedRecord && sellingRecord) {
            const totalDevice = sellingRecord.allocatedDevice + sellingRecord.availableDevice;
            const totalSim = sellingRecord.allocatedSim + sellingRecord.availableSim;

            const toggleAssignedFields = () => {
                setShowAssignedFields(!showAssignedFields);
            };

            const fields = [
                // { label: "Total Commission", value: selectedRecord.partnerCommission?.amount || "no commission" },
                { label: "Business Address", value: selectedRecord.businessAddress },
                { label: "Document ID", value: String(selectedRecord.documentId) },
                { label: "EKYC Token", value: String(selectedRecord.token) },
                { label: "Document Type", value: String(selectedRecord.documentType) },
                { label: "Email", value: String(selectedRecord.email) },
                // { label: "Inactive Reason", value: String(selectedRecord.reasonStatus) },
            ];
            console.log("Hello",sellingRecord)

            const assignedFields = [
                { label: "All SIM", value: sellingRecord.SIM.totalSim },
                { label: "SIM in Stock", value: String(sellingRecord.SIM.availableSim) },
                { label: "SIM Sold", value: String(sellingRecord.SIM.activatedSim) },
                { label: "All Device", value: sellingRecord.DEVICE.totalDevice },
                { label: "Device in Stock", value: String(sellingRecord.DEVICE.availableDevice) },
                { label: "Device Sold", value: String(sellingRecord.DEVICE.allocatedDevice) },
                { label: "All Routers", value: sellingRecord.Router.totalRouter },
                { label: "Router in Stock", value: String(sellingRecord.Router.availableRouter) },
                { label: "Router Sold", value: String(sellingRecord.Router.allocatedRouter) },
            ];

            return (
                <Grid>
                    <Paper elevation={10}>
                        <Card variant="outlined" sx={{ width: 400 }}>
                            <Box sx={{ padding: 0.3 }}>
                                <Grid sx={{ padding: 0.8, backgroundColor: "#253A7D" }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontSize: "17px",
                                                fontWeight: 500,
                                                color: "white",
                                                backgroundColor: "#253A7D",
                                                padding: "4px",
                                                display: "inline-block",
                                            }}
                                            gutterBottom
                                        >
                                            {selectedRecord.fristName} {selectedRecord.lastName}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Box>
                            <Grid container>
                                <Grid item xs={12}>
                                    {fields.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Box sx={{ p: 1 }}>
                                                <Grid container padding={0.5}>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "500",
                                                                fontSize: "17px",
                                                                textAlign: "left",
                                                            }}
                                                        >
                                                            {item.label} :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} sx={{ textAlign: "left" }}>
                                                        <Typography sx={{ fontSize: "17px" }}>{item.value}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Divider light />
                                        </React.Fragment>
                                    ))}

                                    {/* Button to toggle assigned fields */}
                                    <Box sx={{ textAlign: "left", p: 1 }}>
                                        <Button
                                            variant="outlined"
                                            sx={{ color: "#253A7D", borderColor: "#253A7D" }}
                                            onClick={toggleAssignedFields}
                                        >
                                            {showAssignedFields ? "Hide Assigned Product -" : "Show Assigned Product +"}
                                        </Button>
                                    </Box>

                                    {/* Toggleable Assigned Fields */}
                                    {showAssignedFields &&
                                        assignedFields.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Box sx={{ p: 1 }}>
                                                    <Grid container padding={0.5}>
                                                        <Grid item xs={6}>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "500",
                                                                    fontSize: "17px",
                                                                    textAlign: "left",
                                                                }}
                                                            >
                                                                {item.label} :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ textAlign: "left" }}>
                                                            <Typography sx={{ fontSize: "17px" }}>{item.value}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Divider light />
                                            </React.Fragment>
                                        ))}
                                </Grid>
                            </Grid>
                            <Box >
                                <Grid container spacing={2} padding={2} justifyContent="space-between" alignItems="center">
                                    {/* Sell Core Balance Button */}
                                    <Grid item xs={6} sm={6} md={6}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: "#253A7D",
                                                boxShadow: 20,
                                            }}
                                            onClick={() =>
                                                navigate("/partner/assignBalance", { state: { record: selectedRecord.id } })
                                            }
                                        >
                                            Sell Core Balance
                                        </Button>
                                    </Grid>

                                    {/* Edit Button */}
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: "#253A7D",
                                                boxShadow: 20,
                                            }}
                                            onClick={() =>
                                                navigate("/partner/editPartner", { state: { id: selectedRecord.id } })
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </Grid>

                                    {/* Delete Button */}
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: "#253A7D",
                                                boxShadow: 20,
                                            }}
                                            onClick={() => handleOpenConfirmationDialog(selectedRecord.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>

                                    {/* Show Products Button */}
                                    <Grid item xs={6} sm={6} md={6}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: "#253A7D",
                                                boxShadow: 20,
                                            }}
                                            
                                            onClick={() =>
                                                navigate("/partner/showProducts", { state: { record: selectedRecord.id } })
                                                
                                            }
                                        >
                                            Show Products
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: "#253A7D",
                                                boxShadow: 20,
                                            }}
                                            onClick={() =>
                                                // navigate("/partner/AssignProducts", { state: { record: selectedRecord.id } })
                                                navigate("/partner/AssignProducts", { state: { record: selectedRecord.id } })
                                            }
                                        >
                                            Assign Products
                                        </Button>
                                    </Grid>
                                </Grid>




                            </Box>
                        </Card>
                    </Paper>
                </Grid>
            );
        } else {
            return <></>;
        }
    };
    const [value, setValue] = useState('');
    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`https://bssproxy01.neotel.nr/crm/api/partner/contact/${value}`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setRows(res.data);

                setPage(0);  // Reset pagination to the first page
                rowchange(res.data);
                setdata(res.data);
                // console.log(value + "----value sech datas")
                rowchange(res.data);
                setValue(value);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };


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
                    <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
                </Grid>

            ) : <Box sx={{ display: 'container', marginTop: -1.5 }}>
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
                                > Resellers</Typography>
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
                                            label="Search By Contact Number"
                                            type='text'
                                            fullWidth
                                            name='value'
                                            onChange={(e) => setValue(e.target.value)}
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onSubmit={handleSerch}
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
                                                                    ) : column.id === 'fristName' ? (
                                                                        <>
                                                                            {/* Display both firstName and lastName */}
                                                                            {String(row.fristName || '')}{" "}
                                                                            {String(row.lastName || '')}
                                                                        </>
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
                                Create Partner
                            </Button>

                            {/* <Button

                                variant="contained"

                                backgroundColor="#6471B5" onClick={e => navigate('/partner/showCommison')} sx={{ marginLeft: '16px', backgroundColor: '#253A7D', boxShadow: 20 }}>
                                SHOW COMMISSIONS
                            </Button> */}
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


