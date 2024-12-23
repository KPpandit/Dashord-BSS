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

    // Check if FUP section is visible
    const isFupVisible = (
        planDetails.base_pack.fup_onn_call_tariff ||
        planDetails.base_pack.fup_ofn_call_tariff ||
        planDetails.base_pack.fup_onn_sms_tariff ||
        planDetails.base_pack.fup_ofn_sms_tariff ||
        planDetails.base_pack.fup_data_tariff
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}>
            <Paper sx={{ backgroundColor: 'White', color: 'black', borderRadius: '28px' }}>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* Plan Price */}
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{ backgroundColor: '#FAC22E' }}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography sx={{ paddingLeft: 1.5, fontSize: '18px', fontWeight: '500', color: 'Black' }}>
                                     Plan   Price :  AUD$ {planDetails.plan_price || planDetails.pack_price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5} textAlign="center">
                                    <Typography sx={{ fontSize: '18px', fontWeight: '500', color: 'Black' }}>
                                    Plan Name  : {planDetails.plan_name || planDetails.pack_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} textAlign="right">
                                    <Typography sx={{ paddingRight: 1.5, fontSize: '18px', fontWeight: '500', color: 'Black' }}>
                                       Plan Code: {planDetails.plan_code || planDetails.pack_code}
                                        </Typography>
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
                                {/* Repeat for all fields */}
                                {[
                                    // { label: 'Available Balance', value: planDetails.available_core_balance },
                                    { label: 'On-Net Voice', value: planDetails.onn_call_balance },
                                    { label: 'Off-Net Voice', value: planDetails.ofn_call_balance },
                                    { label: 'On-Net SMS Balance', value: planDetails.onn_sms_balance },
                                    { label: 'Off-Net SMS Balance', value: planDetails.ofn_sms_balance },
                                    { label: 'Data Balance', value: `${planDetails.data_balance} ${planDetails.data_balance_parameter}` }]
                                    .map(({ label, value }, index) => (
                                        <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }} key={index}>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{label}</Typography>
                                            </Grid>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{value}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Grid>

                        {/* Section 2: FUP */}
                        {[
                            planDetails.base_pack.fup_onn_call_tariff,
                            planDetails.base_pack.fup_ofn_call_tariff,
                            planDetails.base_pack.fup_onn_sms_tariff,
                            planDetails.base_pack.fup_ofn_sms_tariff,
                            planDetails.base_pack.fup_data_tariff
                        ].some(value => value && value !== 0) && (  // Check if any FUP value is non-zero
                                <Grid item xs={6}>
                                    <Typography sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}>
                                        FUP (Fair Usage Price)
                                    </Typography>
                                    <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>
                                        {[{ label: 'FUP On-net Voice Tariff', value: planDetails.base_pack.fup_onn_call_tariff },
                                        { label: 'FUP Off-net Voice Tariff', value: planDetails.base_pack.fup_ofn_call_tariff },
                                        { label: 'FUP On-net SMS Tariff', value: planDetails.base_pack.fup_onn_sms_tariff },
                                        { label: 'FUP Off-net SMS Tariff', value: planDetails.base_pack.fup_ofn_sms_tariff },
                                        { label: 'FUP Data Tariff', value: planDetails.base_pack.fup_data_tariff }]
                                            .map(({ label, value }, index) => (
                                                value && value !== 0 && (  // Check if value is non-zero
                                                    <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }} key={index}>
                                                        <Grid item xs={6} style={tableCellStyle}>
                                                            <Typography variant="body1">{label}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} style={tableCellStyle}>
                                                            <Typography variant="body1">{value}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            ))}
                                    </Grid>
                                </Grid>
                            )}


                        {/* Section 3: Usage Charges */}
                        <Grid item xs={isFupVisible ? 6 : 12}>
                            <Typography sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}>
                                Out of Pack Charges
                            </Typography>
                            <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>
                                {[{ label: 'On-net Voice Tariff', value: planDetails.base_pack.onn_call_charges },
                                { label: 'Off-net Voice Tariff', value: planDetails.base_pack.ofn_call_charges },
                                { label: 'On-net SMS Tariff', value: planDetails.base_pack.onn_sms_charges },
                                { label: 'Off-net SMS Tariff', value: planDetails.base_pack.ofn_sms_charges },
                                { label: 'Data Tariff', value: planDetails.base_pack.data_charges }]
                                    .map(({ label, value }, index) => (
                                        <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }} key={index}>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{label}</Typography>
                                            </Grid>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{value}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Paper>
        </Dialog>
    );
}
