import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Paper,
} from "@mui/material";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function NewTicket() {
    const [agents, setAgents] = useState([]);
    const [issues, setIssues] = useState([]); // State to store issues
    const [subCategories, setSubCategories] = useState([]); // State for dynamic subcategories

    useEffect(() => {
        // Fetch agents from the API
        const fetchAgents = async () => {
            try {
                const { data } = await axios.get("https://bssproxy01.neotel.nr/tickets/api/agents");
                setAgents(data);
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };

        // Fetch issues from the API
        const fetchIssues = async () => {
            try {
                const { data } = await axios.get("https://bssproxy01.neotel.nr/tickets/api/issues");
                setIssues(data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        };

        fetchAgents();
        fetchIssues();
    }, []);

    const serviceCategories = ["Mobility", "FTTH", "FWA", "Voip"];
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            type: "issue",
            isSubscriberNew: 0,
            existingSubscriberId: "",
            mobileNo: "",
            serviceEnqueryCategory: "Mobility",
            serviceEnquerySubCategory: "Prepaid",
            issueId: "",
            issueDetails: "",
            agentId: 1,
            channelName: "CALL",
        },
        validationSchema: Yup.object({
            mobileNo: Yup.string()
                .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits.")
                .required("Mobile number is required"),
            issueId: Yup.number().required("Issue ID is required"),
            issueDetails: Yup.string().required("Issue details are required"),
        }),
        onSubmit: async (values) => {
            try {
                // Prepare payload
                const payload = {
                    ...values,
                    issueDeails: values.issueDetails, // Corrected key for backend
                };
                delete payload.issueDetails; // Remove incorrect key
                const { data } = await axios.post("https://bssproxy01.neotel.nr/tickets/api/open/ticket", payload);
                toast.success("Ticket Added Successfully", {
                    autoClose: 2000,
                });
                console.log(data);
            } catch (error) {
                console.error("Error submitting the ticket:", error);
                alert("Failed to submit the ticket. Please try again.");
            }
        },
    });

    const handleMobileNoChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            formik.setFieldValue("mobileNo", value);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        // Set the dynamic sub-categories based on the selected category
        if (selectedCategory === "Mobility" || selectedCategory === "Voip") {
            setSubCategories(["Prepaid", "Postpaid"]);
            formik.setFieldValue("serviceEnquerySubCategory", "Prepaid");
        } else {
            setSubCategories(["Data"]);
            formik.setFieldValue("serviceEnquerySubCategory", "Data");
        }

        // Update the form value
        formik.setFieldValue("serviceEnqueryCategory", selectedCategory);
    };

    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#f5f5f5", borderRadius: 3, padding: 2 }}>
            <ToastContainer position="bottom-left" />
            <Box>
                <Box component="main" sx={{ flexGrow: 1, p: 0, width: "100%", paddingBottom: 3 }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: "white" }}>
                        <Grid>
                            <Typography style={{ fontSize: "20px", paddingLeft: 0, fontWeight: "bold", color: "#253A7D" }}>
                                New Ticket
                            </Typography>
                        </Grid>
                    </Paper>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Mobile Number */}
                        <Grid item xs={4}>
                            <TextField
                                label="Mobile No"
                                type="text"
                                name="mobileNo"
                                value={formik.values.mobileNo}
                                onChange={handleMobileNoChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                required
                                error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                                helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>

                        {/* Issue */}
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Issue</InputLabel>
                                <Select
                                    name="issueId"
                                    value={formik.values.issueId}
                                    onChange={formik.handleChange}
                                    label="Issue"
                                >
                                    {issues.map((issue) => (
                                        <MenuItem key={issue.id} value={issue.id}>
                                            {issue.issue}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Service Enquiry Category */}
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Service Enquiry Category</InputLabel>
                                <Select
                                    name="serviceEnqueryCategory"
                                    value={formik.values.serviceEnqueryCategory}
                                    onChange={handleCategoryChange}
                                    label="Service Enquiry Category"
                                >
                                    {serviceCategories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Service Enquiry Sub-Category */}
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Service Enquiry Sub-Category</InputLabel>
                                <Select
                                    name="serviceEnquerySubCategory"
                                    value={formik.values.serviceEnquerySubCategory}
                                    onChange={formik.handleChange}
                                    label="Service Enquiry Sub-Category"
                                >
                                    {subCategories.map((subCategory) => (
                                        <MenuItem key={subCategory} value={subCategory}>
                                            {subCategory}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Agent */}
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Agent</InputLabel>
                                <Select
                                    name="agentId"
                                    value={formik.values.agentId}
                                    onChange={formik.handleChange}
                                    label="Agent"
                                >
                                    {agents.map((agent) => (
                                        <MenuItem key={agent.id} value={agent.id}>
                                            {agent.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Issue Details */}
                        <Grid item xs={12}>
                            <TextField
                                label="Issue Details"
                                type="text"
                                name="issueDetails"
                                value={formik.values.issueDetails}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                required
                                multiline
                                rows={4}
                                error={formik.touched.issueDetails && Boolean(formik.errors.issueDetails)}
                                helperText={formik.touched.issueDetails && formik.errors.issueDetails}
                            />
                        </Grid>

                        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ paddingTop: 4 }}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    style={{ width: "100px", backgroundColor: "#253A7D", color: "white" }}
                                    sx={{ boxShadow: 15 }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="button"
                                    style={{ backgroundColor: "#F6B625", color: "black" }}
                                    sx={{ boxShadow: 20 }}
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}
