import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function Invoice(props) {
    const columns = [
        { id: 'name', name: 'INVOICE ID' },
        { id: 'customer_id', name: 'CUSTOMER' },
        { id: 'comp_name', name: 'COMPANY NAME' },
        { id: 'due_date', name: 'DUE DATE' },
        { id: 'status', name: 'STATUS' },
        { id: 'amount', name: 'AMOUNT' },
        { id: 'balance', name: 'BALANCE' },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                name: `INVOICE ID ${i}`,
                customer_id: `CUSTOMER ${i}`,
                comp_name: `COMPANY NAME${i}`,
                due_date: `DUE DATE ${i}`,
                status: `STATUS ${i}`,
                amount: `AMOUNT ${i}`,
                balance: `BALANCE ${i}`,

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


                        <Card variant="outlined" sx={{ maxWidth: 360 }}>

                            <Box sx={{ p: 2, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        INVOICE 2
                                    </Typography>

                                </Stack>

                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    NAME : {selectedRecord.name}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    CUSTOMER : {selectedRecord.customer_id}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    COMPANY NAME: {selectedRecord.comp_name}
                                </Typography>
                            </Box>

                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    DUE DATE : {selectedRecord.due_date}
                                </Typography>
                            </Box>

                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    STATUS : {selectedRecord.status}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    AMOUNT : {selectedRecord.amount}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    BALANCE : {selectedRecord.balance}
                                </Typography>
                            </Box>


                        </Card>

                    </Paper>

                    <Paper elevation={20} sx={{ marginTop: 2 }}>
                        <Grid sx={{ backgroundColor: '#253A7D' }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2, color: 'white' }} style={{ fontFamily: 'Roboto', fontSize: '14', fontWeight: '400' }}> INVOICE LINES</Typography>
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
                                <CardContent>

                                    <Typography variant="h5" component="div">
                                        Description
                                    </Typography>
                                    <Divider light />
                                    <Typography sx={{ paddingTop: 2 }} variant="body2">
                                        Name of the plan -3: CI NOMAD <br />
                                        Data: 100 Gb Duration: 30 days End user: nomadic <br />
                                        (wifi, mifi) Price: 7.000 XOF

                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Paper>
                    <Grid padding={2} sx={{ width: 360 }}>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px' ,backgroundColor:'#253A7D',boxShadow:20}} onClick={toPayment} >PAY INVOICE</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px' ,backgroundColor:'#253A7D'}}>DOWNLOADE PDF</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px',backgroundColor:'#253A7D' }}>SEND AS EMAIL</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px' ,backgroundColor:'#253A7D'}}>Delete</Button>

                    </Grid>
                    <Grid sx={{ padding: 2 }}>

                    </Grid>
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
        <Box sx={{ display: 'container' ,marginTop:-4.5}}>
            <Box sx={{ width: '70%', padding: '16px' }}>
               
                    <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                        <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                            <Grid>
                                <Typography
                                    style={{

                                        fontSize: '20px',
                                        paddingLeft: 10,
                                        fontWeight: 'bold',

                                    }}
                                >Invoice List</Typography>
                            </Grid>
                        </Paper>
                    </Box>

                    <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.5 }}>
                        <form
                            onSubmit={handleSerch}
                        >

                           <Paper elevation={10} sx={{ marginBottom: 2 }}>
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
                    <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >

                        <Paper elevation={10}>
                            <TableContainer sx={{ maxHeight: 600 }}>
                                <Table stickyHeader size='medium' padding="normal">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} sx={{ textAlign: 'center',fontSize:'17px' }}><Typography >{column.name}</Typography></TableCell>
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
                                                                    ? { backgroundColor: '#F2C32B' }
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

                        <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                            <Button variant="contained" backgroundColor="#253A7D"
                            //  onClick={handleButtonClick}
                            sx={{boxShadow:20,backgroundColor:'#253A7D'}}
                            >
                                Downloade PDF
                            </Button>

                            <Button variant="contained" backgroundColor="#253A7D"
                                // onClick={handleButtonClick} 
                                sx={{ marginLeft: '16px',boxShadow:20 ,backgroundColor:'#253A7D'}}>
                                DOWNLOADE CSV
                            </Button>
                        </Box>
                    </Box>
               
            </Box>
            <Box sx={{ paddingLeft: 1, paddingTop: 3.7 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};


