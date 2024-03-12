import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';
export default function CustomMetaField() {
    const columns = [
        { id: 'MetaFiledCategories', name: 'META FIELD CATEGORIES' },
    ];

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                MetaFiledCategories: `META FIELD CATEGORIES ${i}`,
                name:`name ${i}`
            });
        }
        return data;
    };

    const [rows, rowchange] = useState(generateData());
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [dialogerecord,setDialogerecord]=useState(['']);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [highlightedRow, setHighlightedRow] = useState(null);
    

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };

    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    

    const handleRowClick = (row) => {
        setSelectedRecord(row);
        
      };

    const handleRowMouseEnter = (row) => {
        setHighlightedRow(row);
    };

   

    const handleRowMouseLeave = () => {
        setHighlightedRow(null);
    };

    

    const addFiled = () => {
        navigate('/customMetaField');
    };

    useEffect(() => {
        fetch("http://172.5.10.2:9696/api/rates/offer/get/all")
            .then(resp => resp.json())
            .then(resp => {
                rowchange(resp);
            })
            .catch(e => {
                console.log(e.message);
            });
        console.log("this is from rates");
    }, [selectedRecord]);

    const SelectedRecordDetails = () => {
        const handleRowClick = (row) => {
          setDialogerecord(row);
          setDialogOpen(true);
        };
      
        if (selectedRecord) {
          return (
            <Grid>
              <Paper sx={{ marginBottom: 2 }}>
                <Card variant="outlined" sx={{ maxWidth: 360 }}>
                  <Box sx={{ p: 1, backgroundColor: '#1976d2' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#1976d2' }}>
                      <Typography gutterBottom variant="h6.5" component="div" color={'white'}>
                        {selectedRecord.MetaFiledCategories}
                      </Typography>
                    </Stack>
                  </Box>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {/* Render additional details of the selected row */}
                        {Object.entries(selectedRecord).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell
                              sx={{ textAlign: 'left' }}
                              onClick={() => {
                                console.log(value+"-----value ");
                                handleRowClick(value)
                              }}
                            >
                              <Typography variant="body1">
                                <strong>{key}:</strong> {value}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Paper>
              <Grid>
                <Button sx={{}} variant="contained" onClick={addFiled}>
                  <Add sx={{ paddingRight: 1 }} />
                  Add
                </Button>
              </Grid>
            </Grid>
          )
        } else 
          return null;
        
      };
      
      const renderDialog = () => {
        if (selectedRecord) {
          return (
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
             <Grid padding={1} >
             <DialogTitle  backgroundColor={'blue'} color={'white'}>{dialogerecord}</DialogTitle>
             </Grid>
              <DialogContent>
                {/* Render additional details of the selected row inside the dialog */}
                {/* Modify this section based on your data structure */}
                <Typography>
                    This is the full information about the data : 
                    {dialogerecord}
                </Typography>
                <Divider/>
                <Typography >
                   For Entity :
                </Typography>
                <Typography >
                   Data Type :
                </Typography>
                <Typography >
                   Unique :
                </Typography>
                <Typography>
                Mandatory :
                </Typography>
                <Typography >
                Display order :
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} variant="outlined">
                  Edit
                </Button>
              </DialogActions>
            </Dialog>
          )
        }
        else
        return null;
      };
      
    return (
        <Box sx={{ display: 'container' }}>
            <Box sx={{ width: '68%', padding: '16px' }}>
                <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                    <Paper>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size='medium' padding="normal">
                                <TableHead>
                                    <TableRow dense>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{
                                                    backgroundColor: '#1976d2',
                                                    color: 'white',
                                                    textAlign: 'left',
                                                    height: '2px',
                                                }}
                                            >
                                                <Typography fontFamily={'Sans-serif'} fontSize={14}>
                                                    {column.name}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows &&
                                        rows
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => (
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
                                                        <TableCell key={column.id} sx={{ textAlign: 'left' }}>
                                                            {row[column.id]}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
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
                </Box>

            </Box>
            <Box sx={{ paddingTop: 2 }}>
                <SelectedRecordDetails />
            </Box>
            {renderDialog()}
        </Box>
    );
}
