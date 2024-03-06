import React from 'react';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Typography, Divider } from '@mui/material';
export default function Details() {
    return (<form>
        <Grid container spacing={2}>
            <Grid item xs={6} textAlign={'center'}>
                <FormControl fullWidth>
                    <InputLabel>Period</InputLabel>
                    <Select
                    
                    label="Period"
                    >
                        <MenuItem value="option1">One Time</MenuItem>
                        <MenuItem value="option2">Monthly</MenuItem>
                        <MenuItem value="option3">Daily</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>

                    <Select
                        disabled
                    >
                        <MenuItem value="Pre-Paid">Pre-Paid</MenuItem>
                        <MenuItem value="Post-Paid">Post-Paid</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>

                    <Select
                        label="Status"
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="InActive">InActive</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Grid item lg={12} md={4} sm={6} xs={12} fullWidth paddingBottom={2}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={6}>
                            {/* Left side for text input */}
                            <TextField
                                label="Due Date"
                                fullWidth
                                // name="creditLimit"
                                // value={values.creditLimit}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                sx={{ width: 150 }}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* Right side for dropdown */}
                            <Select
                                // value={values.selectedOption}
                                // onChange={handleChange}
                                // name="selectedOption"
                                displayEmpty
                                sx={{ width: 124 }}
                            >
                                <MenuItem value={'month'}>Month</MenuItem>
                                <MenuItem value={'week'}>Week</MenuItem>
                                <MenuItem value={'day'}>Day</MenuItem>
                                <MenuItem value={'year'}>Year</MenuItem>
                                <MenuItem value={'semi-month'}>Semi-Month</MenuItem>
                            </Select>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Active Since</InputLabel>
                <TextField type='date' fullWidth />
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Active Until</InputLabel>
                <TextField type='date' fullWidth />
            </Grid>

            <Grid item xs={6}>
                <TextField label="Minimum Period" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Cancellation Fee</InputLabel>

                    <Select
                        label="Cancellation Fee"
                    >
                        <MenuItem value="Active">Flat</MenuItem>
                        <MenuItem value="InActive">Percentage</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Notify user when order experies"
                />
            </Grid>
            <Grid item xs={12} sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>
                <Grid container>
                    <Grid item xs={1}>
                        <Typography sx={{ fontWeight: '500' }}>Note : </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography> Prorating only applies when order period is equal to customers billing cycle period</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider light />
            <Grid item xs={12} textAlign={''}>
                <TextField
                    label="Notes"
                    multiline
                    rows={4} // Adjust the number of rows as needed
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Include notes on invoice"
                />
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
                <Button
                sx={{backgroundColor:'#253A7D'}}
                variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Grid>
        </Grid>
    </form>
    )
}