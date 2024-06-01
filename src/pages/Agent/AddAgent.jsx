import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';

import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function AddAgent() {
    const navigate = useNavigate();
    const [showPaper, setShowPaper] = useState(false);
    const [showCommision, setShowCommision] = useState(false);
    const tokenValue = localStorage.getItem('token');
    
    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const showCommissiomPaper = () => {
        setShowCommision(!showCommision);
    };
    const [agentId,setAgentId]=useState('');
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const { handleChange, handleSubmit, handleBlur, values , resetForm,submitForm:submaintAgentDetails } = useFormik({
        initialValues: {
            totalPayments:"",
            totalRefunds:"",
            totalPayouts:"",
            duePayout:"",
            type:"",
            parentId:"",
            commissionType:"",
            fristName:"",
            lastName:"",
            email:"",
            businessAddress:"",
            businessNature:"",
            contact:"",
            documentId:"",
            documentType:"",
            token:"",
            locallity:"",
            coordinate:"",
            reasonStatus:"",
            isActive:""

        },
        onSubmit: async (values) => {
            console.log("fromm 2 dependent API");
            try {
              const res = await axios.post(
                `http://172.5.10.2:9090/api/savepartner/baseuser/3/partnercommission/${agentId}`,
                { ...values },
                {
                  headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                }
              );
          
              console.log(res.status);
          
              if (res.status === 201) {
                resetForm();
                toast.success('Agent Added Successfully', { autoClose: 2000 });
                // Optionally, you can perform additional actions here
                // setTimeout(() => { props.onClose(); }, 100)
              } else {
                toast.error('Error! Please try again later', { autoClose: 2000 });
              }
            } catch (error) {
              console.error('Error during API request:', error);
          
              if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
          
                // Handle specific status codes if needed
                if (error.response.status === 401) {
                  console.log('Unauthorized. Redirect or perform necessary actions.');
                  localStorage.removeItem('token');
                  navigate('/');
                }
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No Response Received');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
              }
          
              toast.error('Something went wrong', { autoClose: 2000 });
            }
          },
    })
   
    const { handleChange: handleChange2, handleSubmit: handleSubmit2, handleBlur: handleBlur2, values: values2, submitForm: submitMainForm2,resetForm:resetForm1 } = useFormik({
        initialValues: {
            amount: "",
            type: "",
            partnerId: "",
            commissionProcessRunId: "",
        },
        onSubmit: async (values2) => {
            // your submission logic for the second formik instance
            console.log("Form 1 submitted:", values2);
            try {
              const res2 = await axios.post(
                'http://172.5.10.2:9090/api/savepartnercommission/currency/1',
                { ...values2 },
                {
                  headers: {
                    Authorization: 'Bearer ' + tokenValue,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                }
              );
          
              // Check the status code from the response
              console.log('Status code from response:', res2.status);
          
              if (res2.status === 201) {
                setAgentId(Number(res2.data.id) + 1);
                // resetForm1();
               await submaintAgentDetails();
              }
            } catch (error) {
              console.error('Error during API request:', error);
             
              if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
          
                // Handle specific status codes if needed
                if (error.response.status === 401) {
                  console.log('Unauthorized. Redirect or perform necessary actions.');
                  localStorage.removeItem('token');
                  navigate('/');
                }
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No Response Received');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
              
              }
            }
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
   useEffect(()=>{
    agentId;
   },[agentId])
    
    return (
        <Box sx={{marginTop:-1}}>
           <Grid >
                <Paper elevation={15}>
                    <Typography color={'grey'} sx={{ paddingLeft:5,fontWeight:'500', fontSize: '25px', color: '#253A7D' }}>ADD AGENT</Typography></Paper>
            </Grid>
           <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit2}>


                <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                    <Box
                        sx={{
                            marginTop: 2,
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
                                    value={values.documentId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="documentType"
                                        type="text"
                                        required
                                        fullWidth
                                        name="documentType"
                                    value={values.documentType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                </Grid> <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="EKYC Token"
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
                                        value={values.parentId}
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
                    <Grid sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 5 }}>
                        <Button
                        sx={{
                            backgroundColor:'#253A7D'
                        }}
                        variant='contained' onClick={togglePaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>COMMISSION EXCEPTION</Typography>
                            {showPaper ? < RemoveIcon /> : <AddIcon />}
                        </Button>
                        {showPaper && (
                            <Paper elevation={5} sx={{ padding: 2, marginTop: 2 }}>
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
                                            label="Parent ID"
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
                                            label="Commission Process Run Id"
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

                    <Grid sx={{ paddingBottom: 5 }}>
                       
                        <Button sx={{
                            backgroundColor:'#253A7D'
                        }} variant='contained' onClick={showCommissiomPaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>REFERRAL COMMISSION</Typography>
                            {showCommision ? < RemoveIcon /> : <AddIcon />}
                        </Button>
                       
                        {showCommision && (
                            <Paper elevation={5} sx={{ padding: 2, marginTop: 2 }}>
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
                <Grid padding={1} paddingTop={5} lg={4} md={4} sm={6} xs={12} sx={{ textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                    <Button
                        type="submit"

                        style={{ backgroundColor: '#253A7D', color: 'white' }}
                        // onClick={()=> handleSubmit}
                        sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow:20 }}
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