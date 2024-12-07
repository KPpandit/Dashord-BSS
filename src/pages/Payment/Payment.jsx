import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import axios from "axios";
export default function Payment(props) {
    const columns = [
        { id: 'id', name: 'ID' },
        { id: 'msisdn', name: 'MSISDN' },
        // { id: 'attempt', name: 'Attempt' },
        { id: 'amount', name: 'Amount' },
        { id: 'createDatetime', name: 'Purchased Date' },
        { id: 'product', name: 'Product' },
        // { id: 'optlock', name: 'OPT Lock' },
        { id: 'planId', name: 'Plan Id' },
    ];

    // Generate sample data
   
    console.log()
    const [rows, setRows] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/payments', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                // Assuming your API response is an array of objects similar to the data structure in your generateData function
                const apiData = response.data;

                // Update the state with the API data
                setRows(apiData);
                setIsLoading(false);
            } catch (error) {

               
                // Handle error as needed
            }
        };

        fetchData(); // Invoke the fetchData function when the component mounts
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


                        <Card variant="outlined" sx={{ maxWidth: 360 }}>

                            <Box sx={{ p: 2, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                        ID  
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
                                    MSISDN : {String(selectedRecord.msisdn)}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    Attempt: {selectedRecord.attempt}
                                </Typography>
                            </Box>

                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    Amount : {selectedRecord.amount}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                  Transaction  Mode : {selectedRecord.creditCard==null ? ' Cash' :' Credit Card'}
                                </Typography>
                            </Box>

                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    Deleted : {selectedRecord.deleted}
                                </Typography>
                            </Box>
                           
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">

                                    Balance : {selectedRecord.balance}
                                </Typography>
                            </Box>


                        </Card>

                    </Paper>

                 
                    <Grid padding={2} sx={{ width: 360 }}>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px',backgroundColor:'#253A7D' }} sx={{boxShadow:24}} onClick={toPayment} >{<EditIcon sx={{ paddingRight: 1 }} />}Edit</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px' ,backgroundColor:'#253A7D'}} sx={{boxShadow:24}}>{<DeleteIcon sx={{ paddingRight: 1 }} />}Delete</Button>
                        <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px',backgroundColor:'#253A7D' }} sx={{boxShadow:24}}>{<MarkEmailReadIcon sx={{ paddingRight: 1 }} />}NOTIFY THIS PAYMENT BY EMAIL</Button>


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
            .get(`http://172.17.1.20:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
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
            <Box sx={{ width: '72%'}}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, marginRight:-0.8,marginLeft:-0.8,backgroundColor: 'white', color: '#253A7D' }}>
                        <Grid lg={6} sx={{ textAlign: 'left', marginY: -0.1 }}>
                            <Typography
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '20px',

                                    fontWeight: 'bold',

                                }}
                            > Inward Payments </Typography>
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
                                            <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} ><Typography fontFamily={'Sans-serif'}>{column.name}</Typography></TableCell>
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
                                                              
                                                                {String(row[column.id]).toUpperCase()}
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
                            sx={{ backgroundColor: '#253A7D' ,boxShadow:24}}
                        //  onClick={handleButtonClick}
                        >
                            Download PDF
                        </Button>

                        <Button variant="contained" backgroundColor="#6471B5"
                            // onClick={handleButtonClick} 
                            sx={{ marginLeft: '16px', backgroundColor: '#253A7D' ,boxShadow:24}}>
                            DOWNLOAD CSV
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 4, paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};


