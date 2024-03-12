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
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                    {<SaveAltIcon sx={{ paddingRight: 1 }} />}  Save Changes
                </Button>
                <Button variant="contained" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
                    {<CloseIcon sx={{ paddingRight: 1 }} />}
                    Close
                </Button>
            </Box>
        </Modal>
    );
};
export default function Metafieldgroup() {
    const columns = [
        {
            id: 'name', name: "META FIELD CATEGORIES "
        },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];

        data.push({ name: `CUSTOMER ` });
        data.push({ name: `AGENT ` });
        data.push({ name: `PRODUCT ` });
        data.push({ name: `ORDER ` });
        data.push({ name: `INVOICE ` });
        data.push({ name: `PAYMENT` });
        data.push({ name: `ACCOUNT_TYPE` });
        data.push({ name: `PLAN` });
        data.push({ name: `ASSETS` });
        data.push({ name: `ORDER_CHANGE` });
        data.push({ name: `ORDER_LINE` });
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
            {
                id: 'name', name: "META FIELD CATEGORIES "
            },
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

        if (selectedRecord) {
            return (
                <Grid>
                    <Grid sx={{ marginBottom: 2 }}>


                        <Card variant="outlined" sx={{ maxWidth: 350, width: 300 }}>

                            <Paper sx={{ p: 1, backgroundColor: '#1976d2' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#1976d2' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                    META FIELD GROUPS
                                    </Typography>

                                </Stack>

                            </Paper>


                            <CardContent>
                                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    ENTITY
                                                </TableCell>
                                                <TableCell>{selectedRecord.name}</TableCell>
                                            </TableRow>


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TableContainer sx={{ maxHeight: 600 ,marginTop:1}}>
                                   <TableHead>
                                   <Table stickyHeader size='medium' padding="normal">
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
                                    </Table>
                                   </TableHead>
                                   <TableBody>
                                    {rows &&
                                        rows
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                    <TableRow
                                                        key={i}
                                                        // onClick={() => }
                                                        // onMouseEnter={() => handleRowMouseEnter(row)}
                                                        // onMouseLeave={handleRowMouseLeave}
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
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        count={40}
                                        component="div"
                                        onPageChange={handlechangepage}
                                        onRowsPerPageChange={handleRowsPerPage}
                                    />
                                </TableContainer>

                            </CardContent>
                            <Grid >
                                <Button sx={{ margin: 2 }} variant="contained" onClick={() => { navigate("/addMetaFieldGroup", { state: { name: selectedRecord.name } }) }}>
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

                    <Paper>

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

