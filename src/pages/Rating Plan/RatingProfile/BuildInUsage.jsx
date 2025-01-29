import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
} from '@mui/material';

const BuildInUsage = ({ formik, handleBack, handleNext }) => {
    const [unlimitedFields, setUnlimitedFields] = useState({
        onn_call_balance: false,
        ofn_call_balance: false,
        onn_sms_balance: false,
        ofn_sms_balance: false,
        data_balance: false,
    });
    const [isValid, setIsValid] = useState(false);
    
    useEffect(() => {
        const updatedUnlimitedFields = {
            onn_call_balance: formik.values.onn_call_balance === 1666,
            ofn_call_balance: formik.values.ofn_call_balance === 1666,
            onn_sms_balance: formik.values.onn_sms_balance === 99999,
            ofn_sms_balance: formik.values.ofn_sms_balance === 99999,
            data_balance: formik.values.data_balance === 931,
        };
        setUnlimitedFields(updatedUnlimitedFields);
    }, [formik.values]);

    useEffect(() => {
        const checkValidity = () => {
            const requiredFields = [
                'onn_call_balance',
                'ofn_call_balance',
                'onn_sms_balance',
                'ofn_sms_balance',
                'data_balance',
                'data_balance_parameter',
            ];

            // Check if all required fields are filled or set as unlimited
            const allFieldsFilled = requiredFields.every((field) => {
                if (unlimitedFields[field]) {
                    return true; // Unlimited fields are considered valid
                }
                return formik.values[field] !== '' && formik.values[field] !== null;
            });

            // Check if there are no errors in required fields
            const noErrors = requiredFields.every((field) => !formik.errors[field]);

            // Set isValid to true if all fields are filled and there are no errors
            setIsValid(allFieldsFilled && noErrors);
        };

        checkValidity();
    }, [formik.values, formik.errors, unlimitedFields]);

    const handleUnlimitedToggle = (name, type) => {
        const isUnlimited = !unlimitedFields[name];
        const updatedUnlimitedFields = {
            ...unlimitedFields,
            [name]: isUnlimited,
        };
        setUnlimitedFields(updatedUnlimitedFields);

        // Set integer values for unlimited mode
        if (isUnlimited) {
            let value = 0;
            if (type === 'data') {
                value = 931; // GB equivalent for unlimited data
            } else if (type === 'call') {
                value = 1666; // Minutes equivalent
            } else if (type === 'sms') {
                value = 99999; // SMS equivalent
            }
            formik.setFieldValue(name, value); // Backend value
        } else {
            formik.setFieldValue(name, ''); // Reset value for editable state
        }

        // If data_balance is set to unlimited, automatically set data_balance_parameter to "GB"
        if (name === 'data_balance' && isUnlimited) {
            formik.setFieldValue('data_balance_parameter', 'GB');
        }
    };

    const renderNumericTextField = (name, label, type) => (
        <Grid item xs={12} sm={6} container alignItems="center" spacing={1}>
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label={label}
                    name={name}
                    value={unlimitedFields[name] ? 'Unlimited' : formik.values[name]} // Display "Unlimited" when active
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value) && value.length <= 5) {
                            formik.setFieldValue(name, value);
                        }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    inputProps={{
                        inputMode: 'numeric',
                        readOnly: unlimitedFields[name], // Make field read-only when unlimited
                    }}
                    disabled={unlimitedFields[name]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            {name !== 'ofn_call_balance' && name !== 'ofn_sms_balance' && (
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        color={unlimitedFields[name] ? 'secondary' : 'primary'}
                        onClick={() => handleUnlimitedToggle(name, type)}
                    >
                        {unlimitedFields[name] ? 'Disable Unlimited' : 'Unlimited'}
                    </Button>
                </Grid>
            )}
        </Grid>
    );

    const renderDropdown = (name, label, options) => (
        <Grid item xs={12} sm={6}>
            <FormControl
                fullWidth
                error={formik.touched[name] && Boolean(formik.errors[name])}
            >
                <InputLabel shrink>{label}</InputLabel>
                <Select
                    name={name}
                    label={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.data_balance === 931} // Disabled if data is "unlimited"
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched[name] && formik.errors[name] && (
                    <FormHelperText>{formik.errors[name]}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    );

    // Check if all required fields are filled
    const isFilled = [
        formik.values.onn_call_balance,
        formik.values.ofn_call_balance,
        formik.values.onn_sms_balance,
        formik.values.ofn_sms_balance,
        formik.values.data_balance,
        formik.values.data_balance_parameter
    ].every((field) => field); // This will return false if any field is falsy (including '', null, undefined)
    
    console.log("All fields filled: ", isFilled); // Will log true if all fields are filled, false otherwise
    

  

    return (
        <>
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }} sx={{ padding: 1, color: '#253A7D' }}>
                Build in Usage Details
            </Typography>
            <Grid container spacing={2}>
                {renderNumericTextField('onn_call_balance', 'On Net Call Balance', 'call')}
                {renderNumericTextField('ofn_call_balance', 'Off Net Call Balance', 'call')}
                {renderNumericTextField('onn_sms_balance', 'On Net SMS Balance', 'sms')}
                {renderNumericTextField('ofn_sms_balance', 'Off Net SMS Balance', 'sms')}
                {renderNumericTextField('data_balance', 'Data Allocation', 'data')}
                {renderDropdown('data_balance_parameter', 'Data Balance Parameter', ['GB', 'MB'])}
            </Grid>

            <Grid container spacing={2} style={{ marginTop: '20px', paddingLeft: 10 }}>
                <Grid item>
                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#253A7D' }} onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#253A7D' }}
                        onClick={handleNext}
                        disabled={!isFilled}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default BuildInUsage;
