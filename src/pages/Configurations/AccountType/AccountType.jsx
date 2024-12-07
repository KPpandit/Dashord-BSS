import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
export default function AccountType(props) {
    const columns = [
        { id: 'name', name: 'Name' },
        { id: 'surname', name: 'Surname' },


    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                name: `Name ${i}`,
                surname: `Surname ${i}`

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
    const addAccountType = () => {
        navigate('/AddaccountType');
    };
    const SelectedRecordDetails = () => {
        if (selectedRecord) {
            return (
                <Grid>
                    <Paper sx={{ marginBottom: 2 }}>


                        <Card variant="outlined" >

                            <Box sx={{ p: 2, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        Basic {selectedRecord.id}
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



                    <Paper sx={{ marginTop: 2 }}>
                        <Grid sx={{ backgroundColor: '#253A7D' }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2, color: 'white' }} style={{ fontFamily: 'Roboto', fontSize: '14', fontWeight: '400' }}>ACCOUNT INFORMATION TYPES</Typography>
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
                    <Grid container padding={2} sx={{ width: 360 }}>
                        <Grid item xs={6}>
                        <Button variant="contained" sx={{boxShadow:24}} style={{  marginBottom: '10px', backgroundColor: '#253A7D' }}>{<EditIcon sx={{ paddingRight: 1 }} />}EDIT</Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button variant="contained" sx={{boxShadow:24}} style={{ marginBottom: '10px', backgroundColor: "#253A7D" }}>{<DeleteIcon sx={{ paddingRight: 1 }} />}DELETE</Button>
                        </Grid>
                        <Grid item xs={6} >

                        <Button variant="contained" sx={{boxShadow:24}} style={{ marginBottom: '10px', backgroundColor: "#253A7D" }} onClick={toPayment} >{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}Clone</Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button variant="contained" sx={{boxShadow:24}} style={{ marginBottom: '10px', backgroundColor: "#253A7D" }}>{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}ADD INfo Type</Button>

                        </Grid>

                      
                       

                     
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
        <Box sx={{ display: 'container' }}>
            <Box sx={{ width: '68%', padding: '16px' }}>
                <Box component="main" sx={{ width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: 0.2, marginRight: 0.2 }}>
                        <Grid>
                            <Typography
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '19px',
                                    paddingLeft: '15px',
                                    fontWeight: 'bold',
                                    marginLeft: -15

                                }}
                            > Account Type</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Box component="main" sx={{ flexGrow: 1 }} >
                    <Paper elevation={24}>
                        <Grid lg={12} md={12} sm={12} sx={{ textAlign: 'right', marginY: -0.1 }}>
                            <form
                                onSubmit={handleSerch}
                            >

                                <Grid lg={12} paddingBottom={1} >
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
                                {/* <Grid paddingBottom={1}>
                            <Button type='submit' backgroundColor={'blue'} onSubmit={handleSerch} padding={2}> <SearchIcon /> Search</Button>
                            </Grid> */}
                            </form>
                        </Grid>
                    </Paper>
                    <Paper elevation={24}>
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

                    <Box sx={{ paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                            onClick={addAccountType}
                        >
                            Add New
                        </Button>


                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 1, paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};


