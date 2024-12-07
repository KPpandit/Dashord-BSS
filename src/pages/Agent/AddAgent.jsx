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
    // const [agentId, setAgentId] = useState('');
    let agentId;
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const { handleChange: handleChange2, handleSubmit: handleSubmit2, handleBlur: handleBlur2, values: values2, submitForm: submitMainForm2, resetForm: resetForm1 } = useFormik({
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
                    'https://bssproxy01.neotel.nr/crm/api/savepartnercommission/currency/1',
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
                    // setAgentId(Number(res2.data.id));
                    agentId=res2.data.id;
                    console.log(agentId, '------ Agent ID')
                    // resetForm1();
                    
                     handleSubmit();
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
    const { handleChange, handleSubmit, handleBlur, values, resetForm, setValues } = useFormik({
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
            businessNature: "",
            contact: "",
            documentId: "",
            documentType: "",
            token: "",
            locallity: "",
            coordinate: "",
            reasonStatus: "",
            isActive: "",
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    `https://bssproxy01.neotel.nr/crm/api/savepartner/baseuser/1/partnercommission/${agentId}`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (res.status === 201) {
                    resetForm();
                    toast.success("Agent Added Successfully", { autoClose: 2000 });
                } else {
                    toast.error("Error! Please try again later", { autoClose: 2000 });
                }
            } catch (error) {
                console.error("Error during API request:", error);

                if (error.response && error.response.status === 401) {
                    console.log("Unauthorized. Redirect or perform necessary actions.");
                    localStorage.removeItem("token");
                    navigate("/");
                }

                toast.error("Something went wrong", { autoClose: 2000 });
            }
        },
    });



    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });

    useEffect(() => {
        agentId;
    }, [agentId])

    return (
        <Box sx={{ marginTop: -1 }}>
            <Grid >
                <Paper elevation={15}>
                    <Typography color={'grey'} sx={{ paddingLeft: 5, fontWeight: '500', fontSize: '25px', color: '#253A7D' }}>ADD Partner</Typography></Paper>
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
                            <Grid container spacing={2} paddingBottom={2} paddingTop={2} textAlign="center" alignContent="center" alignItems="center">
                                {[
                                    { label: "First Name", name: "fristName", type: "text", value: values.fristName },
                                    { label: "Last Name", name: "lastName", type: "text", value: values.lastName },
                                    { label: "Email", name: "email", type: "email", value: values.email },
                                    { label: "Business Address", name: "businessAddress", type: "text", value: values.businessAddress },
                                    { label: "Business Nature", name: "businessNature", type: "text", value: values.businessNature },
                                    { label: "Contact", name: "contact", type: "text", value: values.contact },
                                    { label: "Document ID", name: "documentId", type: "text", value: values.documentId },
                                    { label: "Document Type", name: "documentType", type: "text", value: values.documentType },
                                    { label: "EKYC Token", name: "token", type: "text", value: values.token },
                                    { label: "Locality", name: "locallity", type: "text", value: values.locallity },
                                    { label: "Coordinate", name: "coordinate", type: "text", value: values.coordinate },
                                    { label: "Reason Status", name: "reasonStatus", type: "text", value: values.reasonStatus },
                                    { label: "Total Payments", name: "totalPayments", type: "number", value: values.totalPayments },
                                    { label: "Total Refunds", name: "totalRefunds", type: "number", value: values.totalRefunds },
                                    { label: "Total Payouts", name: "totalPayouts", type: "number", value: values.totalPayouts },
                                    { label: "Due Payout", name: "duePayout", type: "number", value: values.duePayout },
                                    { label: "Type", name: "type", type: "text", value: values.type },
                                    { label: "Parent ID", name: "parentId", type: "number", value: values.parentId },
                                    { label: "Commission Type", name: "commissionType", type: "text", value: values.commissionType },
                                ].map((field, index) => (
                                    <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2} key={index}>
                                        <TextField
                                            label={field.label}
                                            type={field.type}
                                            fullWidth
                                            required
                                            name={field.name}
                                            value={field.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                ))}

                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}>
                                    <FormControl fullWidth>
                                        <InputLabel>isActive</InputLabel>
                                        <Select
                                            label="isActive"
                                            value={values.isActive}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="isActive"
                                        >
                                            <MenuItem value={true}>Active</MenuItem>
                                            <MenuItem value={false}>Inactive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>







                        </Grid2>

                    </Box>
                    <Grid sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 5 }}>
                        <Button
                            sx={{
                                backgroundColor: '#253A7D'
                            }}
                            variant='contained' onClick={togglePaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>COMMISSION EXCEPTION</Typography>
                            {showPaper ? < RemoveIcon /> : <AddIcon />}
                        </Button>
                        {showPaper && (
                            <Paper elevation={5} sx={{ padding: 2, marginTop: 2 }}>
                                <Grid container spacing={2}>
                                    {[
                                        { label: "Amount", name: "amount", type: "number", value: values2.amount },
                                        { label: "Type", name: "type", type: "text", value: values2.type },
                                        { label: "Parent ID", name: "partnerId", type: "number", value: values2.partnerId },
                                        { label: "Commission Process Run Id", name: "commissionProcessRunId", type: "number", value: values2.commissionProcessRunId }
                                    ].map((field, index) => (
                                        <Grid item xs={3} key={index}>
                                            <TextField
                                                label={field.label}
                                                type={field.type}
                                                fullWidth
                                                required
                                                name={field.name}
                                                value={field.value}
                                                onChange={handleChange2}
                                                onBlur={handleBlur2}
                                            />
                                        </Grid>
                                    ))}
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
                        sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    >
                        Submit
                    </Button>
                </Grid>

            </form>
        </Box>
    )
}