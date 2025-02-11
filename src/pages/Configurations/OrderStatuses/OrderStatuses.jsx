import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, Modal, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Cancel, Save } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

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
                <Typography variant="h6" component="div" gutterBottom>
                EDIT ORDER STATUS
                </Typography>
                
                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                    <InputLabel id="demo-simple-select-label">Flag</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="unit"

                        name='flag'
                        value={editedData.flag}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value={'INVOICE'}>INVOICE</MenuItem>
                        <MenuItem value={'FINISHED'}>FINISHED</MenuItem>
                        <MenuItem value={'NOT_INVOICE'}>NOT_INVOICE</MenuItem>
                        <MenuItem value={'SUSPENDED_AGEING'}>SUSPENDED_AGEING</MenuItem>
                       
                    </Select>
                </FormControl>
                <TextField
                    label="Description"
                    name="desc"
                    value={editedData.desc}
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
export default function OrderStatuses() {
    const columns = [
        { id: 'Id', name: 'ID' },
        { id: 'flag', name: 'FLAG' },
        { id: 'desc', name: 'DESCRIPTION' },

    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                Id: ` ${i}`,
                flag: `FLAG ${i}`,
                desc: `DESCRIPTION ${i}`,
            });
        }
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
        if (editedData === null) {
            // Handle delete operation
            const index = rows.findIndex((row) => row.languageid === selectedRecord.languageid);

            if (index !== -1) {
                // Update the rows array by removing the deleted record
                const updatedRows = [...rows];
                updatedRows.splice(index, 1);

                // Update the state with the modified rows
                rowchange(updatedRows);

                // Optionally, you can also send a request to the server to delete the record
                // Here you can use the selectedRecord.languageid to identify the record on the server
                // Example: axios.delete(`http://your-api-endpoint/${selectedRecord.languageid}`);
            }

            // Close the edit modal
            handleEditModalClose();
        } else {
            // Handle edit operation (unchanged)
            const index = rows.findIndex((row) => row.languageid === selectedRecord.languageid);

            if (index !== -1) {
                // Update the rows array with the edited data
                const updatedRows = [...rows];
                updatedRows[index] = { ...selectedRecord, ...editedData };

                // Update the state with the modified rows
                rowchange(updatedRows);

                // Optionally, you can also send a request to the server to update the record
                // Here you can use the selectedRecord.languageid to identify the record on the server
                // Example: axios.put(`http://your-api-endpoint/${selectedRecord.languageid}`, editedData);
            }

            // Close the edit modal
            handleEditModalClose();
        }
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
    const SelectedRecordDetails = () => {
        if (selectedRecord) {
            return (
                <Grid>
                    <Grid sx={{ marginBottom: 2 }}>


                        <Paper elevation={24} variant="outlined" sx={{ maxWidth: 400, width: 320 }}>

                            <Paper sx={{ p: 1, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                    ORDER STATUS "  {selectedRecord.flag}"
                                    </Typography>

                                </Stack>

                            </Paper>


                            <CardContent>
                                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    ID
                                                </TableCell>
                                                <TableCell>{selectedRecord.Id}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    FLAG
                                                </TableCell>
                                                <TableCell>{selectedRecord.flag}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    DESC
                                                </TableCell>
                                                <TableCell>{selectedRecord.desc}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <Grid >
                                <Button sx={{ margin: 2 ,backgroundColor:'#253A7D'}} variant="contained" onClick={handleEditModalOpen}>
                                    Edit
                                </Button>
                                <Button sx={{ margin: 2 ,backgroundColor:'#253A7D'}} variant="contained" onClick={() => handleEditSave(null)}>
                                    Delete
                                </Button>
                            </Grid>
                            <EditModal
                                isOpen={isEditModalOpen}
                                onClose={handleEditModalClose}
                                data={selectedRecord}
                                onSave={handleEditSave}
                            />

                        </Paper>

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
                                                            <TableCell key={column.id}>
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
                        sx={{color:'#253A7D'}}
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
                        <Button sx={{ margin: 2 ,backgroundColor:'#253A7D',boxShadow:24}} variant="contained" onClick={handleAddModalOpen}>
                            Add New
                        </Button>

                        {/* Add Modal */}
                        <AddModal isOpen={isAddModalOpen} onClose={handleAddModalClose} onSave={handleAddSave} />
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
}
const AddModal = ({ isOpen, onClose, onSave }) => {
    const [newData, setNewData] = useState({
        
        flag: '',
        desc: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(newData);
        onClose();
    };
const handleClose=()=>{
    onClose();
}
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
                NEW ORDER STATUS
                </Typography>
                
                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                    <InputLabel id="demo-simple-select-label">Flag</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Flag"

                        name='flag'
                        value={newData.flag}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value={'INVOICE'}>INVOICE</MenuItem>
                        <MenuItem value={'FINISHED'}>FINISHED</MenuItem>
                        <MenuItem value={'NOT_INVOICE'}>NOT_INVOICE</MenuItem>
                        <MenuItem value={'SUSPENDED_AGEING'}>SUSPENDED_AGEING</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Value"
                    name="value"
                    value={newData.value}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Grid container>
                    <Grid item>

                    </Grid>

                </Grid>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button variant="contained" onClick={handleSave} sx={{ mt: 2,backgroundColor:'#253A7D' }}>
                            {<SaveAltIcon sx={{ paddingRight: 1 }} />}  Save Changes
                        </Button>
                    </Grid>
                    <Grid item justifyContent="flex-end">
                        <Button variant="contained" onClick={handleClose} sx={{ mt: 2, marginLeft: 2 ,backgroundColor:'#253A7D'}}>
                            {<Cancel sx={{ paddingRight: 1 }} />}  Cancel
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Modal>
    );
};
