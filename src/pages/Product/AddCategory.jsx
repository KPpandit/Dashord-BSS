import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function AddCategory() {
    const [showPaper, setShowPaper] = useState(false);
    const [showCommision, setShowCommision] = useState(false);
    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const showCommissiomPaper = () => {
        setShowCommision(!showCommision);
    };

    const [asset, setAsset] = useState(false);
    const showAsset = () => {
        setAsset(!asset);
    };
    return (
        <Box>
            <Paper sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Grid2 >
                        <Typography variant='h5' color={'grey'} sx={{ paddingTop: 2 ,textAlign:'center', paddingBottom:2}}>ADD PRODUCT CATEGORY</Typography>
                        <Divider />
                        <Grid
                            container
                            spacing={2}

                            paddingTop={2}
                            textAlign={'center'}
                            alignContent={'center'}
                            alignItems={'center'}
                            justifyContent={'center'} // Center the entire grid horizontally
                            style={{ minHeight: '60vh' }} // Full height of the viewport
                        >
                            <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>{/* Padding for individual items */}
                                <TextField
                                    label=" Name"
                                    type="text"
                                    required
                                    sx={{ width: 350 }}
                                    name="price"
                                // value={values.price}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>

                                <FormControl sx={{ width: 350 }} >
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={values.is_rates_active}
                                        label="Rates Active"
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        name="is_rates_active"
                                    >
                                        <MenuItem value={'items'}>Items</MenuItem>
                                        <MenuItem value={'tax'}>Tax</MenuItem>
                                        <MenuItem value={'penalty'}>Penalty</MenuItem>
                                        <MenuItem value={'Discount'}>Discount</MenuItem>
                                        <MenuItem value={'Subscription'}>Subscrition</MenuItem>
                                        <MenuItem value={'plan'}>Plan</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>



                            <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>

                                <FormControl sx={{ width: 350 }} >
                                    <InputLabel id="demo-simple-select-label">Parent Category</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={values.is_rates_active}
                                        label="Rates Active"
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        name="is_rates_active"
                                    >
                                        <MenuItem value={''}>--</MenuItem>
                                        <MenuItem value={'top up'}>Disable</MenuItem>
                                        <MenuItem value={'p'}>Disable</MenuItem>
                                        <MenuItem value={'pre paid'}>Disable</MenuItem>


                                    </Select>
                                </FormControl>
                            </Grid>





                            <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>
                                <FormControlLabel sx={{ textAlign: 'left' }} control={<Checkbox />} label="One Item Per Order" />
                                <FormControlLabel sx={{ textAlign: 'right' }} control={<Checkbox onClick={showAsset} />} label="Allow Asset Management" />
                            </Grid>


                        </Grid>
                        {asset && (
                            <>
                                <Grid sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                                    <Button variant='contained' onClick={togglePaper}>
                                        <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>ASSETS STATUSE S</Typography>
                                        {showPaper ? < RemoveIcon /> : <AddIcon />}
                                    </Button>
                                    {showPaper && (
                                        <Grid sx={{ padding: 2, marginTop: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>

                                                    <TextField
                                                        label="Name"
                                                        type="text"
                                                        required
                                                        fullWidth
                                                        name="zipCode"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>

                                                    <FormControlLabel control={<Checkbox />} label="Allow Sub-Accounts" />
                                                </Grid>

                                                <Grid item xs={3}>

                                                    <FormControlLabel control={<Checkbox />} label="Allow Sub-Accounts" />
                                                </Grid>

                                                <Grid item xs={3}>

                                                    <FormControlLabel control={<Checkbox />} label="Allow Sub-Accounts" />
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>

                                <Grid sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                                    <Button variant='contained' onClick={showCommissiomPaper}>
                                        <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>ASSET META FIELDS</Typography>
                                        {showCommision ? < RemoveIcon /> : <AddIcon />}
                                    </Button>
                                    {showCommision && (
                                        <Grid sx={{ padding: 2, marginTop: 2 }}>
                                           <Grid container spacing={2}>
                                                <Grid item xs={4}>

                                                    <FormControlLabel control={<Checkbox />} label="Allow Sub-Accounts" />
                                                </Grid>

                                                <Grid item xs={4} >

                                                    <FormControl fullWidth >
                                                        <InputLabel id="demo-simple-select-label">Import Meta Field</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            // value={values.is_rates_active}
                                                            label="Rates Active"
                                                            // onChange={handleChange}
                                                            // onBlur={handleBlur}
                                                            name="is_rates_active"
                                                        >
                                                            <MenuItem value={''}>--</MenuItem>
                                                            <MenuItem value={'top up'}>Disable</MenuItem>
                                                            <MenuItem value={'p'}>Disable</MenuItem>
                                                            <MenuItem value={'pre paid'}>Disable</MenuItem>


                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={4}>

                                                    <FormControl fullWidth >
                                                        <InputLabel id="demo-simple-select-label">Import Meta Field Group</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            // value={values.is_rates_active}
                                                            label="Rates Active"
                                                            // onChange={handleChange}
                                                            // onBlur={handleBlur}
                                                            name="is_rates_active"
                                                        >
                                                            <MenuItem value={''}>--</MenuItem>
                                                            <MenuItem value={'top up'}>Disable</MenuItem>
                                                            <MenuItem value={'p'}>Disable</MenuItem>
                                                            <MenuItem value={'pre paid'}>Disable</MenuItem>


                                                        </Select>
                                                    </FormControl>
                                                </Grid>


                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </>

                        )}





                    </Grid2>

                </Box>
                {/* <Grid sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                    <Button variant='contained' onClick={togglePaper}>
                        <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>COMMISSION EXCEPTION</Typography>
                        {showPaper ? < RemoveIcon /> : <AddIcon />}
                    </Button>
                    {showPaper && (
                        <Paper sx={{ padding: 2, marginTop: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">Product ID</InputLabel>
                                    <TextField
                                        type="text"
                                        required
                                        fullWidth
                                        name="zipCode"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">Start Date</InputLabel>
                                    <TextField
                                        type="date"
                                        required
                                        fullWidth
                                        name="field2"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">End Date</InputLabel>
                                    <TextField
                                        type="date"
                                        required
                                        fullWidth
                                        name="field3"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">Percentage</InputLabel>
                                    <TextField
                                        type="number"
                                        required
                                        fullWidth
                                        name="field3"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </Grid> */}

                {/* <Grid sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                    <Button variant='contained' onClick={showCommissiomPaper}>
                        <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>REFERRAL COMMISSION</Typography>
                        {showCommision ? < RemoveIcon /> : <AddIcon />}
                    </Button>
                    {showCommision && (
                        <Paper sx={{ padding: 2, marginTop: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">Agent ID</InputLabel>
                                    <TextField
                                        type="text"
                                        required
                                        fullWidth
                                        name="zipCode"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">Start Date</InputLabel>
                                    <TextField
                                        type="date"
                                        required
                                        fullWidth
                                        name="field2"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">End Date</InputLabel>
                                    <TextField
                                        type="date"
                                        required
                                        fullWidth
                                        name="field3"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel id="demo-simple-select-label">Percentage</InputLabel>
                                    <TextField
                                        type="number"
                                        required
                                        fullWidth
                                        name="field3"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </Grid> */}

            </Paper>
            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                <Button
                    type="submit"

                    style={{ backgroundColor: '#00B5FF', color: 'white' }}
                    // onClick={()=> handleSubmit}
                    sx={{ mb: 5, textAlign: { sm: 'center' } }}
                >
                    Submit
                </Button>
            </Grid>


        </Box>
    )
}