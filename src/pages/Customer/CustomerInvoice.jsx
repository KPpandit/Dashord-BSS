import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import billingDefault from '../../assets/billingDefault.png';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import axios from "axios";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { saveAs } from 'file-saver';
import { Box, Button, CardContent, CircularProgress, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Logo from '../../assets/Logo.png'
import White_logo from '../../assets/White_logo.jpg'
import { TokenContext } from '../../TokenContext';
export default function CustomerInvoice() {
    const location = useLocation();
    const { state } = location;
    const { image } = useContext(TokenContext);
    console.log(image)
    const id = state?.id;
    const tokenValue = localStorage.getItem('token');

    const [dataUsage, setDataUsage] = useState([]);
    const [callUsage, setCallUsage] = useState([]);
    const [smsUsage, setSmsUsage] = useState([]);
    const [rows, setRows] = useState([]);

    console.log(id + "   this is mSISDN")
    const pdfContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://bssproxy01.neotel.nr/mis-reports/bill/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                setRows(response.data);
                setDataUsage(response.data.dataUsageDetails);
                setCallUsage(response.data.callUsageDetails);
                setSmsUsage(response.data.smsUsageDetails);
                console.log(response.data.callUsageDetails.call_start_time + " Call Usage Details")
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access');
                    // Handle unauthorized access as needed, e.g., redirect to login page
                } else {
                    console.error('Error fetching data from API:', error);
                }
            }
        };

        fetchData();
    }, [id, tokenValue]);
    console.log(rows.data)

    const downloadPDF = async () => {
        const pdfBlob = await pdfContainerRef.current.save();
        // Assuming you have the saveAs function available, otherwise, you can use another method to handle the PDF download
        saveAs(pdfBlob, 'document.pdf');
    };
    const getTotalCharges = () => {
        // Calculate the total sum of 'charges'
        return dataUsage.reduce((total, row) => total + row.charges, 0);
    };


    const columns = [
        { id: 'date', label: 'Date', minWidth: 170 },
        { id: 'service_name', label: 'Service Name', minWidth: 100 },
        { id: 'data_in_bytes', label: 'Data (Bytes)', minWidth: 100 },
        { id: 'charges', label: 'Charges', minWidth: 100 },
    ];
    const columns1 = [
        { id: 'called_number', label: 'Called Number', minWidth: 100 },
        { id: 'call_start_time', label: 'Start Time', minWidth: 170 },
        { id: 'call_end_time', label: 'End Time', minWidth: 170 },


        { id: 'call_duration', label: 'Duration (sec.)', minWidth: 100 },
        { id: 'charges', label: 'Charges', minWidth: 100 },
    ];
    const columns2 = [
        { id: 'send_sms_time', label: 'SMS Time', minWidth: 100 },
        { id: 'recipient_number', label: 'Recipitent Number', minWidth: 170 },
        { id: 'no_of_msgs', label: 'No of sms', minWidth: 170 },
        { id: 'charges', label: 'Charges', minWidth: 100 },

    ];
    console.log(callUsage + "data int call variable")
    const getTotalDataInBytes = () => {
        // Calculate the total sum of 'data_in_bytes'
        return dataUsage.reduce((total, row) => total + row.data_in_bytes, 0);
    };
    const getTotalCalls = () => {
        // Calculate the total sum of 'data_in_bytes'
        return callUsage.reduce((total, row) => total + row.call_duration, 0);
    };
    const getTotalCallCharges = () => {
        // Calculate the total sum of 'data_in_bytes'
        return callUsage.reduce((total, row) => total + row.charges, 0);
    };
    const getTotalSMS = () => {
        // Calculate the total sum of 'data_in_bytes'
        return smsUsage.reduce((total, row) => total + row.no_of_msgs, 0);
    };
    const getTotalSMSCharges = () => {
        // Calculate the total sum of 'data_in_bytes'
        return smsUsage.reduce((total, row) => total + row.charges, 0);
    };
    console.log(image + " image")
    return (
        <Box >
            {rows ? <form  >

                <PDFExport ref={pdfContainerRef} paperSize={"A4"} fileName='billing_invoice'>
                    <> {/* Adjust the padding as needed */}
                        <Box
                            sx={{

                                display: 'flex',
                                flexDirection: 'column',

                            }}
                        >

                            <Grid>

                                <Divider />
                                <Grid
                                    container
                                    spacing={2} // Adjust the spacing between items as needed
                                    paddingBottom={2} // Padding for the entire container


                                >

                                    <Grid item xs={12} md={12} paddingBottom={2} sx={{ display: 'flex', alignItems: 'center', width: '24px' }}>
                                        <Grid container spacing={1} >
                                            <Grid item xs={1} md={4} textAlign={'left'} sx={{ marginLeft: 2 }}>
                                                {
                                                    image ? (<img src={URL.createObjectURL(image)}
                                                        alt={White_logo} style={{ maxWidth: '100%', maxHeight: 130, padding: 1 }} />)
                                                        :
                                                        (<img src={Logo} alt='Default Logo'
                                                            style={{ maxWidth: '100%', maxHeight: 130 }} />)


                                                }

                                            </Grid>


                                            {/* Text */}
                                            <Grid item xs={8.5} md={3.5}>
                                                <Typography sx={{ paddingTop: 1, fontFamily: 'Roboto', fontWeight: 'Bold', fontSize: '18px', color: '#1E3C81' }}></Typography>



                                            </Grid>
                                            <Grid item xs={2.5} md={4} sx={{ padding: 1, marginTop: 3, textAlign: 'left' }}  >
                                                <Grid container spacing={1} sx={{ boxShadow: 1, backgroundColor: '#FFC34A', borderRadius: '5px' }} padding={1}>
                                                    <Grid item xs={6} md={6} textAlign={'left'}>
                                                        <Typography sx={{ fontSize: '8px' }}>Amount Payable :</Typography>

                                                    </Grid>
                                                    <Grid item xs={6} md={6} textAlign={'right'}>
                                                        <Typography sx={{ fontSize: '8px', fontWeight: 'bold' }}>AUD $ 232.56</Typography>


                                                    </Grid>


                                                </Grid>
                                                <Grid container spacing={1} sx={{ boxShadow: 1, backgroundColor: '#FFC34A', marginTop: 0.4, borderRadius: '5px' }} padding={1} >
                                                    <Grid item xs={6} textAlign={'left'}>
                                                        <Typography sx={{ fontSize: '8px' }}>Due date : </Typography>

                                                    </Grid>
                                                    <Grid item xs={6} textAlign={'right'}>
                                                        <Typography sx={{ fontSize: '8px', fontWeight: 'bold' }}>1 March 2024</Typography>


                                                    </Grid>


                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: -2.5 }}>{/* For information No and Bill cycle */}
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} paddingBottom={2}>
                                                <>
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item lg={6} md={4} >
                                                                <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }} color="Black" gutterBottom>
                                                                    {rows.personTitle} {rows.firstName} {rows.lastName}
                                                                    {/* {rows.personTitle} */}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '10px' }}>
                                                                    {rows.streetAddres1}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '10px' }}>
                                                                    {rows.streetAddres2}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '10px' }}>
                                                                    {rows.city}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '10px' }}>
                                                                    {rows.postalCode}{rows.stateProvience}
                                                                </Typography>

                                                            </Grid>


                                                            <Grid item lg={6} md={4} sx={{ paddingLeft: 2 }}>
                                                                <Grid container  >
                                                                    <Grid item xs={4} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                                                                            Mobile  No :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={8} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>
                                                                            {id}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={4} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            Account No :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={8} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            148535524
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={4} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            No of Connections :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            1
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={4} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>
                                                                            Your Plan :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={8} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>
                                                                            {rows.pack_name}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={4} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            Credit Limit :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={8} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            {String(rows.creditLimit)}
                                                                        </Typography>
                                                                    </Grid>



                                                                </Grid>

                                                            </Grid>


                                                            <Grid item lg={6} md={4} sx={{ paddingLeft: 2 }}>
                                                                <Grid container  >
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                                                                            Bill Cycle :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>
                                                                            {rows.to_date}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            Invoice Date :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            {rows.to_date}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            Bill Period :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            {rows.from_date} to {rows.to_date}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            Invoice No :
                                                                        </Typography>

                                                                    </Grid>
                                                                    <Grid item xs={6} textAlign={'left'}>
                                                                        <Typography sx={{ fontSize: '10px' }}>
                                                                            {rows.invoiceNumber}
                                                                        </Typography>
                                                                    </Grid>
                                                                    {/* <Grid item xs={6} textAlign={'left'}>
                                                        <Typography sx={{ fontSize: '10px' }}>
                                                            Description of Service :
                                                        </Typography>

                                                    </Grid>
                                                    <Grid item xs={6} textAlign={'left'}>
                                                        <Typography sx={{ fontSize: '10px' }}>
                                                            Telecommunications
                                                        </Typography>
                                                    </Grid> */}



                                                                </Grid>

                                                            </Grid>

                                                        </Grid>



                                                    </CardContent>

                                                </>
                                            </Grid>


                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} >
                                        <Grid container spacing={1} paddingLeft={3} >
                                            <Grid item xs={6} md={8} sx={{ boxShadow: 1, borderRadius: '10px', backgroundColor: '#BDC3D8' }}>

                                                <Grid container spacing={2}  >
                                                    <Grid item xs={3} md={3} textAlign={'left'}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '9px' }}>Previous Balance</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>AUD $ 196.34</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={3} md={3} textAlign={'left'}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '9px' }}>Previous Payments</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>AUD $ 175.00</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={3} md={3} textAlign={'left'}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '9px' }}>Adjustment</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>AUD $ 196.34</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={3} md={3} textAlign={'keft'}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '9px' }}>Period Charges</Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>AUD $ 211.22</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={6} md={3.5} sx={{ marginX: 1, boxShadow: 1, borderRadius: '10px', backgroundColor: '#FFC34A', }}>

                                                <Grid container spacing={2}>
                                                    <Grid item xs={6} textAlign={'left'} >
                                                        <Grid container spacing={2.8}>
                                                            <Grid item xs={12} >
                                                                <Typography sx={{ fontSize: '9px' }}>Amount Due
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} >
                                                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>AUD $ 232.56</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6} textAlign={'left'}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography sx={{ fontSize: '9px' }}>Total payable after 30/02/2024
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold' }}>AUD $ 232.56</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>


                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>


                                    <Grid item xs={6} md={12} margin={2}>
                                        <TableContainer >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}

                                                        ><strong> Charge Summary</strong></TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '11px' }}><strong>Amount (AUD  $)</strong></TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '10px' }}>One Time Charges</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.0</TableCell>

                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Monthly Charges</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>299.0</TableCell>

                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Usage Charges</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>30.00</TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}> -- Call Charges</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>6.0</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}> -- Conference Call</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}> -- Mobile Internet</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}> -- National Roaming</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}> -- International Roamin</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}> -- Value Added Services</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Discount</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>150.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Other Credit / Charges</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Miscellaneous Charges</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>0.00</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Taxable Value</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>179.0</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontSize: '11px' }}>Tax</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontSize: '10px' }}>32.22</TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '11px' }}>Charges For this bill Period</TableCell>
                                                        <TableCell sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '11px' }}>211.22</TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell sx={{ fontSize: '11px' }}>(Two Hundred Eleven Dollar and Twenty Two cents)</TableCell>
                                                        <Typography></Typography>
                                                    </TableRow>
                                                    {/* Add more rows as needed */}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>

                                    <div id='custom'>
                                        {/* Your Usage Details */}
                                        <Grid item xs={12} md={12}>
                                            <>
                                                <Grid container spacing={1} padding={1}>
                                                    <Grid item xs={12} md={12} padding={4} marginLeft={4}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: 'Bold', color: '#253A7D' }}>Your Usage Details</Typography>

                                                    </Grid>
                                                    <Grid item xs={12} md={12} marginLeft={4}>
                                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>  {rows.personTitle} {rows.firstName} {rows.lastName}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                    {/* Billing Details */}
                                                    <Grid item xs={12} md={12}>
                                                        <Grid container spacing={1} paddingTop={0.5}>
                                                            <Grid item xs={3} md={3}>
                                                                <Grid container spacing={0.5} paddingLeft={4}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Typography sx={{ fontSize: '9px', fontWeight: 'Bold' }}>Bill Period</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px' }}>{rows.from_date} to {rows.to_date}</Typography>
                                                                    </Grid>

                                                                </Grid>

                                                            </Grid>

                                                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                            <Grid item xs={2} md={2}>
                                                                <Grid container spacing={0.5}>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px', fontWeight: 'Bold' }}>Neotel No</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px' }}>{rows.msisdn}</Typography>
                                                                    </Grid>

                                                                </Grid>


                                                            </Grid>
                                                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                            <Grid item xs={3}>
                                                                <Grid container spacing={0.5}>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px', fontWeight: 'Bold' }}>Pulse Rate</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px' }}> 60 Seconds </Typography>
                                                                    </Grid>

                                                                </Grid>


                                                            </Grid>
                                                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                            <Grid item xs={3}>
                                                                <Grid container spacing={0.5}>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px', fontWeight: 'Bold' }}>Dynamic Credit Limit</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography sx={{ fontSize: '9px' }}>AUD $ 1300</Typography>
                                                                    </Grid>

                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider />

                                                    </Grid>
                                                    <Grid item xs={12} md={12} sx={{ marginLeft: 4, marginTop: 14 }}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Your Postpaid Plan</Typography>

                                                    </Grid>
                                                    <Grid item xs={12} md={12} sx={{ marginLeft: 4 }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={2} md={3}>
                                                                <TableContainer >
                                                                    <Table>
                                                                        <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                            <TableRow>
                                                                                <TableCell sx={{ color: 'black', fontSize: '9px' }}>{rows.pack_name}</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>

                                                                            <TableRow >
                                                                                <TableCell ><Typography sx={{ fontSize: '9px', fontWeight: 'Bold', paddingBottom: 1.5 }}>With this plan, you get : </Typography>
                                                                                    <Typography sx={{ fontSize: '9px' }}> {rows.pack_offered_data && `Offered Data: ${rows.pack_offered_data}, `}
                                                                                        {rows.pack_offered_sms && `Offered SMS: ${rows.pack_offered_sms}, `}
                                                                                        {rows.pack_offered_calls && `Offered Calls: ${rows.pack_offered_calls}`}</Typography>
                                                                                </TableCell>


                                                                            </TableRow>

                                                                            {/* Add more rows as needed */}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Grid>
                                                            <Grid item xs={6} md={9}>
                                                                <TableContainer >
                                                                    <Table>
                                                                        <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px', color: 'black' }}>Call Rates</TableCell>
                                                                                <TableCell sx={{ fontSize: '9px', padding: 2, color: 'black' }}>Local (AUD $/min.sec)</TableCell>
                                                                                <TableCell sx={{ fontSize: '9px', padding: 2, color: 'black' }}>STD (AUD $/min:sec)</TableCell>


                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>

                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    Incoming
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    1
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    1
                                                                                </TableCell>


                                                                            </TableRow>
                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    Outgoing
                                                                                </TableCell>
                                                                                <TableCell >

                                                                                </TableCell>
                                                                                <TableCell >

                                                                                </TableCell>


                                                                            </TableRow>
                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    To Neo Mobile
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    0
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    0
                                                                                </TableCell>


                                                                            </TableRow>
                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    To Other Mobile
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    0
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    0
                                                                                </TableCell>


                                                                            </TableRow>
                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    To landline
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    0
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    0
                                                                                </TableCell>


                                                                            </TableRow>
                                                                            <TableRow >
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    Video Calls
                                                                                </TableCell>
                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                    3                                                                        </TableCell>
                                                                                <TableCell >
                                                                                    -
                                                                                </TableCell>


                                                                            </TableRow>

                                                                            {/* Add more rows as needed */}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Grid>
                                                            <Grid item xs={3} md={12}>
                                                                <Grid container spacing={1}>
                                                                    <Grid item xs={6} md={6}>
                                                                        <TableContainer >
                                                                            <Table>
                                                                                <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                                    <TableRow >
                                                                                        <TableCell sx={{ fontSize: '10px', color: 'black' }}>SMS Rates</TableCell>
                                                                                        <TableCell sx={{ fontSize: '10px', color: 'black' }}>AUD $/SMS</TableCell>



                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>

                                                                                    <TableRow >
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            Outgoing
                                                                                        </TableCell>
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            Free
                                                                                        </TableCell>


                                                                                    </TableRow>
                                                                                    <TableRow >
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            Local
                                                                                        </TableCell>
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            0.25
                                                                                        </TableCell>



                                                                                    </TableRow>
                                                                                    <TableRow >
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            STD
                                                                                        </TableCell>
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            0.25
                                                                                        </TableCell>

                                                                                    </TableRow>
                                                                                    <TableRow >
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            International
                                                                                        </TableCell>
                                                                                        <TableCell sx={{ fontSize: '9px' }}>
                                                                                            5
                                                                                        </TableCell>

                                                                                    </TableRow>


                                                                                    {/* Add more rows as needed */}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={6}>
                                                                        <Grid container spacing={1}>

                                                                            <Grid item xs={12}>
                                                                                <TableContainer >
                                                                                    <Table>
                                                                                        <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                                            <TableRow >
                                                                                                <TableCell sx={{ fontSize: '10px', color: 'black' }}>Mobile Internet Rates</TableCell>
                                                                                                <TableCell sx={{ fontSize: '10px', color: 'black' }}>AUD $/10KB</TableCell>



                                                                                            </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>

                                                                                            <TableRow >
                                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                                    Browsing without pack(4G/5G)
                                                                                                </TableCell>
                                                                                                <TableCell sx={{ fontSize: '9px' }}>
                                                                                                    0.0048/0.0048
                                                                                                </TableCell>


                                                                                            </TableRow>


                                                                                            {/* Add more rows as needed */}
                                                                                        </TableBody>
                                                                                    </Table>
                                                                                </TableContainer>
                                                                            </Grid>

                                                                        </Grid>

                                                                    </Grid>

                                                                </Grid>

                                                            </Grid>


                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                            </>

                                        </Grid>
                                        {/* Itemised Data Details */}
                                        <Grid item xs={12} paddingLeft={4} paddingTop={10}>

                                            <Grid container spacing={1} padding={1}>

                                                <Grid item xs={12} md={12} >
                                                    <Typography sx={{ fontSize: '14px', fontWeight: 'Bold', color: '#253A7D' }}>
                                                        Itemised Data</Typography>

                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>  {rows.personTitle} {rows.firstName} {rows.lastName}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1} paddingTop={0.5}>
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '10px', fontWeight: 'Bold' }}>Bill Period</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '10px' }}>{rows.from_date} to {rows.to_date}</Typography>
                                                                </Grid>

                                                            </Grid>

                                                        </Grid>

                                                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '10px', fontWeight: 'Bold' }}>Neotel No</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '10px' }}> {rows.msisdn}</Typography>
                                                                </Grid>

                                                            </Grid>


                                                        </Grid>
                                                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '10px', fontWeight: 'Bold' }}>Pulse Rate</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '10px' }}> 60 Seconds </Typography>
                                                                </Grid>

                                                            </Grid>


                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <Divider />

                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }}>Mobile Internet Charges</Typography>

                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography sx={{ fontSize: '11px', fontWeight: 'bold' }}>Mobile Internet (Usage in KB)
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Box>
                                                                        {/* Your existing content */}
                                                                        <TableContainer >
                                                                            <Table>
                                                                                <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                                    <TableRow>
                                                                                        {columns.map((column) => (
                                                                                            <TableCell key={column.id} sx={{ fontSize: '11px' }}>{column.label}</TableCell>
                                                                                        ))}
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {dataUsage.map((row) => (
                                                                                        <TableRow key={row.date}>
                                                                                            {columns.map((column) => (
                                                                                                <TableCell key={column.id} sx={{ fontSize: '9px' }}>{row[column.id]}</TableCell>
                                                                                            ))}
                                                                                        </TableRow>

                                                                                    ))}
                                                                                    <TableRow>
                                                                                        <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Total</TableCell>
                                                                                        <TableCell></TableCell>
                                                                                        <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>{getTotalDataInBytes()}</TableCell>
                                                                                        <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>{getTotalCharges()}</TableCell>
                                                                                    </TableRow>
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>




                                            </Grid>

                                        </Grid>
                                        {/* Itomised Call Details */}
                                        <Grid item xs={12} md={12} paddingLeft={4} paddingTop={12}>

                                            <Grid container spacing={1} padding={1}>

                                                <Grid item xs={12} md={12}>
                                                    <Typography sx={{ fontSize: '14px', fontWeight: 'Bold', color: '#253A7D' }}>
                                                        Itemised Voice Calls</Typography>

                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}> {rows.personTitle} {rows.firstName} {rows.lastName}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1} paddingTop={0.5}>
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px', fontWeight: 'Bold' }}>Bill Period</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px' }}>{rows.from_date} to {rows.to_date}</Typography>
                                                                </Grid>

                                                            </Grid>

                                                        </Grid>

                                                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px', fontWeight: 'Bold' }}>Neotel No</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px' }}>{rows.msisdn}</Typography>
                                                                </Grid>

                                                            </Grid>


                                                        </Grid>
                                                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px', fontWeight: 'Bold' }}>Pulse Rate</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px' }}> 60 Seconds </Typography>
                                                                </Grid>

                                                            </Grid>


                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <Divider />

                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Mobile Voice Charges</Typography>

                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Mobile Voice (Usage in sec.)
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <TableContainer >
                                                                        <Table>
                                                                            <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                                <TableRow>
                                                                                    {columns1.map((column) => (
                                                                                        <TableCell key={column.id} sx={{ fontSize: '11px' }}>{column.label}</TableCell>
                                                                                    ))}
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {callUsage.map((row) => (
                                                                                    <TableRow key={row.date}>
                                                                                        {columns1.map((column) => (
                                                                                            <TableCell key={column.id} sx={{ fontSize: '9px' }}>{row[column.id]}</TableCell>
                                                                                        ))}
                                                                                    </TableRow>

                                                                                ))}
                                                                                <TableRow>
                                                                                    <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Total</TableCell>
                                                                                    <TableCell></TableCell>
                                                                                    <TableCell></TableCell>
                                                                                    <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>{getTotalCalls()}</TableCell>
                                                                                    <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>{getTotalCallCharges()}</TableCell>
                                                                                </TableRow>
                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>




                                            </Grid>

                                        </Grid>
                                        {/* SMS Details */}
                                        <Grid item xs={12} md={12} paddingLeft={4} paddingTop={12}>

                                            <Grid container spacing={1} padding={1}>

                                                <Grid item xs={12} md={12} padding={4} >
                                                    <Typography sx={{ fontSize: '14px', fontWeight: 'Bold', color: '#253A7D' }}>
                                                        Itemised SMS</Typography>

                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}> {rows.personTitle} {rows.firstName} {rows.lastName}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1} paddingTop={0.5}>
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px', fontWeight: 'Bold' }}>Bill Period</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px' }}>{rows.from_date} to {rows.to_date}</Typography>
                                                                </Grid>

                                                            </Grid>

                                                        </Grid>

                                                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px', fontWeight: 'Bold' }}>Neotel No</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px' }}>{rows.msisdn}</Typography>
                                                                </Grid>

                                                            </Grid>


                                                        </Grid>
                                                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#BDC3D8' }} />
                                                        <Grid item xs={3} md={3}>
                                                            <Grid container spacing={0.5}>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px', fontWeight: 'Bold' }}>Pulse Rate</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography sx={{ fontSize: '11px' }}> 60 Seconds </Typography>
                                                                </Grid>

                                                            </Grid>


                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <Divider />

                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Mobile SMS Charges</Typography>

                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Mobile SMS
                                                            </Typography>

                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12} md={12}>
                                                                    <TableContainer >
                                                                        <Table>
                                                                            <TableHead sx={{ backgroundColor: '#FFC34A' }}>
                                                                                <TableRow>
                                                                                    {columns2.map((column) => (
                                                                                        <TableCell key={column.id} sx={{ fontSize: '11px' }}>{column.label}</TableCell>
                                                                                    ))}
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {smsUsage.map((row) => (
                                                                                    <TableRow key={row.date}>
                                                                                        {columns2.map((column) => (
                                                                                            <TableCell key={column.id} sx={{ fontSize: '9px' }}>{row[column.id]}</TableCell>
                                                                                        ))}
                                                                                    </TableRow>

                                                                                ))}
                                                                                <TableRow>
                                                                                    <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Total</TableCell>
                                                                                    <TableCell></TableCell>

                                                                                    <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>{getTotalSMS()}</TableCell>
                                                                                    <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>{getTotalSMSCharges()}</TableCell>
                                                                                </TableRow>
                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>




                                            </Grid>

                                        </Grid>
                                    </div>




                                </Grid>






                            </Grid>

                        </Box>




                    </>
                </PDFExport>
                <Grid padding={1} paddingTop={5} lg={4} md={4} sm={6} xs={12} sx={{ textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                    <Button type="button" style={{ backgroundColor: '#253A7D', color: 'white' }} onClick={downloadPDF} sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}>
                        Download PDF
                    </Button>
                </Grid>
                {/* <Notification
    notify={notify}
    setNotify={setNotify}

/> */}
            </form> : <Grid>
                <CircularProgress />
            </Grid>}




        </Box>
    )
}