import { Box, Button, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios if not already imported
import { useNavigate } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
export default function AgentCommProcess() {
    const [result, setResult] = useState([]);
    const navigate = useNavigate();

    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            name: "",
            biling_cycle: "",
            period: "",
            invoice_design: "",
            credit_limit: "",
            currency: "",
            Language: "",
            credit_notification_limit1: "",
            credit_notification_limit2: "",
            invoice_delevery_method: "",
            payment_method: "",

        },
        onSubmit: async (values) => {
            console.log(values);
            setResult(values);
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
    }
    return (
        <Box sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} textAlign='center' justifyContent="center" sx={{ marginX: 'auto', maxWidth: '80vw' }}>
                    <Grid item lg={12} paddingBottom={3}>
                        <Typography  paddingBottom={2} color={'grey'} sx={{ textAlign: 'center', width: '100%' ,fontSize:'19px'}}>AGENT COMMISSION PROCESS</Typography>
                        <Divider />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} >
                        <InputLabel id="demo-simple-select-label">Next Run Date</InputLabel>
                        <TextField
                            sx={{ width: 420 }}
                            type='date'
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12}>
                        <FormControl >

                            <TextField
                                label='Period'
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                type='number'
                                sx={{ width: 420 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ marginLeft: '-20px' }}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={'Month'}>Month</MenuItem>
                                                <MenuItem value={'Week'}>Week</MenuItem>
                                                <MenuItem value={'Day'}>Day</MenuItem>
                                                <MenuItem value={'Year'}>Year</MenuItem>
                                                <MenuItem value={'Semi Monthly'}>Semi Monthly</MenuItem>
                                            </Select>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Grid>









                    <Grid item xs={12} textAlign='center'>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item sx={6}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#253A7D', color: 'white', marginTop: '16px', paddingRight: 5 }}

                                >
                                    {<SaveAltIcon sx={{ paddingRight: 1 }} />}
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item  sx={6} >
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#253A7D', color: 'white', marginTop: '16px', marginLeft: 5 }}
                                   
                                   
                                >
                                    {<CancelIcon sx={{ paddingRight: 1 }} />}
                                    Cancle
                                </Button>
                            </Grid>

                            <Grid item sx={12}>
                                <Button

                                    type="submit"
                                    style={{ backgroundColor: '#253A7D', color: 'white', marginTop: '16px', marginLeft: 5 }}
                                    
                                >
                                    {<DoneIcon sx={{ paddingRight: 1 }}/>}
                                   Run Commission Process
                                </Button>
                            </Grid>
                        </Grid>



                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
