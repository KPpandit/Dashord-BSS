import { Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material';
import React, { Component } from 'react'
import LogoMo from '../../assets/LogoMo.jpg';
import White_logo from '../../assets/White_logo.jpg'
export default function PlanDetailsModal({ open, onClose, planDetails }) {
    if (!planDetails) {
        // If planDetails is null or undefined, return null or handle it accordingly
        return null;
    }
    const tableCellStyle = {
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'left',
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
            <Paper sx={{ backgroundColor: 'White', color: 'black', borderRadius: '28px' }}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{backgroundColor:'#FAC22E'}}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography sx={{paddingLeft:1.5,fontSize:'22px',fontWeight:'500',color:'Black'}}>AU$ {planDetails.rates_offer.match(/\d+/)[0]}</Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign={'right'} >
                                        {/* hello */}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>


                        <Grid item xs={12}>
                            <Typography
                                sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}
                            >Details :</Typography>
                            <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>



                                {/* Table Body */}
                                <Grid item container component={Paper} elevation={3} sx={{
                                    height: '50px', backgroundColor: '#253A7D', textAlign:
                                        'left', color: 'white'
                                }}>
                                    <Grid item xs={6} style={tableCellStyle} >
                                        <Typography variant="body1">Pack Validity</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.rates_offer.match(/(\d+)\s*days/)[0]}</Typography>
                                    </Grid>

                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{
                                    height: '50px', backgroundColor: '#253A7D', textAlign:
                                        'left', color: 'white'
                                }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Total Data</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.data_balance} {planDetails.data_balance_parameter}</Typography>
                                    </Grid>

                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{
                                    height: '50px', backgroundColor: '#253A7D', textAlign:
                                        'left', color: 'white'
                                }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Voice</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.call_balance} {planDetails.call_balance_paramete}</Typography>
                                    </Grid>

                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{
                                    height: '50px', backgroundColor: '#253A7D', textAlign:
                                        'left', color: 'white'
                                }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">SMS</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.sms_balance}</Typography>
                                    </Grid>

                                </Grid>


                                {/* Add more rows for the body as needed */}
                            </Grid>
                            {/* <Grid item>
                                <img src={LogoMo} alt='_blank' />
                            </Grid> */}


                        </Grid>
                    </Grid>
                    <Grid container paddingTop={1} sx={{marginBottom:-2}} >
                        <Grid item xs={12} sx={{height:100}}>
                            <img
                                src={White_logo}
                                alt='_blank'
                                style={{ maxWidth: '24%', height: '80%' }}
                            />
                        </Grid>
                        {/* <Typography style={{ fontFamily: 'roboto', fontSize: '18px' }}>Additional Benefits(s)</Typography> */}

                    </Grid>

                </DialogContent>
            </Paper>
        </Dialog>
    );
};
