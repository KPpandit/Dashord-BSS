import { Box, Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { FourSquare } from 'react-loading-indicators';

const ActiveCustomerReport = (props) => {
    const [isLoading, setIsLoading] = useState(true);
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
                const response = await axios.get('http://localhost:9098/customer/status/Active', {
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
                sessionStorage.setItem('selectedPhoto',imageUrl)
            } else {
                console.error('Failed to fetch photo details.');
                sessionStorage.removeItem('selectedPhoto')
            }
        } catch (error) {
            setSelectedPhoto(null);
            console.log('Failed to load the Photo', error);
                sessionStorage.removeItem('selectedPhoto')

        }
        navigate('/individualReport',{state:{selectedRecord:row}})

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
            doc.addImage(imgdata,'PNG',0.5,0.5,pageWidth,pageHeight);
            doc.save('customerProfile.pdf')
        })

        // let pdf = new jsPDF('p','pt','a4');
        // let capture = document.getElementById('container')
        // pdf.html(capture,{
        //     callback:(pdf=>{
        //         pdf.save('customer.pdf')
        //     })
        // })
        
    }
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    
    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };
 
    const handleDownload = () => {
        if (!selectedOption) {
            setNotify({
                isOpen: true,
                message: 'Please select the file format.',
                type: 'error'
            });
            return;
        }
        const mainFieldsData = rows.map(row => ({
            id: row.id,
            msisdn: row.m,
            autoPaymentType: row.autoPaymentType,
            dueDateUnitId: row.dueDateUnitId,
            dueDateValue: row.dueDateValue,
            dfFm: row.dfFm,
            parentId: row.parentId,
            isParent: row.isParent,
            excludeAging: row.excludeAging,
            invoiceChild: row.invoiceChild,
            optlock: row.optlock,
            dynamicBalance: row.dynamicBalance,
            creditLimit: row.creditLimit,
            autoRecharge: row.autoRecharge,
            useParentPricing: row.useParentPricing,
            nextInvoiceDayOfPeriod: row.nextInvoiceDayOfPeriod,
            nextInoviceDate: row.nextInoviceDate,
            invoiceDesign: row.invoiceDesign,
            creditNotificationLimit1: row.creditNotificationLimit1,
            creditNotificationLimit2: row.creditNotificationLimit2,
            rechargeThreshold: row.rechargeThreshold,
            monthlyLimit: row.monthlyLimit,
            currentMonthlyAmount: row.currentMonthlyAmount,
            currentMonth: row.currentMonth,
            organizationName: row.organizationName,
            streetAddres1: row.streetAddres1,
            streetAddres2: row.streetAddres2,
            city: row.city,
            stateProvince: row.stateProvince,
            postalCode: row.postalCode,
            countryCode: row.countryCode,
            lastName: row.lastName,
            firstName: row.firstName,
            personInitial: row.personInitial,
            personTitle: row.personTitle,
            phoneCountryCode: row.phoneCountryCode,
            phoneAreaCode: row.phoneAreaCode,
            phonePhoneNumber: row.phonePhoneNumber,
            faxCountryCode: row.faxCountryCode,
            faxAreaCode: row.faxAreaCode,
            faxPhoneNumber: row.faxPhoneNumber,
            email: row.email,
            createDateTime: row.createDateTime,
            deleted: row.deleted,
            notificationInclude: row.notificationInclude,
            paymentStatus: row.paymentStatus,
            customerType: row.customerType,
            gender: row.gender,
            ekycStatus: row.ekycStatus,
            ekycToken: row.ekycToken,
            ekycId: row.ekycId,
            idDocId: row.idDocId,
            userType: row.userType,
            residentType: row.residentType,
            originalPhotoUrl: row.originalPhotoUrl,
            maidenName: row.maidenName,
            nationality: row.nationality,
            remark: row.remark,
            ekycDate: row.ekycDate,
            alternateNumber: row.alternateNumber,
            landlineNumber: row.landlineNumber,
            dateOfBirth: row.dateOfBirth,

            profession: row.profession,
            maritalStatus: row.maritalStatus,

        }));
        if (selectedOption === 'pdf') {
            const doc = new jsPDF();
            const table = [];
            // Convert mainFieldsData to a format compatible with autoTable
            mainFieldsData.forEach(row => {
                const rowData = Object.values(row);
                table.push(rowData);
            });
            doc.autoTable({
                head: [Object.keys(mainFieldsData[0])],
                body: table,
            });
            doc.save('customerData.pdf');
            // Save the PDF
            pdf.save(`${"newpdfway"}.pdf`);
        } else if (selectedOption === 'csv') {
            // Adding headers to the CSV content
            const csvContent = "data:text/csv;charset=utf-8," + Object.keys(mainFieldsData[0]).join(',') + '\n';
            // Adding rows to the CSV content
            const csvRows = mainFieldsData.map(row => Object.values(row).join(',')).join('\n');
            const encodedUri = encodeURI(csvContent + csvRows);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "customerData.csv");
            document.body.appendChild(link);
            link.click();
            window.open(xlsURL);
        }
        else if (selectedOption === null) {
            setNotify({
                isOpen: true,
                message: 'Please Select The file Format ',
                type: 'error'
            })
            setTimeout(() => { }, 1000)

        }
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
                <FourSquare color="#FAC22E" size="medium" text="Load..." textColor="#253A7D" />
            </Grid>

        ) :
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
                            >Active Customer List</Typography>
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
                                        .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                            (row.ekycStatus=='Active')?
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

                                                                {row[column.id]}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                    :null

                                                );
                                            })}
                                </TableBody>
                            </Table>
                        </TableContainer>
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

                    </Paper>
                </Box>
                <Grid container paddingTop={2}>
                    <Grid item xs={1.2}>
                        <Button variant="contained" sx={{backgroundColor:'#253A7D',boxShadow:24}} onClick={handleDownload}>Download</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl fullWidth>
                            <Select sx={{ boxShadow:24,width: 100, height: 20, paddingY: 2.3, textAlign: 'bottom' }}

                                onChange={(e) => setSelectedOption(e.target.value)}
                                required
                            >

                                <MenuItem value="pdf">PDF</MenuItem>
                                <MenuItem value="csv">CSV</MenuItem>
                                <MenuItem value="xls">Excel</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            
        
      
       
          




        </Box>
         }

         </Box>
    )
};

export default ActiveCustomerReport;
