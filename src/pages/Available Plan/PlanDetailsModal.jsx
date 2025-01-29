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

    const formatBalance = (field, value) => {
        switch (field) {
            case 'data_balance':
                return value === 931 ? 'Unlimited' : `${value} ${planDetails.data_balance_parameter}`;
            case 'onn_call_balance':
                return value === 1666 ? 'Unlimited' : value;
            case 'onn_sms_balance':
                return value === 99999 ? 'Unlimited' : value;
            default:
                return value;
        }
    };

    const isUnlimited = (field, value) => {
        if (field === 'data_balance' && value === 931) return true;
        if (field === 'onn_call_balance' && value === 1666) return true;
        if (field === 'onn_sms_balance' && value === 99999) return true;
        return false;
    };

    const isFupVisible = (
        planDetails.base_pack.fup_onn_call_tariff ||
        planDetails.base_pack.fup_ofn_call_tariff ||
        planDetails.base_pack.fup_onn_sms_tariff ||
        planDetails.base_pack.fup_ofn_sms_tariff ||
        planDetails.base_pack.fup_data_tariff
    );

    const getOutOfPackCharge = (field, value) => {
        return isUnlimited(field, value) ? 'N/A' : value;
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
                                    <Grid item xs={3}>
                                        <Typography sx={{ paddingLeft: 1.5, fontSize: '18px', fontWeight: '500', color: 'Black' }}>
                                            Plan Price: AUD$ {planDetails.plan_price || planDetails.pack_price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5} textAlign="center">
                                        <Typography sx={{ fontSize: '18px', fontWeight: '500', color: 'Black' }}>
                                            Plan Name: {planDetails.plan_name || planDetails.pack_name}
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
                                {[{ label: 'On-Net Voice', field: 'onn_call_balance', value: planDetails.onn_call_balance },
                                { label: 'Off-Net Voice', field: 'ofn_call_balance', value: planDetails.ofn_call_balance },
                                { label: 'On-Net SMS', field: 'onn_sms_balance', value: planDetails.onn_sms_balance },
                                { label: 'Off-Net SMS', field: 'ofn_sms_balance', value: planDetails.ofn_sms_balance },
                                { label: 'Data', field: 'data_balance', value: planDetails.data_balance }]
                                    .map(({ label, field, value }, index) => (
                                        <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }} key={index}>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{label}</Typography>
                                            </Grid>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{formatBalance(field, value)}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                            
                        </Grid>

                        {/* Section 3: Usage Charges */}
                        <Grid item xs={isFupVisible ? 6 : 12}>
                            <Typography sx={{ fontSize: '18px', paddingLeft: 1, color: 'black', fontWeight: '500' }}>
                                Out of Pack Charges
                            </Typography>
                            <Grid container spacing={0} sx={{ paddingLeft: 1, paddingTop: 1.5 }}>
                                {[{ label: 'On-net Voice Tariff', field: 'onn_call_balance', value: planDetails.base_pack.onn_call_charges },
                                { label: 'Off-net Voice Tariff', value: planDetails.base_pack.ofn_call_charges },
                                { label: 'On-net SMS Tariff', field: 'onn_sms_balance', value: planDetails.base_pack.onn_sms_charges },
                                { label: 'Off-net SMS Tariff', value: planDetails.base_pack.ofn_sms_charges },
                                { label: 'Data Tariff', field: 'data_balance', value: planDetails.base_pack.data_charges }]
                                    .map(({ label, field, value }, index) => (
                                        <Grid item container component={Paper} elevation={3} sx={{ backgroundColor: '#253A7D', color: 'white' }} key={index}>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{label}</Typography>
                                            </Grid>
                                            <Grid item xs={6} style={tableCellStyle}>
                                                <Typography variant="body1">{getOutOfPackCharge(field, value)}</Typography>
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
