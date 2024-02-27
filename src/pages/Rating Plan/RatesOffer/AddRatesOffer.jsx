import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
export default function AddRatesOffer(){
    const navigate=useNavigate();

    const [result, setResult] = useState([]);
    // const [notify,setNotify]= useState({ isOpen: false, message: '', type: '' });
    const { handleChange, handleSubmit, handleBlur, values ,resetForm} = useFormik({
        initialValues: {
            rates_id:"",
            price:"",
            price_type:"",
            period:"",
            description:"",
            is_rates_active:"",
           


        },
        onSubmit: async (values) => {
            console.log(values);
            setResult(values);
            const res=await axios.post('http://172.5.10.2:9696/api/rates/offer/save',
            {...values},{

                headers:{
                    "Authorization":"Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            } 
           
        ).then(res=>{
            if(res.status===200){
                 resetForm()
                
                toast.success('Rates Added Successfully', { autoClose: 2000 });
            }
        })
        }
    })

    // const getApi =async (event)=>{
    //     await  axios.post('http://172.5.10.2:3000/users',values)
    //     .then(res=>{
    //      console.log(res+"--------------");
    //          setResult(res.data);
         
 
    //     }).catch(err=>console.log(err));
    //  }
    const defaultTheme = createTheme();
    return(
        <Box  sx={{
            marginTop: -2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}  >
          <ToastContainer position="bottom-left" />   
            <form onSubmit={handleSubmit} >
            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' ,paddingBottom:2}}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    paddingLeft:32

                                }}
                            > Add Rates Offer</Typography>
                        </Grid>
                    </Paper>
                </Box>
           <Paper elevation={15} sx={{padding:5,width:'550px'}}>
           <Grid container spacing={5}
            paddingBottom={2}
             textAlign={'center'}
             alignContent={'center'}
             alignItems={'center'}
             
            >
           
             
            <Grid item xs={6}>
            <TextField
                label="Price"
                type="text"
                required
                fullWidth
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            </Grid>
           <Grid item xs={6}>
           <TextField
                
                label="Price Type"
                type="text"
                required
                fullWidth
                name="price_type"
                value={values.price_type}
                onChange={handleChange}
                onBlur={handleBlur}
            />
           </Grid>

            <Grid item xs={6}>
            <TextField
               
                label="Period"
                type="number"
                required
                fullWidth
                name="period"
                value={values.period}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            </Grid>

            <Grid item xs={6}>
            <TextField
               
                label="Description"
                type="text"
                required
                fullWidth
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            </Grid>

            <Grid item xs={6} >
            
           <FormControl  fullWidth >
                <InputLabel id="demo-simple-select-label">Rates Active</InputLabel>
                <Select
                     
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.is_rates_active}
                    label="Rates Active"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="is_rates_active"
                >
                    <MenuItem value={true}>Enable</MenuItem>
                    <MenuItem value={false}>Disable</MenuItem>
                    
                </Select>
            </FormControl>
           </Grid>

           
            </Grid>
           </Paper>

           
           

            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{textAlign:{lg:'center' , md:'center',sm:'center',xs:'center'}}}>
            <Button
                type="submit"
                
                style={{backgroundColor:'#253A7D', color: 'white'}}
                onClick={()=> handleSubmit}
                sx={{ mt: 2, mb: 2,textAlign:{sm:'center'}}}
            >
                Submit
            </Button>
            <Button
                type="submit"
                
                style={{backgroundColor:'#253A7D', color: 'white',marginLeft:30}}
                 onClick={()=> navigate(-1)}
                sx={{ mt: 2, mb: 2,textAlign:{sm:'center'}}}
            >
                Cancle
            </Button>
            </Grid>

            </form>
            {/* <Notification
            notify={notify}
            setNotify={setNotify}
    
              /> */}
        </Box>
    )
}