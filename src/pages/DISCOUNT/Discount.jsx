import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
export default function Discount(props) {
  const columns = [
    { id: 'dis_code', name: 'DISCOUNT CODE' },
    { id: 'descrption', name: '	DESCRIPTION' },
    { id: 'des_type', name: 'DISCOUNT TYPE' },
  ];

  // Generate sample data
  const generateData = () => {
    const data = [];
    for (let i = 1; i < 100; i++) {
      data.push({
        dis_code: ` DISCOUNT CODE ${i}`,
        descrption: `DESCRIPTION ${i}`,
        des_type: `DISCOUNT TYPE ${i}`,
      });
    }
    return data;
  };

  const [rows, rowchange] = useState(generateData());
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

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
    setSelectedRecord(row);
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
        <Grid container justifyContent="left">
          <Grid item xs={12} md={5} sx={{ paddingBottom: 10, width: '40%', paddingTop: 7 }}>
            <Box sx={{ paddingTop: '0px' }}>
              <Paper sx={{ maxWidth: 500, width: 450 }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ backgroundColor: '#253A7D', color: 'white' }}
                          sx={{ textAlign: 'center' }}
                        >
                          <Typography fontFamily={'Sans-serif'}>Discount</Typography>
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

      )
    } else return null;
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
    setHighlightedRow(row);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };
  return (
    <Box sx={{ display: 'container' , marginTop: -3}}>
      <Box sx={{ width: '60%' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
          <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -1, marginRight: -0.8 }}>
            <Grid>
              <Typography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  paddingLeft: '15px',
                  fontWeight: 'bold',

                }}
              >Discount</Typography>
            </Grid>
          </Paper>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
          <form onSubmit={handleSerch}>
            <Paper elevation={10} sx={{ marginBottom: 2 }}>
              <TextField
                label="Search"
                type="text"
                fullWidth
                name="value"
                required
                InputProps={{
                  endAdornment: (
                    <Button type="submit">
                      <SearchIcon />
                    </Button>
                  ),
                }}
              />

            </Paper>

          </form>

          <Paper elevation={10} >
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
            <Button variant="contained" backgroundColor="#6471B5"
            //  onClick={handleButtonClick}
            sx={{boxShadow:20,backgroundColor:'#253A7D'}}
            >
              Downloade PDF
            </Button>

            <Button variant="contained" backgroundColor="#6471B5"
              // onClick={handleButtonClick} 
              sx={{ boxShadow:20,marginLeft: '16px' ,backgroundColor:'#253A7D'}}>
              DOWNLOADE CSV
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingLeft: 1, paddingTop: 2 }} >
        <SelectedRecordDetails

        />
      </Box>


    </Box>
  )
};


