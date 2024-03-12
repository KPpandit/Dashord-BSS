// import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
// export default function Product(props) {
//     const columns = [
//         { id: 'product_id', name: 'PRODUCT CATEGORY' },
//         { id: 'available', name: 'Available To' },
//         { id: 'type', name: 'TYPE' },
        
//     ];

//     // Generate sample data
//     const generateData = () => {
//         const data = [];
//         for (let i = 0; i < 100; i++) {
//             data.push({
//                 product_id: ` PRODUCT CATEGORY${i}`,
//                 available: `Available To ${i}`,
//                 type: `TYPE${i}`,
               

//             });
//         }
//         return data;
//     };

//     const [rows, rowchange] = useState(generateData());
//     const [page, pagechange] = useState(0);
//     const [rowperpage, rowperpagechange] = useState(5);

//     const handlechangepage = (event, newpage) => {
//         pagechange(newpage);
//     };

//     const handleRowsPerPage = (event) => {
//         rowperpagechange(+event.target.value);
//         pagechange(0);
//     };
//     const navigate = useNavigate();
//     const toCategory = () => {
//         navigate('/addCategory');
//     };
//     const [selectedRecord, setSelectedRecord] = useState(null);
//     const handleRowClick = (row) => {
//         setSelectedRecord(row);
//     };
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
//     const SelectedRecordDetails = () => {
//         if (selectedRecord) {
//             return (
//                 <Grid>
                   

                    

//                     <Paper sx={{ marginTop: 8 }}>
//                         <Grid sx={{ backgroundColor: '#1976d2' }}>
//                             <Typography sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2, color: 'white' }} style={{ fontFamily: 'Roboto', fontSize: '14', fontWeight: '400' }}> Lines</Typography>
//                         </Grid>
//                         <Divider light />
//                         <Box
//                             sx={{
//                                 marginTop: 1,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <Card sx={{ minWidth: 360 }}>
//                                 <CardContent sx={{ maxWidth: 360 }}>
//                                     {/* Display single record data in a horizontal table */}
//                                     <TableContainer>
//                                         <Table>
//                                             <TableHead>
//                                                 <TableRow>
//                                                     {selectedRecord && Object.keys(selectedRecord).map((key) => (
//                                                         <TableCell key={key}>{key}</TableCell>
//                                                     ))}
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 <TableRow>
//                                                     {selectedRecord && Object.values(selectedRecord).map((value, index) => (
//                                                         <TableCell key={index} onClick={handleClickOpen}>{value}</TableCell>
//                                                     ))}
//                                                 </TableRow>
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 </CardContent>
//                                 <CardActions>
//                                     {/* Additional actions if needed */}
//                                 </CardActions>
//                             </Card>
//                         </Box>
//                     </Paper>
//                     <Grid padding={2} sx={{ width: 360 }}>
//                     <Button variant="contained" style={{ marginRight: '10px', marginBottom: '10px' }}>{<EditIcon sx={{ paddingRight: 1 }} />}EDIT THIS ORDER</Button>
//                         <Button variant="contained" style={{ marginBottom: '10px' }}>{<DeleteIcon sx={{ paddingRight: 1 }} />}DELETE</Button>

                      
//                         <Button variant="contained" style={{ marginBottom: '10px' }}>{<DoneOutlineSharpIcon sx={{ paddingRight: 1 }} />}COPY PRODUCT</Button>
                        
//                     </Grid>
//                     <Grid sx={{ padding: 2 }}>

//                     </Grid>

//                     <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//               >
//                 <DialogTitle id="alert-dialog-title">
//                   {"Product Details"}
//                 </DialogTitle>
//                 <DialogContent>
//                   <DialogContentText id="alert-dialog-description">
//                     There are the Details of this Report
//                   </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleClose}>Disagree</Button>
//                   <Button onClick={handleClose} autoFocus>
//                     Agree
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//                 </Grid>
//             );
//         } else {
//             return <Card variant="outlined" sx={{ maxWidth: 360 }}>
//                 <Box sx={{ p: 2 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center">
//                         <Typography gutterBottom variant="h5" component="div">
//                             No Product Selected
//                         </Typography>
//                         <Typography gutterBottom variant="h6" component="div">

//                         </Typography>
//                     </Stack>
//                     <Divider light />
//                     <Typography sx={{ paddingTop: 1 }} color="text.secondary" variant="body2">
//                         Please select Agent to view
//                     </Typography>
//                 </Box>
//                 <Divider light />

//             </Card>;
//         }
//     };

//     const handleSerch = async (e) => {
//         e.preventDefault();
//         return await axios
//             .get(`http://172.5.10.2:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
//             .then((res) => {
//                 setdata(res.data);
//                 console.log(value + "----value sech datas")
//                 rowchange(res.data);
//                 setValue(value);
//             })
//     }
//     const [selectedOption, setSelectedOption] = useState('');
//     const [highlightedRow, setHighlightedRow] = useState(null);

//     const handleRowMouseEnter = (row) => {
//         setHighlightedRow(row);
//     };

//     const handleRowMouseLeave = () => {
//         setHighlightedRow(null);
//     };
//     return (
//         <Box sx={{ display: 'container' }}>
//             <Box sx={{ width: '70%', padding: '16px' }}>
//                 <Box component="main" sx={{ flexGrow: 1, width: '100%' }} >
//                     <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.1 }}>
//                         <form
//                             onSubmit={handleSerch}
//                         >

//                             <Grid lg={8} paddingBottom={1} >
//                                 <TextField
//                                     onClick={handleSerch}
//                                     label="Search"
//                                     type='text'
//                                     fullWidth
//                                     name='value'
//                                     // onChange={(e) => setValue(e.target.value)}
//                                     required
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position='end'>
//                                                 <IconButton
//                                                 // onSubmit={handleSerch}
//                                                 >
//                                                     <SearchIcon />
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />

//                             </Grid>
//                             {/* <Grid paddingBottom={1}>
//                             <Button type='submit' backgroundColor={'blue'} onSubmit={handleSerch} padding={2}> <SearchIcon /> Search</Button>
//                             </Grid> */}
//                         </form>
//                     </Grid>
//                     <Paper>
//                         <TableContainer sx={{ maxHeight: 600 }}>
//                             <Table stickyHeader size='medium' padding="normal">
//                                 <TableHead>
//                                     <TableRow>
//                                         {columns.map((column) => (
//                                             <TableCell style={{ backgroundColor: '#1976d2', color: 'white' }} key={column.id} sx={{ textAlign: 'center' }}><Typography fontFamily={'Sans-serif'}>{column.name}</Typography></TableCell>
//                                         ))}
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {rows &&
//                                         rows
//                                             .slice(page * rowperpage, page * rowperpage + rowperpage)
//                                             .map((row, i) => {
//                                                 return (
//                                                     <TableRow
//                                                         key={i}
//                                                         onClick={() => handleRowClick(row)}
//                                                         onMouseEnter={() => handleRowMouseEnter(row)}
//                                                         onMouseLeave={handleRowMouseLeave}
//                                                         sx={
//                                                             highlightedRow === row
//                                                                 ? { backgroundColor: 'lightblue' }
//                                                                 : {}
//                                                         }
//                                                     >
//                                                         {columns.map((column) => (
//                                                             <TableCell key={column.id} sx={{ textAlign: 'center' }}>
//                                                                 {row[column.id]}
//                                                             </TableCell>
//                                                         ))}
//                                                     </TableRow>
//                                                 );
//                                             })}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 25]}
//                             rowsPerPage={rowperpage}
//                             page={page}
//                             count={rows.length}
//                             component="div"
//                             onPageChange={handlechangepage}
//                             onRowsPerPageChange={handleRowsPerPage}
//                         />

//                     </Paper>

//                     <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
//                         <Button variant="contained" backgroundColor="#6471B5"
//                          onClick={toCategory}
//                         >
//                            ADD CATEGORY
//                         </Button>

//                         <Button variant="contained" backgroundColor="#6471B5"
//                             // onClick={handleButtonClick} 
//                             sx={{ marginLeft: '16px' }}>
//                            EDIT
//                         </Button>
//                     </Box>
//                 </Box>
//             </Box>
//             <Box sx={{ paddingLeft: 1, paddingTop: 2 }} >
//                 <SelectedRecordDetails />
//             </Box>


//         </Box>
//     )
// };


import { Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Link, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Popup from "../Components/PopUp";
import AddProduct from "./AddProduct";
import EditPopup from "../Components/EditPopup";
import UpdateProduct from "./UpdateProduct";

export default function Product() {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    // fro Add PopUp
    const [openPopup, setOpenPopup] = useState(false)

    const handleOpenConfirmDialog = (itemId) => {
        setItemToDelete(itemId);
        setConfirmDialogOpen(true);
      };
    
      const handleCloseConfirmDialog = () => {
        setItemToDelete(null);
        setConfirmDialogOpen(false);
      };
    
      const handleConfirmAction = (itemId) => {
        handleDelete(itemId);
        // Perform your delete action using the itemId
        console.log(`Deleting item with ID: ${itemId}`);
        // Call your delete function or API here
    
        // Close the dialog after handling the action
        handleCloseConfirmDialog();
      };

    

    // const id=data[0].id;
    // console.log(id+"id of user")
    const columns = [
    
       
        { id: 'pack_name', name: 'Pack Name' },
        { id: 'pack_type', name: 'Pack Type' },
        { id: 'call_balance', name: "Call's" },
        { id: 'sms_balance', name: 'SMS ' },
        { id: 'data_balance', name: 'Data' },
        // { id: 'data_balance', name: 'Data' },
        { id: 'category_name_list', name: 'Category ' },
        { id: 'rating_offer_list', name: 'Rates ' },
        

        { id: 'button', name: 'Action' }
    ]

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    useEffect(() => {
        fetch("http://172.5.10.2:9696/api/rating/profile/voucher/get/all").then(resp => {
            setdata(resp.data);
            
            return resp.json();
        }).then(resp => {
            rowchange(resp);
        }).catch(e => {
            console.log(e.message)
        })
        
    }, [openPopup,openEditPopup])

    function handleDelete(rating_profile_id) {
       
        
            axios.delete('http://172.5.10.2:9696/api/rating/profile/voucher/delete/' + rating_profile_id)
                .then(res => {
                    
                    console.log("hello");
                    // location.reload();
                })
        
    }


    const closePopup = () => {
        setOpenPopup(false);
        
    };
    const closeEditPopup = () => {
        setOpenEditPopup(false);
    };
    return (
        <Box sx={{ display: 'conatiner' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 1, paddingTop: "4%", width: '100%' }}>
            <Typography textAlign={'center'} component={'h3'} variant="h3" fontFamily={'bold'} padding={2}>Product</Typography>
                <Paper >
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader size='medium' padding="normal">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell style={{ backgroundColor: '#00B5FF', color: 'white' }} key={column.id} sx={{textAlign:'center'}}><Typography fontFamily={'Sans-serif'}>{column.name}</Typography></TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.slice(page * rowperpage, page * rowperpage + rowperpage)
                                    .map((row, i) => {
                                        
                                        return (
                                            <TableRow key={i}  >
                                                {columns && columns.map((column, i) => {
                                                    let value = row[column.id];
                                                    return (
                                                        <>
                                                            {column.id !== 'button' && (
                                                                <TableCell key={value} sx={{textAlign:'center'}}
                                                                onClick={()=>{
                                                
                                                                    const clikedCategoryId= row.rating_profile_id;
                                                                    console.log("Before setCategoryId:", categoryId);
                                                                    setCategoryId(clikedCategoryId)
                                                                    console.log("After setCategoryId:------", categoryId);
                                                                    console.log("Clicked Category ID:", clikedCategoryId);
                                                                    console.log(row.category_id+" are these values same "+categoryId)
                                                                    if(row.rating_profile_id===categoryId){
                                                                        console.log("if condition is working")
                                                                        setOpenEditPopup(true)
                                                                    }
                                                                    else{
                                                                        console.log("else is working")
                                                                        setOpenEditPopup(false)
                                                                    }
                                                                    
                                                                }}
                                                                >
                                                                    {String(value).replace(/\[|\]"/g, '').replace(/"/g, '')}
                                                                </TableCell>
                                                            )}
                                                            {column.id === 'button' && (
                                                                <TableCell sx={{textAlign:'center'}}>
                                                                    <Button  onClick={(e)=>{setOpenEditPopup(false);}} className="btn btn-sm btn-danger">
                                                                    <DeleteForeverIcon onClick={() => {
                                                                             handleOpenConfirmDialog(row.rating_profile_id)
                                                                             
                                                                        }} backgroundColor={"#8FE5FF"} />
                                                                    </Button>

                                                                    
                                                                </TableCell>
                                                            )}
                                                        </>
                                                    )
                                                })}
                                                <TableRow >
                                                    {/* <Button href={`/updateSuper/${row.msisdn}`} style={{ backgroundColor: 'white', color: 'green' }}>
                                                    Edit
                                                    {row.msisdn}
                                                </Button> */}
                                                </TableRow>
                                            </TableRow>

                                        )
                                    })

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        rowsPerPage={rowperpage}
                        page={page}
                        count={rows.length}
                        component="div"
                        onPageChange={handlechangepage}
                        onRowsPerPageChange={handleRowsPerPage}

                    >

                    </TablePagination>
                </Paper>
                <Fab color="primary" aria-label="add"
                sx={{ position: 'absolute', bottom: 15, right: 15 }} onClick={(e) => setOpenPopup(true)}>
                <AddIcon
                    style={{}} onClick={(e) => {
                        setOpenPopup(true);
                    }}
                />
            </Fab>
            <CustomConfirmDialog
                open={confirmDialogOpen}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmAction}
                itemId={itemToDelete}
            />
            <Popup
             title="CREATE RATING PLAN "
             openPopup={openPopup}
             setOpenPopup={setOpenPopup}
            >
                <AddProduct onClose={closePopup}/>
            </Popup>
            <EditPopup
            title="Edit Rating Plan"
                    openPopup={openEditPopup}
                    setOpenPopup={setOpenEditPopup}
                  
            >
                <UpdateProduct rating_profile_id={categoryId} onClose={closeEditPopup}/>
                {/* <UpdateCategory category_id={categoryId}/> */}
            </EditPopup>
            </Box>
        </Box>
    )
}
const CustomConfirmDialog = ({ open, onClose, onConfirm, itemId }) => {
    return (
      <Dialog open={open} onClose={onClose} keepMounted  aria-describedby="alert-dialog-slide-description">
        <DialogTitle sx={{backgroundColor:''}} >Are you sure ?</DialogTitle>
        <DialogContent>
          <Typography>You won't be able to revert this!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onConfirm(itemId)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };