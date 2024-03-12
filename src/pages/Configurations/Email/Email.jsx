import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function Email() {
    const [showCheckbox, setShowCheckbox] = useState(false);
    const navigate = useNavigate();

    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            next_run_date: "",
            revire_report: "",
            days_review_report: "",
            billing_period: "",
            lastdayofMonth: "",
            dueDate: "",
            Language: "",
            credit_notification_limit1: "",
            credit_notification_limit2: "",
            invoice_delevery_method: "",
            payment_method: "",
            useParentPricing: "",
            file: null
        },
        onSubmit: async (values) => {
            console.log(values);
            // Your form submission logic here using axios
            try {
                const res = await axios.post('http://172.5.10.2:9696/api/rates/offer/save', { ...values }, {
                    headers: {
                        "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                if (res.status === 200) {
                    // Handle success scenario here
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error scenario here
            }
        }
    });

    const back = () => {
        navigate("/accounttype")
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        handleChange(e); // Pass the event to the original handleChange function
    };
    const columns = [
        { id: 'name', name: 'Name' },
        { id: 'credit_card', name: 'Credit Card' },
        { id: 'ip', name: 'IP' },

    ];
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                name: `Name ${i}`,
                credit_card: `Credit Card ${i}`,
                ip: `IP ${i}`


            });
        }
        return data;
    };
    const [rows, rowchange] = useState(generateData());
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };
    const [selectedRecord, setSelectedRecord] = useState(null);
    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`http://172.5.10.2:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
            .then((res) => {
                setdata(res.data);
                console.log(value + "----value sech datas")
                rowchange(res.data);
                setValue(value);
            })
    }
    return (
        <Box sx={{
            marginTop: 1,
            display: 'container',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} padding={2} textAlign='center' justifyContent="center" sx={{ marginX: 'auto', maxWidth: '100%' }}>
                    <Paper elevation={5} sx={{ width: 600 }}>
                        <Paper elevation={10} item lg={12} paddingBottom={1} sx={{ backgroundColor: '#1976D2', height: 30 }}>
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', color: 'white', paddingLeft: 2 }}>Email</Typography>
                        </Paper>
                        <Grid container spacing={2} padding={3}>


                            <Grid item lg={12} md={12} sm={12}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Self deliver paper invoices"
                                    name="proRatingOption1"
                                    checked={values.proRatingOption1}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} sx={{ marginLeft:6.4 }}>
                                {/* Add margin-top for spacing */}
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Show customer notes on invoices"
                                    name="proRatingOption2"
                                    checked={values.proRatingOption2}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item lg={12} md={12} sm={12} >
                                <TextField
                                sx={{width:350}} 
                                label='Days for order notification 1' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <TextField 
                                sx={{width:350}} 
                                label='Days for order notification 2' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <TextField 
                                sx={{width:350}} 
                                label='Days for order notification 3' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Self deliver paper invoices"
                                    name="proRatingOption1"
                                    checked={values.proRatingOption1}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <TextField 
                                 sx={{width:350}} 
                                label='First reminder' />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12}>
                                <TextField 
                                 sx={{width:350}} 
                                label='Next reminder*' />
                            </Grid>

                            

                           

                        </Grid>

                        <Grid />
                        <Grid item lg={12} padding={2}>
                                <Grid container spacing={2}  >
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            style={{ backgroundColor: '#1976D2', color: 'white' }}

                                        >
                                            <SaveAltIcon sx={{ paddingRight: 1 }} />
                                            Save Changes
                                        </Button>
                                    </Grid>
                                    <Grid item >
                                        <Button
                                            type="submit"
                                            style={{ backgroundColor: '#1976D2', color: 'white' }}
                                        >
                                            <CancelIcon sx={{ paddingRight: 1 }} />
                                            Cancle
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                    </Paper>
                    
                </Grid>
            </form>
        </Box>

    );
}
