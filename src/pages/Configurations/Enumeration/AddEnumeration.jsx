import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
export default function AddEnumeration() {
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

    const back = () => {
        navigate("/accounttype")
    };

    const [fieldValues, setFieldValues] = useState(['']); // Initial state with an empty value

    const handleAddField = () => {
        setFieldValues([...fieldValues, '']); // Add a new empty value to the state
    };

    const handleRemoveField = (index) => {
        const updatedValues = [...fieldValues];
        updatedValues.splice(index, 1); // Remove the field at the specified index
        setFieldValues(updatedValues);
    };

    const handleFieldValueChange = (index, value) => {
        const updatedValues = [...fieldValues];
        updatedValues[index] = value;
        setFieldValues(updatedValues);
    };
    console.log(fieldValues+"=-----")

    return (
        <Box sx={{
            marginTop: 1,
            display: 'conatiner',
            flexDirection: 'column',
            alignItems: 'left',
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} padding={2} textAlign='center' justifyContent="center" sx={{ marginX: 'auto', maxWidth: '80vw' }}>

                    <Paper elevation={5} container sx={{ width: 500 }} >
                        <Paper elevation={5} item lg={12} paddingBottom={1} sx={{ backgroundColor: '#1976D2', height: 30 }}>
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', width: '100%', color: 'white', paddingLeft: 2 }}>NEW ENUMERATION</Typography>

                        </Paper>

                        <Grid item lg={12} md={12} sm={12} paddingTop={5} padding={2} >

                            <TextField
                                sx={{ width: 420 }}
                                label="Name"
                                type='text'
                                name="lastdayofMonth"
                                value={values.lastdayofMonth}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} paddingTop={5}>
                            <Typography>
                                Please provide some values below
                                <IconButton onClick={handleAddField}>
                                    <AddIcon />
                                </IconButton>
                            </Typography>
                            {fieldValues.map((value, index) => (
                                <Grid key={index} container spacing={2} padding={2} alignItems="center">
                                    <Grid item xs={1} textAlign={'right'}>
                                        <Typography>{index}</Typography>
                                    </Grid>
                                    <Grid item xs={9}  >

                                        <TextField
                                            label='Value'
                                            value={value}
                                            onChange={(e) => handleFieldValueChange(index, e.target.value)}
                                            fullWidth
                                            sx={{ width: 300 }}
                                        />
                                       
                                    </Grid>
                                    <Grid item xs={2} textAlign={'left'}>
                                    <IconButton onClick={() => handleRemoveField(index)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Grid>

                                </Grid>
                            ))}
                        </Grid>





                        <Grid item xs={12} textAlign='center' sx={{ display: 'flex', flexDirection: 'column', minHeight: '10vh' }}>
                            <Grid container spacing={2} justifyContent="center" sx={{ flex: '1 1 auto' }}>
                                <Grid item xs={5}>
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: '#1976D2', color: 'white', marginTop: '16px' }}
                                    >
                                        <SaveAltIcon sx={{ paddingRight: 1 }} />
                                        Save Changes
                                    </Button>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: '#1976D2', color: 'white', marginTop: '16px' }}
                                        onClick={back}
                                    >
                                        <CancelIcon sx={{ paddingRight: 1 }} />
                                        Cancel
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
