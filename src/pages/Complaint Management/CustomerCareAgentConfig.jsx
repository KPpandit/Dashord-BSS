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
    Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function CustomerCareAgentConfig() {
    const navigate = useNavigate();
    const tokenValue = localStorage.getItem('token');
    const location = useLocation();
    const { id } = location.state || {};
    console.log("value in id ",id)
    const agentId = id?.agent.id;
    const agentStatus = id?.agent.agentStatus.replace(/\b\w/g, (char) => char.toUpperCase());
    const agentName = id?.agent.fullName;
    const agentEmail = id?.agent.personalEmail;
    const agentLevel = id?.agentLevel;
    const agentExtention = id?.agentExtension;
    const reportingAgent = id?.reportingAgent;
    const agentWeekDays = id?.weekDays;
    const agentWorkShoft = id?.workShift;
    

    const agentLevelMapping = {
        "Level 1": 1,
        Senior: 2,
        Manager: 3,
    };

    const availabilityMapping = {
        Available: 1,
        "Not Available": 2,
        Offline: 3,
        "Off Duty": 4,
    };

    const reportingAgentOptions = [
        { label: "Agent 1", value: 1 },
        { label: "Agent 2", value: 2 },
        { label: "Agent 3", value: 3 },
    ];

    const validationSchema = Yup.object({
        agentLevel: Yup.string().required('Please Select Agent Level'),
        isAvailable: Yup.string().required('Please Select Availability Status'),
        workShift: Yup.string().required('Please Select Working Shift'),
        reportingAgent: Yup.number().required('Please Select Reporting Agent'),
        weekDays: Yup.array().min(1, 'Please select at least one weekday'),
    });

    const { handleChange, handleSubmit, handleBlur, values, touched, errors, setFieldValue } = useFormik({
        initialValues: {
            agentId: agentId,
            isAvailable: agentStatus,
            agentEmail: agentEmail,
            agentChatHandle: agentName,
            agentLevel: agentLevel,
            weekDays: [agentWeekDays],
            workShift: agentWorkShoft,
            reportingAgent: reportingAgent,
            agentExtension: agentExtention,
        },
        validationSchema,
        onSubmit: async (values) => {
            const payload = {
                ...values,
                agentLevel: agentLevelMapping[values.agentLevel],
                isAvailable: availabilityMapping[values.isAvailable],
                weekDays: values.weekDays.join(','), // Send weekdays as a comma-separated string
            };

            try {
                const res = await axios.post(
                    `https://bssproxy01.neotel.nr/tickets/api/save/agentconfig`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

               
                    toast.success("Agent updated Successfully", { autoClose: 2000 });
                
                    // toast.error("Error! Please try again later", { autoClose: 2000 });
               
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

    const weekdaysOptions = [
        { label: "Monday", value: "Mon" },
        { label: "Tuesday", value: "Tue" },
        { label: "Wednesday", value: "Wed" },
        { label: "Thursday", value: "Thu" },
        { label: "Friday", value: "Fri" },
        { label: "Saturday", value: "Sat" },
        { label: "Sunday", value: "Sun" },
    ];

    return (
        <Box sx={{ marginTop: -1 }}>
            <Grid>
                <Paper elevation={15}>
                    <Typography
                        sx={{
                            paddingLeft: 5,
                            fontWeight: '500',
                            fontSize: '25px',
                            color: '#253A7D',
                        }}
                    >
                        Configuration of Agent Id : {agentId}
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
                                    { label: "Agent Id *", name: "agentId", type: "text", disabled: true },
                                    { label: "Email *", name: "agentEmail", type: "email" },
                                    { label: "Agent Extension *", name: "agentExtension", type: "text" },
                                    { label: "Agent Chat Handle *", name: "agentChatHandle", type: "text" },
                                    {
                                        label: "Is Available *",
                                        name: "isAvailable",
                                        type: "select",
                                        options: Object.keys(availabilityMapping),
                                    },
                                    {
                                        label: "Agent Level *",
                                        name: "agentLevel",
                                        type: "select",
                                        options: Object.keys(agentLevelMapping),
                                    },
                                    {
                                        label: "Work Shift *",
                                        name: "workShift",
                                        type: "select",
                                        options: ["09-18"],
                                    },
                                    {
                                        label: "Weekdays *",
                                        name: "weekDays",
                                        type: "multi-select",
                                    },
                                    {
                                        label: "Reporting Agent *",
                                        name: "reportingAgent",
                                        type: "select",
                                        options: reportingAgentOptions.map(option => ({
                                            label: option.label,
                                            value: option.value,
                                        })),
                                    },
                                ].map((field, index) => (
                                    <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2} key={index}>
                                        {field.type === "multi-select" ? (
                                            <FormControl fullWidth>
                                                <InputLabel>{field.label}</InputLabel>
                                                <Select
                                                    multiple
                                                    label={field.label}
                                                    name={field.name}
                                                    value={values[field.name]}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            field.name,
                                                            typeof e.target.value === 'string'
                                                                ? e.target.value.split(',')
                                                                : e.target.value
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                    error={touched[field.name] && Boolean(errors[field.name])}
                                                    renderValue={(selected) => selected.join(', ')}
                                                >
                                                    {weekdaysOptions.map((option, idx) => (
                                                        <MenuItem value={option.value} key={idx}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched[field.name] && (
                                                    <Typography variant="caption" color="error">
                                                        {errors[field.name]}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        ) : field.type === "select" ? (
                                            <FormControl fullWidth>
                                                <InputLabel>{field.label}</InputLabel>
                                                <Select
                                                    name={field.name}
                                                    label={field.label}
                                                    value={values[field.name]}
                                                    onChange={(e) =>
                                                        setFieldValue(field.name, e.target.value)
                                                    }
                                                    onBlur={handleBlur}
                                                    error={touched[field.name] && Boolean(errors[field.name])}
                                                >
                                                    {field.options.map((option, idx) => (
                                                        <MenuItem value={option.value || option} key={idx}>
                                                            {option.label || option}
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
                                                label={field.label}
                                                type={field.type}
                                                fullWidth
                                                name={field.name}
                                                value={values[field.name]}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched[field.name] && Boolean(errors[field.name])}
                                                helperText={touched[field.name] && errors[field.name]}
                                                disabled={field.disabled}
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
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}
