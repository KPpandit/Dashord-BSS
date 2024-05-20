import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Report(props) {
  const columns = [{ id: 'report_type', name: 'REPORT TYPE' }];
  const [value, setValue] = useState(localStorage.getItem('reportTabValue') || 'customer');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('reportTabValue', value);
  }, [value]);

  useEffect(() => {
    const generateData = () => {
      let data = [];
      switch (value) {
        case 'customer':
          data = [
            { report_type: "All Customer Report" },
            { report_type: "Pre-Paid Customer Report" },
            { report_type: "Post-Paid Customer Report" },
            { report_type: "Active Customer Report" },
            { report_type: "Inactive Customer Report" },
            { report_type: "Customer signup Report" },
            { report_type: "Top Customers Pre-Paid Usage Report" },
            { report_type: "Top Customers Post-Paid Data Usage Report" },
            { report_type: "Top Customers Post-Paid Call Usage Report" },
            { report_type: "Top Customers Post-Paid SMS Usage Report" },
            { report_type: "Customers Data Available Pre-Paid" },
            { report_type: "On Board Customer Reports" }
            // Add other customer reports here
          ];
          break;
        case 'agent':
          data = [
            { report_type: "Agent Report" },
            { report_type: "Agent Comission" },
            { report_type: "Agents Report by Payment" },
            { report_type: "Agents Report of  All Product" },
          ];

          break;
        case 'billing':
          data = [
            { report_type: "Pre-Paid Customer Report" },
            { report_type: "Post-Paid Customer Report" },
          ];
          break;
        case 'inventory':
          data = [
            { report_type: "SIM By Selling Price" },
            { report_type: "All Device By Selling Price" },
            { report_type: "All Device By Agent" },
            { report_type: "All Device By Vendor" },
            { report_type: "All Sim by Activation Date" },
            { report_type: "Sim Reports" },
            { report_type: "Sim By Vendor" },
            { report_type: "Sim By Agent" },
            { report_type: "Sim By Status" },
          ];

          break;
        default:
          break;
      }
      setRows(data);
    };
    generateData();
  }, [value]);

  const handleRowClick = (row) => {
    sessionStorage.setItem('report_Type', row.report_type);
    switch (row.report_type) {
      case 'All Customer Report':
        navigate('/allcustomerReport');
        break;
      case 'Pre-Paid Customer Report':
        navigate('/prepaidcustomerReport');
        break;
      case 'Post-Paid Customer Report':
        navigate('/postpaidcustomerReport');
        break;
      case 'Active Customer Report':
        navigate('/activecustomerReport');
        break;
      case 'Inactive Customer Report':
        navigate('/inactivecustomerReport');
        break;
      case 'Agent Report':
        navigate('/allagentreport');
        break;
      case 'Customer signup Report':
        navigate('/customerSignUp');
        break;
      case 'Top Customers Report':
        navigate('/topCustomerReport');
        break;
      case 'Top Customers Post-Paid Data Usage Report':
        navigate('/topCustomerReport');
        break;
      case 'Top Customers Post-Paid Call Usage Report':
        navigate('/topPostPaidCallUsage');
        break;
      case 'Top Customers Post-Paid SMS Usage Report':
        navigate('/topPostPaidSMSUsage');
        break;
      case 'Customers Data Available Pre-Paid':
        navigate('/prepaidDataUsage');
        break;
      case 'On Board Customer Reports':
        navigate('/onBoardCustomers');
        break;
      case 'Agent Comission':
        navigate('/agentComission');
        break;
      case 'Agents Report by Payment':
        navigate('/agentReportByPayment');
        break;
      case 'SIM By Selling Price':
        navigate('/simBysellingPrice');
        break;
      case 'All Sim by Activation Date':
        navigate('/simByActivation');
        break;
      case 'Sim Reports':
        navigate('/simReports');
        break;
      case 'All Device By Selling Price':
        navigate('/deviceSellingReports');
        break;
      case 'Agents Report of All Product':
        navigate('/agentReportByProduct');
        break;
      case 'Top Customers Pre-Paid Usage Report':
        navigate('/prepaidUsageReport');
        break;
      case 'Sim By Vendor':
        navigate('/simByVendor');
        break;
      case 'Sim By Agent':
        navigate('/simByAgent');
        break;
      case 'Sim By Status':
        navigate('/simByStatus');
        break;
      case 'All Device By Agent':
        navigate('/deviceByAgent');
        break;
      case 'All Device By Vendor':
        navigate('/deviceByVendor');
        break;
      default:
        console.log('Unknown report type:', row.report_type);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: 'container', marginTop: '-15px', fontFamily: 'Roboto' }}>
      <Box sx={{ width: '100%' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
          <Paper elevation={20} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
            <Grid>
              <Typography style={{ fontSize: '20px', paddingLeft: 10, fontWeight: 'bold' }}>Report List</Typography>
            </Grid>
          </Paper>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, width: '100%', }}>
          <Paper elevation={20} sx={{ marginBottom: 2 }}>
            <Grid lg={8}>
              <TabContext value={value}>
                {console.log(value + "--------")}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={(event, newValue) => setValue(newValue)} sx={{ backgroundColor: '#253A7D' }}>
                    <Tab label="Customer" value="customer" sx={{
                      color: value === "customer" ? '#FAC22E' : 'white',
                      '&.Mui-selected': {
                        color: '#FAC22E',
                      },
                    }} />
                    <Tab label="Agent" value="agent" sx={{ color: value === "agent" ? '#FAC22E' : 'white',
                      '&.Mui-selected': {
                        color: '#FAC22E',
                      }, }} />
                    <Tab label="Billing" value="billing" sx={{ color: value === 'billing' ? '#FAC22E' : 'white',
                      '&.Mui-selected': {
                        color: '#FAC22E',
                      }, }} />
                    <Tab label="Inventory" value="inventory" sx={{ color: value === 'inventory' ? '#FAC22E' : 'white' ,
                      '&.Mui-selected': {
                        color: '#FAC22E',
                      },}} />
                  </TabList>
                </Box>

                <TabPanel value="customer">
                  <RenderTable rows={rows} handleRowClick={handleRowClick} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </TabPanel>
                <TabPanel value="agent">
                  <RenderTable rows={rows} handleRowClick={handleRowClick} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </TabPanel>
                <TabPanel value="billing">
                  <RenderTable rows={rows} handleRowClick={handleRowClick} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </TabPanel>
                <TabPanel value="inventory">
                  <RenderTable rows={rows} handleRowClick={handleRowClick} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </TabPanel>
              </TabContext>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}



function RenderTable({ rows, handleRowClick, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  const columns = [{ id: 'report_type', name: 'REPORT TYPE' }];
  const [highlightedRow, setHighlightedRow] = useState(null);
  const handleRowMouseEnter = (row) => {
    setHighlightedRow(row);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Table stickyHeader size='medium' padding="normal">
        <TableBody>
          {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
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
                <TableCell key={column.id} sx={{ fontSize: '17px' }}>
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ color: '#253A7D' }}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowsPerPage}
        page={page}
        count={rows.length}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
