import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function Collections() {
    const [values, setValues] = useState({
        next_run_date: "",
        firstcheck: false,
        seconfcheck: false,
        thirdcehck: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Your form submission logic using axios
        console.log(values);
        // ... (other logic)
    };

    // ... (other code)

    return (
        <Box sx={{
            marginTop: 2,
            display: 'container',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} padding={2} textAlign='center' justifyContent="center" sx={{ marginX: 'auto', maxWidth: '100%' }}>
                    <Paper elevation={5} container>
                        <Grid item lg={12} paddingBottom={1} sx={{ backgroundColor: '#253A7D', height: 28 }}>
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', color: 'white', paddingLeft: 2 }}>COLLECTIONS</Typography>
                        </Grid>
                        
                        <Grid container lg={12} md={12} sm={12} alignItems="center" sx={{ padding: 3 }}>
                            <TableContainer component={Paper} sx={{ padding: 1,marginBottom:-2 }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#253A7D' }}>
                                        <TableRow >
                                            <TableCell sx={{color:'white'}}>ID</TableCell>
                                            <TableCell sx={{color:'white'}}>STEPS</TableCell>
                                            <TableCell sx={{color:'white'}}>FOR DAYS</TableCell>
                                            <TableCell sx={{color:'white'}}>NOTIFICATION</TableCell>
                                            <TableCell sx={{color:'white'}}>PAYMENT</TableCell>
                                            <TableCell sx={{color:'white'}}>SUSPEND</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                <TextField />
                                            </TableCell>
                                            <TableCell>
                                                <TextField />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    name="firstcheck"
                                                    checked={values.firstcheck}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    name="seconfcheck"
                                                    checked={values.seconfcheck}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    name="thirdcehck"
                                                    checked={values.thirdcehck}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {/* Add more rows as needed */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                       <Grid container sx={{padding:1}} spacing={2}>
                       <Grid item xs={6} textAlign={'right'}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#253A7D', color: 'white' }}
                                  
                                >
                                    <SaveAltIcon sx={{ paddingRight: 1 }} />
                                    Save Changes
                                </Button>
                            </Grid>
                            <Grid item xs={4} textAlign={'left'}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#253A7D', color: 'white'}}
                                >
                                    <CancelIcon sx={{ paddingRight: 1 }} />
                                   Cancle
                                </Button>
                            </Grid>
                       </Grid>
                           
                    </Paper>
                </Grid>
            </form>
        </Box>
    );
}
