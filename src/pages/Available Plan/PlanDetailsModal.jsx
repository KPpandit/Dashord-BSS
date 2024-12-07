import { Dialog, DialogContent, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import White_logo from '../../assets/White_logo.jpg';

export default function PlanDetailsModal({ open, onClose, planDetails }) {
    console.log(planDetails, 'data in plan details');
    if (!planDetails) {
        return null; // Handle null or undefined planDetails
    }

    const tableCellStyle = {
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'left',
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
            <Paper sx={{ backgroundColor: 'White', color: 'black', borderRadius: '28px' }}>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* Plan Price */}
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{ backgroundColor: '#FAC22E' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography sx={{ paddingLeft: 1.5, fontSize: '22px', fontWeight: '500', color: 'Black' }}>
                                            AUD$ {planDetails.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        {/* Add any right-aligned content here */}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                       

                        {/* Section 1: Built-in Usage */}
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}>
                                Built-in Usage
                            </Typography>
                            <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Available Balance</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.available_core_balance}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">On-Net Voice</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.onn_call_balance} mins</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Off-Net Voice</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.ofn_call_balance}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">On-Net SMS Balance</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.onn_sms_balance}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Off-Net SMS Balance</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.ofn_sms_balance}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Data Balance</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.data_balance} {planDetails.data_balance_parameter}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Section 2: FUP */}
                        <Grid item xs={6}>
                            <Typography sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}>
                                FUP ( Fair Usage Price )
                            </Typography>
                            <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">FUP On-net Voice Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.fup_onn_call_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">FUP Off-net Voice Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.fup_ofn_call_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">FUP On-net SMS Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.fup_onn_sms_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">FUP Off-net SMS Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.fup_ofn_sms_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">FUP Data Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.fup_data_tariff}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Section 3: Usage Charges */}
                        <Grid item xs={6}>
                            <Typography sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}>
                                Usage Charges
                            </Typography>
                            <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">On-net Voice Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.onn_call_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Off-net Voice Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.ofn_call_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">On-net SMS Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.onn_sms_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Off-net SMS Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.ofn_sms_tariff}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">Data Tariff</Typography>
                                    </Grid>
                                    <Grid item xs={6} style={tableCellStyle}>
                                        <Typography variant="body1">{planDetails.base_pack.data_tariff}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid container paddingTop={1} sx={{marginBottom:-2}} >
                        <Grid item xs={12} sx={{height:100}}>
                            <img
                                src={White_logo}
                                alt='_blank'
                                style={{ maxWidth: '24%', height: '80%' }}
                            />
                        </Grid>
                        
                    </Grid> */}
                </DialogContent>
            </Paper>
        </Dialog>
    );
}
