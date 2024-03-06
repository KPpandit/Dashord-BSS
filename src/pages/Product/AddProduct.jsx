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
import { InputLabel, MenuItem, NativeSelect, Select, FormControl, FormControlLabel, OutlinedInput, Checkbox, ListItemText, Alert } from "@mui/material";
import Notification from "../Components/Notification/Notification";


export default function AddProduct(props) {
    const [category_name_list, setCategory_name_list] = useState([]);
    const [rating_offer_list, setRating_offer_list] = useState([]);
    const [rating_plan_list, setRating_plan_list] = useState([]);
    const [call_balance, setCall] = useState('');
    const [sms_balance, setSms] = useState('');
    const [data_balance, setDataBalance] = useState('');
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
            .then(resp => {

                return resp.json();
            }).then(resp => {
                setdata(resp.map(item => item.name.replace(/^"(.*)"$/, '$1')));

                //setdata2(resp.map(item => item.name))
            }).catch(e => {
                console.log(e.message)
            })

        fetch("http://172.5.10.2:9696/api/rates/offer/bulk/get/all")
            .then(res => {
                return res.json();
            }).then(resp => {
                setdata1(resp);
            }).catch(e => {
                console.log("fom rates ")
            })


        fetch("http://172.5.10.2:9696/api/rates/plan/offer/get/all")
            .then(res => {
                return res.json();
            }).then(resp => {
                setdata2(resp.map(item => item.name.replace(/^"(.*)"$/, '$1')))
            }).catch(e => {
                console.log("fom rates ")
            })

    }, [])

    // const {  handleSubmit, handleBlur, values } = useFormik({
    //     initialValues: {

    //         category_name: "",
    //         calling_party: "",
    //         rating_plan_id:""
    //     },
    //     onSubmit: async (values) => {
    //         console.log(values);
    //         const res = await axios.post('http://172.5.10.2:8080/api/rating/profile/create',
    //          {...values},
    //          {
    //             headers:{
    //                 "Authorization":"Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
    //                 "Accept":"application/json",
    //                 "Content-Type":"application/json"
    //             }
    //          }
    //         ).then(res=>{
    //            location.reload();
    //             alert("data saved")
    //         })


    //     }
    // })
    const [result, setResult] = useState();

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    // console.log(data.map(item => item.name) + "-----------");
    // const val = data.map(item => item.name);
    // console.log(val + "-------------------- from val")
    const handleSubmit = async (e) => {
        console.log(pack_name + "------packname" + pack_type)
        e.preventDefault();
        console.log("hellooo from post API")
       
        const res = await axios.post('http://172.5.10.2:9696/api/rating/profile/voucher/create',
            {
                category_name_list,
                rating_offer_list,
                data_balance: parseInt(data_balance, 10) || 0,
                pack_name,
                pack_type,
                call_balance: parseInt(call_balance, 10) || 0,
                sms_balance: parseInt(sms_balance, 10) || 0
            }, {

            headers: {
                "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        ).then(res => {
            if (res.status === 200) {
                setNotify({
                    isOpen: true,
                    message: 'Profile  Added SuccessFully ',
                    type: 'success'
                })
                setTimeout(() => { props.onClose(); }, 3000)
            }
        })


    }
    const renderSelectedElement = () => {
        console.log("this is about the category" + category_name_list)
        const includesCall = category_name_list.includes('call');
        const includesData = category_name_list.includes('data');
        const includesSms = category_name_list.includes('sms');

        if (includesCall && includesData && includesSms) {
            return (
                <>
                    <Grid paddingBottom={2}>
                    <TextField
                            label="Data"
                            fullWidth
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="data_balance"
                            value={data_balance}
                            type="number"
                            onChange={e => setDataBalance(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>
                    <Grid item xs={12} paddingBottom={2}>
                        <TextField
                            label="calls"
                            fullWidth
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="call_balance"
                            value={call_balance}
                            type="number"
                            onChange={e => setCall(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="SMS"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="sms_balance"
                            value={sms_balance}
                            onChange={e => setSms(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>


                </>
            )

        } else if (includesCall && includesSms) {

            return (
                <>
                    <Grid item xs={12} paddingBottom={2}>
                        <TextField
                            label="calls"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="call_balance"
                            value={call_balance}
                            onChange={e => setCall(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>
                    <Grid item xs={12} paddingBottom={2}>
                        <TextField
                            label="SMS"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="sms_balance"
                            value={sms_balance}
                            onChange={e => setSms(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                </>
            )
        }
        else if (includesCall && includesData) {
            return (
                <>
                    <Grid item xs={12} paddingBottom={2}>
                        <TextField
                            label="call"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="call_balance"
                            value={call_balance}
                            onChange={e => setCall(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>
                    <Grid paddingBottom={2}>
                    <TextField
                            label="Data"
                            fullWidth
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="data_balance"
                            value={data_balance}
                            type="number"
                            onChange={e => setDataBalance(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                </>
            )
        }
        else if (includesData && includesSms) {
            return (
                <>
                    <Grid item xs={12} paddingBottom={2}>
                        <TextField
                            label="SMS"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="sms_balance"
                            value={sms_balance}
                            onChange={e => setSms(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>
                    <Grid paddingBottom={2}>
                    <TextField
                            label="Data"
                            fullWidth
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="data_balance"
                            value={data_balance}
                            type="number"
                            onChange={e => setDataBalance(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                </>
            )
        }
        else if (includesCall) {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            label="call"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="call_balance"
                            value={call_balance}
                            onChange={e => setCall(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                </>
            )
        }
        else if (includesSms) {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            label="SMS"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="sms_balance"
                            value={sms_balance}
                            onChange={e => setSms(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                </>
            )
        }
        else if (includesData) {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            label="Data"
                            fullWidth
                            type="number"
                            sx={{ textAlign: 'center', maxWidth: 'sm' }} // Aligns text center
                            name="data_balance"
                            value={data_balance}
                            onChange={e => setDataBalance(parseInt(e.target.value, 10) || '')}
                        />
                    </Grid>

                </>
            )
        }
    };
    // console.log(category_name_list+" <-----Category name and------------ rates---> "+rating_offer_list+" rate plane offer --->"+ rating_plan_list)
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
                    <Box component="form"
                        onSubmit={handleSubmit}

                    >
                        <Grid>
                            <form>

                                <Grid padding={2}>

                                    <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={1}>
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
                                                label="active"
                                                fullWidth
                                                name="pack_type"
                                                onChange={e => setPack_type(e.target.value)}
                                            >
                                                <MenuItem value={'Basic'}>Basic</MenuItem>
                                                <MenuItem value={'roaming'}>Roaming</MenuItem>
                                                <MenuItem value={'top-up'}>Top-up</MenuItem>
                                                <MenuItem value={'additional'}>Additional</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <FormControl sx={{ width: 400, paddingBottom: 1 }} >
                                        <InputLabel >Category name</InputLabel>
                                        <Select

                                            multiple
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
                                            renderValue={(selected) => selected.join(', ')}
                                        // MenuProps={MenuProps}
                                        >
                                            {data.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={category_name_list.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div >
                                        {console.log("method is working")}
                                        {renderSelectedElement()}
                                    </div>
                                </Grid>


                                <Grid paddingLeft={2} paddingRight={2} paddingTop={1}>
                                    <FormControl fullWidth>
                                        <InputLabel>Rates Offer</InputLabel>
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
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={rating_offer_list.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>



                                <Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ mt: 1.8, mb: 0.2, backgroundColor: '#8FE5FF' }}
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