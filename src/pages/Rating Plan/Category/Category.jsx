import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function Category() {
    const columns = [
        { id: 'name', name: 'Name' },
    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
  
    const handleConfirmDelete = () => {
        // Perform the delete operation here using the recordIdToDelete
        // After successful deletion, you can update the UI accordingly
        console.log(`Deleting record with ID: ${recordIdToDelete}`);

        // Make an API call to delete the record
        axios.delete(`http://172.17.1.11:9696/api/category/detail/delete/${recordIdToDelete}`, {
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
    const handleButtonClick = () => {
        setAddDialogOpen(true); // Open the add popup when the button is clicked
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
        setEditRecord(row);
        setEditDialogOpen(true);
    };
    const [addDialogOpen, setAddDialogOpen] = useState(false); 
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [newRecordData, setNewRecordData] = useState({
        // Initialize the new record data structure
        name: '', // Add other fields as needed
    });
    const handleSaveNewRecord = async (e) => {
      
        try {
            // Make an API call to save the new record
            const response = await axios.post('http://172.17.1.11:9696/api/category/detail/add?ctg_name='+newRecordData.name,{},  {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                console.log(res.status + "status code ")
                if (res.status === 200) {
                    
                    setAddDialogOpen(false);
                    
                    toast.success('Category Added Successfully', { autoClose: 2000 });
                }
                // location.reload();
            })

            // Handle success, you can update the UI or take other actions
            console.log('New record saved successfully:', response.data);

            // Fetch updated data after successful addition
          
            e.preventDefault();
            // Close the add popup
           
        } catch (error) {
            // Handle error, you can display an error message or take other actions
            toast.error(error.response.data.message, { autoClose: 2000 });

            

        }
    };
    //
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.17.1.11:9696/api/category/detail/get/all', {
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
    }, [tokenValue,setAddDialogOpen]);
    const SelectedRecordDetails = () => {
        const [editDialogOpen, setEditDialogOpen] = useState(false);
        const [editRecord, setEditRecord] = useState(null);
        const handleRowClick = (row) => {
            setSelectedRecord(row);
        };
        const handleOpenEditDialog = (row) => {
            setEditRecord(row);
            setEditDialogOpen(true);
        };




        if (selectedRecord) {
            return (
                <Grid>
                    <Paper elevation={10}>

                  
                        <Card variant="outlined" sx={{ fontFamily: "Roboto" }}>

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
                                            {selectedRecord.name.replace(/"/g, '')}
                                        </Typography>

                                    </Stack>
                                </Grid>

                            </Box>
                            <Grid container sx={{ width: 320 }}>
                                <Grid item xs={12} paddingLeft={1}>

                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Category :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} alignContent={'left'} alignSelf={'left'}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.name.replace(/"/g, '')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                </Grid>


                            </Grid>

                            <Grid container spacing={1} padding={1}>


                                <Grid item>
                                    <Button variant="contained"
                                        sx={{ backgroundColor: '#253A7D' }}
                                        onClick={() => handleOpenEditDialog(selectedRecord)}
                                    >Edit</Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => {
                                            handleOpenConfirmationDialog(selectedRecord.category_id)
                                            console.log("From teh Customer De;eet Button")
                                        }}
                                        sx={{ backgroundColor: '#253A7D' }}
                                        variant="contained">Delete</Button>
                                </Grid>




                            </Grid>
                        </Card>

                    </Paper>
                    <Grid>
                        <Dialog
                            open={editDialogOpen}
                            onClose={() => {
                                setEditDialogOpen(false);
                                setEditRecord(null); // Reset the editRecord state when closing the dialog
                            }}
                            aria-labelledby="edit-dialog-title"
                            aria-describedby="edit-dialog-description"
                        >
                            <DialogTitle id="edit-dialog-title">Edit Record</DialogTitle>
                            <DialogContent>

                                {editRecord && (


                                    <Grid container >
                                        <Grid item sx={{ marginBottom: 2, marginTop: 2 }}>
                                            <TextField
                                                label="Category"
                                                variant="outlined"
                                                fullWidth
                                                value={editRecord.name.replace(/"/g, '')}
                                                onChange={(e) => setEditedValue(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>


                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                                {/* Add the logic to save the changes in the record */}
                                <Button onClick={() => handleSaveChanges()} autoFocus>
                                    Save Changes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            )
        } else {
            return
            <></>
        }
    };


    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container', marginTop: -2.5, width: '78vw' }}>
  <ToastContainer position="bottom-left" />
            <Box sx={{ width: '70%', }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',

                                }}
                            >Category List</Typography>
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

                                                            <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>

                                                                {column.id === 'ekycDate' ? (
                                                                    // Render this content if the condition is true
                                                                    <>{
                                                                        // new Date(row[column.id]).toISOString().split('T')[0]

                                                                    }</>
                                                                ) : (
                                                                    // Render this content if the condition is false
                                                                    <>{row[column.id].replace(/"/g, '')}</>
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

            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)} // Close the add popup when the user clicks outside or on the close button
                aria-labelledby="add-dialog-title"
                aria-describedby="add-dialog-description"
            >
                <DialogTitle id="add-dialog-title">Add New Category</DialogTitle>
                <DialogContent>
                <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{marginTop:2}}
                        value={newRecordData.name}
                        onChange={(e) => setNewRecordData({ ...newRecordData, name: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    {/* Add the logic to save the new record */}
                    <Button onClick={() => handleSaveNewRecord()} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}