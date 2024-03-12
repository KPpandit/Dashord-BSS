import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, Modal, OutlinedInput, Paper, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Save } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';


export default function Currencies() {
    const columns = [
        { id: 'name', name: 'NAME' },
        { id: 'symbol', name: 'SYMBOL' },
        { id: 'active', name: 'ACTIVE' },
        { id: 'exchange_rate', name: 'EXCHANGE RATE' },
        { id: 'system_rate', name: 'SYSTEM RATE' },
        { id: 'action', name: 'Action' },

    ];

    // Generate sample data
    const generateData = () => {
        const data = [];

        data.push({
            name: `Australian Dollar`,
            currency_code: `aus$`,
            country_code: `AUS`,
            symbol: `$`,
            active: true,
            exchange_rate: `EXCHANGE RATE`,
            system_rate: `1.25554`,

        });
        data.push({
            name: `Canadian Dollar`,
            currency_code: `can$`,
            country_code: `c$`,
            symbol: `c$`,
            active: true,
            exchange_rate: `EXCHANGE RATE`,
            system_rate: `1.3250`,

        });
        data.push({
            name: `Chinese Yuan`,
            currency_code: `ChinesYuan`,
            country_code: `CIN`,
            symbol: `¥`,
            active: true,
            exchange_rate: `EXCHANGE RATE`,
            system_rate: `10.3706`,

        });
        return data;
    };

    const [rows, rowchange] = useState(generateData());
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

    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };
    useEffect(() => {
        fetch("http://172.5.10.2:9696/api/rates/offer/get/all")
            .then(resp => {
                setdata(resp.data);
                return resp.json();
            }).then(resp => {
                rowchange(resp);
            }).catch(e => {
                console.log(e.message)
            })
        console.log("this is from rates");
    }, [selectedRecord])


    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };


    const handleEditSave = (editedData) => {
        // Find the index of the selectedRecord in the rows array
        const index = rows.findIndex((row) => row.languageid === selectedRecord.languageid);

        if (index !== -1) {
            // Update the rows array with the edited data
            const updatedRows = [...rows];
            updatedRows[index] = { ...selectedRecord, ...editedData };

            // Update the state with the modified rows
            rowchange(updatedRows);

            // Show notification
            setNotification({
                open: true,
                message: 'Record updated successfully!',
                severity: 'success',
            });
        }

        // Clear the selected record
        setSelectedRecord(null);

        // Close the edit modal
        handleEditModalClose();
    };

    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleAddSave = (newData) => {
        // Update the rows array with the new data
        const updatedRows = [...rows, newData];

        // Update the state with the modified rows
        rowchange(updatedRows);

        axios.post('http://172.5.10.2:9090/api/savelanguage', { ...newData }, {
            headers: {
                "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.status + "-----");

                // Check the response status and show notification accordingly
                if (res.status === 200) {
                    setNotification({
                        open: true,
                        message: 'Record Added successfully!',
                        severity: 'success',
                    });
                } else {
                    setNotification({
                        open: true,
                        message: 'Failed to add record. Please try again.',
                        severity: 'error',
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setNotification({
                    open: true,
                    message: 'Failed to add record. Please try again.',
                    severity: 'error',
                });
            });
    };





    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    const handleInputChange = (e, rowIndex) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex] = { ...updatedRows[rowIndex], [name]: value };
        rowchange(updatedRows);
    };
    const handleDeleteRow = (rowIndex) => {
        const updatedRows = [...rows];
        updatedRows.splice(page * rowperpage + rowIndex, 1);
        rowchange(updatedRows);
    };
    const handleCheckboxChange = (e, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex] = { ...updatedRows[rowIndex], active: e.target.checked };
        rowchange(updatedRows);
    };
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ ...notification, open: false });
    }
    return (
        <Box sx={{ display: 'container' }}>
            <Box sx={{ width: '80%', padding: '16px' }}>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >

                    <Paper>
                        <Paper>
                            <Grid sx={{ backgroundColor: '#1976D2', color: 'white', paddingLeft: 2 }} >
                                <Typography sx={{ height: 28 }}>
                                    CURRENCIES
                                </Typography>
                            </Grid>
                        </Paper>
                        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid container spacing={1} paddingLeft={3} paddingBottom={2}>
                                <Grid item lg={12} textAlign={'center'}>
                                    <FormControl sx={{ textAlign: 'center', margin: 1, width: 350 }}>
                                        <InputLabel id="demo-simple-select-label">Default Currency</InputLabel>
                                        <Select
                                            sx={{ textAlign: 'center' }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Default Currency"
                                            name='language'
                                        >
                                            <MenuItem value={'Wset African CFA'}>Wset African CFA</MenuItem>
                                            <MenuItem value={'United State Dollar'}>United State Dollar</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button sx={{ margin: 2 }} variant="contained" onClick={handleAddModalOpen}>
                                        Add New
                                    </Button>
                                </Grid>
                                <Grid item lg={12} paddingLeft={3} paddingTop={2} textAlign={'center'}>
                                    <InputLabel>Start Date</InputLabel>
                                    <TextField

                                        name="name"
                                        type='date'
                                        // value={newData.name}
                                        // onChange={handleInputChange}
                                        sx={{ width: 300 }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>


                        <Paper elevation={2}>
                            <TableContainer sx={{ maxHeight: 600 }}>
                                <Table stickyHeader size='medium' padding="normal">
                                    <TableHead >
                                        <TableRow dense >
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    style={{
                                                        backgroundColor: '#1976d2',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        height: '2px',

                                                    }}
                                                >
                                                    <Typography fontFamily={'Sans-serif'} fontSize={14}>{column.name}</Typography>
                                                </TableCell>
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
                                                                    ? { backgroundColor: 'lightblue' }
                                                                    : {}
                                                            }
                                                        >
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id} sx={{ textAlign: 'center' }}>
                                                                    {column.id === 'exchange_rate' || column.id === 'system_rate' ? (
                                                                        <TextField
                                                                            name={column.id}
                                                                            value={row[column.id]}
                                                                            onChange={(e) => handleInputChange(e, i)}
                                                                            variant="standard"
                                                                            fullWidth
                                                                            size="small"
                                                                        />
                                                                    ) : column.id === 'active' ? (
                                                                        <Checkbox
                                                                            checked={row.active}
                                                                            onChange={(e) => handleCheckboxChange(e, i)}
                                                                            color="primary"
                                                                            inputProps={{ 'aria-label': 'active checkbox' }}
                                                                        />
                                                                    ) : column.id === 'action' ? (
                                                                        <Stack direction="column" alignItems="center">

                                                                            <IconButton onClick={() => handleDeleteRow(i)}>
                                                                                <CloseIcon />
                                                                            </IconButton>
                                                                        </Stack>
                                                                    ) : (
                                                                        row[column.id]
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
                                rowsPerPageOptions={[5, 10, 25]}
                                rowsPerPage={rowperpage}
                                page={page}
                                count={rows.length}
                                component="div"
                                onPageChange={handlechangepage}
                                onRowsPerPageChange={handleRowsPerPage}
                            />
                        </Paper>

                    </Paper>

                    <Grid >
                        <Button sx={{ margin: 2 }} variant="contained" onClick={() => handleEditSave(selectedRecord)}>
                            {<SaveAltIcon sx={{ paddingRight: 1 }} />}
                            Save Changes
                        </Button>

                        {/* Add Modal */}
                        <AddModal isOpen={isAddModalOpen} onClose={handleAddModalClose} onSave={handleAddSave} />
                    </Grid>
                </Box>
            </Box>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                >
                    {notification.message}
                </MuiAlert>
            </Snackbar>


        </Box>
    )
}
const AddModal = ({ isOpen, onClose, onSave }) => {
    const [newData, setNewData] = useState({
        symbol: "",
        code: "",
        countryCode: "",
        description: "",
        rate: "",
        sysRate: "",
        inUse: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle different types of input fields
        const newValue = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;

        setNewData((prevData) => ({ ...prevData, [name]: newValue }));
    };

    const handleSave = () => {
        onSave(newData);
        onClose();
        // Reset form fields after saving
        setNewData({
            symbol: "",
            code: "",
            countryCode: "",
            description: "",
            rate: "",
            sysRate: "",
            inUse: true,
        });
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                component={"form"}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    p: 2,
                }}
            >
                <Typography variant="h6" component="div" gutterBottom>
                    NEW CURRENCY
                </Typography>
                <TextField
                    required
                    label="Name"
                    name="description"
                    value={newData.description}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                    type="text"
                />
                <TextField
                    required
                    label="Currency Code"
                    name="code"
                    value={newData.code}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                    type="text"
                />
                <TextField
                    required
                    label="Country Code"
                    name="countryCode"
                    value={newData.countryCode}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                    type="text"
                />
                <TextField
                    required
                    label="Symbol Code"
                    name="symbol"
                    value={newData.symbol}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                    type="text"
                />
                <TextField
                    required
                    label="Exchange Rate"
                    name="rate"
                    value={newData.rate}
                    onChange={handleInputChange}
                    fullWidth
                    type="number"
                    sx={{ mt: 2 }}
                />
                <TextField
                    required
                    label="System Rate"
                    type="number"
                    name="sysRate"
                    value={newData.sysRate}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="inUse"
                            checked={newData.inUse}
                            onChange={handleInputChange}
                        />
                    }
                    label="Active"
                />
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                    Add Language
                </Button>
            </Box>
        </Modal>
    );
};


