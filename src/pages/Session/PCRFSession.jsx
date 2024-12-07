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
export default function PCRF(props) {
  const columns = [
    { id: 'report_type', name: 'REPORT TYPE' },
    
  ];
  const [value, setValue] = React.useState('pcrf');
  const [rows, rowchange] = useState([]);

  let data=[]
  let [count,setcount]= useState(0)

  // Generate sample data
  

  useEffect(() => {

    const generateData = () => {
      if(value=== 'pcrf'){
         
         data = [
          {report_type:"Gx Interface"},
          {report_type:"Rx Interface "},
          {report_type:"Ro Interface"},
          {report_type:"Gy Interface"},
        ];
        rowchange(data)  
  
      }
      else if(value === 'pcf'){

         data = [
          {report_type:"NCHF Interface"},
          {report_type:"NPCF Interface"},

        ];
        rowchange(data)
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
    sessionStorage.setItem('interface_type',row.report_type)
    navigate('/individualinterfaceRecords');
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
        <div></div>

      )
    } else
      return null

  };

  const [selectedOption, setSelectedOption] = useState('');
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
    <Box sx={{ display: 'container', marginTop: '-15px',fontFamily:'Roboto' }}>
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
                            >PCRF/PCF Session List</Typography>
                        </Grid>
                    </Paper>
                </Box>
        <Box component="main" sx={{ flexGrow: 1, width: '100%',  }}>
          <form >
            <Paper elevation={20} sx={{ marginBottom: 2, }}>
              <Grid lg={8}  >
              <TabContext value={value}>
                {/* Navbar Code starts here */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} 
          sx={{backgroundColor:'#253A7D',}}
          >
            <Tab label="PCRF" value="pcrf"sx={{
                color: rightTabValue === 1 ? 'yellow' : 'white',
                '&.Mui-selected': {
                  color: 'yellow',
                },
              }} />
            <Tab label="PCF" value="pcf"sx={{
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

        <TabPanel value="pcrf">
        
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

        <TabPanel value="pcf">
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

            
              </Grid>
            </Paper>
          </form>
        </Box>
      </Box>
    </Box>
  )
};


