import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function Blacklist() {
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
                    <Paper elevation={5} container>
                        <Grid item lg={12} paddingBottom={1} sx={{ backgroundColor: '#1976D2', height: 30 }}>
                            <Typography variant='h6' color={'grey'} sx={{ textAlign: 'left', color: 'white', paddingLeft: 2 }}>BLACKLIST</Typography>
                        </Grid>

                        <Grid container lg={12} md={12} sm={12} alignItems="center">
                            <Typography sx={{ padding: 3 }}>Blacklist CSV File</Typography>
                            <Input
                                id="csv-input"
                                type="file"
                                inputProps={{ accept: '.csv' }}
                                onChange={handleChangeFile}
                                sx={{ display: 'none' }}
                            />
                            <label htmlFor="csv-input">
                                <Button variant="outlined" component="span">
                                    Choose File
                                </Button>
                            </label>
                            {selectedFile ? (
                                <Typography sx={{ marginLeft: 2 }}>{selectedFile.name}</Typography>
                            ) : (
                                <Typography sx={{ marginLeft: 2, color: 'red' }}>File not selected</Typography>
                            )}
                        </Grid>

                        <Grid item lg={12} md={12} sm={12}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Add Records"
                                name="proRatingOption1"
                                checked={values.proRatingOption1}
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Modify Records"
                                name="proRatingOption2"
                                checked={values.proRatingOption2}
                                onChange={handleChange}
                            />
                            <Grid paddingBottom={4}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#1976D2', color: 'white', marginTop: '16px' }}
                                >
                                    <SaveAltIcon sx={{ paddingRight: 1 }} />
                                    Update
                                </Button>
                            </Grid>
                            <Divider />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} sx={{ padding: 3 }}>
                            <Divider />
                            <Paper elevation={4} sx={{ padding: 2 ,width:600}}>
                                <Grid lg={12} md={12} sm={12} >
                                    <form
                                        onSubmit={handleSerch}
                                    >
                                        <Grid lg={12} paddingBottom={1} >
                                            <TextField
                                                onClick={handleSerch}
                                                label="Filter"
                                                type='text'
                                                fullWidth
                                                name='value'
                                                // onChange={(e) => setValue(e.target.value)}
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton>
                                                                <SearchIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                    </form>
                                </Grid>
                                <TableContainer>
                                    <Table stickyHeader size='medium' padding="normal">
                                        <TableHead>
                                            <TableRow dense>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        style={{
                                                            backgroundColor: '#1976d2',
                                                            color: 'white',
                                                            textAlign: 'center',
                                                            height: '-12px',
                                                        }}
                                                    >
                                                        <Typography fontFamily={'Sans-serif'} fontSize={13}>{column.name}</Typography>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {rows &&
                                                rows
                                                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                    .map((row, i) => {
                                                        return (
                                                            <TableRow
                                                                key={i}
                                                                onClick={() => handleRowClick(row)}
                                                                onMouseEnter={() => handleRowMouseEnter(row)}
                                                                onMouseLeave={handleRowMouseLeave}
                                                                sx={
                                                                    highlightedRow === row
                                                                        ? { backgroundColor: 'lightblue' }
                                                                        : {}
                                                                }
                                                            >
                                                                {columns.map((column) => (
                                                                    <TableCell key={column.id} sx={{ textAlign: 'center' }}>
                                                                        {row[column.id]}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        );
                                                    })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    rowsPerPage={rowperpage}
                                    page={page}
                                    count={rows.length}
                                    component="div"
                                    onPageChange={handlechangepage}
                                    onRowsPerPageChange={handleRowsPerPage}
                                />
                            </Paper>
                        </Grid>
                        <Grid />
                    </Paper>
                </Grid>
            </form>
        </Box>

    );
}
