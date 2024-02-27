import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
export default function Discounts() {
    const [dropdown1Value, setDropdown1Value] = useState('');
    const [dropdown2Value, setDropdown2Value] = useState('');

    const handleDropdown1Change = (event) => {
        setDropdown1Value(event.target.value);
    };

    const handleDropdown2Change = (event) => {
        setDropdown2Value(event.target.value);
    };
    return (
        <>
            <Grid sx={{width:607,textAlign:'center'}}>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="dropdown1-label">Discountable Item / Order</InputLabel>
                    <Select
                        labelId="dropdown1-label"
                        id="dropdown1"
                        // value={dropdown1Value}
                        label="Discountable Item / Order"
                    // onChange={handleDropdown1Change}
                    >
                        <MenuItem value="option1">------</MenuItem>
                        {/* <MenuItem value="option2">Option 2</MenuItem> */}
                        {/* Add more MenuItem components as needed */}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="dropdown2-label">Discount</InputLabel>
                    <Select
                        labelId="dropdown2-label"
                        id="dropdown2"
                        // value={dropdown2Value}
                        label="Discount"
                    // onChange={handleDropdown2Change}
                    >
                        <MenuItem value="optionA">-----</MenuItem>
                        {/* <MenuItem value="optionB">Option B</MenuItem> */}
                        {/* Add more MenuItem components as needed */}
                    </Select>
                </FormControl>
            </Grid>
        </>
    )
}