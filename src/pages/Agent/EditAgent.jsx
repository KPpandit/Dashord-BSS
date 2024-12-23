import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditAgent() {
    const location = useLocation();
    const { id } = location.state || {};
    const tokenValue = localStorage.getItem('token');

    const [localityOptions] = useState([
        "Aiwo", "Anabar", "Anetan", "Anibare", "Baitsi", "Boe", "Buada",
        "Denigomodu", "Ewa", "Ijuw", "Meneng", "Nibok", "Uaboe", "Yaren"
    ]);

    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
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
            isActive: ''
        },
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
        }
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

                <Paper elevation={20} sx={{ paddingLeft: 5, paddingRight: 5, marginTop: 3,paddingTop:3,paddingBottom:5 }}>
                    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container spacing={2} padding={2}>
                            {[{ label: 'First Name', name: 'fristName' },
                            { label: 'Last Name', name: 'lastName' },
                            
                            { label: "Email", name: "email" },
                            { label: "Business Address", name: "businessAddress" },
                            { label: "Contact", name: "contact" },
                            { label: "Document ID", name: "documentId" },
                            { label: "Document Type", name: "documentType" },
                            { label: "EKYC Token", name: "token" },
                           ].map((field) => (
                                <Grid item lg={4} md={6} sm={6} xs={12} key={field.name}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                            ))}

                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Locality</InputLabel>
                                    <Select
                                        name="locallity"
                                        value={values.locallity}
                                        onChange={handleChange}
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

                <Grid container justifyContent="center" marginTop={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}
