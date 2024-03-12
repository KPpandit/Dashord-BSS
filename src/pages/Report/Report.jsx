import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
<<<<<<< HEAD
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export default function Report(props) {
  const columns = [
    { id: 'report_type', name: 'REPORT TYPE' },
    
  ];
  const [value, setValue] = React.useState('customer');
  const [rows, rowchange] = useState([]);

  let data=[]
  let [count,setcount]= useState(0)

  // Generate sample data
  

  useEffect(() => {

    const generateData = () => {
      if(value=== 'customer'){
           count++
        console.log("Customer loop")
         data = [
          {report_type:"All Customer Report"},
          {report_type:"Prepaid Customer Report"},
          {report_type:"Postpaid Customer Report"},
          // {report_type:"Active Customer Report"},
          // {report_type:"Inactive Customer Report"},
        ];
        rowchange(data)
        console.log("Customer loop", rows)      
      setcount(count++)
      console.log(count)     
  
      }
      else if(value === 'agent'){
        count++
        console.log("Agent loop")
         data = [
          {report_type:"Agent Report"},
        ];
        rowchange(data)
        console.log("Agent loop", rows)
        setcount(count++)
        console.log(count)
      }
      return data;
    };
    generateData()


},[value]);

  const [page, pagechange] = useState(0);
  const [rightTabValue, setRightTabValue] = useState(0);

  const [rowperpage, rowperpagechange] = useState(5);

  const handleRightTabChange = (event, newValue) => {
    setRightTabValue(newValue);
  };
=======
export default function Report(props) {
  const columns = [
    { id: 'report_type', name: 'REPORT TYPE' },
    { id: 'reports', name: 'REPORTS' },
  ];

  // Generate sample data
  const generateData = () => {
    const data = [];
    for (let i = 1; i < 100; i++) {
      data.push({
        report_type: ` REPORT TYPE ${i}`,
        reports: `${i}`,
      });
    }
    return data;
  };

  const [rows, rowchange] = useState(generateData());
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const navigate = useNavigate();
  const toPayment = () => {
    navigate('/payment');
  };
  const [selectedRecord, setSelectedRecord] = useState(null);
  const handleRowClick = (row) => {
<<<<<<< HEAD
    sessionStorage.setItem('report_Type',row.report_type)
    if(row.report_type=='All Customer Report'){
      navigate('/allcustomerReport');
    }
    if(row.report_type=='Prepaid Customer Report'){
      navigate('/prepaidcustomerReport');
    }
    if(row.report_type=='Postpaid Customer Report'){
      navigate('/postpaidcustomerReport');
    }
    if(row.report_type=='Active Customer Report'){
      navigate('/activecustomerReport');
    }
    if(row.report_type=='Inactive Customer Report'){
      navigate('/inactivecustomerReport');
    }
    if(row.report_type=='Agent Report'){
      navigate('/allagentreport');
    }
=======
    setSelectedRecord(row);
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };





  const SelectedRecordDetails = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage1 = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleNextPage = () => {
      setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
      setPage((prevPage) => Math.max(0, prevPage - 1));
    };

    if (selectedRecord) {
      const reportCount = parseInt(selectedRecord.reports) || 0;
      const reportRows = Array.from({ length: reportCount }, (_, index) => ({
        id: `report_${index + 1}`,
        value: `Report ${index + 1}: ${selectedRecord[`report_${index + 1}`] || ''}`,
      }));

      return (
<<<<<<< HEAD
        <div></div>
=======
        <Grid container justifyContent="left">
          <Grid item xs={12} md={5} sx={{ paddingBottom: 10, width: '40%', paddingTop: 7 }}>
            <Box sx={{ paddingTop: '0px' }}>
              <Paper elevation={20} sx={{ maxWidth: 500, width: 450 }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ backgroundColor: '#253A7D', color: 'white' }}
                          sx={{ textAlign: 'center' }}
                        >
                          <Typography fontFamily={'Sans-serif'}>Reports</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? reportRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : reportRows
                      ).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell
                            sx={{ textAlign: 'center' }}
                            onClick={handleClickOpen}
                          >
                            {row.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={reportRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage1}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={({ onPageChange, page }) => (
                    <div>
                      <IconButton
                        onClick={() => handlePrevPage()}
                        disabled={page === 0}
                      >
                        <NavigateBeforeIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleNextPage()}
                        disabled={page >= Math.ceil(reportRows.length / rowsPerPage) - 1}
                      >
                        <NavigateNextIcon />
                      </IconButton>

                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Report Details"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            There are the Details of this Report
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>
                          <Button onClick={handleClose} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac

      )
    } else
      return null

  };







  const handleSerch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://172.5.10.2:9696/api/vendor/mgmt/detail/search?keyword=${value}`)
      .then((res) => {
        setdata(res.data);
        console.log(value + "----value sech datas")
        rowchange(res.data);
<<<<<<< HEAD
        // setValue(value);
=======
        setValue(value);
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
      })
  }
  const [selectedOption, setSelectedOption] = useState('');
  const [highlightedRow, setHighlightedRow] = useState(null);

  const handleRowMouseEnter = (row) => {
    setHighlightedRow(row);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };
<<<<<<< HEAD

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  

  };

  return (
    <Box sx={{ display: 'container', marginTop: '-15px',fontFamily:'Roboto' }}>
            <Box sx={{ width: '100%' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={20} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
=======
  return (
    <Box sx={{ display: 'container', marginTop: '-15px' }}>
            <Box sx={{ width: '70%' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={20} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
                        <Grid>
                            <Typography
                                style={{

                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',

                                }}
                            >Report List</Typography>
                        </Grid>
                    </Paper>
                </Box>
<<<<<<< HEAD
        <Box component="main" sx={{ flexGrow: 1, width: '100%',  }}>
          <form onSubmit={handleSerch}>
            <Paper elevation={20} sx={{ marginBottom: 2, }}>
              <Grid lg={8}  >
              <TabContext value={value}>
                {/* Navbar Code starts here */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} 
          sx={{backgroundColor:'#253A7D',}}
          >
            <Tab label="Customer" value="customer"sx={{
                color: rightTabValue === 1 ? 'yellow' : 'white',
                '&.Mui-selected': {
                  color: 'yellow',
                },
              }} />
            <Tab label="Agent" value="agent"sx={{
                color: rightTabValue === 1 ? 'yellow' : 'white',
                '&.Mui-selected': {
                  color: 'yellow',
                },
              }} />
            {/* <Tab label="Item Three" value="3"sx={{
                color: rightTabValue === 1 ? 'yellow' : 'white',
                '&.Mui-selected': {
                  color: 'yellow',
                },
              }} /> */}
          </TabList>
        </Box>
        {/* Panel for Customer */}

        <TabPanel value="customer">
        
              <Table stickyHeader size='medium' padding="normal">
                <TableBody>
                  {rows &&
                    rows
                      .slice(page * rowperpage, page * rowperpage + rowperpage)
                      .map((row, i) => {
                        return (
                          <TableRow
                          
                            key={i}
                            onClick={() => handleRowClick(row)}
                            onMouseEnter={() => handleRowMouseEnter(row)}
                            onMouseLeave={handleRowMouseLeave}
                            sx={
                              highlightedRow === row
                                ? { backgroundColor: '#FBB716' }
                                : {}
                            }
                          >
                            {columns.map((column) => (
                              <TableCell key={column.id}
                              sx={{fontSize: '17px'}}
                              >
                                {row[column.id]}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
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

         
        </TabPanel>
        {/* Panel for Agent */}

        <TabPanel value="agent">
        <Table stickyHeader size='medium' padding="normal">
                <TableBody>
                  {rows &&
                    rows
                      .slice(page * rowperpage, page * rowperpage + rowperpage)
                      .map((row, i) => {
                        return (
                          <TableRow
                          
                            key={i}
                            onClick={() => handleRowClick(row)}
                            onMouseEnter={() => handleRowMouseEnter(row)}
                            onMouseLeave={handleRowMouseLeave}
                            sx={
                              highlightedRow === row
                                ? { backgroundColor: '#FBB716' }
                                : {}
                            }
                          >
                            {columns.map((column) => (
                              <TableCell key={column.id}
                              sx={{fontSize: '17px'}}
                              >
                                {row[column.id]}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
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

         
        </TabPanel>
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>

            
=======
        <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
          <form onSubmit={handleSerch}>
            <Paper elevation={20} sx={{ marginBottom: 2 }}>
              <Grid lg={8}  >
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

>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
              </Grid>
            </Paper>
          </form>

<<<<<<< HEAD
          

          {/* <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
=======
          <Paper elevation={20}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader size='medium' padding="normal">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell style={{ backgroundColor: '#253A7D', color: 'white' }} key={column.id} sx={{ textAlign: 'center' }}><Typography fontFamily={'Sans-serif'}>{column.name}</Typography></TableCell>
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
                            onClick={() => handleRowClick(row)}
                            onMouseEnter={() => handleRowMouseEnter(row)}
                            onMouseLeave={handleRowMouseLeave}
                            sx={
                              highlightedRow === row
                                ? { backgroundColor: 'lightblue' }
                                : {}
                            }
                          >
                            {columns.map((column) => (
                              <TableCell key={column.id} sx={{ textAlign: 'center' }}>
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

          <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
            <Button variant="contained" backgroundColor="#6471B5"
              sx={{ backgroundColor: '#253A7D' }}
            //  onClick={handleButtonClick}
            >
              Downloade PDF
            </Button>

            <Button variant="contained" backgroundColor="#6471B5"
              // onClick={handleButtonClick} 
              sx={{ marginLeft: '16px', backgroundColor: '#253A7D' }}>
              DOWNLOADE CSV
            </Button>
<<<<<<< HEAD
          </Box> */}
=======
          </Box>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
        </Box>
      </Box>
      <Box sx={{ paddingLeft: 1, paddingTop: 2 }} >
        <SelectedRecordDetails

        />
      </Box>


    </Box>
  )
};


