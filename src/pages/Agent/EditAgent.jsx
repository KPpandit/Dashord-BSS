import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditAgent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const tokenValue = localStorage.getItem('token');

    const [localityOptions] = useState([
        "Aiwo", "Anabar", "Anetan", "Anibare", "Baitsi", "Boe", "Buada",
        "Denigomodu", "Ewa", "Ijuw", "Meneng", "Nibok", "Uaboe", "Yaren",
    ]);

    const { handleChange, handleSubmit, handleBlur, values, setValues, errors, touched } = useFormik({
        initialValues: {
            fristName: '',
            lastName: '',
            email: '',
            businessAddress: '',
            businessNature: '',
            contact: '',
            documentId: '',
            documentType: '',
            token: '',
            locallity: '',
            reasonStatus: '',
            isActive: '',
        },
        validationSchema: Yup.object({
            fristName: Yup.string().required('First Name is required'),
            email: Yup.string()
            .email('Invalid email format') // This checks for general email format
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format. Please include a valid domain.') 
            .notRequired(),
            contact: Yup.string()
                .matches(/^\d{10}$/, 'Contact must be a 10-digit number')
                .required('Contact is required'),
            token: Yup.string()
                .matches(/^[a-zA-Z0-9]{6,20}$/, 'Token must be alphanumeric (6-20 characters)')
                .required('EKYC Token is required'),
        }),
        onSubmit: async (formData) => {
            try {
                const response = await axios.put(
                    `https://bssproxy01.neotel.nr/crm/api/updatepartner/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    toast.success('Agent Updated Successfully', { autoClose: 2000 });
                } else {
                    toast.error('Error! Please try again later', { autoClose: 2000 });
                }
            } catch (error) {
                toast.error('Error! Please try again later', { autoClose: 2000 });
            }
        },
    });

    useEffect(() => {
        const fetchAgentDetails = async () => {
            try {
                const response = await axios.get(
                    `https://bssproxy01.neotel.nr/crm/api/partner/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setValues({
                        ...values,
                        fristName: response.data.fristName || '',
                        lastName: response.data.lastName || '',
                        email: response.data.email || '',
                        businessAddress: response.data.businessAddress || '',
                        businessNature: response.data.businessNature || '',
                        contact: response.data.contact || '',
                        documentId: response.data.documentId || '',
                        documentType: response.data.documentType || '',
                        token: response.data.token || '',
                        locallity: response.data.locallity || '',
                        reasonStatus: response.data.reasonStatus || '',
                        isActive: response.data.isActive || false,
                    });
                }
            } catch (error) {
                console.error('Error fetching agent details:', error);
            }
        };

        fetchAgentDetails();
    }, [id, tokenValue, setValues]);

    return (
        <Box sx={{ marginTop: -1, marginRight: 1, marginLeft: 1 }}>
            <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Paper elevation={15}>
                        <Typography
                            variant="h5"
                            sx={{ paddingLeft: 5, fontWeight: 500, fontSize: 30, color: '#253A7D' }}
                        >
                            Edit Reseller
                        </Typography>
                    </Paper>
                </Grid>

                <Paper
                    elevation={20}
                    sx={{ paddingLeft: 5, paddingRight: 5, marginTop: 3, paddingTop: 3, paddingBottom: 5 }}
                >
                    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container spacing={2} padding={2}>
                            {[
                                { label: 'First Name', name: 'fristName', editable: false },
                                { label: 'Last Name', name: 'lastName', editable: false },
                                { label: 'Email', name: 'email', editable: true },
                                { label: 'Business Address', name: 'businessAddress', editable: false },
                                { label: 'Contact', name: 'contact', editable: true },
                                { label: 'Document ID', name: 'documentId', editable: false },
                                { label: 'Document Type', name: 'documentType', editable: false },
                                { label: 'EKYC Token', name: 'token', editable: false },
                            ].map((field) => (
                                <Grid item lg={4} md={6} sm={6} xs={12} key={field.name}>
                                    <TextField
                                        fullWidth
                                        required={field.editable} 
                                        label={field.label}
                                        name={field.name}
                                        value={values[field.name]}
                                        disabled={!field.editable} 
                                        onChange={field.editable ? handleChange : undefined}
                                        onBlur={field.editable ? handleBlur : undefined}
                                        InputProps={{
                                            readOnly: !field.editable,
                                        }}
                                        error={touched[field.name] && Boolean(errors[field.name])}
                                        helperText={touched[field.name] && errors[field.name]}
                                    />
                                </Grid>
                            ))}

                            {/* Locality Field */}
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Locality *</InputLabel>
                                    <Select
                                        name="locallity"
                                        value={values.locallity}
                                        label="Locality"
                                        onChange={handleChange}
                                        disabled
                                    >
                                        {localityOptions.map((option) => (
                                            <MenuItem value={option} key={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                    </Box>
                </Paper>

                <Grid container justifyContent="center" spacing={2} marginTop={3}>
                    <Grid item>
                        <Button type="submit" sx={{ backgroundColor: '#253A7D' }} variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ backgroundColor: '#FBB716', color: 'black' }}
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
