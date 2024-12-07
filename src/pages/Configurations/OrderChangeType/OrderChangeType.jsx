import { Box, Button, Card, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function OrderChangeType(props) {
    const columns = [
        { id: 'name', name: 'NAME' },
        { id: 'product_category', name: 'PRODUCT CATEGORY' },
        { id: 'allowed_order_change', name: 'ALLOW ORDER CHANGE' },
        { id: 'status', name: 'STATUS' },


    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                name: `NAME ${i}`,
                product_category: `PRODUCT CATEGORY ${i}`,
                allowed_order_change: `ALLOW ORDER CHANGE ${i}`,
                status: `STATUS ${i}`,


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
    const handleButtonClick = () => {
        navigate('/addOrderChangeType');
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleRowClick = (row) => {
        setSelectedRecord(row);
    };

    const SelectedRecordDetails = () => {
        if (selectedRecord) {
            return (
                <Grid>
                    <Paper sx={{width:290}} elevation={24}>


                        <Card variant="outlined">

                            <Paper elevation={5}>
                                <Box sx={{ p: 1, backgroundColor: '#253A7D' }}>

                                    <Stack sx={{ backgroundColor: '#253A7D' }} direction="row" justifyContent="space-between" alignItems="center">
                                        
                                            <Grid backgroundColor={'#253A7D'} color={'white'}>
                                                <Typography gutterBottom  component="div">
                                                DEFAULT
                                                </Typography>
                                            </Grid>
                                       
                                    </Stack>

                                </Box>
                            </Paper>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    Name : {selectedRecord.name}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                PRODUCT CATEGORY : {selectedRecord.product_category}
                                </Typography>
                            </Box>
                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                ALLOW ORDER CHANGE : {selectedRecord.allowed_order_change}
                                </Typography>
                            </Box>

                            <Divider light />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                STATUS : {selectedRecord.status}
                                </Typography>
                            </Box>

                        </Card>

                    </Paper>
                    <Grid>

                    </Grid>
                </Grid>
            )
        } else  return null;
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
            <Box sx={{ width: '70%', padding: '16px' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, paddingTop: "4%", width: '100%' }} >

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
                        <Button variant="contained" sx={{backgroundColor:'#253A7D'}} backgroundColor="#6471B5" onClick={handleButtonClick}>
                            ADD NEW
                        </Button>


                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 1, paddingTop: 5.5 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
};


