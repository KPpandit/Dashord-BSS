import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function All() {
    const columns = [
        { id: 'preference', name: 'PREFERENCE' },
        { id: 'value', name: 'VALUE' },

    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                preference: `PREFERENCE ${i}`,
                value: `VALUE ${i}`,


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

    const SelectedRecordDetails = () => {
        if (selectedRecord) {
            return (
                <>
                    <Paper elevation={10} sx={{ marginBottom: 2 }}>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 1, backgroundColor: '#253A7D' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        {selectedRecord.preference}
                                    </Typography>
                                </Stack>
                            </Box>
                            <CardContent>
                                {/* Display single record data in the form of a table */}
                                {selectedRecord.preference}
                                <Box sx={{ padding: 1, paddingTop: 5, marginBottom: -3 }}>
                                    <TextField
                                        label="Value"
                                        name='value'
                                        value={selectedRecord.value}
                                    />
                                </Box>
                            </CardContent>
                            <Grid>
                                <Button sx={{ margin: 2,backgroundColor:'#253A7D' }} variant="contained">
                                    Save Changes
                                </Button>
                                <Button sx={{ margin: 1 ,backgroundColor:"#253A7D"}} variant="contained">
                                    Cancel
                                </Button>
                            </Grid>
                        </Card>
                    </Paper>
                </>
            )
        } else {
            return null; // or return <></> if you prefer an empty fragment
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
                                                  
                                                    height:'2px',
                                                    
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
                                                            <TableCell key={column.id} >
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