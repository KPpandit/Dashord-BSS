import React from 'react';
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
    Switch,
    FormControlLabel,
} from '@mui/material';

const BuildInUsage = ({ formik, handleBack, handleNext }) => {
    const renderNumericTextField = (name, label) => (
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label={label}
                name={name}
                value={formik.values[name]}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 4) {
                        formik.setFieldValue(name, value);
                    }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                inputProps={{
                    inputMode: 'numeric',
                }}
            />
        </Grid>
    );

    const renderDropdown = (name, label, options) => (
        <Grid item xs={12} sm={6}>
            <FormControl
                fullWidth
                error={formik.touched[name] && Boolean(formik.errors[name])}
            >
                <InputLabel>{label}</InputLabel>
                <Select
                    name={name}
                    label={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

    const isBuildInUsageValid = () => {
        const requiredFields = [
            'onn_call_balance',
            'ofn_call_balance',
            'onn_sms_balance',
            'ofn_sms_balance',
            'data_balance',
            'data_balance_parameter',
        ];

        // Check all required fields are filled and valid
        return requiredFields.every(
            (field) => formik.values[field] && !formik.errors[field]
        );
    };

    return (
        <>
            {/* Build in Usage Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }} sx={{ padding: 1, color: '#253A7D' }}>
                Build in Usage Details
            </Typography>
            <Grid container spacing={2}>
                {renderNumericTextField('onn_call_balance', 'On Net Call Balance')}
                {renderNumericTextField('ofn_call_balance', 'Off Net Call Balance')}
                {renderNumericTextField('onn_sms_balance', 'On Net SMS Balance')}
                {renderNumericTextField('ofn_sms_balance', 'Off Net SMS Balance')}
                {renderNumericTextField('data_balance', 'Data Allocation')}
                {renderDropdown('data_balance_parameter', 'Data Balance Parameter', [
                    'GB',
                    'MB',
                ])}
            </Grid>

            {/* FUP Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '30px' }} sx={{ padding: 1, color: '#253A7D' }}>
                Fair Usage Policy (FUP)
            </Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={formik.values.is_fup_enabled}
                        onChange={(e) =>
                            formik.setFieldValue('is_fup_enabled', e.target.checked)
                        }
                        color="primary"
                    />
                }
                label="Enable FUP"
            />
            {formik.values.is_fup_enabled && (
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    {renderNumericTextField('fup_onn_call_tariff', 'FUP On Net Call Tariff')}
                    {renderNumericTextField('fup_ofn_call_tariff', 'FUP Off Net Call Tariff')}
                    {renderNumericTextField('fup_onn_sms_tariff', 'FUP On Net SMS Tariff')}
                    {renderNumericTextField('fup_ofn_sms_tariff', 'FUP Off Net SMS Tariff')}
                    {renderNumericTextField('fup_data_tariff', 'FUP Data Tariff')}
                </Grid>
            )}

            {/* Action Buttons */}
            <Grid container spacing={2} style={{ marginTop: '20px' ,paddingLeft:10}}>
                <Grid item>
                    <Button variant="contained" color="primary" sx={{backgroundColor:'#253A7D'}} onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{backgroundColor:'#253A7D'}}
                        onClick={handleNext}
                        disabled={!isBuildInUsageValid()} // Disable if validation fails
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default BuildInUsage;
