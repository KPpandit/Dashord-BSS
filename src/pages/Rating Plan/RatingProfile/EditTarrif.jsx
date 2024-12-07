import React, { useState } from "react";
import { TextField, MenuItem, Grid, Typography, Box, Paper, Radio, FormControlLabel, RadioGroup, Button } from "@mui/material";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useLocation } from "react-router-dom";
export default function EditTarrif() {
    const location = useLocation();
  const { selectObj } = location.state || {}; 
  console.log(selectObj.plan_code,'  selcetd balue o ftarrif edit')
    const pricingModels = ["Fixed", "Tiered", "Differential"];
    const billingCycles = ["Daily", "Weekly", "Fortnightly", "Monthly"];
    const dataParameters = ["MB", "GB"];

    const [builtInUsageEnabled, setBuiltInUsageEnabled] = useState(false); // Toggle for Built-in Usage
    const [fupEnabled, setFupEnabled] = useState(false); // Toggle for FUP
    const [customerType, setCustomerType] = useState("prepaid");

    const formik = useFormik({
        initialValues: {
            plan_name: selectObj.plan_name,
            plan_code: selectObj.plan_code,
            description: selectObj.description,
            pricing_model: selectObj.pricing_model,
            billing_cycle: selectObj.billing_cycle,
            price: selectObj.price,
            validity: selectObj.validity,
            available_balance:selectObj.available_balance,
            validity: selectObj.validity,
            call_balance: selectObj.call_balance,
            call_balance_parameter: selectObj.call_balance_parameter,
            sms_balance: selectObj.sms_balance,
            data_balance: selectObj.data_balance,
            data_balance_parameter: selectObj.data_balance_parameter,
            category_name: selectObj.category_name,
            base_pack: {
                onn_sms_tariff: selectObj.base_pack.onn_sms_tariff,
                onn_call_tariff: selectObj.base_pack.onn_call_tariff,
                ofn_sms_tariff: selectObj.base_pack.ofn_sms_tariff,
                ofn_call_tariff: selectObj.base_pack.ofn_call_tariff,
                data_tariff: selectObj.base_pack.data_tariff,
                is_fup_enabled: false,
                fup_onn_sms_tariff: selectObj.base_pack.fup_onn_sms_tariff,
                fup_onn_call_tariff: selectObj.base_pack.fup_onn_call_tariff,
                fup_ofn_sms_tariff: selectObj.base_pack.fup_ofn_sms_tariff,
                fup_ofn_call_tariff: selectObj.base_pack.fup_ofn_call_tariff,
                fup_data_tariff: selectObj.base_pack.fup_data_tariff
            }
        },
        onSubmit: async (values) => {
            // '
            try {
                const response = await fetch('http://172.17.1.11:9698/api/prepaid/packs/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Success:', data);
                toast.success('Tarrif Plan Created successfully!', { autoClose: 2000 });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
    console.log(formik.values.plan_code,'changed value of plancode ')

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        if (newPrice === "" || newPrice >= 0) {
            const parsedPrice = parseFloat(newPrice) || 0;
            const calculatedTax = (parsedPrice * 10) / 100;
            const finalBalance = parsedPrice - calculatedTax;
            formik.setFieldValue('price', newPrice);
            formik.setFieldValue('tax', calculatedTax.toFixed(2));
            formik.setFieldValue('available_balance', finalBalance.toFixed(2));
        }
    };

    const handleNumericChange = (e, fieldName) => {
        const value = e.target.value;
        if (value === "" || value >= 0) {
            formik.setFieldValue(fieldName, parseFloat(value)); // Ensure the value is parsed as a float
        }
    };

    return (
        <Box sx={{ padding: 3, marginTop: -4 }}>
            <ToastContainer position="bottom-left" />
            <form onSubmit={formik.handleSubmit}>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Paper elevation={10} sx={{ p: 1, mb: 2, ml: -2, mr: -2, pl: 1.5 }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 'bold', color: '#253A7D' }}>
                           Edit Tarrif
                        </Typography>
                    </Paper>
                </Box>

                <Grid container spacing={2}>
                    <Section title="Customer Type">
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                            <RadioGroup
                                row
                                value={customerType}
                                onChange={(e) => setCustomerType(e.target.value)}
                            >
                                <FormControlLabel value="prepaid" control={<Radio />} label="Prepaid" />
                                <FormControlLabel value="postpaid" control={<Radio />} label="Postpaid" />
                            </RadioGroup>
                        </Grid>
                    </Section>

                    {/* Plan Details */}
                    <Section title="Plan Details">
                        <Grid item xs={3}>
                            <TextField
                                label="Plan Name"
                                fullWidth
                                name="plan_name"
                                value={formik.values.plan_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Plan Code"
                                fullWidth
                                name="plan_code"
                                value={formik.values.plan_code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Pricing Model"
                                fullWidth
                                name="pricing_model"
                                value={formik.values.pricing_model}
                                onChange={formik.handleChange}
                            >
                                {pricingModels.map((model) => (
                                    <MenuItem key={model} value={model}>
                                        {model}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Billing Cycle"
                                fullWidth
                                name="billing_cycle"
                                value={formik.values.billing_cycle}
                                onChange={formik.handleChange}
                            >
                                {billingCycles.map((cycle) => (
                                    <MenuItem key={cycle} value={cycle}>
                                        {cycle}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Category Name"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                name="category_name"
                                value={formik.values.category_name}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="validity"
                                type="Number"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                name="validity"
                                value={formik.values.validity}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Description"
                                fullWidth
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Section>

                    {/* Pricing Section */}
                    <Section title="Pricing">
                        <Grid item xs={4}>
                            <TextField
                                label="Price (AUD)"
                                fullWidth
                                value={formik.values.price}
                                onChange={handlePriceChange}
                                type="number"
                                inputProps={{ min: 0, step: "0.01" }} // Enable decimal inputs
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Taxes (10%)"
                                fullWidth
                                value={formik.values.tax}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Available Core Balance"
                                fullWidth
                                value={formik.values.available_balance}
                                disabled
                            />
                        </Grid>
                    </Section>

                    {/* Built-in Usage Section */}
                    <Section title="Built-in Usage" toggleValue={builtInUsageEnabled} setToggleValue={setBuiltInUsageEnabled}>
                        {builtInUsageEnabled && <BuildInUsageFields handleNumericChange={handleNumericChange} dataParameters={dataParameters} formik={formik} />}
                    </Section>

                    {/* FUP Section */}
                    <Section title="FUP" toggleValue={fupEnabled} setToggleValue={setFupEnabled}>
                        {fupEnabled && <FupFields handleNumericChange={handleNumericChange} formik={formik} />}
                    </Section>

                    {/* Usage Charges Section */}
                    <Section title="Usage Charges">
                        <UsageFields handleNumericChange={handleNumericChange} dataParameters={dataParameters} formik={formik} />
                    </Section>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <Button variant="contained" type="submit" sx={{ textAlign: 'center' }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

const Section = ({ title, children, toggleValue, setToggleValue }) => (
    <>
        <Grid item xs={12} sx={{ marginTop: 1, display: 'flex', alignItems: 'center', color: '#253A7D' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>
            {setToggleValue !== undefined && (
                <RadioGroup
                    row
                    value={toggleValue ? "enabled" : "disabled"}
                    onChange={(e) => setToggleValue(e.target.value === "enabled")}
                >
                    <FormControlLabel value="enabled" control={<Radio />} label="Enable" />
                    <FormControlLabel value="disabled" control={<Radio />} label="Disable" />
                </RadioGroup>
            )}
        </Grid>
        {children}
    </>
);

const BuildInUsageFields = ({ handleNumericChange, dataParameters, formik }) => {
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    label="Voice (On Net) - Balance"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    name="call_balance"
                    value={formik.values.call_balance}
                    onChange={(e) => handleNumericChange(e, "call_balance")}
                />
            </Grid>
            {/* <Grid item xs={6}>
                <TextField
                    label="Voice (On Net) - Parameter"
                    fullWidth
                    select
                    name="call_balance_parameter"
                    value={formik.values.call_balance_parameter}
                    onChange={formik.handleChange}
                >
                    {dataParameters.map((param) => (
                        <MenuItem key={param} value={param}>
                            {param}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid> */}
            <Grid item xs={6}>
                <TextField
                    label="SMS (On Net) - Balance"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    name="sms_balance"
                    value={formik.values.sms_balance}
                    onChange={(e) => handleNumericChange(e, "sms_balance")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Data Balance"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    name="data_balance"
                    value={formik.values.data_balance}
                    onChange={(e) => handleNumericChange(e, "data_balance")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Data Balance Parameter"
                    fullWidth
                    select
                    name="data_balance_parameter"
                    value={formik.values.data_balance_parameter}
                    onChange={formik.handleChange}
                >
                    {dataParameters.map((param) => (
                        <MenuItem key={param} value={param}>
                            {param}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </>
    );
};

const UsageFields = ({ handleNumericChange, dataParameters, formik }) => {
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    label="Voice (On Net) - MOU"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }} // Allow decimal values
                    name="base_pack.onn_call_tariff"
                    value={formik.values.base_pack.onn_call_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.onn_call_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Voice (Off Net) - MOU"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }} // Allow decimal values
                    name="base_pack.ofn_call_tariff"
                    value={formik.values.base_pack.ofn_call_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.ofn_call_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="SMS (On Net) - Count"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }}
                    name="base_pack.onn_sms_tariff"
                    value={formik.values.base_pack.onn_sms_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.onn_sms_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="SMS (Off Net) - Count"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }}
                    name="base_pack.ofn_sms_tariff"
                    value={formik.values.base_pack.ofn_sms_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.ofn_sms_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Data Usage (MB/GB)"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }}
                    name="base_pack.data_tariff"
                    value={formik.values.base_pack.data_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.data_tariff")}
                />
            </Grid>
        </>
    );
};
const FupFields = ({ handleNumericChange, formik }) => {
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    label="FUP Voice (On Net) - MOU"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }} // Allow decimal values
                    name="base_pack.fup_onn_call_tariff"
                    value={formik.values.base_pack.fup_onn_call_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.fup_onn_call_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="FUP Voice (Off Net) - MOU"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0, step: "0.01" }} // Allow decimal values
                    name="base_pack.fup_ofn_call_tariff"
                    value={formik.values.base_pack.fup_ofn_call_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.fup_ofn_call_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="FUP SMS (On Net) - Count"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    name="base_pack.fup_onn_sms_tariff"
                    value={formik.values.base_pack.fup_onn_sms_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.fup_onn_sms_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="FUP SMS (Off Net) - Count"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    name="base_pack.fup_ofn_sms_tariff"
                    value={formik.values.base_pack.fup_ofn_sms_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.fup_ofn_sms_tariff")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="FUP Data Usage (MB/GB)"
                    fullWidth
                    type="number"
                    inputProps={{ min: 0 }}
                    name="base_pack.fup_data_tariff"
                    value={formik.values.base_pack.fup_data_tariff}
                    onChange={(e) => handleNumericChange(e, "base_pack.fup_data_tariff")}
                />
            </Grid>
        </>
    );
};
