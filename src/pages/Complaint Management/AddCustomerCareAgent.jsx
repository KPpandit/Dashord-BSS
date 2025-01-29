import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation schema
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddCustomerCareAgent() {
    const navigate = useNavigate();
    const tokenValue = localStorage.getItem('token');

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        mobileNo: Yup.string()
            .matches(/^674\d{7}$/, 'Contact must start with "674" and be 10 digits')
            .required('Contact is required'),
        address: Yup.string().required('Address is required'),
        personalEmail: Yup.string()
            .email('Invalid email format') // This checks for general email format
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format. Please include a valid domain.')
            .notRequired(),
        documentId: Yup.string().required('Document Number Required'),
        gender: Yup.string().required('Please Select Gender'),
        type: Yup.string().required('Please Select Agent Type'),
        agentStatus: Yup.string().required('Please Select Agent Status'),
    });

    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            fullName: "",
            personalEmail: "",
            mobileNo: "674",
            documentId: "",
            gender: "",
            type: "",
            address: "",
            isVerified: "",
            agentStatus: "",
            dob: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    `https://bssproxy01.neotel.nr/tickets/api/save/agent`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

              
                    toast.success("Agent Added Successfully", { autoClose: 2000 });
              
            } catch (error) {
                console.error("Error during API request:", error);

                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                }

                toast.error("Something went wrong", { autoClose: 2000 });
            }
        },
    });

    const handleNumericInput = (e, fieldName, maxLength) => {
        let value = e.target.value.replace(/\D/g, ''); // Allow only digits
        if (fieldName === 'mobileNo' && !value.startsWith('674')) {
            value = '674'; // Ensure it starts with "674"
        }
        if (value.length > maxLength) {
            value = value.slice(0, maxLength); // Restrict length
        }
        handleChange({ target: { name: fieldName, value } });
    };

    const getFieldLabel = (fieldName) => {
        const requiredFields = ['fullName', 'personalEmail', 'mobileNo', 'address', 'gender', 'type', 'documentId', 'isVerified', 'agentStatus', 'dob'];
        return requiredFields.includes(fieldName) ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} *` : fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    };

    return (
        <Box sx={{ marginTop: -1 }}>
            <Grid>
                <Paper elevation={15}>
                    <Typography
                        sx={{
                            paddingLeft: 5,
                            fontWeight: '500',
                            fontSize: '25px',
                            color: '#253A7D'
                        }}
                    >
                        Create Agent
                    </Typography>
                </Paper>
            </Grid>
            <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit}>
                <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5 }}>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid2>
                            <Divider />
                            <Grid
                                container
                                spacing={2}
                                paddingBottom={2}
                                paddingTop={2}
                                textAlign="center"
                                alignContent="center"
                                alignItems="center"
                            >
                                {[
                                    { label: "FullName *", name: "fullName", type: "text" },
                                    { label: "Email *", name: "personalEmail", type: "email" },
                                    { label: "Contact *", name: "mobileNo", type: "text", maxLength: 10 },
                                    { label: "Document Id *", name: "documentId", type: "text" },
                                    { label: "Date Of Birth *", name: "dob", type: "date" },
                                    {
                                        label: "Locality *",
                                        name: "address",
                                        type: "select",
                                        options: [
                                            "Aiwo", "Anabar", "Anetan", "Anibare", "Baitsi",
                                            "Boe", "Buada", "Denigomodu", "Ewa", "Ijuw",
                                            "Meneng", "Nibok", "Uaboe", "Yaren"
                                        ],
                                    },
                                    {
                                        label: "Gender *",
                                        name: "gender",
                                        type: "select",
                                        options: ["Male", "Female"],
                                    },
                                    {
                                        label: "Type *",
                                        name: "type",
                                        type: "select",
                                        options: ["HUMAN", "BOT"],
                                    },
                                    {
                                        label: "Is Verified *",
                                        name: "isVerified",
                                        type: "select",
                                        options: ["Yes", "No"],
                                        values: [1, 0],
                                    },
                                    {
                                        label: "Agent Status *",
                                        name: "agentStatus",
                                        type: "select",
                                        options: ["Available", "Unavailable"],
                                        values: ["available", "unavailable"],
                                    },
                                ].map((field, index) => (
                                    <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2} key={index}>
                                        {field.type === "select" ? (
                                            <FormControl fullWidth>
                                                <InputLabel>{getFieldLabel(field.label)}</InputLabel>
                                                <Select
                                                    name={field.name}
                                                    value={values[field.name]}
                                                    onChange={(e) =>
                                                        handleChange({
                                                            target: {
                                                                name: field.name,
                                                                value: e.target.value,
                                                            },
                                                        })
                                                    }
                                                    onBlur={handleBlur}
                                                    label={field.name}
                                                    error={touched[field.name] && Boolean(errors[field.name])}
                                                >
                                                    {field.options.map((option, idx) => (
                                                        <MenuItem value={field.values ? field.values[idx] : option} key={idx}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched[field.name] && (
                                                    <Typography variant="caption" color="error">
                                                        {errors[field.name]}
                                                    </Typography>
                                                )}
                                            </FormControl>

                                        ) : (
                                            <TextField
                                                label={getFieldLabel(field.label)}
                                                type={field.type}
                                                fullWidth
                                                name={field.name}
                                                value={values[field.name]}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) =>
                                                    field.name === "mobileNo"
                                                        ? handleNumericInput(e, field.name, field.maxLength)
                                                        : handleChange(e)
                                                }
                                                onBlur={handleBlur}
                                                error={touched[field.name] && Boolean(errors[field.name])}
                                                helperText={touched[field.name] && errors[field.name]}
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid2>
                    </Box>
                </Paper>
                <Grid
                    padding={1}
                    paddingTop={5}
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    sx={{ textAlign: 'center' }}
                >
                    <Button
                        type="submit"
                        style={{ backgroundColor: '#253A7D', color: 'white' }}
                        sx={{ mb: 5, boxShadow: 20, marginRight: 2 }}
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        style={{ backgroundColor: '#F6B625', color: 'black' }}
                        sx={{ mb: 5, boxShadow: 20 }}
                        onClick={() => navigate(-1)} // Navigates to the previous page
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}
