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
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddAgent() {
    const navigate = useNavigate();
    const tokenValue = localStorage.getItem('token');

    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            fristName: "",
            lastName: "",
            email: "",
            businessAddress: "",
            contact: "674",
            documentId: "",
            documentType: "",
            token: "",
            locallity: "",
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    `https://bssproxy01.neotel.nr/crm/api/savepartner/baseuser/1`,
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
                        Create Reseller
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
                                    { label: "First Name", name: "fristName", type: "text", value: values.fristName },
                                    { label: "Last Name", name: "lastName", type: "text", value: values.lastName },
                                    { label: "Email", name: "email", type: "email", value: values.email },
                                    { label: "Business Address", name: "businessAddress", type: "text", value: values.businessAddress },
                                    { label: "Contact", name: "contact", type: "text", value: values.contact },
                                    { label: "Document ID", name: "documentId", type: "text", value: values.documentId },
                                    { label: "Document Type", name: "documentType", type: "text", value: values.documentType },
                                    { label: "EKYC Token", name: "token", type: "text", value: values.token },
                                    {
                                        label: "Locality",
                                        name: "locallity",
                                        type: "select",
                                        value: values.locallity,
                                        options: [
                                            "Aiwo", "Anabar", "Anetan", "Anibare", "Baitsi",
                                            "Boe", "Buada", "Denigomodu", "Ewa", "Ijuw",
                                            "Meneng", "Nibok", "Uaboe", "Yaren"
                                        ]
                                    },
                                ].map((field, index) => {
                                    const requiredFields = ["fristName", "lastName", "email", "businessAddress", "token", "locallity", "contact"];
                                    const isRequired = requiredFields.includes(field.name);

                                    return (
                                        <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2} key={index}>
                                            {field.type === "select" ? (
                                                <FormControl fullWidth required={isRequired}>
                                                    <InputLabel>{field.label}</InputLabel>
                                                    <Select
                                                        name={field.name}
                                                        label={field.name}
                                                        value={field.value}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={isRequired && touched[field.name] && Boolean(errors[field.name])}
                                                    >
                                                        {field.options.map((option, idx) => (
                                                            <MenuItem value={option} key={idx}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {isRequired && touched[field.name] && (
                                                        <Typography variant="caption" color="error">
                                                            {errors[field.name]}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            ) : (
                                                <TextField
                                                    label={field.label}
                                                    type={field.type}
                                                    fullWidth
                                                    required={isRequired}
                                                    name={field.name}
                                                    value={field.name === "contact" ? values.contact : field.value}
                                                    onChange={(e) => {
                                                        if (field.name === "contact") {
                                                            const input = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                                                            const formattedInput = `674 ${input.slice(3)}`; // Add a space after "674"
                                                            if (formattedInput.length <= 12) {
                                                                handleChange({
                                                                    target: { name: "contact", value: formattedInput },
                                                                });
                                                            }
                                                        } else {
                                                            handleChange(e);
                                                        }
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={isRequired && touched[field.name] && Boolean(errors[field.name])}
                                                    helperText={isRequired && touched[field.name] && errors[field.name]}
                                                />

                                            )}
                                        </Grid>
                                    );
                                })}
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
                    sx={{ textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}
                >
                    <Button
                        type="submit"
                        style={{ backgroundColor: '#253A7D', color: 'white' }}
                        sx={{ mb: 5, boxShadow: 20 }}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}
