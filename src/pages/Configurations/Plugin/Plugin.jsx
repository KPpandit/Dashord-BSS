import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, Modal, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Save } from '@mui/icons-material';
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
                    EDIT MEDIATION CONFIGURATION
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    fullWidth

                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Order"
                    name="order"
                    value={editedData.order}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Plugin"
                    name="plugin"
                    value={editedData.plugin}
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
export default function Plugin() {
    const columns = [
        { id: 'Id', name: 'ID' },
        { id: 'plugin', name: 'PLUG-INS CATEGORIES' },


    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                Id: ` ${i}`,
                plugin: `PLUG-INS CATEGORIES ${i}`,
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
    const toPayment = () => {
        navigate('/payment');
    };
    const [selectedRecord, setSelectedRecord] = useState([]);

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
        const index = rows.findIndex((row) => row.name === selectedRecord.name);
        console.log(index + "  index")

        if (index !== -1) {
            // Update the rows array with the edited data
            const updatedRows = [...rows];
            updatedRows[index] = { ...selectedRecord, ...editedData };

            // Update the state with the modified rows
            rowchange(updatedRows);
        }

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

    const handleRowClick = (row) => {
        setSelectedRecord(row);

    };
    const SelectedRecordDetails = () => {
        const [rows, rowchange] = useState(['']);
        const columns = [
            { id: 'Id', name: 'ID' },
            { id: 'type', name: 'TYPE' },
            { id: 'order', name: 'ORDER' },

        ];
        const navigate = useNavigate();
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);

        const handlechangepage = (event, newPage) => {
            setPage(newPage);
        };

        const handleRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
        const [selectedRecordRows, setSelectedRecordRows] = useState(['']);  // New state for the second pagination
        const [selectedRecordPage, setSelectedRecordPage] = useState(0);
        const [selectedRecordRowsPerPage, setSelectedRecordRowsPerPage] = useState(5);

        const handleSelectedRecordPageChange = (event, newPage) => {
            setSelectedRecordPage(newPage);
        };

        const handleSelectedRecordRowsPerPageChange = (event) => {
            setSelectedRecordRowsPerPage(+event.target.value);
            setSelectedRecordPage(0);
        };
        if (selectedRecord) {

            return (
                <Grid>
                    <Grid sx={{ marginBottom: 2 ,boxShadow:24}}>


                        <Card variant="outlined" sx={{ maxWidth: 350, width: 300 }}>

                            <CardContent>
                                 <TableContainer sx={{ maxHeight: 600, marginTop: 1 }}>
                    <TableHead>
                        <Table stickyHeader size='medium' padding="normal">
                            <TableRow dense>
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
                        </Table>
                    </TableHead>
                    <TableBody>
                        {selectedRecordRows &&
                            selectedRecordRows
                                .slice(selectedRecordPage * selectedRecordRowsPerPage, selectedRecordPage * selectedRecordRowsPerPage + selectedRecordRowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <TableRow
                                            key={i}
                                            sx={
                                                highlightedRow === row
                                                    ? { backgroundColor: 'lightblue' }
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
                   
                </TableContainer>

                            </CardContent>
                            <Grid >
                                <Button sx={{ margin: 2 ,backgroundColor:'#253A7D'}} variant="contained" onClick={() => { navigate("/addPlugin", { state: { id: selectedRecord.Id } }) }}>
                                    Add New
                                </Button>

                                {/* Add Modal */}

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
            return null;
    };



    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    const addMetaFieldGrop = () => {
        navigate('/addMetaFieldGroup')
    }
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
                                                    textAlign: 'left',
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
                                                            <TableCell key={column.id} sx={{ textAlign: 'left' }}>
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


                </Box>
            </Box>
            <Box sx={{ paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
}

