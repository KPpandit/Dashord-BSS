import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import blanPhoto from '../../assets/blanPhoto.png'
import { TokenContext } from '../../TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Atom, FourSquare, LifeLine, Riple } from 'react-loading-indicators';
import Popup from '../Popup/Popup';
import PackDetails from './PackDetails.jsx/PackDeails';
import PlanDetails from './PlanDetails/PlanDetails';
import AddIcon from '@mui/icons-material/Add';
import InvoicePayment from './InvoicePayment/InvoicePayment';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
const Customer = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(TokenContext);
    console.log(token + "token value from Context API")
    const [value, setValue] = useState(""); // State for search input
    const columns = [
        { id: 'firstName', name: 'Name' },
        { id: 'serviceType', name: 'Service Type' },
        { id: 'customerType', name: 'Customer Type' },
        { id: 'simInventory.msisdn', name: 'MSISDN' },
        { id: 'ekycStatus', name: 'eKYC Status' },
        // { id: 'ekycToken', name: 'Ekyc Token' },
        { id: 'vip', name: 'VIP' },




        // { id: 'serviceStatus', name: 'Service Status' },
    ];
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((value, key) => {
            return value && value[key] !== 'undefined' ? value[key] : null;
        }, obj);
    };
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    // Generate sample data
    const [abc, setAbc] = useState(false)
    const [delete1, SetDelete] = useState([])

    const handleConfirmDelete = () => {

        console.log(`Deleting record with ID: ${recordIdToDelete}`);


        axios.delete(`https://bssproxy01.neotel.nr/crm/api/deletecustomer/${recordIdToDelete}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Handle success, you can update the UI or take other actions
                SetDelete(prevState => prevState === 'deleted' ? 'not-deleted' : 'deleted');
                fetchData();
                console.log(`Record with ID ${recordIdToDelete} deleted successfully.`);
                setAbc(true);

                // Fetch updated data after successful deletion

            })
            .catch(error => {
                // Handle error, you can display an error message or take other actions
                console.error(`Error deleting record with ID ${recordIdToDelete}:`, error);
                SetDelete(prevState => prevState === 'deleted' ? 'not-deleted' : 'deleted');
                setAbc(true);
            });

        // Close the confirmation dialog
        setConfirmationDialogOpen(false);
    };

    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState(null);
    const handleOpenConfirmationDialog = (id) => {
        setRecordIdToDelete(id);
        setConfirmationDialogOpen(true);
    };

    const handleCloseConfirmationDialog = () => {
        setRecordIdToDelete(null);
        setConfirmationDialogOpen(false);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/subscriber/newSubscriber');
    };
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    useEffect(() => {
       

        fetchData(); // Invoke the fetchData function when the component mounts
    }, [tokenValue, delete1,value]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://bssproxy01.neotel.nr/crm/api/all/customers', {
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
            setIsLoading(false);
        } catch (error) {


            // Handle error as needed
        }
    };
    

    const handleRowClick = (row) => {
        setSelectedRecord(row);

        fetchPhoto1(row);
    };
    const fetchPhoto1 = async (row) => {

        try {
            const photoResponse = await axios.get(`https://bssproxy01.neotel.nr/crm/api/image/${row.id}`, {
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
    const SelectedRecordDetails = () => {


        const formatDate = (dateStr) => {
            if (!dateStr || typeof dateStr !== "string") {
                return "N/A";
            }

            // Split the date string into components safely
            const parts = dateStr.split(" ");
            if (parts.length < 2) {
                return "Invalid date";
            }

            // Extract date components
            const dateComponents = parts[0].split("-");
            if (dateComponents.length !== 3) {
                return "Invalid date";
            }

            const year = parseInt(dateComponents[0], 10);
            const month = parseInt(dateComponents[1], 10) - 1; // JavaScript months are 0-based
            const day = parseInt(dateComponents[2], 10);

            // Validate date parts
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                return "Invalid date";
            }

            // Extract time components
            const timeComponents = parts[1].split(":");
            const hour = parseInt(timeComponents[0], 10) || 0;
            const minute = parseInt(timeComponents[1], 10) || 0;
            const second = parseInt(timeComponents[2], 10) || 0;

            // Create a new Date object with parsed components
            const date = new Date(year, month, day, hour, minute, second);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }

            // Format the date using toLocaleString with custom options
            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // Use 12-hour format
            };

            return date.toLocaleString("en-US", options);
        };

        const fileInputRef = useRef(null);

        // Function to trigger the file input when "Add Photo" is clicked





        console.log(selectedRecord)
        if (selectedRecord) {
            const handleAddPhoto = async (event) => {
                console.log('   handle add phto ')
                try {
                    const file = event.target.files[0];
                    if (!file) return;

                    // Create an object URL to preview the image
                    const imageUrl = URL.createObjectURL(file);
                    setSelectedPhoto(imageUrl);

                    // Create FormData to send the file via API
                    const fileInput = document.getElementById('upload-photo');


                    if (!file) {
                        toast.error('Please select a file before uploading.');
                        return;
                    }

                    // Step 2: Create FormData and append the file
                    const formData = new FormData();
                    formData.append('customerImage', file);

                    // API call to save the photo
                    const response = await axios.put(
                        `https://bssproxy01.neotel.nr/crm/api/update_image/${selectedRecord.id}`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenValue}`,  // Ensure tokenValue is correct
                                "Accept": "application/json",
                                "Content-Type": "multipart/form-data",  // For file uploads
                            },
                        }
                    );


                    toast.success('Photo uploaded successfully!', { autoClose: 2000 });

                } catch (error) {
                    console.error('Error saving photo:', error);
                    if (error.response) {
                        console.log('Response data:', error.response.data);
                        console.log('Response status:', error.response.status);
                    }
                }
            };
            console.log(selectedRecord.originalPhotoUrl, '  photo url')
            return (
                <Grid>
                    <Paper elevation={10}>


                        <Grid xs={12}>
                            <Card variant="outlined" sx={{ maxWidth: 400, fontFamily: "Roboto" }}>

                                <Box sx={{ p: 1 }}>

                                    <Grid sx={{ padding: 1, backgroundColor: '#253A7D' }}>
                                        <Stack direction="row"
                                            sx={{ borderRadius: '30%', }}
                                            justifyContent="space-between" alignItems="center">
                                            <Typography
                                                style={{
                                                    fontSize: '17px',

                                                    color: 'white',
                                                    marginBottom: '2px',

                                                    // Add this line for circular border
                                                    backgroundColor: '#253A7D',  // Add this line for background color
                                                    padding: '2px',  // Add this line for padding
                                                    display: 'inline-block',

                                                }}
                                                gutterBottom component="div">
                                                {selectedRecord.firstName}
                                            </Typography>

                                        </Stack>
                                    </Grid>

                                </Box>
                                <Grid container>
                                    <Grid item xs={12} paddingLeft={1}>

                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={7.3} >
                                                    <Grid container spacing={1.5} >
                                                       
                                                        <Grid item xs={3.6} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Name :
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            {selectedRecord.firstName} {selectedRecord.lastName}
                                                        </Grid>

                                                        <Grid item xs={4.1} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Gender :
                                                        </Grid>
                                                        <Grid item xs={7}>
                                                            <Typography sx={{ textAlign: 'left' }}>
                                                                {selectedRecord.gender}
                                                            </Typography>

                                                        </Grid>
                                                        {selectedRecord.customerType === "Post-Paid" || selectedRecord.customerType === "postpaid" ? <></> : <></>}
                                                        <Grid item xs={4.7} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Agent ID :
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ textAlign: 'left' }}>
                                                            <Typography sx={{ textAlign: 'left' }}>
                                                                {selectedRecord
                                                                    && selectedRecord.partner &&
                                                                    selectedRecord.partner.id ? String(selectedRecord.partner.id) : "Not Available"}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={3.6} sx={{ fontWeight: '480', fontSize: '17px', textAlign: 'right' }}>
                                                            Email :
                                                        </Grid>
                                                        <Grid item xs={8} sx={{ textAlign: 'left' }}>
                                                            <Typography sx={{ textAlign: 'left' }} gutterBottom >
                                                                {selectedRecord.email}
                                                            </Typography>
                                                        </Grid>
                                                        <Divider light />

                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={4} sx={{ paddingRight: 1 }}>
                                                    {selectedPhoto ? (
                                                        <img
                                                            src={selectedPhoto}
                                                            alt="Selected"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '200px',
                                                                paddingBottom: '0px',
                                                                border: '5px solid grey',
                                                                borderRadius: '15px',
                                                                transition: 'transform 0.2s',
                                                            }}
                                                            className="zoom"
                                                        />
                                                    ) : (
                                                        <div style={{ position: 'relative' }}>
                                                            <img
                                                                src={blanPhoto}
                                                                alt="Blank"
                                                                style={{
                                                                    maxWidth: '100%',
                                                                    maxHeight: '250px',
                                                                    paddingBottom: '0px',
                                                                    border: '5px solid grey',
                                                                    borderRadius: '15px',
                                                                    transition: 'transform 0.2s',
                                                                }}
                                                                className="zoom"
                                                            />
                                                            <AddIcon
                                                                onClick={() => document.getElementById('fileInput').click()} // Trigger the file input when plus icon is clicked
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '80px', // Slightly from the top
                                                                    right: '3px', // Align to the right end side
                                                                    fontSize: 40,
                                                                    color: '#007bff', // Icon color
                                                                    cursor: 'pointer',
                                                                    // border: '2px solid grey',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'white',
                                                                    padding: '10px',
                                                                }}
                                                            />
                                                            {/* Hidden file input to select photo */}
                                                            <input
                                                                type="file"
                                                                id="fileInput"
                                                                style={{ display: 'none' }} // Hidden input
                                                                accept="image/*"
                                                                onChange={handleAddPhoto} // Call the function when file is selected
                                                            />
                                                        </div>
                                                    )}

                                                    <style>{`
                                                        .zoom:hover {
                                                        transform: scale(1.5); /* (100% zoom) */
                                                        }
                                                    `}</style>
                                                </Grid>





                                            </Grid>

                                        </Grid>



                                        <Divider light />

                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        Electric Meter ID :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} alignItems={'left'} >
                                                    <Typography
                                                        sx={{ fontSize: '17px', textAlign: 'left' }}
                                                        gutterBottom variant="body2"
                                                    >
                                                        {/* {new Date(selectedRecord.createDateTime).toISOString().split('T')[0]} */}
                                                        {/* {selectedRecord.createDateTime} */}
                                                        {selectedRecord.electricityMeterId}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Divider light />
                                        {(selectedRecord.payment === null || selectedRecord.payment === "") ?
                                            <Box sx={{ p: 1 }}>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                            eKYC Token :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} alignItems={'left'}>
                                                        <Typography
                                                            sx={{ fontSize: '17px', textAlign: 'left' }}
                                                            gutterBottom variant="body2">
                                                            {selectedRecord.ekycToken}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} alignItems={'right'}>
                                                        <Button variant="contained"
                                                            sx={{ backgroundColor: '#253A7D' }}
                                                            onClick={() => {
                                                                navigate('/subscriber/productPayment', { state: { record: selectedRecord } })
                                                            }}
                                                        >
                                                            Product Payment
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            : null}

                                        <Divider light />
                                       
                                        {selectedRecord.customerType === "Post-Paid" || selectedRecord.customerType === "postpaid" ?
                                            <>
                                                <Divider light />

                                                <Box sx={{ p: 1 }}>

                                                    <Grid container>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                                Service Status :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} alignItems={'left'} >
                                                            <Typography
                                                                sx={{ fontSize: '17px', textAlign: 'left' }}
                                                                gutterBottom variant="body2">
                                                                {selectedRecord.serviceStatus}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </>

                                            : <></>}


                                        <Divider light />
                                       

                                        {selectedRecord.customerType === "Post-Paid" || selectedRecord.customerType === "postpaid" ?
                                            <>
                                                <Divider light />

                                                <Box sx={{ p: 1 }}>

                                                    <Grid container>
                                                        <Grid item xs={8}>
                                                            <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                                Current Month Amount :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} alignItems={'left'} >
                                                            <Typography
                                                                sx={{ fontSize: '17px', textAlign: 'left' }}
                                                                gutterBottom variant="body2">
                                                               {selectedRecord.currentMonthlyAmount ? selectedRecord.currentMonthlyAmount : 'N/A'}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </>

                                            : <></>}
                                        <Divider light />
                                        <Box sx={{ p: 1 }}>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography sx={{ fontWeight: '500', fontSize: '17px', textAlign: 'left' }}>
                                                        eKYC Date :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8} alignItems={'left'} sx={{ marginLeft: -2 }}>
                                                    <Typography
                                                        sx={{ fontSize: '17px' }}
                                                        gutterBottom variant="body2">
                                                        {formatDate(selectedRecord.ekycDate)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Divider light />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} padding={1}>

                                    <Grid item sx={6}>
                                        <Button variant="contained"
                                            sx={{ backgroundColor: '#253A7D' }}
                                            onClick={() => {
                                                navigate('/subscriber/editSubscriber', { state: { id: selectedRecord.id, type: selectedRecord.customerType } })
                                            }}
                                        >Edit</Button>
                                    </Grid>
                                    <Grid item sx={6}>
                                        <Button
                                            onClick={() => {
                                                handleOpenConfirmationDialog(selectedRecord.id)

                                            }}
                                            sx={{ backgroundColor: '#253A7D' }}
                                            variant="contained">Delete</Button>
                                    </Grid>
                                    {console.log(selectedRecord.customerType + "account type")}
                                    {["post-paid", "postpaid"].includes(selectedRecord?.customerType?.toLowerCase()) && (
                                        <>
                                            <Grid item sx={6}>
                                                <Button
                                                    onClick={() => {
                                                        navigate('/custInvoice', {
                                                            state: {
                                                                id: selectedRecord?.simInventory?.msisdn || 'N/A', // Fallback if msisdn is undefined
                                                                type: selectedRecord?.customerType || 'N/A' // Fallback if customerType is undefined
                                                            }
                                                        });
                                                    }}
                                                    sx={{ backgroundColor: '#253A7D' }}
                                                    variant="contained"
                                                >
                                                    Invoice
                                                </Button>
                                            </Grid>
                                            <Grid item sx={6}>
                                                <Button
                                                    onClick={() => setOpenPopup2(true)}
                                                    sx={{ backgroundColor: '#253A7D' }}
                                                    variant="contained"
                                                >
                                                    Pay Invoice
                                                </Button>
                                            </Grid>
                                            <Grid item sx={6}>
                                                <Button
                                                    onClick={() => {
                                                        setOpenPopup1(true);
                                                        console.log(selectedRecord);
                                                    }}
                                                    sx={{ backgroundColor: '#253A7D' }}
                                                    variant="contained"
                                                >
                                                    Show Plan Details
                                                </Button>
                                            </Grid>
                                        </>
                                    )}
                                    {["pre-paid", "prepaid"].includes(selectedRecord?.customerType?.toLowerCase()) && (
                                        <Grid item sx={6}>
                                            <Button
                                                onClick={() => {
                                                    setOpenPopup(true);
                                                    console.log(selectedRecord?.id || 'No ID'); // Fallback if id is undefined
                                                }}
                                                sx={{ backgroundColor: '#253A7D' }}
                                                variant="contained"
                                            >
                                                Show Pack Details
                                            </Button>
                                        </Grid>
                                    )}
                                    {selectedRecord.isParent > 0 && (
                                        <Grid item sx={6}>
                                            <Button
                                                onClick={() => {
                                                    navigate('/showFamily', {
                                                        state: {
                                                            record: selectedRecord, // Send the entire selectedRecord
                                                        }
                                                    });
                                                }}
                                                sx={{ backgroundColor: '#253A7D' }}
                                                variant="contained"
                                            >
                                                Show Family
                                            </Button>
                                        </Grid>
                                    )}
                                    {
                                    /* {selectedRecord.isParent === 0 &&
                                        selectedRecord.useParentPricing === false && */}
                                    {(selectedRecord.customerType === 'postpaid' && selectedRecord.parentId == 0) && (
                                        <Grid item sx={6}>
                                            <Button
                                                onClick={() => {
                                                    navigate('/subscriber/createChild', {
                                                        state: {
                                                            record: selectedRecord, // Send the entire selectedRecord
                                                        },
                                                    });
                                                }}
                                                sx={{ backgroundColor: '#253A7D' }}
                                                variant="contained"
                                            >
                                                Create Child
                                            </Button>
                                        </Grid>
                                    )}


                                </Grid>
                            </Card>
                        </Grid>

                    </Paper>
                    <Grid>

                    </Grid>
                    <Popup
                        title="Pack Details "
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <PackDetails selectedRecordId={selectedRecord} />
                    </Popup>
                    <Popup
                        title="Pay Invoice"
                        openPopup={openPopup2}
                        setOpenPopup={setOpenPopup2}
                    >
                        <InvoicePayment selectedRecordId={selectedRecord} />
                    </Popup>
                    <Popup
                        title="Plan Details "
                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                    >
                        <PlanDetails selectedRecordId={selectedRecord} />
                    </Popup>
                </Grid>
            )
        } else {
            return
            <></>
        }
    };
  
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log("From the handle search");

        if (value === "") {
            // If search field is empty, fetch all customer data
            await fetchData();
            setPage(0);  // Reset to first page
        } else {
            try {
                const res = await axios.get(`https://bssproxy01.neotel.nr/crm/api/search/customers?keyword=${value}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                setRows(res.data);

                setPage(0);  // Reset pagination to the first page
                rowchange(res.data);
                // Scroll to the top
                document.querySelector(".MuiTableContainer-root").scrollTop = 0;
            } catch (error) {
                console.error("Error in search:", error);
            }
        }
    };


    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row)
        console.log("from hnadle row mouse enter");
    };
    const capitalizeFirstLetterOfEachWord = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };


    return (
        <Box >
            {isLoading ? (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '60vh' }}

                >
                    {/* <Riple color="#32cd32" size="medium" text="" textColor="" /> */}
                    <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
                </Grid>

            ) :
                <Box sx={{ display: 'container', marginTop: -1 }}>
                    <Box sx={{ width: '70%' }}>
                        <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                            <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                                <Grid>
                                    <Typography
                                        style={{

                                            fontSize: '20px',
                                            paddingLeft: 10,
                                            fontWeight: 'bold',

                                        }}
                                    >Subscribers</Typography>
                                </Grid>
                            </Paper>
                        </Box>
                        <ToastContainer position="bottom-left" />
                        <Grid lg={6} sx={{ textAlign: 'right', marginY: -0.5 }}>
                            <form onSubmit={handleSearch}>
                                <Paper elevation={10} sx={{ marginBottom: 2 }}>
                                    <Grid lg={8}>
                                        <TextField
                                            label="Search"
                                            type='text'
                                            fullWidth
                                            name='value'
                                            value={value} // Controlled input
                                            onChange={(e) => setValue(e.target.value)} // Update value state
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton type="submit">
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Paper>
                            </form>
                        </Grid>
                        <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                            <Paper elevation={10}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    {rows && rows.length > 0 ? (
                                        <Table stickyHeader size="medium" padding="normal">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            style={{ backgroundColor: '#253A7D', color: 'white' }}
                                                            sx={{ textAlign: 'left' }}
                                                        >
                                                            <Typography>{column.name}</Typography>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows
                                                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                    .map((row, i) => (
                                                        <TableRow
                                                            key={i}
                                                            onClick={() => handleRowClick(row)}
                                                            onMouseEnter={() => handleRowMouseEnter(row)}
                                                            sx={{
                                                                backgroundColor:
                                                                    highlightedRow === row ? '#F6B625' : 'inherit', // Highlight logic
                                                            }}
                                                        >
                                                            {columns.map((column) => (
                                                                <TableCell
                                                                    key={column.id}
                                                                    sx={{ textAlign: 'left', fontSize: '17px' }}
                                                                >
                                                                    {column.id === 'firstName' ? (
                                                                        <>
                                                                            {capitalizeFirstLetterOfEachWord(String(row.firstName || ''))}{' '}
                                                                            {capitalizeFirstLetterOfEachWord(String(row.lastName || ''))}
                                                                        </>
                                                                    ) : column.id === 'simInventory.msisdn' ? (
                                                                        getNestedValue(row, column.id)
                                                                    ) : column.id === 'ekycStatus' ? (
                                                                        row[column.id] === '' || row[column.id] === null
                                                                            ? 'N/A'
                                                                            : capitalizeFirstLetterOfEachWord(String(row[column.id]))
                                                                    ) : column.id === 'customerType' ? (
                                                                        row[column.id] === '' || row[column.id] === null
                                                                            ? 'N/A'
                                                                            : capitalizeFirstLetterOfEachWord(String(row[column.id]))
                                                                    ) : (
                                                                        capitalizeFirstLetterOfEachWord(String(row[column.id]))
                                                                    )}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        // Message when no rows exist
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '50px',
                                                fontSize: '18px',
                                                color: '#253A7D',
                                                fontWeight: 'bold',
                                            }}
                                            onClick={() => handleRowClick(row)}
                                        >
                                            No records exist
                                        </Box>
                                    )}
                                </TableContainer>
                                {rows && rows.length > 0 && (
                                    <TablePagination
                                        sx={{ color: '#253A7D' }}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        rowsPerPage={rowperpage}
                                        page={page}
                                        count={rows.length}
                                        component="div"
                                        onPageChange={handlechangepage}
                                        onRowsPerPageChange={handleRowsPerPage}
                                    />
                                )}
                            </Paper>
                        </Box>


                        <Box sx={{
                            paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px',

                        }}>
                            <Button
                                sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                                variant="contained" backgroundColor="#253A7D" onClick={handleButtonClick}>
                                Add New
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ paddingLeft: 3, paddingTop: 1.5 }} >
                        <SelectedRecordDetails />
                    </Box>

                    <Dialog
                        open={confirmationDialogOpen}
                        onClose={handleCloseConfirmationDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this record?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
                            <Button onClick={handleConfirmDelete} autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            }

        </Box>
    )
};

export default Customer;
