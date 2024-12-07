import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
export default function Plan(props) {
    const columns = [
        { id: 'pack_name', name: 'Pack Name' },
        { id: 'pack_type', name: 'Pack Type' },
        { id: 'category_name', name: 'Category' },
    ];

    // Generate sample data
    const generateData = async () => {
        try {
            const response = await axios.get('http://172.17.1.11:9696/api/rating/profile/get/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };
    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    useEffect(() => {
        generateData().then(data => {
            rowchange(data);
        });
    }, []);
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
                    <Paper elevation={15} sx={{ marginBottom: 2 }}>


                        <Card variant="outlined">

                            <Box sx={{ p: 2, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom  component="div" color={'white'}>
                                        Pack Name : {selectedRecord.pack_name}
                                    </Typography>

                                </Stack>

                            </Box>





                            <Grid container>
                                <Grid item xs={12} paddingLeft={1}>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'left' }}>Pack Name :</Typography>
                                            </Grid>
                                            <Grid item xs={8} alignItems={'left'} sx={{ marginLeft: 0 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                     {selectedRecord.pack_name}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    pack Type :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -8 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.pack_type}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />

                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Call Balance :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.call_balance} {selectedRecord.call_balance_parameter}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />

                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    SMS :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -13 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.sms_balance}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />

                                    

                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                   Data Balance :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2">
                                                    {selectedRecord.data_balance} {selectedRecord.data_balance_parameter}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    Rates Offer :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2"
                                                >
                                                   
                                                    {selectedRecord.rates_offer}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider light />
                                    <Box sx={{ p: 1 }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                    For :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} alignItems={'left'} sx={{ marginLeft: -6 }}>
                                                <Typography
                                                    sx={{ fontSize: '17px', textAlign: 'left' }}
                                                    gutterBottom variant="body2"
                                                >
                                                   
                                                    {String(selectedRecord.pack_for)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                   
                                </Grid>


                            </Grid>

                        </Card>

                    </Paper>




                    <Grid padding={2} sx={{ width: 360 ,marginTop:-2,marginLeft:-2}}>
                        {/* <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#253A7D' }}>{<EditIcon sx={{ paddingRight: 1 }} />}EDIT THIS ORDER</Button>
                        <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: '#253A7D' }}>{<DeleteIcon sx={{ paddingRight: 1 }} />}DELETE</Button>

                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#253A7D' }} onClick={toPayment} >{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}Create INVOICE</Button>
                        <Button variant="contained" style={{ marginBottom: '10px', backgroundColor: '#253A7D' }}>{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}APPLY TO INVOICE</Button> */}

                    </Grid>
                    {/* <Grid sx={{ padding: 2 }}>

                    </Grid> */}
                </Grid>
            )
        } else {
            return

            <></>
        }
    };

    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`http://172.17.1.11:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
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
        <Box sx={{ display: 'container', marginTop: -2 }}>
            <Box sx={{ width: '70%', padding: '-2px' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={20} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 15,
                                    fontWeight: 'bold',

                                }}
                            >Plan's List</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >


                    <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.5 }}>
                        <form
                            onSubmit={handleSerch}
                        >

                            <Paper elevation={20} sx={{ marginBottom: 2 }}>
                                <Grid lg={8} >
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
                                                        onClick={() => handleRowClick(row)}
                                                        onMouseEnter={() => handleRowMouseEnter(row)}
                                                        onMouseLeave={handleRowMouseLeave}
                                                        sx={
                                                            highlightedRow === row
                                                                ? { backgroundColor: '#FFC30F' }
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
                        <Button variant="contained" backgroundColor="#253A7D"
                            //  onClick={handleButtonClick}
                            sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                        >
                            Downloade PDF
                        </Button>

                        <Button variant="contained" backgroundColor="#6471B5"
                            // onClick={handleButtonClick} 
                            sx={{ marginLeft: '16px', boxShadow: 20, backgroundColor: '#253A7D' }}>
                            DOWNLOADE CSV
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 2, paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};


