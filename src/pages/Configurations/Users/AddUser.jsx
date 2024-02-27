
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Cancel, Save } from '@mui/icons-material';
export default function AddUser() {
    return (
        <Box>
            <Grid>
                <Paper sx={{ backgroundColor: '#1976D2' }} elevation={5}>
                    <Typography variant="h4" gutterBottom color={'white'} paddingLeft={2}>
                        NEW USER
                    </Typography>
                </Paper>
            </Grid>
            <Paper>
                <Grid container spacing={2} sx={{ paddingRight: 2, paddingLeft: 2 }}>
                    {/* Left Side */}
                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label="Login Name" fullWidth  sx={{margin:1}} />
                        <FormControlLabel control={<Checkbox />} sx={{ margin:1}} label="Create credentials" />
                        <FormControl fullWidth sx={{ textAlign: 'center' , margin:1}}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"

                                name='flag'
                                // value={newData.flag}
                                // onChange={handleInputChange}
                               
                            >
                                <MenuItem value={'Active'}>Active</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ textAlign: 'center', margin:1 }}>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="language"

                                name='language'
                                // value={newData.flag}
                                // onChange={handleInputChange}
                               
                            >
                                <MenuItem value={'English'}>ENGLISH</MenuItem>
                                <MenuItem value={'Portuguese'}>PORTUGUESE</MenuItem>
                                <MenuItem value={'Deutsch'}>DEUTSCH</MenuItem>
                                <MenuItem value={'French'}>FRENCH</MenuItem>
                                <MenuItem value={'Hindi'}>HINDI</MenuItem>
                                <MenuItem value={'Chinese'}>CHINESE</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ textAlign: 'center' , margin:1 }}>
                            <InputLabel id="demo-simple-select-label">ROLE</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="ROLE"
                               
                                name='role'
                                // value={newData.flag}
                                // onChange={handleInputChange}
                               
                            >
                                <MenuItem value={'Super'}>SUPER</MenuItem>
                                <MenuItem value={'clerk'}>CLERK</MenuItem>
                               

                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} sx={{ margin:1}} label="Account Locked" />
                        <FormControlLabel control={<Checkbox />} sx={{ margin:1}} label="Is Account Inactive?" />
                    </Grid>

                    {/* Right Side */}
                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label="Organization Name" fullWidth margin="dense" />
                        <TextField label="First Name" fullWidth margin="dense" />
                        <TextField label="Last Name" fullWidth margin="dense" />
                        <TextField label="Phone Number" fullWidth margin="dense" />
                        <TextField label="Email" fullWidth margin="dense" />
                        <TextField label="Address" fullWidth margin="dense" />
                        <TextField label="Address2" fullWidth margin="dense" />
                        <TextField label="City" fullWidth margin="dense" />
                        <TextField label="State/Province" fullWidth margin="dense" />
                        <TextField label="Zip/Postal Code" fullWidth margin="dense" />
                        <FormControl fullWidth sx={{ textAlign: 'center' }}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Country"

                                name='Country'
                                // value={newData.flag}
                                // onChange={handleInputChange}
                               
                            >
                                <MenuItem value={'English'}>INDIA</MenuItem>
                               

                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Include in Notification" />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{ paddingBottom: 2, paddingTop: 2 }}>
          <Button variant="contained" sx={{ marginRight: 1 }}>
          {<SaveAltIcon sx={{ paddingRight: 1 }} />}
            Save
          </Button>
          <Button variant="contained" >
          {<Cancel sx={{ paddingRight: 1 }} />}
            Cancel
          </Button>
        </Grid>
            </Paper>
            
        </Box>
    )
}