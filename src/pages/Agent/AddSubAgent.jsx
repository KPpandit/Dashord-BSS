import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import Notification from '../Components/Notification/Notification';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
export default function AddSubAgent() {
    const location = useLocation();
    const { id } = location.state || {};
    const [showPaper, setShowPaper] = useState(false);
    const [showCommision, setShowCommision] = useState(false);
    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const showCommissiomPaper = () => {
        setShowCommision(!showCommision);
    };
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const { handleChange, handleSubmit, handleBlur, values, submitForm: submaintAgentDetails } = useFormik({
        initialValues: {
            totalPayments: "",
            totalRefunds: "",
            totalPayouts: "",
            duePayout: "",
            type: "",
            parentId: "",
            commissionType: "",
            fristName: "",
            lastName: "",
            email: "",
            businessAddress: "",
            contact: "",
            token: "",
            locallity: "",
            coordinate: "",
            reasonStatus: "",
            isActive: "",



        },
        onSubmit: async (values) => {
            const res = await axios.post(' http://172.5.10.2:9090/api/savepartner/baseuser/3/partnercommission/' + agentId,
                { ...values }, {

                headers: {
                    "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 200) {
                    setNotify({
                        isOpen: true,
                        message: 'Agent Added SuccessFully ',
                        type: 'success'
                    })
                    setTimeout(() => { props.onClose(); }, 3000)
                }
                else {
                    setNotification({
                        open: true,
                        message: 'Error! please try again later',
                        severity: 'error',
                    });
                }
            }).catch(e => {

                setNotification({
                    open: true,
                    message: 'Error!',
                    severity: 'error',
                });
            })
        }
    })
    const [agentId, setAgentId] = useState('');
    const { handleChange: handleChange2, handleSubmit: handleSubmit2, handleBlur: handleBlur2, values: values2, submitForm: submitMainForm2, } = useFormik({
        initialValues: {
            amount: "",
            type: "",
            partnerId: "",
            commissionProcessRunId: "",
        },
        onSubmit: async (values2) => {
            // your submission logic for the second formik instance
            console.log("Form 2 submitted:", values2);
            const res2 = await axios.post('http://172.5.10.2:9090/api/savepartnercommission/currency/1',
                { ...values2 }, {

                headers: {
                    "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 200) {

                    setNotification({
                        open: true,
                        message: 'Record Added successfully!',
                        severity: 'success',
                    });
                    setAgentId(res.data.id)
                    submaintAgentDetails();

                }
            }).catch(e => {
                setNotification({
                    open: true,
                    message: 'Failed ! please try again',
                    severity: 'error',
                });

            })

        },
    });
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
    return (
        <Box>
             <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1,paddingLeft:3,margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',

                            }}
                        >Add Sub Agent</Typography>
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
            <form onSubmit={handleSubmit2}>


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

                            <Divider />
                            <Grid
                                container
                                spacing={2} // Adjust the spacing between items as needed
                                paddingBottom={2} // Padding for the entire container
                                paddingTop={2} // Padding for the entire container
                                textAlign={'center'}
                                alignContent={'center'}
                                alignItems={'center'}
                            >
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="First Name"
                                        type="text"
                                        required
                                        fullWidth
                                        name="fristName"
                                        value={values.fristName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        required
                                        fullWidth
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="Email"
                                        type="email"
                                        required
                                        fullWidth
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="businessAddress"
                                        type="text"
                                        required
                                        fullWidth
                                        name="businessAddress"
                                        value={values.businessAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="businessNature"
                                        type="text"
                                        required
                                        fullWidth
                                        name="businessNature"
                                        value={values.businessNature}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="contact"
                                        type="text"
                                        required
                                        fullWidth
                                        name="contact"
                                        value={values.contact}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="documentId"
                                        type="text"
                                        required
                                        fullWidth
                                        name="documentId"
                                    // value={values.documentId}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="documentType"
                                        type="text"
                                        required
                                        fullWidth
                                        name="documentType"
                                    // value={values.documentType}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </Grid> <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="token"
                                        type="text"
                                        required
                                        fullWidth
                                        name="token"
                                        value={values.token}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="locallity"
                                        type="text"
                                        required
                                        fullWidth
                                        name="locallity"
                                        value={values.locallity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="coordinate"
                                        type="text"
                                        required
                                        fullWidth
                                        name="coordinate"
                                        value={values.coordinate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>



                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="reasonStatus"
                                        type="text"
                                        required
                                        fullWidth
                                        name="reasonStatus"
                                        value={values.reasonStatus}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">isActive</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.isActive}
                                            label="isActive"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="isActive"
                                        >
                                            <MenuItem value={true}>Active</MenuItem>
                                            <MenuItem value={false}>In Active</MenuItem>


                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="totalPayments"
                                        type="number"
                                        required
                                        fullWidth
                                        name="totalPayments"
                                        value={values.totalPayments}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="totalRefunds"
                                        type="number"
                                        required
                                        fullWidth
                                        name="totalRefunds"
                                        value={values.totalRefunds}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="totalPayouts"
                                        type="number"
                                        required
                                        fullWidth
                                        name="totalPayouts"
                                        value={values.totalPayouts}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="duePayout"
                                        type="number"
                                        required
                                        fullWidth
                                        name="duePayout"
                                        value={values.duePayout}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="type"
                                        type="text"
                                        required
                                        fullWidth
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="parentId"
                                        type="number"
                                        required
                                        fullWidth
                                        name="parentId"
                                        value={id}
                                        disabled
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="commissionType"
                                        type="text"
                                        required
                                        fullWidth
                                        name="commissionType"
                                        value={values.commissionType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>





                            </Grid>






                        </Grid2>

                    </Box>
                    <Grid sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                        <Button 
                        sx={{backgroundColor:'#253A7D'}}
                        variant='contained' onClick={togglePaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>COMMISSION EXCEPTION</Typography>
                            {showPaper ? < RemoveIcon /> : <AddIcon />}
                        </Button>
                        {showPaper && (
                            <Paper sx={{ padding: 2, marginTop: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            label="Amount"
                                            name="amount"
                                            value={values2.amount}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="text"
                                            required
                                            fullWidth
                                            label="TYPE"
                                            name="type"
                                            value={values2.type}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            name="partnerId"
                                            value={values2.partnerId}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            name="commissionProcessRunId"
                                            value={values2.commissionProcessRunId}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    </Grid>

                    <Grid sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                        <Button 
                          sx={{backgroundColor:'#253A7D'}}
                        variant='contained' onClick={showCommissiomPaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>REFERRAL COMMISSION</Typography>
                            {showCommision ? < RemoveIcon /> : <AddIcon />}
                        </Button>
                        {showCommision && (
                            <Paper sx={{ padding: 2, marginTop: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">Agent ID</InputLabel>
                                        <TextField
                                            type="text"
                                            required
                                            fullWidth
                                            name="zipCode"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">Start Date</InputLabel>
                                        <TextField
                                            type="date"
                                            required
                                            fullWidth
                                            name="field2"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">End Date</InputLabel>
                                        <TextField
                                            type="date"
                                            required
                                            fullWidth
                                            name="field3"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">Percentage</InputLabel>
                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            name="field3"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    </Grid>

                </Paper>
                <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop:4,textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                    <Button
                        type="submit"
                       
                        style={{ backgroundColor: '#253A7D', color: 'white' }}
                        // onClick={()=> handleSubmit}
                        sx={{ mb: 5, width:'100px',textAlign: { sm: 'center' } }}
                    >
                        Submit
                    </Button>
                </Grid>
                <Notification
                    notify={notify}
                    setNotify={setNotify}

                />
            </form>
        </Box>
    )
}