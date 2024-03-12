import { Box, Button, Card, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
export default function ChangeLog() {
    const columns = [
        { id: 'id', name: 'Product' },
        { id: 'amount', name: 'Apply' },
        { id: 'type', name: 'Type' },
        { id: 'partnerId', name: 'Status' },


    ];
    const tokenValue = localStorage.getItem('token');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9090/api/partnercommissions', {
    //                 headers: {
    //                     Authorization: `Bearer ${tokenValue}`,
    //                     "Accept": "application/json",
    //                     "Content-Type": "application/json"
    //                 }
    //             });
    //             setRows(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data from API:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
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

    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container', marginTop: -3 }}>
            <Box sx={{ width: '100%' }}>

                <Box component="main" sx={{ flexGrow: 1, paddingTop: "1%", width: '100%' }} >
                    <Grid container spacing={1} padding={2}>
                        <Grid item xs={12} textAlign={'center'}>
                            <TextField sx={{ width: 350 }} label='Filter by ID, Number' />
                        </Grid>
                        <Grid item xs={12} textAlign={'center'}>
                            <FormControl sx={{ width: 350 }}>
                                <InputLabel>Product Category</InputLabel>
                                <Select

                                    label="Product Category"
                                >
                                    <MenuItem value="option1">All</MenuItem>
                                    <MenuItem value="option2">Pending</MenuItem>
                                    <MenuItem value="option3">Apply Error</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
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

                                                        onMouseEnter={() => handleRowMouseEnter(row)}
                                                        onMouseLeave={handleRowMouseLeave}
                                                        sx={
                                                            highlightedRow === row
                                                                ? { backgroundColor: '#F4C22E' }
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
                        {/* <Button variant="contained" backgroundColor="#6471B5" onClick={handleButtonClick}>
                            ADD NEW
                        </Button>

                        <Button variant="contained" backgroundColor="#6471B5" onClick={e=>navigate('/showCommison')} sx={{ marginLeft: '16px' }}>
                            SHOW COMMISSIONS
                        </Button> */}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 1, paddingTop: 6.2 }} >

            </Box>


        </Box>
    )
}