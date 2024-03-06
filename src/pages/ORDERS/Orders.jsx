import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
export default function Orders(props) {
    const columns = [
        { id: 'id', name: 'Order ID' },
        { id: 'customer', name: 'CUSTOMER' },
        { id: 'comp_name', name: 'COMPANY NAME' },
        { id: 'created', name: 'CREATED' },
        { id: 'amount', name: 'AMOUNT' },
        { id: 'parent_child', name: 'PARENT/CHILD' },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: `${i}`,
                customer: `CUSTOMER ${i}`,
                comp_name: `COMPANY NAME${i}`,
                created: `CREATED ${i}`,
                p_r: `P/R ${i}`,
                amount: `AMOUNT ${i}`,
                parent_child: `PARENT/CHILD ${i}`,

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

    const SelectedRecordDetails = () => {
        if (selectedRecord) {
            return (
                <Grid>
                    <Paper elevation={20} sx={{ marginBottom: 2 }}>


                        <Card variant="outlined" >

                            <Box sx={{ p: 2, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        ORDER {selectedRecord.id}
                                    </Typography>

                                </Stack>

                            </Box>





                            <CardContent>
                                {/* Display single record data in the form of a table */}
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {selectedRecord && Object.entries(selectedRecord).map(([key, value]) => (
                                                <TableRow key={key}>
                                                    <TableCell>{key}</TableCell>
                                                    <TableCell>{value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>


                        </Card>

                    </Paper>

                    <Paper elevation={20} sx={{ marginTop: 2 }}>
                        <Grid sx={{ backgroundColor: '#253A7D' }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2, color: 'white' }} style={{ fontFamily: 'Roboto', fontSize: '14', fontWeight: '400' }}>
                                NOTES
                            </Typography>
                        </Grid>
                        <Divider light />
                        <Box
                            sx={{
                                marginTop: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Card elevation={10} sx={{ minWidth: 360 }}>
                                <CardContent sx={{ maxWidth: 360 }}>
                                    {/* Display single record data in a horizontal table */}
                                    <TableContainer>
                                        No order notes to show
                                    </TableContainer>
                                </CardContent>
                                <CardActions>
                                    {/* Additional actions if needed */}
                                </CardActions>
                            </Card>
                        </Box>
                    </Paper>

                    <Paper elevation={20} sx={{ marginTop: 2 }}>
                        <Grid sx={{ backgroundColor: '#253A7D' }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2, color: 'white' }} style={{ fontFamily: 'Roboto', fontSize: '14', fontWeight: '400' }}> Lines</Typography>
                        </Grid>
                        <Divider light />
                        <Box
                            sx={{
                                marginTop: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Card sx={{ minWidth: 360 }}>
                                <CardContent sx={{ maxWidth: 360 }}>
                                    {/* Display single record data in a horizontal table */}
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {selectedRecord && Object.keys(selectedRecord).map((key) => (
                                                        <TableCell key={key}>{key}</TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    {selectedRecord && Object.values(selectedRecord).map((value, index) => (
                                                        <TableCell key={index}>{value}</TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                                <CardActions>
                                    {/* Additional actions if needed */}
                                </CardActions>
                            </Card>
                        </Box>
                    </Paper>
                    <Grid padding={2} sx={{ width: 360 }}>
                        <Button variant="contained" style={{ boxShadow: 10, marginRight: '10px', marginBottom: '10px', backgroundColor: '#253A7D' }}>{<EditIcon sx={{ paddingRight: 1 }} />}EDIT THIS ORDER</Button>
                        <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: '#253A7D' }}>{<DeleteIcon sx={{ paddingRight: 1 }} />}DELETE</Button>

                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#253A7D' }} onClick={toPayment} >{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}Create INVOICE</Button>
                        <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: '#253A7D' }}>{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}APPLY TO INVOICE</Button>

                    </Grid>
                    <Grid sx={{ padding: 2 }}>

                    </Grid>
                </Grid>
            )
        } else {
            return <></>
        }
    };

    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`http://172.5.10.2:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
            .then((res) => {
                setdata(res.data);
                console.log(value + "----value sech datas")
                rowchange(res.data);
                setValue(value);
            })
    }
    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    return (
        <Box sx={{ display: 'container', marginTop: '-15px' }}>
            <Box sx={{ width: '70%' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={20} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',

                                }}
                            >Order List</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >
                    <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.1 }}>
                        <form
                            onSubmit={handleSerch}
                        >

                            <Paper elevation={20} sx={{ marginBottom: 2 }}>
                                <Grid lg={8}  >
                                    <TextField
                                        onClick={handleSerch}
                                        label="Search"
                                        type='text'
                                        fullWidth
                                        name='value'
                                        // onChange={(e) => setValue(e.target.value)}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                    // onSubmit={handleSerch}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                </Grid>
                            </Paper>
                            {/* <Grid paddingBottom={1}>
                            <Button type='submit' backgroundColor={'blue'} onSubmit={handleSerch} padding={2}> <SearchIcon /> Search</Button>
                            </Grid> */}
                        </form>
                    </Grid>
                    <Paper elevation={20}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size='medium' padding="normal">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} sx={{ textAlign: 'center' }}><Typography fontFamily={'Sans-serif'}>{column.name}</Typography></TableCell>
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
                                                                ? { backgroundColor: '#F5BD38' }
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

                    <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                        <Button variant="contained" backgroundColor="#253A7D"
                            sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                        //  onClick={handleButtonClick}
                        >
                            Downloade PDF
                        </Button>

                        <Button variant="contained" backgroundColor="#6471B5"
                            // onClick={handleButtonClick} 
                            sx={{ marginLeft: '16px', backgroundColor: '#253A7D', boxShadow: 20 }}>
                            DOWNLOADE CSV
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 4, paddingTop: 1.8 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};


