import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState,useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import defaultimg from '../../assets/defaultimg.png'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf' 

export default function Individualreport(){
    const navigate = useNavigate()
    const { selectedRecord } = useLocation().state;
    const photo = sessionStorage.getItem('selectedPhoto')
    const report_Type = sessionStorage.getItem('report_Type')
    const pdfContainerRef = useRef(null);
   
    function toallcustomerReports(){
        if(report_Type=='All Customer Report'){
            navigate('/allcustomerReport')
        }
        if(report_Type=='Prepaid Customer Report'){
            navigate('/prepaidcustomerReport')
        }
        if(report_Type=='Postpaid Customer Report'){
            navigate('/postpaidcustomerReport');
          }
          if(report_Type=='Active Customer Report'){
            navigate('/activecustomerReport');
          }
          if(report_Type=='Inactive Customer Report'){
            navigate('/inactivecustomerReport');
          }

    }
    const downloadpdf = async (event) => {
        pdfContainerRef.current.save();
    };
//     function downloadpdf(){
//     // let pdf = new jsPDF('p','pt','a4');
//     //         let capture = document.getElementById('container')
//     //         pdf.html(capture,{
//     //             callback:(pdf=>{
//     //                 pdf.save('customer.pdf')
//     //             })
//     //         })

//     const capture = document.getElementById('container');
//             html2canvas(capture).then((canvas)=>{
//                 const imgdata = canvas.toDataURL('img/png')
//                 const doc = new jsPDF('p','mm','a4');
//                 const pageHeight= doc.internal.pageSize.height;
//                 const pageWidth= doc.internal.pageSize.width;
//                 console.log("hieght",pageHeight)
//                 console.log("width",pageWidth)
//                 doc.addImage(imgdata,'PNG',0,0,pageWidth,pageHeight);
//                 doc.save('customerProfile.pdf')
//             })


// }

return(
    < >
        <Button style={{backgroundColor:'#F6B625',color:'black'}} onClick={downloadpdf} sx={{boxShadow:20, marginX:1}}>Download PDF</Button>
            <Button style={{backgroundColor:'#F6B625',color:'black'}} sx={{boxShadow:20, marginX:1}} 
            onClick={toallcustomerReports}>Back</Button>

        <PDFExport ref={pdfContainerRef} paperSize={"A4"}>
                    <div style={{marginTop:10,marginLeft:10,marginRight:10}}>
                        <Grid container spacing={2}   >
                            <Grid item xs={12}>
                                <Paper elevation={10}   >

                                <Grid container sx={{padding:1, backgroundColor:'#253A7D', color:'#FEFEFE'}} xs={12}>

                                <Grid xs={12}>
                                <h4>{selectedRecord.firstName+" "+selectedRecord.lastName}</h4>           
                                    
                                </Grid>



                                </Grid>

                                    <Grid container spacing={2} sx={{margin:1}}>
                                        <Grid item xs={6} sx={{borderRight: 1,paddingY:1,paddingX:2,borderColor:'gray'}}>

                                            <Grid container spacing={2} >

                                            <Grid item xs={12} >
                                                    <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Personal Details</Typography>                        
                                            </Grid>
                                            
                                            <Grid container spacing={2} >

                                            <Grid item xs={3} md={6}   >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}>Name:</Typography>            
                                            </Grid>
                                            <Grid item xs={8} md={6} >                        
                                                <Typography gutterBottom>{selectedRecord.firstName+" "+selectedRecord.lastName}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} >
                                            
                                            <Grid item xs={3} md={6}  >                                                               
                                                    <Typography gutterBottom sx={{fontWeight:'bold'}}>Ekyc Status:</Typography>                    
                                                </Grid>
                                                <Grid item xs={8} md={5} >                                                                     
                                                    <Typography gutterBottom>{selectedRecord.ekycStatus}</Typography>                        
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 
                                            <Grid item xs={3} md={6}  >                                                                                          
                                                    <Typography gutterBottom sx={{fontWeight:'bold'}}> Ekyc Token:</Typography>                            
                                            </Grid>
                                            <Grid item xs={8} md={5} >                                
                                                    <Typography gutterBottom>{selectedRecord.ekycToken}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            
                                            <Grid container spacing={2} > 
                                            <Grid item xs={3} md={6}  >                            
                                                    <Typography gutterBottom sx={{fontWeight:'bold'}}> Ekyc Date:</Typography>                            
                                            </Grid>
                                            <Grid item xs={8} md={5} >                        
                                                    <Typography gutterBottom>{selectedRecord.ekycDate[2]+"-"+selectedRecord.ekycDate[1]+"-"+selectedRecord.ekycDate[0]}</Typography>                        
                                            </Grid>
                                            </Grid>

                                            <Grid container spacing={2} > 
                                            <Grid item xs={3} md={6}  >                                                               
                           
                                                    <Typography gutterBottom sx={{fontWeight:'bold'}}> Phone Number:</Typography>                            
                                            </Grid>
                                            <Grid item xs={8} md={5} >                        
                                
                                                    <Typography gutterBottom>{selectedRecord.phonePhoneNumber}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 
                                            
                                            <Grid item xs={5} md={6} >                            
                                                    <Typography gutterBottom sx={{fontWeight:'bold'}}> Customer Type:</Typography>            
                                            </Grid>
                                            <Grid item xs={3} md={6} >                        
                                
                                                    <Typography gutterBottom>{selectedRecord.customerType}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} sx={{marginY:1}} > 
                                            
                                            <Grid item xs={12} >
                                                    <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Address Details</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 

                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>Street:</Grid>
                                            <Grid item xs={8} md={5}>
                                                    <Typography gutterBottom >{selectedRecord.streetAddres1}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 

                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>Locality</Grid>
                                            <Grid item xs={8} md={5}>
                                                    <Typography gutterBottom >{selectedRecord.streetAddres2}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 

                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>City:</Grid>
                                            <Grid item xs={8} md={5}>                     
                                                    <Typography gutterBottom >{selectedRecord.city}-{selectedRecord.postalCode}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 
                                            
                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>State:</Grid>                         
                                            <Grid item xs={8} md={5}>                                            
                                                    <Typography gutterBottom >{selectedRecord.stateProvince}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            {/* <Grid item xs={3} >Postal Code:</Grid>                            
                                            <Grid item xs={8} >                        
                                                <Typography gutterBottom >{selectedRecord.countryCode}</Typography>                        
                                            </Grid> */}
                                            <Grid container spacing={2} sx={{marginY:1}} > 

                                            <Grid item xs={12} >                  
                                                    <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Contact Details</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 

                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>Mobile Number:</Grid>                            
                                            <Grid item xs={8} md={5}>                        
                                                <Typography gutterBottom >{selectedRecord.phonePhoneNumber}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 

                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>Fax Number:</Grid>                            
                                            <Grid item xs={8} md={5} >                        
                                                <Typography gutterBottom >{selectedRecord.faxPhoneNumber}</Typography>                        
                                            </Grid>
                                            </Grid>
                                            <Grid container spacing={2} > 

                                            <Grid item xs={3} md={6} sx={{fontWeight:'bold'}}>Email:</Grid>                            
                                            <Grid item xs={8} md={5} >                        
                                                <Typography gutterBottom >{selectedRecord.email}</Typography>                        
                                            </Grid>
                                            </Grid>
                                             
                                            
                                            
                                            
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={5} sx={{paddingBottom:1, marginLeft:3,borderColor:'gray' }} >

                                            <Grid container spacing={2}
                                                direction="column"
                                                alignItems="center"
                                                justify="center">
                                                    {photo?
                                                    <Grid item xs={2} sx={{padding:1, border:1 , borderColor:'gray'}}>
                                                        <img  src={photo} width={200} height={250}></img>
                                                    </Grid>
                                                    :
                                                    <Grid item xs={2} sx={{ border:1 , borderColor:'gray'}}>
                                                    <img  src={defaultimg} width={200} height={220}></img>
                                                </Grid>
                                                    }
                                                    <Grid container spacing={2} sx={{borderTop:1,marginTop:1}}>
                                                    <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline', marginLeft:1}}>Agent Details</Typography>                        
                                                    </Grid>
                                            <Grid container spacing={2} y>                                                
                                                <Grid item xs={6}><strong>Agent Name:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.fristName+" "+selectedRecord.partner.lastName}
                                                </Grid>                                           
                                            </Grid>
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={6}><strong>Agent Type:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.type}
                                                </Grid>                                           
                                            </Grid>
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={6}><strong>Agent ID:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.parentId}
                                                </Grid>                                           
                                            </Grid>
                                            
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={6}><strong>Agent Address:</strong>
                                                </Grid>
                                                <Grid item xs={5}>
                                                {selectedRecord.partner.businessAddress}
                                                </Grid>                                           
                                            </Grid>
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={6}><strong>Contact Number:</strong>
                                                </Grid>
                                                <Grid item xs={5}>
                                                {selectedRecord.partner.contact}
                                                </Grid>                                           
                                            </Grid>
                                            </Grid> 

                                        </Grid>
                                        
                                        
                                        



                            



                                    </Grid>
                                </Paper>
                            </Grid>


                        </Grid>

                    </div>
                  
                </PDFExport>
                   
                  
                </>
)
}