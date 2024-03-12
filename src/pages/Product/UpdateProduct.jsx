import React, { Component, useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Container, CssBaseline, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Box, Button, Checkbox, FormControl, FormLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LockOutlined from '@mui/icons-material/LockOutlined';
import UpdateIcon from '@mui/icons-material/Update';


export default function UpdateProduct(props) {


    // const { rating_profile_id } = props;

    const { rating_profile_id } = props;
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [intialCategoryname, setinitialCategoryname] = useState([])
    const [call_balance, setCall] = useState('');
    const [sms_balance, setSms] = useState('');
    const [data_balance, setDataBalance] = useState('');
    const [pack_name, setPack_name] = useState('');
    const [pack_type, setPack_type] = useState('');
    const [category_name_list, setCategory_name_list] = useState([]);
    const [rating_offer_list, setRating_offer_list] = useState([]);
    const [rating_plan_list, setRating_plan_list] = useState([]);
    const [data, setdata] = useState([]);
    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);
    let flag = false;
    const [values, setValues] = useState({
        id: rating_profile_id,
        category_name_list: [],
        rating_offer_list: [],
        rating_plan_list: []

    })
    useEffect(() => {
        const response = axios.get('http://172.5.10.2:9696/api/rating/profile/voucher/get/' + rating_profile_id)
            .then(res => {
                console.log(res.data.rating_profile_id + "-------------------id");
                console.log(res.data.pack_name + "----------" + res.data.pack_type + "--------" + res.data.call_balance + "---rrrrrrrr---" + res.data.rating_offer_list)
                setCall(res.data.call_balance)
                setDataBalance(res.data.data_balance);
                setSms(res.data.sms_balance);
                setPack_name(res.data.pack_name);
                setPack_type(res.data.pack_type);
                setinitialCategoryname(res.data.category_name_list)
                setRating_offer_list(res.data.rating_offer_list);
                setCategory_name_list(res.data.category_name_list);




            }).catch(err => console.log(err))
        if (response.ok) {

        }
    }, [])
    console.log("rates offer ---------->" + rating_offer_list)
    useEffect(() => {
        fetch("http://172.5.10.2:9696/api/category/detail/get/all")
            .then(resp => {

                return resp.json();
            }).then(resp => {
                setdata(resp.map(item => item.name.replace(/^"(.*)"$/, '$1')));


            }).catch(e => {
                console.log(e.message)
            })

        fetch("http://172.5.10.2:9696/api/rates/offer/bulk/get/all")
            .then(res => {
                return res.json();
            }).then(resp => {
                setdata1(resp)
            }).catch(e => {
                console.log("fom rates ")
            })


        fetch("http://172.5.10.2:9696/api/rates/plan/offer/get/all")
            .then(res => {
                return res.json();
            }).then(resp => {
                setdata2(resp)
            }).catch(e => {
                console.log("fom rates ")
            })

    }, [])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put('http://172.5.10.2:9696/api/rating/profile/voucher/edit/' + rating_profile_id, { category_name_list, rating_offer_list, data_balance, sms_balance, call_balance, pack_type, pack_name })
            .then(res => {
                console.log(...values + "valuesss updated");
                if (res.status == 200) {
                    setNotify({
                        isOpen: true,
                        message: 'Data Updated SuccessFully ',
                        type: 'success'
                    })
                    setTimeout(() => { props.onClose(); }, 1000)
                }

            })
            .catch(err => console.log(err))

    }
    function name(e) {
        setValues({ ...values, destName: e.target.value })
    }
    const defaultTheme = createTheme();
    return (



        <ThemeProvider theme={defaultTheme}>
            <Container component="main"  >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >


                    <Box component="form" onSubmit={handleSubmit}>



                        <Grid>
                            <form>
                                <Grid lg={4}>

                                    <Grid container>
                                        <Grid item lg={6}>
                                            <TextField
                                                variant='standard'
                                                margin="normal"
                                                label="Pack Name"
                                                type="text"
                                                onChange={e => setPack_name(e.target.value)}
                                                fullWidth
                                                name="pack_name"
                                                value={pack_name}
                                            />
                                        </Grid>




                                        <Grid item lg={6} paddingLeft={1}>
                                            <TextField
                                                variant='standard'
                                                margin="normal"
                                                label="Call Balance"
                                                type="number"
                                                onChange={e => setCall(parseInt(e.target.value, 10) || '')}
                                                fullWidth
                                                name="call_balance"
                                                value={call_balance}
                                            />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField
                                                variant='standard'
                                                margin="normal"
                                                label="SMS Balance"
                                                type="number"
                                                onChange={e => setSms(parseInt(e.target.value, 10) || '')}
                                                fullWidth
                                                name="sms_balance"
                                                value={sms_balance}
                                            />

                                        </Grid>
                                        <Grid item lg={6} paddingLeft={1}>
                                            <TextField
                                                variant='standard'
                                                margin="normal"
                                                label="Data Balance"
                                                type="number"
                                                onChange={e => setDataBalance(parseInt(e.target.value, 10) || '')}
                                                fullWidth
                                                name="data_balance"
                                                value={data_balance}
                                            />

                                        </Grid>
                                        <Grid item lg={12} paddingTop={2} paddingLeft={1}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Pack Type</InputLabel>
                                                <Select
                                                    variant='standard'
                                                    id="demo-simple-select"
                                                    label="Pack Type"
                                                    fullWidth
                                                    name="pack_type"
                                                    value={pack_type}  // Set the value prop with the current state value
                                                    onChange={e => setPack_type(e.target.value)}
                                                >
                                                    <MenuItem value={'Basic'}>Basic</MenuItem>
                                                    <MenuItem value={'roaming'}>Roaming</MenuItem>
                                                    <MenuItem value={'top-up'}>Top-up</MenuItem>
                                                    <MenuItem value={'additional'}>Additional</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid item lg={12} paddingTop={4} marginRight={0}>
                                            <FormControl fullWidth required>
                                                <InputLabel>
                                                    All Categories <span style={{ color: 'red' }}>*</span>
                                                </InputLabel>
                                                <Select
                                                    variant="standard"
                                                    multiple
                                                    fullWidth
                                                    value={category_name_list}
                                                    onChange={(event) => {
                                                        const {
                                                            target: { value },
                                                        } = event;
                                                        setCategory_name_list(
                                                            // On autofill we get a stringified value.
                                                            typeof value === 'string' ? value.split(',') : value,
                                                        );
                                                    }}
                                                    input={<OutlinedInput label="Category name" />}
                                                    renderValue={(selected) => selected.join(',')}
                                                >
                                                    {data.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                            <Checkbox checked={category_name_list.indexOf(name) > -1} />
                                                            <ListItemText primary={name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </Grid>
                                        {/* <Grid>
                                        <TextField
                                                variant='standard'
                                                margin="normal"
                                                label="Selected Rates"
                                                type="text"
                                                onChange={e => intialCategoryname(e.target.value, 10)}
                                                fullWidth
                                                name="rating_offer_list"
                                                value={rating_offer_list}
                                            />
                                        </Grid> */}

                                    </Grid>
                                    <Grid lg={12} paddingTop={4} marginRight={-0.2}>
                                        <FormControl fullWidth>
                                            <InputLabel>All Rates Offer</InputLabel>
                                            <Select

                                                multiple
                                                value={rating_offer_list}
                                                onChange={(event) => {
                                                    const {
                                                        target: { value },
                                                    } = event;
                                                    setRating_offer_list(
                                                        // On autofill we get a stringified value.
                                                        typeof value === 'string' ? value.split(',') : value,
                                                    );
                                                }}
                                                input={<OutlinedInput label="rates" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            // MenuProps={MenuProps}
                                            >
                                                {data1.map((name) => (
                                                    // <MenuItem key={name} value={name}>
                                                    //     <Checkbox checked={rating_offer_list.some(i=>i===name)} />
                                                    //     <ListItemText primary={name} />
                                                    // </MenuItem>
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={rating_offer_list.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>



                                </Grid>


                                <Grid>


                                </Grid>



                                <Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleSubmit}

                                        sx={{ mt: 3, mb: 2, backgroundColor: '#8FE5FF' }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>


                            </form>
                        </Grid>



                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                                                Forgot password?
                                                </Link> */}
                            </Grid>
                            <Grid item>
                                {/* <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                    </Link> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
            <Notification
                notify={notify}
                setNotify={setNotify}

            />
        </ThemeProvider>
    )
}