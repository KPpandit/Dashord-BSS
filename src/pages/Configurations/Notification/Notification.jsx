import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fade, Grid, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import Backdrop from '@mui/material/Backdrop';
export default function Notification() {
    const columns = [
        { id: 'notifcation_category', name: 'NOTIFICATION CATEGORY' },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];

        data.push({
            notifcation_category: `Custom Notification `,
            name: `name `
        });
        data.push({
            notifcation_category: `User `,
            name: `name `
        });
        data.push({
            notifcation_category: `Users`,
            name: `name `
        });
        data.push({
            notifcation_category: `Payments `,
            name: `name `
        });
        data.push({
            notifcation_category: `Invoices`,
            name: `name `
        });

        return data;
    };

    const [rows, rowchange] = useState(generateData());
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [dialogerecord, setDialogerecord] = useState(['']);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [highlightedRow, setHighlightedRow] = useState(null);

    const navigate = useNavigate();
    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };




    const handleCloseDialog = () => {
        setDialogOpen(false);
    };



    const handleRowClick = (row) => {
        setSelectedRecord(row);

    };

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };



    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };




    useEffect(() => {
        fetch("http://172.5.10.2:9696/api/rates/offer/get/all")
            .then(resp => resp.json())
            .then(resp => {
                rowchange(resp);
            })
            .catch(e => {
                console.log(e.message);
            });
        console.log("this is from rates");
    }, [selectedRecord]);

    const SelectedRecordDetails = () => {
        const handleRowClick = (row) => {
            setDialogerecord(row);
            console.log(row + "-----row -----")
            setDialogOpen(true);
        };
        const [isAddModalOpen, setAddModalOpen] = useState(false);

        if (selectedRecord) {



            const handleAddButtonClick = () => {
                setAddModalOpen(true);
            };

            const handleAddModalClose = () => {
                setAddModalOpen(false);
            };

            const handleAdd = (newData) => {
                // Implement your logic here for adding new data
                console.log('Adding data:', newData);
                // Optionally, you can update your state or perform other actions
            };






            return (
                <Grid>
                    <Paper sx={{ marginBottom: 2 }}>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 1, backgroundColor: '#1976d2' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#1976d2' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        {selectedRecord.notifcation_category}
                                    </Typography>
                                </Stack>
                            </Box>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        {/* Render additional details of the selected row */}
                                        {Object.entries(selectedRecord).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell
                                                    sx={{ textAlign: 'left' }}
                                                    onClick={() => handleRowClick(value)}
                                                >
                                                    <Typography variant="body1">
                                                        <strong>{key}:</strong> {value}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Paper>
                    <Grid>
                        <Button sx={{}} variant="contained" onClick={handleAddButtonClick}>
                            <AddIcon sx={{ paddingRight: 1 }} />
                            Add
                        </Button>
                    </Grid>

                    {/* Add Modal */}
                    <AddModal
                        isOpen={isAddModalOpen}
                        onClose={handleAddModalClose}
                        onAdd={handleAdd}
                        initialValues={selectedRecord.notifcation_category}
                    />
                </Grid>
            )
        } else  return null;
    };

    const renderDialog = () => {
        if (selectedRecord) {
            return (
                <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
                    <Grid padding={1} >
                        <DialogTitle backgroundColor={'#1976D2'} color={'white'}>{dialogerecord}</DialogTitle>
                    </Grid>
                    <DialogContent >
                        {/* Render additional details of the selected row inside the dialog */}
                        {/* Modify this section based on your data structure */}
                        <Typography>
                            This is the full information about the data :
                            
                        </Typography>
                        <Divider />
                        <Grid padding={1}  flex={'flex'} spacing={2}>
                            <Grid item lg={12}>
                                <Typography >
                                    Active ?:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Language:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Active ?:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Subject:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Medium Types:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Body (Text):
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Medium (Html):
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Attachment:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography >
                                    Attachment Type:
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} variant="outlined">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }
        return null;
    };

    return (
        <Box sx={{ display: 'container' }}>
            <Box sx={{ width: '68%', padding: '16px' }}>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                    <Paper>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size='medium' padding="normal">
                                <TableHead>
                                    <TableRow dense>
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
                                                <Typography fontFamily={'Sans-serif'} fontSize={14}>
                                                    {column.name}
                                                </Typography>
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
                                            ))}
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
                    <Grid>
                        <Button variant="contained" sx={{ mt: 2 }} onClick={(e) => {
                            navigate("/addCategoryNotification")
                        }}>
                            Add Category
                        </Button>
                        <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
                            Edit Category
                        </Button>
                    </Grid>
                </Box>

            </Box>

            <Box sx={{ paddingTop: 2 }}>
                <SelectedRecordDetails />
            </Box>
            {renderDialog()}
        </Box>
    );
}
const AddModal = ({ isOpen, onClose, onAdd, initialValues }) => {
    const [textField1, setTextField1] = useState('');
    const [textField2, setTextField2] = useState('');
    console.log(initialValues + "  intial values")

    const handleAdd = () => {
        // Validate the input or perform any necessary checks
        // Call the onAdd callback to pass the new data to the parent component
        onAdd({ textField1, textField2 });
        // Optionally, you can reset the text fields
        setTextField1('');
        setTextField2('');
        // Close the modal
        onClose();
    };
    const handleClose = () => {
        // Optionally, you can reset the text fields before closing the modal
        setTextField1('');
        setTextField2('');
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
                    ADD NOTIFICATION
                </Typography>
                <TextField
                    label="Notification Category"
                    value={initialValues}
                    onChange={(e) => setTextField1(e.target.value)}
                    fullWidth
                    disabled
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Description"
                    value={textField2}
                    onChange={(e) => setTextField2(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>
                    Add
                </Button>
                <Button variant="contained" onClick={handleClose} sx={{ mt: 2, ml: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};