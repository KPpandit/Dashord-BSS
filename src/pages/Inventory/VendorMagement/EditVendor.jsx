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

export default function EditVendor() {
    const navigate = useNavigate();

    const location = useLocation();
    const selectObj = location.state && location.state.selectObj;
    // console.log(selectObj+" value from this")
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




    const toVendorManagement = () => {
        navigate('/vendormanagement')
    }



    const tokenValue = localStorage.getItem('token');
    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {
            id:"",
            firstName: "",
            maidenName: "",
            lastName: "",
            email: "",
            contact: '',
            address: '',
            companyName: '',
            createDate: '',
            token: '',
            userId: '',

        },

        onSubmit: async (values) => {
          
            try {
                const res = await axios.put(
                  `http://172.5.10.2:9090/api/update/vendor/vendorId/`+selectObj.id,
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
                toast.success('Vendor updated Successfully', { autoClose: 2000 });
               
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


        }
    })
    useEffect(() => {
        if (selectObj) {
            setValues((prevValues) => ({
                ...prevValues,
                id:selectObj.id|| '',
                firstName: selectObj.firstName || '',
                maidenName: selectObj.maidenName || '',
                lastName: selectObj.lastName || '',
                email: selectObj.email || '',
                contact: selectObj.contact || '',
                address: selectObj.address || '',
                companyName: selectObj.companyName || '',
              
                createDate: selectObj.createDate || '',
                token: selectObj.token || '',
                userId: selectObj.userId || '',

            }));
        }
    }, [selectObj]);
    console.log(values)
    return (
        <Box component="form"  >
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
                        >Edit Vendor </Typography>
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
                                            label="firstName"
                                            fullWidth
                                            name='firstName'
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="maidenName"
                                            fullWidth
                                            name='maidenName'
                                            value={values.maidenName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="lastName"
                                            fullWidth
                                            name='lastName'
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Email"
                                            type='email'
                                            required
                                            fullWidth
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}


                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Contact Number"
                                            required
                                            type="number"
                                            fullWidth
                                            name='contact'
                                            value={values.contact}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Address"
                                            required
                                            type="text"
                                            name='address'
                                            fullWidth
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="companyName"
                                            required
                                            type="text"
                                            fullWidth
                                            name='companyName'
                                            value={values.companyName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="create Date"
                                            required
                                            type="date"
                                            name='createDate'
                                            fullWidth
                                            value={values.createDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="token"
                                            required
                                            type="text"
                                            name='token'
                                            fullWidth
                                            value={values.token}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="userId"
                                            required
                                            type="number"
                                            name='userId'
                                            fullWidth
                                            value={values.userId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
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
                    Update
                </Button>
                <Button
                    style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft: 30 }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    onClick={toVendorManagement}
                >
                    Back
                </Button>

            </Grid>


        </Box>

    )
}