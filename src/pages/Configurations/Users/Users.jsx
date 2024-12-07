import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, Modal, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Cancel, Save } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';


export default function Users() {
    const columns = [
        { id: 'Id', name: 'ID' },
        { id: 'name', name: 'Name' },
        { id: 'organiszation', name: 'ORGANIZATION' },
        { id: 'type', name: 'TYPE' },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                Id: ` ${i}`,
                name: `Name ${i}`,
                organiszation: `ORGANIZATION ${i}`,
                type: `TYPE ${i}`,
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
                <Grid>
                    <Grid sx={{ marginBottom: 2 ,boxShadow:24}}>


                        <Card variant="outlined" sx={{ maxWidth: 400, width: 320 }}>

                            <Paper sx={{ p: 1, backgroundColor: '#253A7D' }}>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#253A7D' }}>
                                    <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                                   {selectedRecord.name}
                                    </Typography>

                                </Stack>

                            </Paper>


                            <CardContent>
                                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    ID
                                                </TableCell>
                                                <TableCell>{selectedRecord.Id}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    NAME 
                                                </TableCell>
                                                <TableCell>{selectedRecord.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    ORGANIZATION
                                                </TableCell>
                                                <TableCell>{selectedRecord.organiszation}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    TYPE
                                                </TableCell>
                                                <TableCell>{selectedRecord.type}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <Grid >
                                <Button sx={{ margin: 2 ,backgroundColor:'#253A7D'}} variant="contained" >
                                    Edit
                                </Button>
                                <Button sx={{ margin: 2 ,backgroundColor:'#253A7D'}} variant="contained" >
                                    Delete
                                </Button>
                            </Grid>
                            

                        </Card>

                    </Grid>






                </Grid>
            )
        } else
            return null

    };



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
                                                    textAlign: 'left',
                                                    height: '2px',

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

                    <Grid >
                        <Button sx={{ margin: 2 ,backgroundColor:'#253A7D',boxShadow:24}} variant="contained" onClick={(e)=>{navigate("/addUsers")}}>
                            Add New
                        </Button>

                        
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ paddingTop: 2 }} >
                <SelectedRecordDetails />
            </Box>


        </Box>
    )
}

