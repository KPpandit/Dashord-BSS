import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { Component, useState } from 'react'
import { useLocation } from 'react-router-dom';
export default function AddPaymentMethod() {
    const location = useLocation();
    const { name } = location.state || {};
    console.log(name + "  -----name");
    const [selectAll, setSelectAll] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedValues(selected);

        // Check if all options are selected
        setSelectAll(selected.length === options.length);
    };

    const handleSelectAll = () => {
        // Toggle select all
        if (selectAll) {
            setSelectedValues([]);
        } else {
            setSelectedValues(options.map((option) => option.value));
        }

        setSelectAll(!selectAll);
    };

    const options = [
        { value: 'Basic', label: 'BASIC' },
        { value: 'Private', label: 'PRIVATE' },
        { value: 'Business', label: 'BUSINESS' },
    ];
    return (
        <Box sx={{
            marginTop: 1,
            display: 'container',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Paper elevation={3} sx={{ padding: 3, width: '400px' }}>
                <Grid paddingBottom={2}>
                    <Paper sx={{ backgroundColor: '#1976D2' }}>
                        <Typography variant='h5' sx={{ backgroundColor: '#1976D2', color: 'white', paddingLeft: 1 }}>
                            Details
                        </Typography>
                    </Paper>
                </Grid>
                <TextField
                    label="Payment Template"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={name}
                />
                <TextField
                    label="Method Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Is Recurring?"

                />
                 <FormControlLabel
                control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                label="All Account Types"
            />
            <Grid paddingTop={1}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Payment Method Template</InputLabel>
                    <Select
                        fullWidth
                        multiple
                        value={selectedValues}
                        onChange={handleChange}
                        label="Payment Method Template"
                        name="name"
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
           <Grid sx={{paddingTop:2}}>
           <Button variant="contained">Add New MetaField</Button>
           </Grid>
            </Paper>
           

        </Box>
    )
}