import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate, redirect, useLocation, json } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, MenuItem, NativeSelect, Select, FormControl, FormControlLabel, OutlinedInput, Checkbox, ListItemText, Alert, InputAdornment, Paper } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
export default function AddRatingProfile() {
    const navigate = useNavigate();
    const [category_name, setCategory_name_list] = useState();
    const [rates_offer, setRating_offer_list] = useState('');
    const [pack_for, setPack_for] = useState();

    const [call_balance, setCall] = useState('');
    const [call_balance_parameter, setCallBalanceParameter] = useState("");
    const [sms_balance, setSms] = useState('');
    const [data_balance, setDataBalance] = useState('');
    const [data_balance_parameter, setDataBalanceParamter] = useState('');
    const [pack_name, setPack_name] = useState('');
    const [pack_type, setPack_type] = useState('');
    const [data, setdata] = useState([]);
    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);

    // const names = [
    //     'Oliver Hansen',
    //     'Van Henry',
    //     'April Tucker',
    //     'Ralph Hubbard',
    //     'Omar Alexander',
    //     'Carlos Abbott',
    //     'Miriam Wagner',
    //     'Bradley Wilkerson',
    //     'Virginia Andrews',
    //     'Kelly Snyder',
    // ];


    const defaultTheme = createTheme();
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

    const resetForm = () => {
        setCategory_name_list("");
        setRating_offer_list("");
        setCall("");
        setCallBalanceParameter("");
        setSms("");
        setDataBalance("");
        setDataBalanceParamter("");
        setPack_name("");
        setPack_type("");
        // Add other state values and their initial values here
    };

    const [result, setResult] = useState();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const handleSubmit = async (e) => {
        console.log(pack_name + "------packname" + pack_type)
        e.preventDefault();
        console.log("hellooo from post API")

        const res = await axios.post('http://172.5.10.2:9696/api/rating/profile/create',
            {
                category_name,
                rates_offer,
                data_balance: parseInt(data_balance, 10) || 0,
                pack_name,
                pack_type,
                call_balance: parseInt(call_balance, 10) || 0,
                sms_balance: parseInt(sms_balance, 10) || 0,
                call_balance_parameter,
                data_balance_parameter,
                pack_for
            }, {

            headers: {
                "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        ).then(res => {
            if (res.status === 200) {
                toast.success('Rating profile  Added Successfully', { autoClose: 2000 });
                resetForm();
            }
        })


    }


    return (

        <ThemeProvider theme={defaultTheme}>
            <ToastContainer position="bottom-left" />
            <Container component="main" sx={{ marginTop: -3 }} >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form"
                        onSubmit={handleSubmit}

                    >
                        <Grid sx={{ width: 600 }}>
                            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', paddingBottom: 2 }}>
                                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                                    <Grid>
                                        <Typography
                                            style={{

                                                fontSize: '20px',
                                                paddingLeft: 10,
                                                fontWeight: 'bold',
                                                paddingLeft: 32

                                            }}
                                        > Add Rating Profile</Typography>
                                    </Grid>
                                </Paper>
                            </Box>
                            <form>
                                <Paper elevation={10} sx={{ padding: 2 }}>
                                    <Grid container spacing={2} padding={5}>
                                        <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={1}>
                                            <TextField

                                                label="Pack Name"
                                                type="text"
                                                fullWidth
                                                name="pack_name"
                                                value={pack_name}
                                                onChange={e => setPack_name(e.target.value)}

                                            // onBlur={handleBlur}
                                            />
                                        </Grid>

                                        <Grid item lg={6} md={6} sm={6} xs={12} paddingBottom={1} textAlign={"center"}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Pack Type</InputLabel>
                                                <Select

                                                    id="demo-simple-select"
                                                    label="Pack Type"
                                                    fullWidth
                                                    name="pack_type"
                                                    value={pack_type}
                                                    onChange={e => setPack_type(e.target.value)}
                                                >
                                                    <MenuItem value={'Basic'}>Basic</MenuItem>
                                                    <MenuItem value={'Roaming'}>Roaming</MenuItem>
                                                    <MenuItem value={'Top up'}>Top-up</MenuItem>
                                                    <MenuItem value={'Additional'}>Additional</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={6}>

                                            <TextField label="Data"
                                                required
                                                type="number"
                                                name="data_balance"
                                                value={data_balance}
                                                onChange={e => setDataBalance(e.target.value)}
                                                fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel required id="demo-simple-select-label"> Data Type</InputLabel>
                                                <Select
                                                    required
                                                    id="demo-simple-select"
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

                                            <FormControl fullWidth sx={{ paddingBottom: 1 }}>

                                                <TextField
                                                    label="Select Category"
                                                    select
                                                    value={category_name}
                                                    onChange={(event) => {
                                                        const {
                                                            target: { value },
                                                        } = event;
                                                        setCategory_name_list(value);
                                                    }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                    }}
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
                                                fullWidth label='SMS' />

                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Call"
                                                required
                                                type="number"
                                                name="data_balance"
                                                value={call_balance}
                                                onChange={e => setCall(e.target.value)}
                                                fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel required id="demo-simple-select-label">Call Type</InputLabel>
                                                <Select
                                                    required
                                                    id="demo-simple-select"
                                                    label="Call Type"
                                                    fullWidth
                                                    name="pack_type"
                                                    value={call_balance_parameter}
                                                    onChange={e => setCallBalanceParameter(e.target.value)}
                                                >
                                                    <MenuItem value={'min'}>min</MenuItem>
                                                    <MenuItem value={'HOUR'}>hr</MenuItem>


                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={1}>

                                            <FormControl fullWidth>
                                                <InputLabel>Rates Offer</InputLabel>
                                                <Select
                                                    label="Rates Offer"
                                                    value={rates_offer}
                                                    onChange={(event) => {
                                                        const {
                                                            target: { value },
                                                        } = event;
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
                                                <InputLabel required id="demo-simple-select-label">Pack For</InputLabel>
                                                <Select
                                                    required
                                                    id="demo-simple-select"
                                                    label="Pack For"
                                                    fullWidth
                                                    name="pack_type"
                                                    value={pack_for}
                                                    onChange={e => setPack_for(e.target.value)}
                                                >
                                                    <MenuItem value={'prepaid'}>Prepaid</MenuItem>
                                                    <MenuItem value={'postpaid'}>Postpaid</MenuItem>


                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>


                                    <Grid item paddingTop={1}>

                                    </Grid>



                                    <Grid>


                                    </Grid>
                                </Paper>

                                <Grid container>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Button
                                            type="submit"

                                            variant="contained"
                                            onClick={handleSubmit}
                                            sx={{ boxShadow: 24, mt: 1.8, mb: 0.2, backgroundColor: '#253A7D' }}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            type="submit"

                                            variant="contained"
                                            onClick={() => navigate(-1)}
                                            sx={{ boxShadow: 24, mt: 1.8, mb: 0.2, backgroundColor: '#253A7D', marginLeft: 10 }}
                                        >
                                            Back
                                        </Button>
                                    </Grid>

                                </Grid>

                            </form>

                        </Grid>




                    </Box>
                </Box>

            </Container>

        </ThemeProvider>


    )
}