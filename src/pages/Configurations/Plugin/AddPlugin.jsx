import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Cancel, SaveAlt } from '@mui/icons-material';
export default function AddPlugin() {
    const [showFields, setShowFields] = useState(false);

    const [fieldPairs, setFieldPairs] = useState([{ id: 1, fields: ['', ''] }]);

    const handleAddFieldPair = () => {
        const newFieldPairs = [
            ...fieldPairs,
            {
                id: fieldPairs.length + 1,
                fields: ['', ''],
            },
        ];
        setFieldPairs(newFieldPairs);
    };

    const handleRemoveFieldPair = (id) => {
        const updatedFieldPairs = fieldPairs.filter((pair) => pair.id !== id);
        setFieldPairs(updatedFieldPairs);
    };
    return (
        <Box sx={{
            marginTop: 1,
            display: 'container',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box sx={{ padding: '16px' }}>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >
                    <Paper >
                        <Paper sx={{ backgroundColor: '#1976D2', color: 'white' }}>
                            <Typography sx={{ paddingLeft: 2 }}>
                                ADD NEW PLUG-IN
                            </Typography>
                        </Paper>
                        <Grid container sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2
                        }}>

                            <Paper >
                                <Grid container spacing={2} padding={2}>
                                    <Grid item sx={{ textAlign: 'center' }} lg={12}>
                                        <TextField label='Category' sx={{ width: 350 }} value={'Billing process: order filters'} />
                                    </Grid>
                                    <Grid item sx={{ textAlign: 'center' }} lg={12}>
                                        <FormControl fullWidth sx={{ width: 350 }}>
                                            <InputLabel id="demo-simple-select-label">TYPE</InputLabel>
                                            <Select
                                                fullWidth
                                                // value={values.period}
                                                label="TYPE"
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                                name="period"
                                            >
                                                <MenuItem value={'STRING'}>STRING</MenuItem>
                                                <MenuItem value={'INTEGER'}>INTEGER</MenuItem>
                                                <MenuItem value={'DECIMAL'}>DECIMAL</MenuItem>
                                                <MenuItem value={'BOOLEAN'}>BOOLEAN</MenuItem>
                                                <MenuItem value={'DATE'}>DATE</MenuItem>
                                                <MenuItem value={'JSON_OBJECT'}>JSON_OBJECT</MenuItem>
                                                <MenuItem value={'ENUMERATION'}>ENUMERATION</MenuItem>
                                                <MenuItem value={'LIST'}>LIST</MenuItem>
                                                <MenuItem value={'STATIC_TEXT'}>STATIC_TEXT</MenuItem>
                                                <MenuItem value={'TEXT_AREA'}>TEXT_AREA</MenuItem>
                                                <MenuItem value={'SCRIPT'}>SCRIPT</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sx={{ textAlign: 'center' }} lg={12}>
                                        <TextField label='Order' sx={{ width: 350 }} />
                                    </Grid>
                                </Grid>
                                <Paper elevation={2}>
                                    <Grid sx={{ backgroundColor: '#1976D2', color: 'white', textAlign: 'left' }} paddingRight={2}>
                                        <Typography paddingLeft={2}>
                                            PARAMETERS
                                        </Typography>
                                    </Grid>
                                    {fieldPairs.map((pair, index) => (
                                        <Grid container spacing={3} key={pair.id} padding={2} paddingLeft={4}>
                                            {pair.fields.map((value, fieldIndex) => (
                                                <Grid item lg={4} key={fieldIndex}>
                                                    <TextField
                                                        label={``}
                                                        value={value}
                                                        onChange={(e) => {
                                                            const updatedFieldPairs = fieldPairs.map((p) =>
                                                                p.id === pair.id ? { ...p, fields: [...p.fields.slice(0, fieldIndex), e.target.value, ...p.fields.slice(fieldIndex + 1)] } : p
                                                            );
                                                            setFieldPairs(updatedFieldPairs);
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                            {index === 0 && (
                                                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , textAlign:'left'}} >

                                                    {<AddCircleIcon onClick={handleAddFieldPair} sx={{color:'#1976D2'}}/>}


                                                </Grid>
                                            )}
                                            {index > 0 && (
                                                <Grid item lg={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , textAlign:'left' }}>

                                                    <RemoveCircleIcon onClick={() => handleRemoveFieldPair(pair.id)} sx={{color:'#1976D2'}}/>

                                                </Grid>
                                            )}
                                        </Grid>
                                    ))}

                                </Paper>
                                <Grid sx={{ padding: 2,paddingTop:5 }}>
                                    <TextField
                                        label="Description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        
                                    />
                                </Grid>
                            </Paper>
                            <Grid container spacing={2} textAlign={'center'} paddingTop={2}>
                                <Grid item lg={6}>
                                   
                                <Button variant="contained">
                                    { <SaveAlt sx={{paddingRight:1}}/>}
                                    Save Plug-IN</Button>
                                </Grid>
                                <Grid item lg={6}>
                                <Button variant="contained">
                                { <Cancel sx={{paddingRight:1}}/>}
                                    Cancel</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}