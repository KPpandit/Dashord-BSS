import { Box, Button, Card, CardActions, CardContent, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import Notification from '../Components/Notification/Notification';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LogoMo from '../../assets/LogoMo.jpg';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoiceSample() {
    const pdfContainerRef = useRef(null);

    const downloadPDF = async () => {
      const input = pdfContainerRef.current;
  
      if (input) {
        const canvas = await html2canvas(input);
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
        const imgData = canvas.toDataURL('image/png');
  
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Use the full A4 size
        pdf.save('invoice.pdf');
      }
    };
    return (
        <Box sx={{ marginTop: -1 }} ref={pdfContainerRef}>

            <ToastContainer position="bottom-left" />
            <form >


                <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                    >

                        <Grid2 >

                            <Divider />
                            <Grid
                                container
                                spacing={2} // Adjust the spacing between items as needed
                                paddingBottom={2} // Padding for the entire container
                                paddingTop={2} // Padding for the entire container

                            >
                                <Grid item xs={12} paddingBottom={2} sx={{ backgroundColor: '#253A7D', display: 'flex', alignItems: 'center' }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} >
                                            <Typography color={'white'} sx={{ paddingTop: 2, fontWeight: '500', fontSize: '25px', color: 'white' }}>
                                                MOBILE SERVICES
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} textAlign={'right'}>
                                            <img src={LogoMo} alt='_blank' />
                                        </Grid>

                                    </Grid>

                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} paddingBottom={2}> {/* Padding for individual items */}
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 ,fontWeight:'bold'}} color="text.secondary" gutterBottom>
                                                        Mr Ashok Biraj
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        NO 405
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6} paddingBottom={2}> {/* Padding for individual items */}
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        {/* be{bull}nev{bull}o{bull}lent */}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                    </Grid>

                                </Grid>





                            </Grid>






                        </Grid2>

                    </Box>




                </Paper>
                <Grid padding={1} paddingTop={5} lg={4} md={4} sm={6} xs={12} sx={{ textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                    <Button type="button" style={{ backgroundColor: '#253A7D', color: 'white' }} onClick={downloadPDF} sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}>
                        Download PDF
                    </Button>
                </Grid>
                {/* <Notification
                    notify={notify}
                    setNotify={setNotify}

                /> */}
            </form>
        </Box>
    )
}