import React, { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditRatingProfile(props) {
    const [pack_for, setPack_for] = useState('');
    const location = useLocation();
    const selectObj = location.state && location.state.selectObj;
    const { rating_profile_id } = props;

    const [category_name, setCategoryName] = useState('');
    const [rates_offer, setRating_offer_list] = useState('');
    const [call_balance, setCall] = useState('');
    const [call_balance_parameter, setCallBalanceParameter] = useState('');
    const [sms_balance, setSms] = useState('');
    const [data_balance, setDataBalance] = useState('');
    const [data_balance_parameter, setDataBalanceParamter] = useState('');
    const [pack_name, setPack_name] = useState('');
    const [pack_type, setPack_type] = useState('');

    const [data, setdata] = useState([]);
    const [data1, setdata1] = useState([]);

    useEffect(() => {
        axios.get('http://172.5.10.2:9696/api/rating/profile/get/' + rating_profile_id)
            .then(res => {
                setCall(res.data.call_balance);
                setDataBalance(res.data.data_balance);
                setSms(res.data.sms_balance);
                setPack_name(res.data.pack_name);
                setPack_type(res.data.pack_type);
                setDataBalanceParamter(res.data.data_balance_parameter);
                setRating_offer_list(res.data.rates_offer);
                setCategoryName(res.data.category_name);
                setCallBalanceParameter(res.data.call_balance_parameter);
                setPack_for(res.data.pack_for);
            }).catch(err => console.log(err));

        setCall(selectObj.call_balance);
        setDataBalance(selectObj.data_balance);
        setSms(selectObj.sms_balance);
        setPack_name(selectObj.pack_type);
        setPack_type(selectObj.pack_type);
        setDataBalanceParamter(selectObj.data_balance_parameter);
        setRating_offer_list(selectObj.rates_offer);
        setCategoryName(selectObj.category_name);
        setCallBalanceParameter(selectObj.call_balance_parameter);
        setPack_for(selectObj.pack_for);
    }, []);

    useEffect(() => {
        fetch("http://172.5.10.2:9696/api/category/detail/get/all")
            .then((resp) => resp.json())
            .then((resp) => {
                setdata(resp.map((item) => item.name.replace(/^"(.*)"$/, "$1")));
            })
            .catch((e) => {
                console.log(e.message);
            });

        fetch("http://172.5.10.2:9696/api/rates/offer/bulk/get/all")
            .then((res) => res.json())
            .then((resp) => {
                setdata1(resp);
            })
            .catch((e) => {
                console.log("from rates ");
            });

        fetch("http://172.5.10.2:9696/api/rates/plan/offer/get/all")
            .then((res) => res.json())
            .then((resp) => {
                setdata2(resp.map((item) => item.name.replace(/^"(.*)"$/, "$1")));
            })
            .catch((e) => {
                console.log("from rates ");
            });
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put('http://172.5.10.2:9696/api/rating/profile/edit/' + selectObj.rating_profile_id, {
            pack_name, pack_type, call_balance, call_balance_parameter,
            sms_balance, data_balance, data_balance_parameter, category_name, rates_offer, pack_for
        })
        .then(res => {
            if (res.status === 200) {
                toast.success('Profile Edited Successfully', { autoClose: 2000 });
                setTimeout(() => { navigate("/ratingPlan") }, 3000);
            }
        })
        .catch(err => console.log(err));
    }

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer position="bottom-left" />
            <Container component="main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <CssBaseline />
                <Box sx={{ marginTop: -2.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid sx={{ width: 600 }}>
                            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', paddingBottom: 2 }}>
                                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                                    <Grid>
                                        <Typography style={{ fontSize: '20px', paddingLeft: 10, fontWeight: 'bold', paddingLeft: 32 }}>Edit Rating Profile</Typography>
                                    </Grid>
                                </Paper>
                            </Box>
                            <Paper elevation={10} sx={{ padding: 5 }}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={1}>
                                        <TextField
                                            label="Pack Name"
                                            type="text"
                                            fullWidth
                                            name="pack_name"
                                            value={pack_name}
                                            onChange={e => setPack_name(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={12} paddingBottom={1} textAlign={"center"}>
                                        <FormControl fullWidth>
                                            <InputLabel id="pack-type-label">Pack Type</InputLabel>
                                            <Select
                                                id="pack-type-select"
                                                label="Pack Type"
                                                fullWidth
                                                name="pack_type"
                                                onChange={e => setPack_type(e.target.value)}
                                                value={pack_type}
                                            >
                                                <MenuItem value={'Basic'}>Basic</MenuItem>
                                                <MenuItem value={'roaming'}>Roaming</MenuItem>
                                                <MenuItem value={'top-up'}>Top-up</MenuItem>
                                                <MenuItem value={'additional'}>Additional</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <FormControl fullWidth sx={{ paddingBottom: 1 }}>
                                            <TextField
                                                label="Select Category"
                                                select
                                                name='category_name'
                                                value={category_name}
                                                onChange={e => setCategoryName(e.target.value)}
                                            >
                                                {data.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            value={sms_balance}
                                            required
                                            name="sms_balance"
                                            onChange={e => setSms(e.target.value)}
                                            fullWidth label='SMS'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Data"
                                            required
                                            type="number"
                                            name="data_balance"
                                            value={data_balance}
                                            onChange={e => setDataBalance(e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel required id="data-type-label">Data Type</InputLabel>
                                            <Select
                                                required
                                                id="data-type-select"
                                                label="Data Type"
                                                fullWidth
                                                name="data_balance_parameter"
                                                value={data_balance_parameter}
                                                onChange={e => setDataBalanceParamter(e.target.value)}
                                            >
                                                <MenuItem value={'GB'}>GB</MenuItem>
                                                <MenuItem value={'MB'}>MB</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Call"
                                            required
                                            type="number"
                                            name="call_balance"
                                            value={call_balance}
                                            onChange={e => setCall(e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel required id="call-type-label">Call Type</InputLabel>
                                            <Select
                                                required
                                                id="call-type-select"
                                                label="Call Type"
                                                fullWidth
                                                name="call_balance_parameter"
                                                value={call_balance_parameter}
                                                onChange={e => setCallBalanceParameter(e.target.value)}
                                            >
                                                <MenuItem value={'min'}>min</MenuItem>
                                                <MenuItem value={'HOUR'}>hr</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} paddingTop={1}>
                                        <FormControl fullWidth>
                                            <InputLabel>Rates Offer</InputLabel>
                                            <Select
                                                fullWidth
                                                label="Rates Offer"
                                                value={rates_offer}
                                                onChange={(event) => {
                                                    const { target: { value } } = event;
                                                    setRating_offer_list(value);
                                                }}
                                                input={<OutlinedInput label="rates" />}
                                                renderValue={(selected) => selected}
                                            >
                                                {data1.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel required id="pack-for-label">Pack For</InputLabel>
                                            <Select
                                                required
                                                id="pack-for-select"
                                                label="Pack For"
                                                fullWidth
                                                name="pack_for"
                                                value={pack_for}
                                                onChange={e => setPack_for(e.target.value)}
                                            >
                                                <MenuItem value={'prepaid'}>Prepaid</MenuItem>
                                                <MenuItem value={'postpaid'}>Postpaid</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid textAlign={'center'}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{ boxShadow: 24, mt: 1.8, mb: 0.2, backgroundColor: '#253A7D' }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/ratingProfile")}
                                    sx={{ boxShadow: 24, mt: 1.8, mb: 0.2, backgroundColor: '#253A7D', marginLeft: 10 }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
