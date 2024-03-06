import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useNavigate } from 'react-router-dom';
export default function AddUserCode() {
    const navigate=useNavigate();
    return (
        <Box sx={{ display: 'container' }}>
            <Paper elevation={20}>
                <Grid padding={1} sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                    <Typography sx={{paddingLeft:1.5}}>ADD</Typography>
                </Grid>
                <Grid container spacing={4} padding={2}>
                    <Grid item xs={6} marginTop={3}>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="ID" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="User Code" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="External Ref" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="dropdown-label">Dropdown</InputLabel>
                                    <Select labelId="dropdown-label" label="Dropdown" fullWidth>
                                        <MenuItem value={1}>----</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Description" fullWidth />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} textAlign={'center'}>
                                <InputLabel>Valid From</InputLabel>
                                <TextField  type='date' sx={{width:300}}/>
                            </Grid>
                            <Grid item xs={12} textAlign={'center'}>
                            <InputLabel>Valid To</InputLabel>
                                <TextField  type='date' sx={{width:300}} />
                            </Grid>
                        </Grid>

                    </Grid>
                    {/* Left Side - 5 Fields */}


                    {/* Right Side - 2 Fields */}

                </Grid>
                <Grid container sx={{marginLeft:0,marginTop:0,paddingBottom:2}} spacing={2} backgroundColor={'#F6F6F6'}>
                   <Grid item lg={6} textAlign={'right'}>

                   <Button 
                   sx={{backgroundColor:'#253A7D'}}
                   variant="contained">{<SaveAltIcon sx={{paddingRight:1}}/>}Save Changes</Button>
                   </Grid>
                   <Grid item lg={6}>

                   <Button 
                    sx={{backgroundColor:'#253A7D'}}
                    onClick={()=>{navigate('/agent')}}
                   variant="contained">{<CloseIcon sx={{paddingRight:1}}/>}Cancel</Button>
                   </Grid>
                    
                </Grid>
            </Paper>
        </Box>
    )
}