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

export default function TopPostPaidCallUsageReport(props) {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        { id: 'firstName', name: 'Name' },
        { id: 'ekycStatus', name: 'Ekyc Status' },
        { id: 'ekycToken', name: 'Ekyc Token' },
        { id: 'msisdn', name: 'MSISDN' },
        { id: 'ekycDate', name: 'Ekyc Date' },
        { id: 'phonePhoneNumber', name: 'Phone No' },
        { id: 'totalCallused', name: 'Call Consumed' },
        { id: 'days_data_used', name: 'Days' },
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
                const response = await axios.get('http://172.5.10.2:9098/customer/call/usage', {
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
    }, [tokenValue, selectedPhoto]);


    const handleClickOpen = (row) => {
        setSelectedRecord(row)
        // setOpen(true);
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
                sessionStorage.setItem('selectedPhoto', imageUrl)
            } else {
                console.error('Failed to fetch photo details.');
                sessionStorage.removeItem('selectedPhoto')
            }
        } catch (error) {
            setSelectedPhoto(null);
            console.log('Failed to load the Photo', error);
            sessionStorage.removeItem('selectedPhoto')

        }
        navigate('/individualReport', { state: { selectedRecord: row } })

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

    const [highlightedRow, setHighlightedRow] = useState(null);

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row)
    };

    function DownloadPDF() {
        const capture = document.getElementById('container');
        html2canvas(capture).then((canvas) => {
            const imgdata = canvas.toDataURL('img/png')
            const doc = new jsPDF('p', 'pt', 'a4');
            const pageHeight = doc.internal.pageSize.height;
            const pageWidth = doc.internal.pageSize.width;
            doc.addImage(imgdata, 'PNG', 0.5, 0.5, pageWidth, pageHeight);
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

    const [selectedOption, setSelectedOption] = useState(null);
    const handleDownload = () => {
        if (selectedOption === 'pdf') {
            const pdf = new jsPDF();
            // Set column headers
            const headers = Object.keys(rows[0]);
            // Add data to PDF
            pdf.autoTable({
                head: [headers],
                body: rows.map(row => Object.values(row)),
            });
            // Save the PDF
            pdf.save(`${"newpdfway"}.pdf`);
        } else if (selectedOption === 'csv') {
            const headers = Object.keys(rows[0]);
            const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n' +
                rows.map(row => Object.values(row).join(',')).join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "example123.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(csvContent + "-----cvs content")
        } else if (selectedOption === 'xls') {
            // Handle XLS download logic
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const xlsURL = URL.createObjectURL(excelData);
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
        const apiUrl = `http://172.5.10.2:9098/customer/call/usage/bydate/range?search=${serach}&startDate=${startdate}&endDate=${enddate}`;

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
                            >Top Post-Paid Customers Call Usage Report</Typography>
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


