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

const PrepaidCustomerReport = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        { id: 'firstName', name: 'Name' },
        { id: 'ekycStatus', name: 'Ekyc Status' },
        { id: 'ekycToken', name: 'Ekyc Token' },
        { id: 'ekycDate', name: 'Ekyc Date' },
        { id: 'phonePhoneNumber', name: 'Phone No' },
        { id: 'email', name: 'Email' },
        { id: 'customerType', name: 'Customer Type' },

    ];
    const [rows, setRows] = useState([]);
    const tokenValue = localStorage.getItem('token');
    const [filteredRows, setFilteredRows] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [open, setOpen] = React.useState(false);
    // Generate sample data

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://172.5.10.2:9098/customer/prepaid';
                if (searchKeyword.trim() !== '') {
                    url += `?keyword=${searchKeyword}`;
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                setRows(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };

        fetchData();
    }, [tokenValue, openDialog]);


    const handleClickOpen = (row) => {
        setSelectedRecord(row)
        // setOpen(true);

    };
   
    const handleRowClick = (row) => {
        setSelectedRecord(row);
        setOpenDialog(true);
        
    };
   


    const handleSerch = async (e) => {
        console.log("from serch")
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

    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row)
    };



    const [selectedOption, setSelectedOption] = useState(null);
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
            msisdn: row.msisdn,
            firstName: row.firstName,
            lastName: row.lastName,
            streetAddres1: row.streetAddres1,
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
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [serach, setSearch] = useState('');
    const handleDateRange = () => {

        const type = 'pre-paid';

        // Construct the API URL
        const apiUrl = `http://localhost:9098/customer/prepaid/search?search=${serach}&startDate=${startdate}&endDate=${enddate}`;

        // Make the API call
        fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                console.log('API response:', data);
                // setdata(data);
                console.log(data + "----value sech datas")
                // rowchange(data);
                setRows(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    };
    console.log("value of roes ", rows)
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
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
                            >Pre-Paid Customer List</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Grid lg={4} >
                    <form
                        onSubmit={handleSerch}
                    >

                        <Paper elevation={10} sx={{ marginBottom: 2, paddingBottom: 0.1, paddingTop: 0.5 }}>
                            <Grid container spacing={2} padding={1}>
                                <Grid item xs={3}>
                                    {/* First date field */}
                                    <TextField
                                        label="Search"
                                        type="text"
                                        fullWidth

                                        onChange={(e) => setSearch(e.target.value)}
                                        value={serach}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    {/* First date field */}
                                    <TextField
                                        label="Start Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        value={startdate}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    {/* Second date field */}
                                    <TextField
                                        label="End Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={enddate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    {/* Search button */}
                                    <Button
                                        variant="contained"

                                        // onClick={handleSearch}
                                        fullWidth
                                        style={{ height: '100%', backgroundColor: '#F6B625', color: 'black' }}
                                        onClick={handleDateRange}
                                    >
                                        Apply
                                    </Button>
                                </Grid>
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
                                                    (row.customerType == 'prepaid') || (row.customerType == 'Pre-Paid') ?
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
                                                        : null

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
                        <Button variant="contained" sx={{ backgroundColor: '#253A7D', boxShadow: 24 }} onClick={handleDownload}>Download</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl fullWidth>
                            <Select sx={{ boxShadow: 24, width: 100, height: 20, paddingY: 2.3, textAlign: 'bottom' }}

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

export default PrepaidCustomerReport;
