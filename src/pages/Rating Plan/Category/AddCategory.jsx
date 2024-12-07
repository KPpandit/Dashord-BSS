import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddCategory({ onClose ,onCategoryAdded}) {
    const tokenValue = localStorage.getItem('token');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const { handleChange, handleSubmit, values, setValues } = useFormik({
        initialValues: {
            name: '', // The single field to be submitted
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `http://172.17.1.11:9696/api/category/detail/add?ctg_name=${values.name}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.status === 200) {
                    toast.success('Category Added Successfully', { autoClose: 2000 });
                    onCategoryAdded();
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                    setValues({ name: '' }); // Clear the input field
                }
            } catch (error) {
                toast.error('Error adding category', { autoClose: 2000 });
            }
        },
    });

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <ToastContainer position="bottom-left" />
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <Paper elevation={0} sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <Grid container spacing={2} paddingBottom={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Category Name"
                                name="name"
                                type="text"
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid padding={1} sx={{ textAlign: 'center' }}>
                        <Button
                            type="submit"
                            style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                            sx={{ mb: 5, textAlign: 'center', boxShadow: 15 }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}
