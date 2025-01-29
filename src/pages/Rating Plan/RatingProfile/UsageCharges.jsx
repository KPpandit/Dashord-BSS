import React, { useState } from 'react';
import { Grid, TextField, Typography, Button, Switch, FormControlLabel } from '@mui/material';

const UsageCharges = ({ formik, handleBack }) => {
    const [dataChargeValue, setDataChargeValue] = useState('');
    const [dataUnitValue, setDataUnitValue] = useState('');
    const [isCUGEnabled, setIsCUGEnabled] = useState(false);

    // Disable conditions for various fields
    const shouldDisableOnnCallCharges = formik.values.onn_call_balance === 1666;
    const shouldDisableOnnSmsCharges = formik.values.onn_sms_balance === 99999;
    const shouldDisableDataCharges = formik.values.data_balance === 931;

    const fieldSuffixes = {
        onn_sms_charges: 'Cents/SMS',
        onn_call_charges: 'Cents/MoU',
        ofn_sms_charges: 'Cents/SMS',
        ofn_call_charges: 'Cents/MoU',
    };

    const handleFieldChange = (field, value) => {
        if (/^\d{0,4}(\.\d{0,2})?$/.test(value) || value === '') {
            const suffix = fieldSuffixes[field];
            formik.setFieldValue(`base_pack.${field}`, value ? `${value} ${suffix}` : '');
        }
    };

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

    const checkFieldValidity = (field, condition) => {
        const value = formik.values.base_pack[field];
        if (condition) return true; // Field is disabled, so it's valid
        return value && /^\d+(\.\d+)?/.test(value); // Field is enabled and has a valid value
    };

    const isFormValid = () => {
        const fieldsToValidate = [
            { field: 'onn_sms_charges', condition: shouldDisableOnnSmsCharges },
            { field: 'onn_call_charges', condition: shouldDisableOnnCallCharges },
            { field: 'ofn_sms_charges', condition: false }, // Off-net fields are always enabled
            { field: 'ofn_call_charges', condition: false },
            { field: 'data_charges', condition: shouldDisableDataCharges },
        ];
        return fieldsToValidate.every(({ field, condition }) => checkFieldValidity(field, condition));
    };
// console.log("-- from validate ",isFormValid())
    const handleCUGToggle = () => {
        setIsCUGEnabled(!isCUGEnabled);
        if (!isCUGEnabled) {
            formik.setFieldValue('cug_mins', '');
            formik.setFieldValue('cug_sms', '');
        }
    };
    const isCUGValid = () => {
        if (isCUGEnabled) {
            const cugCallsValid = formik.values.cug_mins && /^\d+$/.test(formik.values.cug_mins);
            const cugSmsValid = formik.values.cug_sms && /^\d+$/.test(formik.values.cug_sms);

            // console.log("CUG is enabled.");
            // console.log(`CUG Calls Valid: ${cugCallsValid ? 'Yes' : 'No'}`);
            // console.log(`CUG SMS Valid: ${cugSmsValid ? 'Yes' : 'No'}`);

            if (cugCallsValid && cugSmsValid) {
                // console.log("Both CUG fields are valid.");
                // console.log("isCUGValid:", true, " ------");
                return true;
            } else {
                // console.log("Validation failed: One or both CUG fields are invalid.");
                // console.log("isCUGValid:", false, " ------");
                return false;
            }
        } else {
            // console.log("CUG is disabled. Validation automatically passed.");
            // console.log("isCUGValid:", true, " ------");
            return true;
        }
    };
    const isOverallValid = () => {
        // Validate form fields
        const isFormValid = () => {
            const fieldsToValidate = [
                { field: 'onn_sms_charges', condition: shouldDisableOnnSmsCharges },
                { field: 'onn_call_charges', condition: shouldDisableOnnCallCharges },
                { field: 'ofn_sms_charges', condition: false }, // Off-net fields are always enabled
                { field: 'ofn_call_charges', condition: false },
                { field: 'data_charges', condition: shouldDisableDataCharges },
            ];
            return fieldsToValidate.every(({ field, condition }) => checkFieldValidity(field, condition));
        };
    
        // Validate CUG fields
        const isCUGValid = () => {
            if (isCUGEnabled) {
                const cugCallsValid = !!formik.values.cug_mins && /^\d+$/.test(formik.values.cug_mins); // Check for non-empty and valid number
                const cugSmsValid = !!formik.values.cug_sms && /^\d+$/.test(formik.values.cug_sms); // Check for non-empty and valid number
    
                if (cugCallsValid && cugSmsValid) {
                    // console.log("CUG is valid.");
                    return true;
                } else {
                    // console.log("CUG validation failed.");
                    return false;
                }
            }
            // console.log("CUG is disabled, considered valid.");
            return true; // If CUG is disabled, automatically valid
        };
    
        // Check overall validity
        const formValid = isFormValid();
        const cugValid = isCUGValid();
    
        // console.log("isFormValid:", formValid);
        // console.log("isCUGValid:", cugValid);
        // console.log("isOverallValid:", formValid && cugValid);
    
        return formValid && cugValid; // Both must be true to pass
    };
    
    console.log(isOverallValid(),'  over all condition')
    // Example usage
    // console.log("Final isCUGValid result:", isCUGValid(), " ------");
        // console.log(isCUGEnabled,'  is cug values')
    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ padding: 1, color: '#253A7D' }}>
                Out of Pack Charges
            </Typography>
            <Grid container spacing={2} sx={{ padding: 1 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="ON NET SMS Charges"
                        name="base_pack.onn_sms_charges"
                        value={formik.values.base_pack.onn_sms_charges?.split(' ')[0] || ''}
                        onChange={(e) => handleFieldChange('onn_sms_charges', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.base_pack?.onn_sms_charges && Boolean(formik.errors.base_pack?.onn_sms_charges)}
                        helperText={formik.touched.base_pack?.onn_sms_charges && formik.errors.base_pack?.onn_sms_charges}
                        inputProps={{ inputMode: 'decimal' }}
                        disabled={shouldDisableOnnSmsCharges}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="ON NET Call Charges"
                        name="base_pack.onn_call_charges"
                        value={formik.values.base_pack.onn_call_charges?.split(' ')[0] || ''}
                        onChange={(e) => handleFieldChange('onn_call_charges', e.target.value)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.base_pack?.onn_call_charges && Boolean(formik.errors.base_pack?.onn_call_charges)}
                        helperText={formik.touched.base_pack?.onn_call_charges && formik.errors.base_pack?.onn_call_charges}
                        inputProps={{ inputMode: 'decimal' }}
                        disabled={shouldDisableOnnCallCharges}
                    />
                </Grid>
                {[{ field: 'ofn_sms_charges', label: 'OFF NET SMS Charges' },
                { field: 'ofn_call_charges', label: 'OFF NET Call Charges' }].map(({ field, label }, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <TextField
                            fullWidth
                            label={label}
                            name={`base_pack.${field}`}
                            value={formik.values.base_pack[field]?.split(' ')[0] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.base_pack?.[field] && Boolean(formik.errors.base_pack?.[field])}
                            helperText={formik.touched.base_pack?.[field] && formik.errors.base_pack?.[field]}
                            inputProps={{ inputMode: 'decimal' }}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Data Charge Amount"
                        value={dataChargeValue}
                        onChange={handleBaseValueChange}
                        helperText="Enter the base charge (AUD)"
                        inputProps={{ inputMode: 'decimal' }}
                        disabled={shouldDisableDataCharges}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Data Consumption"
                        value={dataUnitValue}
                        onChange={handleUnitValueChange}
                        helperText="Enter the data unit value (GB)"
                        inputProps={{ inputMode: 'decimal' }}
                        disabled={shouldDisableDataCharges}
                    />
                </Grid>

            </Grid>


            <Typography variant="h6" gutterBottom sx={{ padding: 1, color: '#253A7D', marginTop: 2 }}>
                CUG (Closed User Group)
            </Typography>
            <FormControlLabel
                control={<Switch checked={isCUGEnabled} onChange={handleCUGToggle} color="primary" />}
                label={isCUGEnabled ? 'Enabled' : 'Disabled'}
                sx={{ padding: 1, marginTop: -2 }}
            />
            {isCUGEnabled && (
                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="CUG Calls"
                            name="cug_mins"
                            value={formik.values.cug_mins || ''}
                            onChange={(e) => {
                                if (/^\d{0,4}$/.test(e.target.value)) {
                                    formik.setFieldValue('cug_mins', e.target.value);
                                }
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cug_mins && Boolean(formik.errors.cug_mins)}
                            helperText={
                                (formik.touched.cug_mins && formik.errors.cug_mins) || 'Enter up to 4 positive digits'
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="CUG SMS"
                            name="cug_sms"
                            value={formik.values.cug_sms || ''}
                            onChange={(e) => {
                                if (/^\d{0,4}$/.test(e.target.value)) {
                                    formik.setFieldValue('cug_sms', e.target.value);
                                }
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cug_sms && Boolean(formik.errors.cug_sms)}
                            helperText={
                                (formik.touched.cug_sms && formik.errors.cug_sms) || 'Enter up to 4 positive digits'
                            }
                        />
                    </Grid>
                </Grid>
            )}

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
                        disabled={!isOverallValid()}

                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default UsageCharges;
