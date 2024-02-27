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
import Logo from '../../../../src/assets/logo.png'
export default function InvoiceDisplay() {
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
        // navigate("/invoiceDisplay")
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };




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
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', width: '100%', color: 'white', paddingLeft: 2 }}>INVOICE DISPLAY</Typography>

                        </Paper>

                        <Grid item lg={12} md={12} sm={12} paddingTop={5} padding={2} >

                            <TextField
                                sx={{ width: 420 }}
                                label="Next Invoice Number"
                                type='text'
                                name="Language"
                                value={values.Language}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} paddingTop={5} padding={2} >

                            <TextField
                                sx={{ width: 420 }}
                                label="Invoice Number Prefix"
                                type='text'
                                name="lastdayofMonth"
                                value={values.lastdayofMonth}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} paddingTop={5} padding={2}>
                            {/* Replace the TextField with an image element (img) */}
                            {selectedFile ? (
                                <img src={URL.createObjectURL(selectedFile)} alt='Selected File' style={{ maxWidth: '100%', maxHeight: 300 }} />
                            ) : (
                                <img src={Logo} alt='Default Logo' style={{ maxWidth: '100%', maxHeight: 200 }} />
                            )}


                        </Grid>

                        <Grid item lg={12} md={12} sm={12} paddingTop={5} padding={2} >


                        </Grid>

                        <Grid item lg={12} md={12} sm={12} paddingTop={5} padding={2}>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg" // Specify the accepted file types if needed
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput">
                                <button
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    Choose File
                                </button>
                            </label>
                            {selectedFile && (
                                <span style={{ marginLeft: 10 }}>{selectedFile.name}</span>
                            )}
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
