import React, { Component, useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
export default function EditRatesOffer(props) {
    const location = useLocation();
    // Access the state object from the location
    const { state } = location;

    // Check if state is defined before accessing its properties
    const id = state?.id;
    //  const accountType = state?.type;
    const { rates_id } = props;
    console.log(props + "-------props in Update destination");
    console.log(id + ";;;;;;;;id by props")
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [values, setValues] = useState({
        id: id,
        period: '',
        price: '',
        price_type: '',
        description: '',
        is_rates_active: '',

    })

    useEffect(() => {
        axios.get('http://172.5.10.2:9696/api/rates/offer/get/' + id)
            .then(res => {
                setValues({
                    ...values,

                    id: res.data.id,
                    period: res.data.period,
                    price: res.data.price,
                    price_type: res.data.price_type,
                    description: res.data.description,
                    is_rates_active: res.data.is_rates_active
                })
                console.log("from --- get API")
            }).catch(err => console.log(err))
    }, [])
    console.log(values.period + "is rate active")
    const navigate = useNavigate()

    console.log("-------------" + values.price_type)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put('http://172.5.10.2:9696/api/rates/offer/edit/' + id, values)
            .then(res => {
                console.log(...values + "valuesss updated");
                if (res.status == 200) {

                    toast.success('Rates Added Successfully', { autoClose: 2000 });
                }

            })
            .catch(err => console.log(err))

    }
    function name(e) {
        setValues({ ...values, destName: e.target.value })
    }
    return (
        <Box sx={{ display: 'flex-container' }} textAlign={'center'} justifyContent={'center'}>
            <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', paddingBottom: 4 }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'left'

                                }}
                            >Edit Rates</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Paper elevation={15} sx={{ width: 600, padding: 3 }}>

                    <Grid container spacing={3} padding={4} >
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label="Price"
                                type="text"
                                required
                                fullWidth
                                name="price"
                                value={values.price}
                                onChange={e => setValues({ ...values, price: e.target.value })}


                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label="Period"
                                type="number"
                                required
                                fullWidth
                                name="period"
                                value={values.period}
                                onChange={e => setValues({ ...values, period: e.target.value })}


                            />
                        </Grid>


                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <TextField
                                label="description"
                                type="text"
                                required
                                fullWidth
                                name="description"
                                value={values.description}
                                onChange={e => setValues({ ...values, description: e.target.value })}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <TextField
                                label="Price Type"
                                type="text"
                                required
                                fullWidth
                                name="price_type"
                                value={values.price_type}
                                onChange={e => setValues({ ...values, price_type: e.target.value })}
                            />
                        </Grid>

                        {/* <Grid item xs={6} >

                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Rates Active</InputLabel>
                                <Select

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.is_rates_active}
                                    label="Rates Active"
                                    name="is_rates_active"
                                    onChange={e => setValues({ ...values, is_rates_active: e.target.value })}


                                >
                                    <MenuItem value={true}>Enable</MenuItem>
                                    <MenuItem value={false}>Disable</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                </Paper>




                <Grid container alignContent={'center'} textAlign={'center'} justifyContent={'center'}>
                    <Grid padding={3} textAlign={"center"} alignItems={'center'}>
                        <Button type="submit"
                            sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                            variant="contained" style={{ justifyContent: "center" }}>submit</Button>
                        <Button
                            type="submit"

                            style={{ backgroundColor: '#253A7D', color: 'white', marginLeft: 30 }}
                            onClick={() => navigate(-1)}
                            sx={{ boxShadow: 24, mt: 2, mb: 2, textAlign: { sm: 'center' } }}
                        >
                            Cancle
                        </Button>
                    </Grid>

                </Grid>
                {/* <Notification
                notify={notify}
                setNotify={setNotify}

            /> */}
            </form>
        </Box>
    )
}