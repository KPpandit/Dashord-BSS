import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Customer = (props) => {
    const columns = [
        { id: 'firstName', name: 'Name' },
        { id: 'ekycStatus', name: 'Ekyc Status' },
        { id: 'ekycToken', name: 'Ekyc Token' },
        { id: 'ekycDate', name: 'Ekyc Date' },
        { id: 'phonePhoneNumber', name: 'Phone No' },
        // { id: 'ekycStatus', name: 'Ekyc Status' },
        { id: 'customerType', name: 'Customer Type' },

    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [open, setOpen] = React.useState(false);
    // Generate sample data
    
  const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // console.log("record==>",selectedRecord)
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.5.10.2:9090/api/customers', {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                // Assuming your API response is an array of objects similar to the data structure in your generateData function
                const apiData = response.data;

                // Update the state with the API data
                setRows(apiData);
            } catch (error) {

                if (error.response && error.response.status === 401) {
                    // console.log("From inside if condition");
                    // localStorage.removeItem('token');
                    // navigate("/");
                }

                console.error('Error fetching data from API:', error);
                // Handle error as needed
            }
        };

        fetchData(); // Invoke the fetchData function when the component mounts
    }, [tokenValue,openDialog]);

   
    const handleClickOpen = (row) => {
        setSelectedRecord(row)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
    
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const handleOpenConfirmationDialog = (id) => {
        setRecordIdToDelete(id);
        setConfirmationDialogOpen(true);
    };

  
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/newCustomer');
    };

    const handleRowClick = (row) => {
        setSelectedRecord(row);
        setOpenDialog(true);
        fetchPhoto1(row)
      };
    const fetchPhoto1 = async (row) => {

        try {
            const photoResponse = await axios.get(`http://172.5.10.2:9090/api/image/${row.id}`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
            });

            if (photoResponse.status === 200) {
                const imageBlob = new Blob([photoResponse.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setSelectedPhoto(imageUrl);
            } else {
                console.error('Failed to fetch photo details.');
            }
        } catch (error) {
            setSelectedPhoto(null);
            console.log('Failed to load the Photo', error);
        }
    };
   

    const handleSerch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`http://172.5.10.2:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
            .then((res) => {
                setdata(res.data);
                console.log(value + "----value sech datas")
                rowchange(res.data);
                setValue(value);
            })
    }
    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row)
    };

    function DownloadPDF(){
        const capture = document.getElementById('container');
        html2canvas(capture).then((canvas)=>{
            const imgdata = canvas.toDataURL('img/png')
            const doc = new jsPDF('p','pt','a4');
            const pageHeight= doc.internal.pageSize.height;
            const pageWidth= doc.internal.pageSize.width;
            doc.addImage(imgdata,'PNG', 10, 10, 190, 0);
            doc.save('customerProfile.pdf')
        })
        // pdf.addImage(imageData, 'PNG', 10, 10, 190, 0);
        // let pdf = new jsPDF('p','pt','a4');
        // let capture = document.getElementById('container')
        // pdf.html(capture,{
        //     callback:(pdf=>{
        //         pdf.save('customer.pdf')
        //     })
        // })
        
    }

    // const handleRowMouseLeave = () => {
    //     setHighlightedRow(null);
    // };
    return (
        <Box sx={{ display: 'container', marginTop: -2.5 }}>

            <Box sx={{ width: '100%', }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',

                                }}
                            >All Customer Report</Typography>
                        </Grid>
                    </Paper>
                </Box>

                <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.5 }}>
                    <form
                        onSubmit={handleSerch}
                    >

                        <Paper elevation={10} sx={{ marginBottom: 2 }}>
                            <Grid lg={8} >
                                <TextField
                                    onClick={handleSerch}
                                    label="Search"
                                    type='text'
                                    fullWidth
                                    name='value'
                                    // onChange={(e) => setValue(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                // onSubmit={handleSerch}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                            </Grid>
                        </Paper>
                        {/* <Grid paddingBottom={1}>
                            <Button type='submit' backgroundColor={'blue'} onSubmit={handleSerch} padding={2}> <SearchIcon /> Search</Button>
                            </Grid> */}
                    </form>
                </Grid>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                    <Paper elevation={10}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size='medium' padding="normal">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} sx={{ textAlign: 'left' }}><Typography >{column.name}</Typography></TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows &&
                                        rows

                                            .map((row, i) => {
                                                return (
                                                    <TableRow
                                                        key={i}
                                                        onClick={() => {
                                                            handleRowClick(row)
                                                            handleClickOpen(row)
                                                        }}
                                                        onMouseEnter={() => handleRowMouseEnter(row)}
                                                        //   onMouseLeave={handleRowMouseLeave}
                                                        sx={
                                                            highlightedRow === row
                                                                ? { backgroundColor: '#F6B625' }
                                                                : {}
                                                        }
                                                    >
                                                        {columns.map((column) => (


                                                            <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>

                                                                {column.id === 'ekycDate' ? (
                                                                    // Render this content if the condition is true
                                                                    <>{
                                                                        // new Date(row[column.id]).toISOString().split('T')[0]

                                                                    }</>
                                                                ) : (
                                                                    // Render this content if the condition is false
                                                                    <>{row[column.id]}</>
                                                                )}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                );
                                            })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        

                    </Paper>
                </Box>
            </Box>

            
        <Dialog  open={openDialog} onClose={handleCloseDialog} fullScreen
        >
          <DialogTitle sx={{backgroundColor:'#253A7D', color:'#FEFEFE'}}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                {selectedRecord && selectedRecord.firstName}
                </Grid>
                <Grid item xs={2}>
                <Button style={{backgroundColor:'#F6B625',color:'black'}} onClick={DownloadPDF}>Download PDF</Button>
                <Button style={{backgroundColor:'#F6B625',color:'black'}} sx={{marginX:1}} onClick={handleCloseDialog}>Back</Button>

                </Grid>
                
            </Grid>
          </DialogTitle>
          <DialogContent sx={{marginY:1}}>
            <DialogContentText>


              {selectedRecord && (
                <div id='container'>
                    <div style={{marginTop:30,marginLeft:20,marginRight:20,padding:1}}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <   >

                                <Grid container sx={{padding:1, backgroundColor:'#253A7D', color:'#FEFEFE'}}>

                                <Grid xs={12}>
                                <h4>{selectedRecord.firstName+" "+selectedRecord.lastName}</h4>           
                                    
                                </Grid>



                                </Grid>

                                    <Grid container spacing={2} sx={{margin:1}}>

                                        

                                        <Grid item xs={7} sx={{borderRight: 1,padding:1,borderColor:'gray'}}>

                                        <Grid container spacing={2} >

                                        <Grid item xs={12} >                        
                                                
                                                <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Personal Details</Typography>                        
                                        </Grid>

                                        <Grid item xs={3}  >                            
                                            <Typography gutterBottom sx={{fontWeight:'bold'}}>Name:</Typography>            
                                        </Grid>
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom>{selectedRecord.firstName+" "+selectedRecord.lastName}</Typography>                        
                                        </Grid>
                                        
                                        <Grid item xs={3}  >                                    
                                            <Typography gutterBottom sx={{fontWeight:'bold'}}>Ekyc Status:</Typography>                    
                                        </Grid>
                                        <Grid item xs={8} >                                              
                                            <Typography gutterBottom>{selectedRecord.ekycStatus}</Typography>                        
                                        </Grid>

                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Ekyc Token:</Typography>                            
                                        </Grid>
                                        <Grid item xs={8} >                        
                            
                                                <Typography gutterBottom>{selectedRecord.ekycToken}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Ekyc Date:</Typography>                            
                                        </Grid>
                                        <Grid item xs={8} >                        
                            
                                                <Typography gutterBottom>{selectedRecord.ekycDate}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Phone Number:</Typography>                            
                                        </Grid>
                                        <Grid item xs={8} >                        
                            
                                                <Typography gutterBottom>{selectedRecord.phonePhoneNumber}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3}  >                            
                                                <Typography gutterBottom sx={{fontWeight:'bold'}}> Customer Type:</Typography>            
                                        </Grid>
                                        <Grid item xs={8} >                        
                            
                                                <Typography gutterBottom>{selectedRecord.customerType}</Typography>                        
                                        </Grid>
                                        <Grid item xs={12} >                        
                            
                                                <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Address Details</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Street:</Grid>
                                        <Grid item xs={8}>
                                                <Typography gutterBottom >{selectedRecord.streetAddres1}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Locality</Grid>
                                        <Grid item xs={8}>
                                                <Typography gutterBottom >{selectedRecord.streetAddres2}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>City:</Grid>
                                        <Grid item xs={8}>                     
                                                <Typography gutterBottom >{selectedRecord.city}-{selectedRecord.postalCode}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>State:</Grid>                         
                                        <Grid item xs={8}>                                            
                                                <Typography gutterBottom >{selectedRecord.stateProvince}</Typography>                        
                                        </Grid>
                                        {/* <Grid item xs={3} >Postal Code:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.countryCode}</Typography>                        
                                        </Grid> */}
                                        <Grid item xs={12} >                  
                                                <Typography gutterBottom sx={{fontWeight:'bold',textDecoration:'underline'}}>Contact Details</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Mobile Number:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.phonePhoneNumber}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Fax Number:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.faxPhoneNumber}</Typography>                        
                                        </Grid>
                                        <Grid item xs={3} sx={{fontWeight:'bold'}}>Email:</Grid>                            
                                        <Grid item xs={8} >                        
                                            <Typography gutterBottom >{selectedRecord.email}</Typography>                        
                                        </Grid>
                                        </Grid>

                                        </Grid>

                                        <Grid item xs={4} sx={{paddingBottom:1, marginLeft:5,borderColor:'gray' }} >

                                            <Grid container spacing={0}
                                                direction="column"
                                                alignItems="center"
                                                justify="center">
                                                    {selectedPhoto?
                                                    <Grid item xs={2} sx={{padding:1, border:1 , borderColor:'grey'}}>
                                                        <img  src={selectedPhoto} width={200} height={250}></img>
                                                    </Grid>
                                                    :null
                                                    }
                                                    <Grid container spacing={2} sx={{borderTop:1,marginTop:1}}>
                                                        <Grid item xs={12} sx={{padding:1,}}><h4>Agent Details:</h4></Grid>
                                                    </Grid>
                                            <Grid container spacing={2} y>                                                
                                                <Grid item xs={5}><strong>Agent Name:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.fristName+" "+selectedRecord.partner.lastName}
                                                </Grid>                                           
                                            </Grid>
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={5}><strong>Agent Type:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.type}
                                                </Grid>                                           
                                            </Grid>
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={5}><strong>Agent ID:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.parentId}
                                                </Grid>                                           
                                            </Grid>
                                            
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={5}><strong>Agent Address:</strong>
                                                </Grid>
                                                <Grid item xs={6}>
                                                {selectedRecord.partner.businessAddress}
                                                </Grid>                                           
                                            </Grid>
                                            <Grid container spacing={2}>                                                
                                                <Grid item xs={5
                                                }><strong>Contact Number:</strong>
                                                </Grid>
                                                <Grid item xs={2}>
                                                {selectedRecord.partner.contact}
                                                </Grid>                                           
                                            </Grid>
                                            </Grid> 

                                            



                                            
                                                                              
                                        </Grid>
                                        
                                        
                                        



                            



                                    </Grid>
                                </>
                            </Grid>


                        </Grid>

                    </div>
                  
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions> */}
        </Dialog>
      
       
          




        </Box>
    )
};

export default Customer;
