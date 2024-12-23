import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';

const UsageCharges = ({ formik, handleBack }) => {
    const [dataChargeValue, setDataChargeValue] = useState('');
    const [dataUnitValue, setDataUnitValue] = useState('');

    // Handle changes for base data charge
    const handleBaseValueChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            setDataChargeValue(value);
            formik.setFieldValue(
                'base_pack.data_charges',
                `${value || ''} AUD/${dataUnitValue || ''} GB`
            );
        }
    };

    // Handle changes for data unit value
    const handleUnitValueChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            setDataUnitValue(value);
            formik.setFieldValue(
                'base_pack.data_charges',
                `${dataChargeValue || ''} AUD/${value || ''} GB`
            );
        }
    };

    // Define suffixes for each field
    const fieldSuffixes = {
        onn_sms_charges: 'Cents/SMS',
        onn_call_charges: 'Cents/MoU',
        ofn_sms_charges: 'Cents/SMS',
        ofn_call_charges: 'Cents/MoU',
    };

    // Handle changes for non-roaming fields
    const handleFieldChange = (field, value) => {
        if (/^\d{0,4}(\.\d{0,2})?$/.test(value) || value === '') {
            const suffix = fieldSuffixes[field];

            // Check if value already includes a suffix or not
            if (!value.includes(suffix)) {
                formik.setFieldValue(`base_pack.${field}`, `${value || ''} ${suffix}`);
            } else {
                formik.setFieldValue(`base_pack.${field}`, value);
            }
        }
    };

    const checkNumericValue = (value) => {
        const regex = /^\d+(\.\d+)?/; // Regex to check if the string starts with a number
        const match = value.match(regex);
        return match ? true : false; // Return true if a numeric value is found at the start, otherwise false
    };

    // Check all required fields for numeric values
    const areAllNumeric = [
        'onn_sms_charges',
        'onn_call_charges',
        'ofn_sms_charges',
        'ofn_call_charges',
        'data_charges',
    ].every((field) => checkNumericValue(formik.values.base_pack[field])); // Check each field

    console.log(areAllNumeric);

    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ padding: 1, color: '#253A7D' }}>
                Out of Pack Charges
            </Typography>
            <Grid container spacing={2} sx={{ padding: 1 }}>
                {/* Non-Roaming Fields */}
                {[
                    { field: 'onn_sms_charges', label: 'ON NET SMS Charges' },
                    { field: 'onn_call_charges', label: 'ON NET Call Charges' },
                    { field: 'ofn_sms_charges', label: 'OFF NET SMS Charges' },
                    { field: 'ofn_call_charges', label: 'OFF NET Call Charges' },
                ].map(({ field, label }, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <TextField
                            fullWidth
                            label={label}
                            name={`base_pack.${field}`}
                            value={formik.values.base_pack[field]?.split(' ')[0] || ''} // Show only numeric part
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.base_pack?.[field] && Boolean(formik.errors.base_pack?.[field])}
                            helperText={formik.touched.base_pack?.[field] && formik.errors.base_pack?.[field]}
                            inputProps={{ inputMode: 'decimal' }}
                        />
                    </Grid>
                ))}

                {/* Data Charges Inputs */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Data Charge Amount"
                        value={dataChargeValue}
                        onChange={handleBaseValueChange}
                        helperText="Enter the base charge (AUD)"
                        inputProps={{
                            inputMode: 'decimal',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Data Consumption"
                        value={dataUnitValue}
                        onChange={handleUnitValueChange}
                        helperText="Enter the data unit value (GB)"
                        inputProps={{
                            inputMode: 'decimal',
                        }}
                    />
                </Grid>

                {/* Display resulting value */}
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        Data Charges: {formik.values.base_pack.data_charges || 'Not set'}
                    </Typography>
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Grid container spacing={2} style={{ marginTop: '20px', paddingLeft: 10 }}>
                <Grid item>
                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#253A7D' }} onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: '#253A7D' }}
                        color="primary"
                        disabled={!areAllNumeric} // Enable button only if form is valid and dirty (has changes)
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default UsageCharges;
