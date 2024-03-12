import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function AddCategoryNotification() {
    const [showCheckbox, setShowCheckbox] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            next_run_date: "",
            revire_report: "",
            days_review_report: "",
            billing_period: "",
            lastdayofMonth: "",
            dueDate: "",
            Language: "",
            credit_notification_limit1: "",
            credit_notification_limit2: "",
            invoice_delevery_method: "",
            payment_method: "",
            useParentPricing: "",
            file: null
        },
        onSubmit: async (values) => {
            console.log(values);
            // Your form submission logic here using axios
            try {
                const res = await axios.post('http://172.5.10.2:9696/api/rates/offer/save', { ...values }, {
                    headers: {
                        "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                if (res.status === 200) {
                    // Handle success scenario here
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error scenario here
            }
        }
    });
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const names = [
        'MSISDN ',
        'SIM IMSI',
        'CPE MODEL',
        'IMEI',
        'CPE TYPE',
        'CPE DEVICE ID',
        'Allocated Data',
        'Consumed Data',
        
    ];

    const [personName, setPersonName] = useState(['']);

    




    return (
        <Box sx={{
            marginTop: 1,
            display: 'container',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} padding={2} textAlign='center' justifyContent="center" sx={{ marginX: 'auto', maxWidth: '100%' }}>
                    <Paper elevation={5} sx={{ width: 600 }}>
                        <Paper elevation={10} item lg={12} paddingBottom={1} sx={{ backgroundColor: '#1976D2', height: 30 }}>
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', color: 'white', paddingLeft: 2 }}>ADD NOTIFICATION CATEGORY</Typography>
                        </Paper>
                        <Grid container spacing={2} padding={3}>





                            <Grid item lg={12} md={12} sm={12} >
                                
                                <TextField
                                    sx={{ width: 350 }}
                                    label='Category ID'
                                    value={'New'}
                                    disabled
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <TextField
                                    sx={{ width: 350 }}
                                    label='Name' />
                            </Grid>

                           



                            
                        </Grid>

                        <Grid />
                        <Grid item lg={12} padding={2}>
                            <Grid container spacing={2}  >
                                <Grid item>
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: '#1976D2', color: 'white' }}

                                    >
                                        <SaveAltIcon sx={{ paddingRight: 1 }} />
                                        Save Changes
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: '#1976D2', color: 'white' }}
                                        onClick={(e)=>{navigate('/notification')}}
                                    >
                                        <CancelIcon sx={{ paddingRight: 1 }} />
                                        Cancle
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>

                </Grid>
            </form>
        </Box>

    );
}
