import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';
import axios from "axios";
// import Notification from '../Components/Notification/Notification';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function Addhss() {
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
    const [showPaperPayment, setShowPaperPayment] = useState(false);

    const togglePaperPayment = () => {
        setShowPaperPayment(!showPaperPayment);
    };
    const [billingCycle, setBillingCycle] = useState('');
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);

    const handleBillingCycleChange = (event) => {
        const selectedBillingCycle = event.target.value;
        setBillingCycle(selectedBillingCycle);
        setShowCreditCardFields(selectedBillingCycle === 'Credit Card');
    };






    const location = useLocation();
    const accountType = location.state?.accountType;
    const tokenValue = localStorage.getItem('token');



    const isFirstRender = useRef(true);


    //   function handleSubmit(){

    //   }
    //   function handleBlur(){

    //   }
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            imsi: '',
            msisdn: '',
            ambr: '',
            nssai: '',
            arfb: '',
            sar: '',
            rat: '',
            cn: '',
            smf_sel: '',
            sm_dat: '',
            eps_flag: '',
            eps_odb: '',
            hplmn_odb: '',
            ard: '',
            epstpl: '',
            status: '',
            context_id: '',
            apn_context: '',

        },
        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.post('http://172.5.10.2:9696/api/hss/detail/save',
                { ...values }, {
                headers: {
                    "Authorization":  `Bearer +${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
            ).then(res => {
                console.log(res.status + "status code ")
                if (res.status === 200) {
                    toast.success('UDM Record Added Successfully', { autoClose: 2000 });
                }
                // location.reload();
            }).catch(err => {
                console.log("-----------");
                if (err.response.data.status_code === 409) {
                    setNotify({
                        isOpen: true,
                        message: 'This Data is already Exist',
                        type: 'error'
                    })
                    setTimeout(() => { props.onClose(); }, 5000)
                }
                if (err.response.data.status_code === 500) {
                    setNotify({
                        isOpen: true,
                        message: ' Some Thing is Wrong',
                        type: 'error'
                    })
                    setTimeout(() => { props.onClose(); }, 2000)
                }
                console.log(err.response.data.status_code + "-------")

            })


        }
    })
    const tohss = () => {
        navigate('/hss')
    }

    const commonInputLabelProps = { shrink: true, style: { fontFamily: 'Roboto', } };

    return (
        <Box component="form"  onSubmit={handleSubmit}>
              <ToastContainer position="bottom-left" />
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, paddingLeft: 3, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',
                                textAlign: 'center'

                            }}
                        >Add UDM</Typography>
                    </Grid>
                </Paper>
            </Box>
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
            <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                <Box
                    sx={{
                        marginTop: 1.5,
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
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="IMSI"
                                            name='imsi'
                                            type='text'
                                            value={values.imsi}
                                            fullWidth
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="MSISDN"
                                            type="number"
                                            fullWidth
                                            name='msisdn'
                                            value={values.msisdn}
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="AMBR"
                                            type="number"
                                            fullWidth
                                            name='ambr'
                                            value={values.ambr}
                                            onChange={handleChange}



                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="NSSAI"
                                            type="text"
                                            required
                                            fullWidth
                                            name='nssai'
                                            value={values.nssai}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="ARFB"
                                            type="text"
                                            required
                                            fullWidth
                                            name='arfb'
                                            value={values.arfb}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="SAR"
                                            type="text"
                                            required
                                            fullWidth
                                            name='sar'
                                            value={values.sar}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="RAT"
                                            type="number"
                                            required
                                            fullWidth
                                            name='rat'
                                            value={values.rat}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="cn"
                                            type="number"
                                            required
                                            fullWidth
                                            name='cn'
                                            value={values.cn}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="SMF SEL"
                                            type="text"
                                            required
                                            fullWidth
                                            name='smf_sel'
                                            value={values.smf_sel}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="SM DAT"
                                            type="text"
                                            required
                                            fullWidth
                                            name='sm_dat'
                                            value={values.sm_dat}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField
                                            label="EPS ODB"
                                            type="number"
                                            required
                                            fullWidth
                                            name='eps_odb'
                                            value={values.eps_odb}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="HPLMN ODB"
                                            type="number"
                                            required
                                            fullWidth
                                            name='hplmn_odb'
                                            value={values.hplmn_odb}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="ARD"
                                            type="number"
                                            required
                                            fullWidth
                                            name='ard'
                                            value={values.ard}
                                            onChange={handleChange}

                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="EPSTPL"
                                            type="text"
                                            required
                                            fullWidth
                                            name='epstpl'
                                            value={values.epstpl}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="Context Id"
                                            type="number"
                                            required
                                            fullWidth
                                            name='context_id'
                                            value={values.context_id}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="Apn Context"
                                            type="text"
                                            required
                                            fullWidth
                                            name='apn_context'
                                            value={values.apn_context}
                                            onChange={handleChange}


                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >EPS Flag</InputLabel>
                                            <Select
                                                fullWidth

                                                label="EPS FLAG"
                                                name='eps_flag'
                                            value={values.eps_flag}
                                            onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>InActive</MenuItem>

                                            </Select>
                                        </FormControl>
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


        </Box>
    )
}