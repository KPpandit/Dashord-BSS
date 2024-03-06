import { Box, Button, Grid, TextField, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { Component, useState } from 'react'
import axios from "axios";

export default function AddLanguage(props) {
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            code: "",
            description: ""



        },
        onSubmit: async (values) => {
            console.log(values);

            const res = await axios.post('http://172.5.10.2:9090/api/savelanguage',
                { ...values }, {

                headers: {
                    "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 200) {
                    setNotify({
                        isOpen: true,
                        message: 'Rates Added SuccessFully ',
                        type: 'success'
                    })
                    setTimeout(() => { props.onClose(); }, 3000)
                }
            })
        }
    })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {

    };
    const defaultTheme = createTheme();
    return (
        <Grid >
            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}  >
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={2}
                        paddingBottom={2}
                        textAlign={'center'}
                        alignContent={'center'}
                        alignItems={'center'}
                    >

                        <Grid item lg={12} md={12} sm={12} xs={12}  sx={{width:300}}>
                            <TextField
                                label="Language Name"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{width:300}}
                               
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}  sx={{width:300}}>
                        <TextField
                            label="Language Code"
                            name="code"
                            value={values.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            sx={{width:300}}
                        />
                        </Grid>
                        <Grid item lg={12} md={4} sm={6} xs={12} sx={{width:300}}>
                        <Button type='submit' variant="contained" sx={{ mt: 2 , textAlign:'center'}}>
                            Add Language
                        </Button>

                        </Grid>
                       
                    </Grid>
                </form>

            </Box>
        </Grid>
    );
};