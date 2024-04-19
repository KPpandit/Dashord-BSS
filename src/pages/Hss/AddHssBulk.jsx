import { Box, Button, Card, Checkbox, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';

import axios from "axios";
// import Notification from '../Components/Notification/Notification';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Notification from '../Components/Notification/Notification';


export default function AddHssBulk(props) {
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ ...notification, open: false });
    }
    const [showPaper, setShowPaper] = useState(false);

    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const [showPaper1, setShowPaper1] = useState(false);

    const togglePaper1 = () => {
        setShowPaper1(!showPaper1);
    };
    const [showPaper2, setShowPaper2] = useState(false);

    const togglePaper2 = () => {
        setShowPaper2(!showPaper2);
    };
    const [showPaper3, setShowPaper3] = useState(false);

    const togglePaper3 = () => {
        setShowPaper3(!showPaper3);
    };
    const [showPaperPayment, setShowPaperPayment] = useState(false);

    const togglePaperPayment = () => {
        setShowPaperPayment(!showPaperPayment);
    };


    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });




    const location = useLocation();

    const tokenValue = localStorage.getItem('token');



    const isFirstRender = useRef(true);


    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {
            start_imsi: '',
            start_msisdn: '',
            subscriber_number: '',
            serviceCapability: {
                Attach: {
                    LTE: false,
                    NR: false,
                    IMS: false,
                },
                Voice: {
                    Outgoing: false,
                    Incoming: false
                },
                SMS: {
                    OutgoingSms: false,
                    OutgoingServiceSms: false,
                    IncomingSms: false
                },
                DataService: {
                    LTE: false,
                    NR: false
                }
            },

        },
        onSubmit: async (values) => {
            console.log("-----values----->", values)
            // console.log(values);
            // setResult(values);
            const res = await axios.post('http://172.5.10.2:9697/api/hss/detail/save/bulk/subscriber',
                { ...values }, {
                headers: {
                    "Authorization": `Bearer +${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
            ).then(res => {
                console.log(res.status + "status code ")
                if (res.status === 200) {
                    toast.success('UDM Record Added Successfully', { autoClose: 2000 });
                    setTimeout(() => { props.onClose(); }, 3000)
                }
                // location.reload();
            }).catch(err => {
                console.log("-----------");
                setNotify({
                    isOpen: true,
                    message: "Something went Wrong",
                    type: 'error'
                })

                console.log(err.response.data.status_code + "-------")

            })


        }
    })
    const tohss = () => {
        navigate('/hss')
    }

    const commonInputLabelProps = { shrink: true, style: { fontFamily: 'Roboto', } };
    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        // Convert the value to boolean
        const boolValue = value === 'true';
        setValues((prevValues) => ({
            ...prevValues,
            [name]: boolValue,
        }));
    };

    const handleCheckboxChange = (category, key) => {
        setValues((prevValues) => ({
            ...prevValues,
            serviceCapability: {
                ...prevValues.serviceCapability,
                [category]: {
                    ...prevValues.serviceCapability[category],
                    [key]: !prevValues.serviceCapability[category][key],
                },
            },
        }));
    };
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <ToastContainer position="bottom-left" />

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                >
                    {notification.message}
                </MuiAlert>
            </Snackbar>
            <Paper elevation={15} sx={{ paddingLeft: 2, paddingRight: 2 }}> {/* Adjust the padding as needed */}
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >

                    <Grid2 >

                        <Grid
                            container
                            spacing={6} // Adjust the spacing between items as needed
                            paddingBottom={2} // Padding for the entire container
                            paddingTop={2} // Padding for the entire container
                        >
                            <Grid item lg={12} >
                                <Grid container spacing={2}>
                                    <Grid item lg={4} md={4} sm={4} xs={4} > {/* Padding for individual items */}
                                        <TextField
                                            label="Start IMSI"
                                            name='start_imsi'
                                            type='text'
                                            value={values.start_imsi}
                                            fullWidth
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={4} >
                                        <TextField
                                            label="Start MSISDN"
                                            type="text"
                                            fullWidth
                                            name='start_msisdn'
                                            value={values.start_msisdn}
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Subscriber Number"
                                            type="number"
                                            fullWidth
                                            name='subscriber_number'
                                            value={values.subscriber_number}
                                            onChange={handleChange}



                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Paper elevation={10}>
                                            <Grid lg={12}>
                                                <Paper sx={{ backgroundColor: 'blue' }}>
                                                    <Typography variant="h6" sx={{ paddingLeft: 2, color: '#253A7D', backgroundColor: '#FBB716' }} gutterBottom>Service Capability</Typography>
                                                </Paper>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            {Object.keys(values.serviceCapability).map((category) => (
                                                <Grid item xs={12} key={category}>


                                                    <Paper sx={{ backgroundColor: 'blue' }}>
                                                        <Typography variant="h6" sx={{ paddingLeft: 2, color: '#253A7D', backgroundColor: '#FBB716' }} gutterBottom>{category}</Typography>
                                                    </Paper>


                                                    <Grid container spacing={1}>
                                                        {Object.entries(values.serviceCapability[category]).map(([key, value]) => (
                                                            <Grid item xs={6} key={key}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={value}
                                                                            onChange={() => handleCheckboxChange(category, key)}
                                                                        />
                                                                    }
                                                                    label={key}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid2>

                </Box>


            </Paper>
            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                <Button

                    style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 15 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft: 30 }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    onClick={tohss}
                >
                    Back
                </Button>

            </Grid>

            <Notification
                notify={notify}
                setNotify={setNotify}

            />
        </Box>
    )
}