import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, Modal, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Save } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Popup from '../../Components/PopUp';
import AddLanguage from './Addlanguage';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const EditModal = ({ isOpen, onClose, data, onSave }) => {
    const [editedData, setEditedData] = useState(data);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
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
                <Typography variant="h6" component="div" sx={{color:'#FAC22E'}} gutterBottom>
                    Edit Language
                </Typography>
                
                <TextField
                    label="Language Code"
                    name="code"
                    value={editedData.code}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Language Decription"
                    name="description"
                    value={editedData.description}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 ,backgroundColor:'#253A7D'}}>
                    {<SaveAltIcon sx={{ paddingRight: 1 }} />}  Save Changes
                </Button>
                <Button variant="contained" onClick={onClose} sx={{ mt: 2, ml: 2 ,backgroundColor:'#253A7D'}}>
                    {<CloseIcon sx={{ paddingRight: 1 }} />}
                    Close
                </Button>
            </Box>
        </Modal>
    );
};
export default function Languages() {
    const columns = [
       
        { id: 'code', name: 'Language Code' },
        { id: 'description', name: 'Language Description' },

    ];
    const [delete1,SetDelete]=useState([])
    const tokenValue = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.5.10.2:9090/api/alllanguage', {
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
    }, [tokenValue,delete1]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.5.10.2:9090/api/alllanguage', {
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
    // Generate sample data
   
    const [rows, setRows] = useState([]);
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
    const toPayment = () => {
        navigate('/payment');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };
    // useEffect(() => {
    //     fetch("http://172.5.10.2:9090/api/alllanguage",{headers: {
    //         Authorization: `Bearer ${tokenValue}`,
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //     }})
    //         .then(resp => {
    //             setdata(resp.data);
    //             return resp.json();
    //         }).then(resp => {
    //             rowchange(resp);
    //         }).catch(e => {
    //             console.log(e.message)
    //         })
    //     console.log("this is from rates");
    // }, [selectedRecord])


    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleEditSave = (editedData) => {
        // Find the index of the selectedRecord in the rows array
        console.log("handle Edit is called"+editedData.code);
        axios.put(`http://172.5.10.2:9090/api/updatelanguage/${editedData.id}`, {
            code: editedData.code,
            description: editedData.description
        }, {
            headers: {
                Authorization: `Bearer ${tokenValue}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Language updated successfully:', response.data);
            toast.success('Language Updated Successfully', { autoClose: 2000 });
            fetchData();
            setTimeout(() => {
                onClose();
                // Other things to execute after 3 minutes
            }, 3 * 1000);

        })
        .catch(error => {
            console.error('Error updating language:', error);
            // Optionally, show an error message to the user
        });
        

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
    };
    const [openPopup, setOpenPopup] = useState(false);
    const closePopup = () => {
        setOpenPopup(false);
        
    };
    const SelectedRecordDetails = () => {
        if (selectedRecord) {
            return (
                <Grid>
                    <Grid sx={{ marginBottom: 2 ,boxShadow:24}}>


                        <Card variant="outlined" sx={{ maxWidth: 350 }} elevation={24}>

                            <Paper  sx={{ p: 1, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        {selectedRecord.code}
                                    </Typography>

                                </Stack>

                            </Paper>


                            <CardContent>
                                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                    <Table>
                                        <TableBody>
                                            
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Language Code
                                                </TableCell>
                                                <TableCell>{selectedRecord.code}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Language Description
                                                </TableCell>
                                                <TableCell>{selectedRecord.description}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <Grid >
                                <Button sx={{ margin: 2 ,backgroundColor:'#253A7D',boxShadow:24}} variant="contained" onClick={handleEditModalOpen}>
                                    Edit
                                </Button>
                            </Grid>
                            <EditModal
                                isOpen={isEditModalOpen}
                                onClose={handleEditModalClose}
                                data={selectedRecord}
                                onSave={handleEditSave}
                            />

                        </Card>

                    </Grid>






                </Grid>
            )
        } else 
            return null
        
    };



    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container' }}>
              <ToastContainer position="bottom-left" />
            <Box sx={{ width: '68%', padding: '16px' }}>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >

                    <Paper elevation={24}>

                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size='medium' padding="normal">
                                <TableHead >
                                    <TableRow dense >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{
                                                    backgroundColor: '#253A7D',
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
                                                                ? { backgroundColor: '#FAC22E' }
                                                                : {}
                                                        }
                                                    >
                                                        {columns.map((column) => (
                                                            <TableCell key={column.id} sx={{ textAlign: 'center' }}>
                                                                {row[column.id]}
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

                    <Grid >
                        <Button sx={{ margin: 2,backgroundColor:'#253A7D',boxShadow:24 }} variant="contained" onClick={(e) => {
                        setOpenPopup(true);
                    }}>
                            Add New
                        </Button>

                        {/* Add Modal */}
                        {/* <AddModal isOpen={isAddModalOpen} onClose={handleAddModalClose} onSave={handleAddSave} /> */}
                    </Grid>
                </Box>
                <Popup
                title="Add Language"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
               <AddLanguage onClose={() => setOpenPopup(false)}/>
            </Popup>
            </Box>
            <Box sx={{ paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
}
const AddModal = ({ isOpen, onClose, onSave }) => {
    const [newData, setNewData] = useState({
        languageid: '',
        language_code: '',
        language_name: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(newData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
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
                    Add New Language
                </Typography>
                <TextField
                    label="Language ID"
                    name="languageid"
                    value={newData.languageid}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Language Name"
                    name="language_name"
                    value={newData.language_name}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Language Code"
                    name="language_code"
                    value={newData.language_code}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                    Add Language
                </Button>
            </Box>
        </Modal>
    );
};
