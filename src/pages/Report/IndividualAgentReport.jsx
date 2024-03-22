import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import blanPhoto from '../../assets/blanPhoto.png'
import White_logo from '../../assets/White_logo.jpg'

export default function IndividualAgentReport(){
    const navigate = useNavigate()
    const { selectedRecord } = useLocation().state;
    const photo = sessionStorage.getItem('selectedPhoto')
    const report_Type = sessionStorage.getItem('report_Type')

    function toallcustomerReports(){
        if(report_Type=='Agent Report'){
            navigate('/allagentreport')
        }
    }

    function downloadpdf(){
    let pdf = new jsPDF('p','pt','a4');
            let capture = document.getElementById('container')
            pdf.html(capture,{
                callback:(pdf=>{
                    pdf.save('agent.pdf')
                })
            })


}

return(
    <div >
        <Button style={{backgroundColor:'#F6B625',color:'black'}} onClick={downloadpdf} sx={{boxShadow:20, marginX:1}}>Download PDF</Button>
            <Button style={{backgroundColor:'#F6B625',color:'black'}} sx={{boxShadow:20, marginX:1}} 
            onClick={toallcustomerReports}>Back</Button>

        
                    <div style={{marginTop:10,marginLeft:10,marginRight:10}}>

                        <Grid container spacing={2} id='container'>
                            <Grid item xs={12} >
                                <Paper elevation={10} >
                                <Grid container sx={{padding:1, backgroundColor:'#253A7D', color:'#FEFEFE'}}>
                                <Grid xs={12}>
                                <h4>{selectedRecord.fristName+" "+selectedRecord.lastName}</h4>           
                                    
                                </Grid>



                                </Grid>

                                        <Grid container spacing={2} sx={{margin:1}} >

                                        <Grid item xs={2} >
                                            <img src={White_logo}></img>
                                        </Grid>
                                        <Grid item xs={8} >
                                            {/* <Typography gutterBottom sx={{ color:'#253A7D'}}>Neotel, Connect with Confidence</Typography><br></br>  */}
                                            <Typography gutterBottom ><h3><u>Agent Report</u></h3></Typography>                                            
                                        </Grid>
                                                

                                        <Grid item xs={12} >
                                                <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Personal Details</Typography>                        
                                        </Grid>

                                        <Grid item xs={3}  >                            
                                            <Typography gutterBottom sx={{fontWeight:'bold'}}>Name:</Typography>            
                                        </Grid>
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom>{selectedRecord.fristName+" "+selectedRecord.lastName}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Phone Number:</Typography>                            
                                        </Grid>
                                        <Grid item xs={8} >                   
                            
                                                <Typography gutterBottom>{selectedRecord.contact}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Customer Type:</Typography>            
                                        </Grid>
                                        <Grid item xs={8}  >                        
                            
                                                <Typography gutterBottom>{selectedRecord.type}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Business Type:</Typography>            
                                        </Grid>
                                        <Grid item xs={8}  >                        
                            
                                                <Typography gutterBottom>{selectedRecord.businessNature}</Typography>                        
                                        </Grid>
                                        <Grid item xs={12} >                        
                            
                                                <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Contact Details</Typography>                        
                                        </Grid>
                                        
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Locality</Grid>
                                        <Grid item xs={8}>
                                                <Typography gutterBottom >{selectedRecord.locallity}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>City:</Grid>
                                        <Grid item xs={8}>
                                                <Typography gutterBottom >{selectedRecord.businessAddress}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Mobile Number:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.contact}</Typography>                        
                                        </Grid>
        
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Email:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.email}</Typography>                        
                                        </Grid>
                                        <Grid item xs={12} >                        
                            
                                                <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Stats Details</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Total Payment:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.totalPayments}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Total Refund:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.totalRefunds}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Total Payouts:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.totalPayouts}</Typography>                        
                                        </Grid>
                                        </Grid>

                                       

                                        
                                        
                                        
                                        



                            



                                    
                                </Paper>
                            </Grid>


                        </Grid>

                    </div>
                  
                
                   
                  
                </div>
)
}