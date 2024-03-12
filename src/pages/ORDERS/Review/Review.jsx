import { Cancel, SaveAlt } from '@mui/icons-material';
import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
export default function Review({customerObject}){
    const currentDate = new Date();

    // Format the date as needed
    const formattedDate = currentDate.toLocaleDateString();
    console.log('Details Component - customerObject:', customerObject);
    return(
        <>
        <Grid container spacing={1} sx={{width:450}}>
            <Grid item xs={6} >
                <Typography sx={{fontSize:'25px',color:'#7E7E7E'}}>Order #</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{fontSize:'22px',color:'#7E7E7E'}}> ONE Time, {customerObject.customerType}</Typography>
               
            </Grid>
            
            <Grid item xs={6}>
        
                <Typography  sx={{paddingLeft:0.4,color:'#7E7E7E'}}>{customerObject.firstName}</Typography>
            </Grid>
            <Grid item xs={6} textAlign={'right'} >
            <Typography  sx={{paddingRight:1.2,color:'#7E7E7E'}}>{formattedDate}</Typography>  
            </Grid>
            <Grid item xs={12} sx={{ borderBottom: '1px solid grey',marginTop:1.5, width: '100%', marginBottom: '10px' }} />
            <Grid container padding={2}>
                <Grid item xs={12}>
                    <Typography sx={{paddingRight:1.2,color:'#7E7E7E'}}>This order does not contain any lines.</Typography>
                </Grid>
               
            </Grid>
            <Grid item xs={12} sx={{ borderBottom: '1px solid grey',marginTop:1.5, width: '100%', marginBottom: '10px' }} />
            <Grid sx={{paddingTop:2, textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
                <Button sx={{backgroundColor:'#253A7D',color:'white',marginRight:2}} variant="contained">{<SaveAlt sx={{paddingRight:1}}/>} Save Changes</Button>
                <Button sx={{backgroundColor:'#253A7D',color:'white'}} variant="contained">{<Cancel sx={{paddingRight:1}}/>} Cancle</Button>
            </Grid>
        </Grid>
        
        
        </>
    )
}