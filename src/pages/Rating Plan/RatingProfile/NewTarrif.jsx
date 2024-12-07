import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Typography,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import axios from 'axios';

// Step Titles
const steps = [
    'Customer Type & Plan Details',
    'Pricing & Built-in Usage',
    'FUP & Usage Charges',
];

// Fields for each step
const fields = {
    step1: [
        { name: 'plan_name', label: 'Plan Name' },
        { name: 'plan_code', label: 'Plan Code' },
        { name: 'validity', label: 'Validity' },
        { name: 'billing_cycle', label: 'Billing Cycle' }, // We'll disable this field
        { name: 'category_name', label: 'Category Name' },
        { name: 'description', label: 'Description' },
    ],
    builtInUsage: [
        { name: 'voice_on_net_balance', label: 'Voice (On Net) - Balance' },
        { name: 'voice_off_net_balance', label: 'Voice (Off Net) - Balance' },
        { name: 'sms_on_net_balance', label: 'SMS (On Net) - Balance' },
        { name: 'sms_off_net_balance', label: 'SMS (Off Net) - Balance' },
        { name: 'data_balance', label: 'Data Balance' },
        { name: 'data_balance_parameter', label: 'Data Balance Parameter' },
    ],
    fup: [
        { name: 'fup_voice_on_net_mou', label: 'FUP Voice (On Net) - MOU' },
        { name: 'fup_voice_off_net_mou', label: 'FUP Voice (Off Net) - MOU' },
        { name: 'fup_sms_on_net_count', label: 'FUP SMS (On Net) - Count' },
        { name: 'fup_sms_off_net_count', label: 'FUP SMS (Off Net) - Count' },
        { name: 'fup_data_usage', label: 'FUP Data Usage (MB/GB)' },
    ],
    tariff: [
        { name: 'onn_sms_tariff', label: 'On-Net SMS Tariff' },
        { name: 'onn_call_tariff', label: 'On-Net Call Tariff' },
        { name: 'ofn_sms_tariff', label: 'Off-Net SMS Tariff' },
        { name: 'ofn_call_tariff', label: 'Off-Net Call Tariff' },
        { name: 'data_tariff', label: 'Data Tariff' },
    ],
};

const NewTariff = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [customerType, setCustomerType] = useState('prepaid'); // Added Customer Type here
    const [isFupEnabled, setIsFupEnabled] = useState(false); // Radio button controls FUP

    const initialValues = Object.fromEntries(
        Object.keys(fields).flatMap((key) =>
            fields[key].map((field) => [field.name, ''])
        )
    );

    const handleSubmit = async (values) => {
        console.log(values, ' value');

        // Dynamically set the API URL based on customer type (prepaid or postpaid)
        const apiUrl =
            customerType === 'prepaid'
                ? 'https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/create'
                : 'https://bssproxy01.neotel.nr/abmf-postpaid/api/postpaid/packs/create';

        // Prepare the body for submission (matches the structure of your data)
        const data = {
            plan_name: values.plan_name,
            plan_code: values.plan_code,
            description: values.description,
            pricing_model: values.pricing_model,
            billing_cycle: values.billing_cycle,
            price: values.price,
            validity: values.validity, // Ensure it's valid (max 28 days)
            onn_call_balance: values.voice_on_net_balance,
            ofn_call_balance: values.voice_off_net_balance,
            onn_sms_balance: values.sms_on_net_balance,
            ofn_sms_balance: values.sms_off_net_balance,
            data_balance: values.data_balance,
            category_name: values.category_name,
            data_balance_parameter: values.data_balance_parameter,
            base_pack: {
                // this is for Usage Details 
                onn_sms_tariff: values.onn_sms_tariff,
                onn_call_tariff: values.onn_call_tariff,
                ofn_sms_tariff: values.ofn_sms_tariff,
                ofn_call_tariff: values.ofn_call_tariff,
                data_tariff: values.data_tariff,

                // This is For FUP Section
                fup_ofn_call_tariff: values.fup_voice_off_net_mou,
                fup_onn_call_tariff: values.fup_voice_on_net_mou,
                fup_onn_sms_tariff: values.fup_sms_on_net_count,
                fup_ofn_sms_tariff: values.fup_sms_off_net_count,

                fup_data_tariff: values.fup_data_usage,
            },
        };

        try {
            // Use Axios to post the data to the appropriate API URL
            const response = await axios.post(apiUrl, data);
            toast.success('Tarrif Created Successfully', { autoClose: 2000 });
        } catch (error) {

               toast.error(error.response.data.message                , { autoClose: 2000 });
            console.error('Error submitting form:', error);
        }
    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    // Function to prevent negative values
    const handleNonNegativeChange = (e, setFieldValue, name) => {
        const value = e.target.value;
        if (parseFloat(value) >= 0 || value === '') {
            setFieldValue(name, value);
        }
    };
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://172.17.1.11:9696/api/category/detail/get/all')
            .then((response) => {
                setCategories(response.data); // Set the fetched categories
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    const renderCustomerType = () => (
        <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: '#253A7D' }}>
                    Customer Type
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        value={customerType}
                        onChange={(e) => setCustomerType(e.target.value)}
                    >
                        <FormControlLabel
                            value="prepaid"
                            control={<Radio />}
                            label="Prepaid"
                        />
                        <FormControlLabel
                            value="postpaid"
                            control={<Radio />}
                            label="Postpaid"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );

    const renderPlanDetails = (values, setFieldValue) => (
        <>
            <Typography variant="h6" sx={{ color: '#253A7D' }}>
                Plan Details
            </Typography>
            <Grid container spacing={2} padding={2}>
                {fields.step1.map(({ name, label }) => (
                    <Grid item xs={6} key={name}>
                        {name === 'category_name' ? (
                            <FormControl fullWidth>
                                <InputLabel>{label}</InputLabel>
                                <Select
                                label={name}
                                    name={name}
                                    value={values[name]}
                                    onChange={(e) => setFieldValue(name, e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.category_id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <TextField
                                label={label}
                                name={name}
                                value={values[name]}
                                onChange={(e) => {
                                    setFieldValue(name, e.target.value);
                                    if (name === 'validity') {
                                        setFieldValue(
                                            'billing_cycle',
                                            `${e.target.value} day${e.target.value > 1 ? 's' : ''}`
                                        );
                                    }
                                }}
                                fullWidth
                                type="text"
                                disabled={name === 'billing_cycle'}
                            />
                        )}
                    </Grid>
                ))}
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Pricing Model</InputLabel>
                        <Select
                            name="pricing_model"
                            value={values.pricing_model}
                            onChange={(e) => setFieldValue('pricing_model', e.target.value)}
                        >
                            <MenuItem value="Fixed">Fixed</MenuItem>
                            <MenuItem value="Tiered">Tiered</MenuItem>
                            <MenuItem value="Differential">Differential</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );

    const renderPricingAndUsage = (values, setFieldValue) => {
        const price = parseFloat(values.price) || 0;
        const taxDeduction = price * 0.1; // 10% tax deduction
        const availableBalance = price - taxDeduction;

        return (
            <>
                <Typography variant="h6" sx={{ color: '#253A7D' }}>
                    Pricing
                </Typography>
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={4}>
                        <TextField
                            label="Price"
                            name="price"
                            value={values.price}
                            onChange={(e) => handleNonNegativeChange(e, setFieldValue, 'price')}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Tax Deduction (10%)"
                            value={taxDeduction}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Available Balance"
                            value={availableBalance}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ color: '#253A7D' }}>
                    Built-in Usage
                </Typography>
                <Grid container spacing={2} padding={2}>
                    {fields.builtInUsage.map(({ name, label }) => (
                        <Grid item xs={6} key={name}>
                            {/* Conditionally render dropdown for data_parameter */}
                            {name === 'data_balance_parameter' ? (
                                <FormControl fullWidth>
                                    <InputLabel>{label}</InputLabel>
                                    <Select
                                        label={label}
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => setFieldValue(name, e.target.value)}
                                    >
                                        <MenuItem value="GB">GB</MenuItem>
                                        <MenuItem value="MB">MB</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    label={label}
                                    name={name}
                                    value={values[name]}
                                    onChange={(e) => handleNonNegativeChange(e, setFieldValue, name)}
                                    fullWidth
                                    type="number"
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    };

    const renderFupAndUsageCharges = (values, setFieldValue) => (
        <>
            <Typography variant="h6" sx={{ color: '#253A7D', paddingLeft: 2 }}>
                FUP Section
            </Typography>
            <Grid>

            </Grid>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={isFupEnabled ? 'enabled' : 'disabled'}
                            onChange={() => setIsFupEnabled((prev) => !prev)}
                        >
                            <FormControlLabel value="enabled" control={<Radio />} label="Enable FUP" />
                            <FormControlLabel value="disabled" control={<Radio />} label="Disable FUP" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {isFupEnabled && fields.fup.map(({ name, label }) => (
                    <Grid item xs={6} key={name}>
                        <TextField
                            label={label}
                            name={name}
                            value={values[name]}
                            onChange={(e) => handleNonNegativeChange(e, setFieldValue, name)}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: '#253A7D' }}>
                        Usage Charges
                    </Typography>
                </Grid>

                {fields.tariff.map(({ name, label }) => (

                    <Grid item xs={6} key={name}>
                        <TextField
                            label={label}
                            name={name}
                            value={values[name]}
                            onChange={(e) => handleNonNegativeChange(e, setFieldValue, name)}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );

    const renderStepContent = (step, values, setFieldValue) => {
        switch (step) {
            case 0:
                return renderPlanDetails(values, setFieldValue);
            case 1:
                return renderPricingAndUsage(values, setFieldValue);
            case 2:
                return renderFupAndUsageCharges(values, setFieldValue);
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
              <ToastContainer position="bottom-left" />
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {activeStep === 0 && renderCustomerType()}
                        {renderStepContent(activeStep, values, setFieldValue)}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="contained"
                                sx={{backgroundColor:'#253A7D'}}
                            >
                                Back
                            </Button>
                            <Button
                            sx={{backgroundColor:'#253A7D'}}
                                variant="contained"
                                onClick={activeStep === steps.length - 1 ? () => handleSubmit(values) : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default NewTariff;
