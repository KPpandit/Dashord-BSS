import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function AddCustomerMetaField() {
    const [showCheckbox, setShowCheckbox] = useState(false);
    const navigate = useNavigate();

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
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', color: 'white', paddingLeft: 2 }}>NEW META FIELD</Typography>
                        </Paper>
                        <Grid container spacing={2} padding={3}>





                            <Grid item lg={12} md={12} sm={12} >
                                <TextField
                                    sx={{ width: 350 }}
                                    label='Name' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <FormControl fullWidth sx={{ width: 350 }}>
                                    <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
                                    <Select
                                        fullWidth
                                        value={values.period}
                                        label="Billing Period"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="period"
                                    >
                                        <MenuItem value={'STRING'}>STRING</MenuItem>
                                        <MenuItem value={'INTEGER'}>INTEGER</MenuItem>
                                        <MenuItem value={'DECIMAL'}>DECIMAL</MenuItem>
                                        <MenuItem value={'BOOLEAN'}>BOOLEAN</MenuItem>
                                        <MenuItem value={'DATE'}>DATE</MenuItem>
                                        <MenuItem value={'JSON_OBJECT'}>JSON_OBJECT</MenuItem>
                                        <MenuItem value={'ENUMERATION'}>ENUMERATION</MenuItem>
                                        <MenuItem value={'LIST'}>LIST</MenuItem>
                                        <MenuItem value={'STATIC_TEXT'}>STATIC_TEXT</MenuItem>
                                        <MenuItem value={'TEXT_AREA'}>TEXT_AREA</MenuItem>
                                        <MenuItem value={'SCRIPT'}>SCRIPT</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} textAlign={'center'}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Unique"
                                    sx={{paddingRight:1}}
                                // name="proRatingOption1"
                                // checked={values.proRatingOption1}
                                // onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} textAlign={'center'} paddingLeft={2}>
                                {/* Add margin-top for spacing */}
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Mandatory"
                                    sx={{paddingLeft:2}}
                                // name="proRatingOption2"
                                // checked={values.proRatingOption2}
                                // onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} >
                                {/* Add margin-top for spacing */}
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Disabled"
                                    sx={{paddingLeft:0.3}}
                                // name="proRatingOption2"
                                // checked={values.proRatingOption2}
                                // onChange={handleChange}
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <TextField
                                    sx={{ width: 350 }}
                                    label='Display order' />
                            </Grid>



                            <Grid item lg={12} md={12} sm={12}>
                                <TextField
                                    sx={{ width: 350 }}
                                    label='Default value' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <FormControl fullWidth sx={{ width: 350 }}>
                                    <InputLabel id="demo-simple-select-label">Validation Rule</InputLabel>
                                    <Select
                                        fullWidth
                                        value={values.period}
                                        label="Validation Rule"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="period"
                                    >
                                        <MenuItem value={'EMAIL'}>EMAIL</MenuItem>
                                        <MenuItem value={'RANGE'}>RANGE</MenuItem>
                                        <MenuItem value={'REGEX'}>REGEX</MenuItem>
                                        <MenuItem value={'SCRIPT'}>SCRIPT</MenuItem>
                                        <MenuItem value={'PAYMENT_CARD'}>PAYMENT_CARD</MenuItem>



                                    </Select>
                                </FormControl>
                            </Grid>
                            {values.period === 'EMAIL' && (
                                <Grid item lg={12} md={12} sm={12}>
                                    <TextField
                                        sx={{ width: 350 }}
                                        fullWidth
                                        label="Error Message"
                                        name="emailAddress"
                                        value={values.emailAddress}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            )}
                            {values.period === 'RANGE' && (
                                <Grid item lg={12} md={12} sm={12} >

                                    <Grid item lg={12} md={12} sm={12} paddingBottom={2}>
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="Error Message"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid paddingBottom={2} >
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="minRange"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid >
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="maxRange"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                            )}
                            {values.period === 'REGEX' && (
                                <Grid item lg={12} md={12} sm={12} >

                                    <Grid item lg={12} md={12} sm={12} paddingBottom={2}>
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="Error Message"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid >
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="Regular Expression"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                            )}
                            {values.period === 'SCRIPT' && (
                                <Grid item lg={12} md={12} sm={12} >

                                    <Grid item lg={12} md={12} sm={12} paddingBottom={2}>
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="Error Message"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid >
                                        <TextField
                                            sx={{ width: 350 }}
                                            fullWidth
                                            label="validationScript"
                                            name="emailAddress"
                                            value={values.emailAddress}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                            )}





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
