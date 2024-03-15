import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
export default function Payment(props) {
    const columns = [
        { id: 'id', name: 'ID' },
        { id: 'customer', name: 'CUSTOMER' },
        { id: 'comp_name', name: 'COMPANY NAME' },
        { id: 'date', name: 'DATE' },
        { id: 'p_r', name: 'P/R' },
        { id: 'amount', name: 'AMOUNT' },
        { id: 'method', name: 'Method' },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: `ID ${i}`,
                customer: `CUSTOMER ${i}`,
                comp_name: `COMPANY NAME${i}`,
                date: `DATE ${i}`,
                p_r: `P/R ${i}`,
                amount: `AMOUNT ${i}`,
                method: `Method ${i}`,

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
                    <Paper elevation={15} sx={{ marginBottom: 2 }}>


                        <Card variant="outlined" sx={{ maxWidth: 360 }}>

                            <Box sx={{ p: 2, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        PAYMENT 100
                                    </Typography>

                                </Stack>

                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    ID : {selectedRecord.id}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    CUSTOMER : {selectedRecord.customer}
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
                                    Date : {selectedRecord.date}
                                </Typography>
                            </Box>

                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    P/R : {selectedRecord.p_r}
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

                                    METHOD : {selectedRecord.method}
                                </Typography>
                            </Box>


                        </Card>

                    </Paper>

                    <Paper elevation={15} sx={{ marginTop: 2 }}>
                        <Grid sx={{ backgroundColor: '#253A7D' }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2, color: 'white' }} style={{ fontFamily: 'Roboto', fontSize: '14', fontWeight: '400' }}> PAYMENT INSTRUMENT(S)</Typography>
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


                                    <Typography sx={{ paddingTop: 2 }} variant="body2">

                                        Instrument Name : Credit Card<br />
                                        cc.cardholder.name : Vijay <br />
                                        cc.number : ************6789<br />
                                        cc.expiry.date : 12/2024<br />

                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </Box>
                    </Paper>
                    <Grid padding={2} sx={{ width: 360 }}>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px',backgroundColor:'#253A7D' }} onClick={toPayment} >{<EditIcon sx={{ paddingRight: 1 }} />}Edit</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px' ,backgroundColor:'#253A7D'}}>{<DeleteIcon sx={{ paddingRight: 1 }} />}Delete</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px',backgroundColor:'#253A7D' }}>{<MarkEmailReadIcon sx={{ paddingRight: 1 }} />}NOTIFY THIS PAYMENT BY EMAIL</Button>


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
        <Box sx={{ display: 'container',marginTop:-2 }}>
            <Box sx={{ width: '70%'}}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, marginRight:-0.8,marginLeft:-0.8,backgroundColor: 'white', color: '#253A7D' }}>
                        <Grid lg={6} sx={{ textAlign: 'left', marginY: -0.1 }}>
                            <Typography
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '20px',

                                    fontWeight: 'bold',

                                }}
                            > Payment's List</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >
                    <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.1 }}>
                        <form
                            onSubmit={handleSerch}
                        >

                            <Paper elevation={10} sx={{ marginBottom: 2 }}>
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
                    <Paper elevation={15}>
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

                    <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                        <Button variant="contained" backgroundColor="#6471B5"
                            sx={{ backgroundColor: '#253A7D' }}
                        //  onClick={handleButtonClick}
                        >
                            Downloade PDF
                        </Button>

                        <Button variant="contained" backgroundColor="#6471B5"
                            // onClick={handleButtonClick} 
                            sx={{ marginLeft: '16px', backgroundColor: '#253A7D' }}>
                            DOWNLOADE CSV
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


