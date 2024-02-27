import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

export default function AddOrderChangeType() {

    const [showPaper, setShowPaper] = useState(false);

    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const [showMetaFiedls, setMetaFiedls] = useState(0);

    const tooglePaper1 = () => {
        setMetaFiedls(showMetaFiedls + 1);
    };

    const handleRemoveMetaField = (index) => {
        const updatedMetaFields = showMetaFiedls - 1 >= 0 ? showMetaFiedls - 1 : 0;
        setMetaFiedls(updatedMetaFields);
    };

    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            next_run_date: "",
            revire_report: "",
            days_review_report: "",
            billing_period: [''],
            lastdayofMonth: "",
            dueDate: "",
            Language: "",
            credit_notification_limit1: "",
            credit_notification_limit2: "",
            invoice_delevery_method: "",
            payment_method: "",
            useParentPricing: false,
            file: false
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
                    <Paper elevation={5} >
                        <Paper elevation={10} item lg={12} paddingBottom={1} sx={{ backgroundColor: '#1976D2', height: 30 }}>
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', color: 'white', paddingLeft: 2 }}>NEW ORDER CHANGE TYPE</Typography>
                        </Paper>
                        <Grid container spacing={2} padding={3}>







                            <Grid item lg={12} md={12} sm={12}>
                                <TextField
                                    sx={{ width: 350 }}
                                    label='Name' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={values.file}
                                        onChange={handleChange}
                                        name="file"
                                    />}
                                    label="Select All"
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <FormControl sx={{ width: 350 }}>
                                    <InputLabel id="demo-simple-select-label">Product Categories</InputLabel>
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Product Categories"
                                        disabled={values.file}
                                        name='billing_period'
                                        value={values.billing_period}
                                        onChange={handleChange}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        <MenuItem value={'top up'}>Top Up</MenuItem>
                                        <MenuItem value={'p'}>P</MenuItem>
                                        <MenuItem value={'pre-paid'}>Pre-Paid</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={values.useParentPricing}
                                        onChange={handleChange}
                                        name="useParentPricing"
                                    />}
                                    label="Allow order status change"
                                />
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
                                    >
                                        <CancelIcon sx={{ paddingRight: 1 }} />
                                        Cancle
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Box sx={{ backgroundColor: '#1976D2' }}>
                            <Button onClick={togglePaper}>

                                <Typography variant="body1" sx={{ marginRight: 1, color: 'white', textAlign: 'left' }}>MetaFields</Typography>
                                {showPaper ? < RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                            </Button>
                        </Box>
                        {
                            showPaper && (
                                <Paper sx={{ p: 4, textAlign: 'center' }}>
                                    <Box sx={{
                                        marginTop: 1,
                                        display: 'flex',  // Set display to flex
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Grid container textAlign={'center'} alignContent={'center'} justifyContent={'center'}>
                                            <Grid item lg={4}>
                                                <FormControl sx={{ width: 350, textAlign: 'center' }}>
                                                    <InputLabel id="demo-simple-select-label">Import Meta Fields</InputLabel>
                                                    <Select
                                                        multiple
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Import Meta Fields"
                                                        disabled={values.file}
                                                        name='billing_period'
                                                        value={values.billing_period}
                                                        onChange={handleChange}
                                                        renderValue={(selected) => selected.join(', ')}
                                                    >
                                                        <MenuItem value={'top up'}></MenuItem>

                                                    </Select>
                                                </FormControl>

                                            </Grid>
                                            <Grid item>
                                                <AddCircleIcon sx={{ p: 2 }} />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    onClick={tooglePaper1}
                                                    type="submit"
                                                    style={{ backgroundColor: '#1976D2', color: 'white' }}
                                                >
                                                    <AddCircleIcon sx={{ paddingRight: 1 }} />
                                                    Add New MetaField
                                                </Button>
                                            </Grid>



                                        </Grid>


                                    </Box>
                                    {Array.from({ length: showMetaFiedls }).map((_, index) => (
                                        <Grid
                                            key={index}
                                            sx={{
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingTop:1
                                            }}
                                        >
                                           <Grid>
                                           <Paper elevation={5}>
                                                <Grid backgroundColor={'#1976D2'} textAlign={'right'} color={'white'}>
                                                <IconButton onClick={() => handleRemoveMetaField(index)} sx={{color:'white'}}>
                                                    <ClearIcon />
                                                </IconButton>
                                                    
                                                </Grid>
                                            <AddCustomerMetaField/>
                                            </Paper>
                                           </Grid>
                                            
                                            
                                        </Grid>
                                    ))}
                                </Paper>
                            )
                        }
                    </Paper>

                </Grid>
            </form>
        </Box>

    );
}
function AddCustomerMetaField() {
    const [showMetaFields, setShowMetaFields] = useState(0);
    const navigate = useNavigate();

    const handleRemoveMetaField = (index) => {
        const updatedMetaFields = showMetaFields - 1 >= 0 ? showMetaFields - 1 : 0;
        setShowMetaFields(updatedMetaFields);
    };

    const onCancel = () => {
        // Reset the form values
        resetForm();

        // Navigate to a different location (adjust the path accordingly)
        navigate("/dashboard");
    };
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
                                    sx={{ paddingRight: 1 }}
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
                                    sx={{ paddingLeft: 2 }}
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
                                    sx={{ paddingLeft: 0.3 }}
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
                               
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>

                </Grid>
            </form>
        </Box>

    );
}
