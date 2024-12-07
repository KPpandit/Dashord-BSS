import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
export default function AudioCallSession(){


    const columns = [
        { id: 'voiceRule', name: 'Voice Rule' },
        { id: 'supi', name: 'IMSI' },
        { id: 'gpsi', name: 'MSISDN' },
        { id: 'install', name: 'Call Status' },
        { id: 'policyId', name: 'Policy ID' },
      
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/voice/2024-11-21', {
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
        axios.delete(`http://172.17.1.11:9696/api/rates/detail/delete/${recordIdToDelete}`, {
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
            const response = await axios.get('https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/voice/', {
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
   
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };
   
  

   
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return(
        <Box sx={{ display: 'container',marginLeft:-1, marginTop: -2.5,width:'79vw' }}>

            <Box sx={{ width: '100%', }}>
            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                        <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                            <Grid>
                                <Typography
                                    style={{

                                        fontSize: '20px',
                                        paddingLeft: 10,
                                        fontWeight: 'bold',

                                    }}
                                >Audio Call Session</Typography>
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

                                                            <TableCell 
                                                            key={column.id} 
                                                            sx={{ 
                                                              textAlign: 'left', // Center content horizontally
                                                              fontSize: '17px',
                                                              verticalAlign: 'middle' // Center content vertically
                                                            }}
                                                          >
                                                            {
                                                              column.id === 'session_state' ? (
                                                                row[column.id] ? <span style={{ color: 'green' }}>◉</span> : <span style={{ color: 'red' }}>◉</span>
                                                              ) : column.id === 'call_status' ? (
                                                                row[column.id] ? <span style={{ color: 'green' }}>◉</span> : <span style={{ color: 'red' }}>◉</span>
                                                              ) : (
                                                                String(row[column.id])
                                                              )
                                                            }
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
                    {/* <Button
                        sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                        variant="contained" backgroundColor="#253A7D" onClick={handleButtonClick}>
                        Add New
                    </Button> */}
                </Box>
            </Box>

            {/* <Box sx={{ paddingLeft: 1, paddingTop: 1.5 }} >
                <SelectedRecordDetails />
            </Box> */}
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