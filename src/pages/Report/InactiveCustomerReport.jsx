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

const InactiveCustomerReport = (props) => {
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
                const response = await axios.get('http://172.17.1.20:9098/customer/status/inActive', {
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
    }, [tokenValue]);

   
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
            const photoResponse = await axios.get(`http://172.17.1.20:9090/api/image/${row.id}`, {
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
            .get(`http://172.17.1.20:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
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
                            >Inactive Customer List</Typography>
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
                                                            (row.ekycStatus=='InActive')?
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
                                                    :null

                                                );
                                            })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        

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
    )
};

export default InactiveCustomerReport;
