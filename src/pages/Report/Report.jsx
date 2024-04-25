import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
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

  let data = []
  let [count, setcount] = useState(0)

  // Generate sample data


  useEffect(() => {

    const generateData = () => {
      if (value === 'customer') {
        count++
        console.log("Customer loop")
        data = [
          { report_type: "All Customer Report" },
          { report_type: "Pre-Paid Customer Report" },
          { report_type: "Post-Paid Customer Report" },
          { report_type: "Active Customer Report" },
          { report_type: "Inactive Customer Report" },
          { report_type: "Customer signup Report" },
          { report_type: "Top Customers Post-Paid Data Usage Report" },
          { report_type: "Top Customers Post-Paid Call Usage Report" },
          { report_type: "Top Customers Post-Paid SMS Usage Report" },
          { report_type: "Customers Data Available Pre-Paid" },
          { report_type: "On Board Customer Reports" },
        ];
        rowchange(data)
        console.log("Customer loop", rows)
        setcount(count++)
        console.log(count)

      }
      else if (value === 'agent') {
        count++
        console.log("Agent loop")
        data = [
          { report_type: "Agent Report" },
          { report_type: "Agent Comission" },
          { report_type: "Agents Report by Payment" },
        ];
        rowchange(data)
        console.log("Agent loop", rows)
        setcount(count++)
        console.log(count)
      }
      else if (value === 'inventory') {
        console.log("Biloing Condition is working")
        count++
        console.log("billing")
        data = [
          { report_type: "SIM By Selling Price" },
          { report_type: "All Device By Selling Price" },
          { report_type: "All Sim by Activation Date" },
          { report_type: "Sim Reports" },
         
        ];

        rowchange(data)
        console.log("Agent loop", rows)
        setcount(count++)
        console.log(count)
      }
      else if (value === 'billing') {
        console.log("Biloing Condition is working")
        count++
        console.log("billing")
        data = [
          { report_type: "Pre-Paid Customer Report" },
          { report_type: "Post-Paid Customer Report" },
        ];
        rowchange(data)
        console.log("Agent loop", rows)
        setcount(count++)
        console.log(count)
      }
      return data;
    };
    generateData()


  }, [value]);

  const [page, pagechange] = useState(0);
  const [rightTabValue, setRightTabValue] = useState(0);

  const [rowperpage, rowperpagechange] = useState(5);

 
  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const navigate = useNavigate();
  
 
  const handleRowClick = (row) => {
    console.log("handle row click")
    sessionStorage.setItem('report_Type', row.report_type)
    if (row.report_type == 'All Customer Report') {
      navigate('/allcustomerReport');
    }
    if (row.report_type == 'Pre-Paid Customer Report') {
      navigate('/prepaidcustomerReport');
    }
    if (row.report_type == 'Post-Paid Customer Report') {
      navigate('/postpaidcustomerReport');
    }
    if (row.report_type == 'Active Customer Report') {
      navigate('/activecustomerReport');
    }
    if (row.report_type == 'Inactive Customer Report') {
      navigate('/inactivecustomerReport');
    }
    if (row.report_type == 'Agent Report') {
      navigate('/allagentreport');
    }
    if (row.report_type == 'Customer signup Report') {
      navigate('/customerSignUp');
    }
    if (row.report_type == 'Top Customers Report') {
      navigate('/topCustomerReport');
    }
    if (row.report_type == 'Top Customers Post-Paid Data Usage Report') {
      navigate('/topCustomerReport');
    }
    if (row.report_type == 'Top Customers Post-Paid Call Usage Report') {
      navigate('/topPostPaidCallUsage');
    }
    if (row.report_type == 'Top Customers Post-Paid SMS Usage Report') {
      navigate('/topPostPaidSMSUsage');
    }
    if (row.report_type == 'Customers Data Available Pre-Paid') {
      navigate('/prepaidDataUsage');
    }
    if (row.report_type == 'On Board Customer Reports') {
      navigate('/onBoardCustomers');
    }
    if (row.report_type == 'Agent Comission') {
      navigate('/agentComission');
    }
    if (row.report_type == 'Agents Report by Payment') {
      navigate('/agentReportByPayment');
    }
    if (row.report_type == 'SIM By Selling Price') {
      navigate('/simBysellingPrice');
    }
    if (row.report_type == 'All Sim by Activation Date') {
      navigate('/simByActivation');
    }
    if (row.report_type == 'Sim Reports') {
      navigate('/simReports');
    }
    if (row.report_type == 'All Device By Selling Price') {
      navigate('/deviceSellingReports');
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
       
      })
  }
 
  const [highlightedRow, setHighlightedRow] = useState(null);

  const handleRowMouseEnter = (row) => {
    setHighlightedRow(row);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)


  };

  return (
    <Box sx={{ display: 'container', marginTop: '-15px', fontFamily: 'Roboto' }}>
      <Box sx={{ width: '100%' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
          <Paper elevation={20} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
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
        <Box component="main" sx={{ flexGrow: 1, width: '100%', }}>
          <form onSubmit={handleSerch}>
            <Paper elevation={20} sx={{ marginBottom: 2, }}>
              <Grid lg={8}  >
                <TabContext value={value}>
                  {/* Navbar Code starts here */}
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}
                      sx={{ backgroundColor: '#253A7D', }}
                    >
                      <Tab label="Customer" value="customer" sx={{
                        color: rightTabValue === 1 ? 'yellow' : 'white',
                        '&.Mui-selected': {
                          color: 'yellow',
                        },
                      }} />
                      <Tab label="Agent" value="agent" sx={{
                        color: rightTabValue === 1 ? 'yellow' : 'white',
                        '&.Mui-selected': {
                          color: 'yellow',
                        },
                      }} />
                      <Tab label="Billing" value="billing" sx={{
                        color: rightTabValue === 2 ? 'yellow' : 'white',
                        '&.Mui-selected': {
                          color: 'yellow',
                        },
                      }} />
                      <Tab label="Inventory" value="inventory" sx={{
                        color: rightTabValue === 3 ? 'yellow' : 'white',
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
                                      sx={{ fontSize: '17px' }}
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
                                      sx={{ fontSize: '17px' }}
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
                  <TabPanel value="billing">

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
                                      sx={{ fontSize: '17px' }}
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
                  <TabPanel value="inventory">

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
                                      sx={{ fontSize: '17px' }}
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
                </TabContext>


              </Grid>
            </Paper>
          </form>



          {/* <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
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
          </Box> */}
        </Box>
      </Box>
      


    </Box>
  )
};


