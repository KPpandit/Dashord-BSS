import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SimManage = () => {
    const columns = [
        { id: 'msisdn', name: 'MSISDN' },
        { id: 'imsi', name: 'IMSI' },
        { id: 'category', name: 'Category' },
        { id: 'partnerId', name: 'Agent ID' },
        { id: 'specialNumber', name: 'Special Number' },
        { id: 'simType', name: 'SIM Type' },
        { id: 'sellingPriceUsd', name: 'Selling Price in AUD' },
    ];

    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [highlightedRow, setHighlightedRow] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSimData();
    }, [token]);

    const fetchSimData = async () => {
        try {
            const { data } = await axios.get('https://bssproxy01.neotel.nr/crm/api/siminventories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRows(data);
            setFilteredRows(data);  // Initialize filteredRows with all data
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate("/");
            } else {
                console.error('API Error:', error);
            }
        }
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            toast.error('No file selected.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('https://bssproxy01.neotel.nr/crm/api/sim/upload/excel?vendorId=1', formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        })
            .then(() => toast.success('File uploaded successfully'))
            .catch((error) => toast.error(error.response?.data?.Database_error || 'Upload error'));
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchValue) {
            setFilteredRows(rows);  // If search is empty, show all rows
            return;
        }


        const filteredData = rows.filter((row) =>
            row.msisdn.includes(searchValue) ||
            row.imsi.includes(searchValue) ||
            row.category.includes(searchValue)
        );

        setFilteredRows(filteredData);  // Update filteredRows with search results
        setPage(0);  // Reset pagination to the first page
    };

    const handlePageChange = (event, newPage) => setPage(newPage);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const SelectedRecordDetails = () => (
        selectedRecord && (
            <Card variant="outlined" sx={{
                width: '100%',
                maxWidth: 380,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: '#F5F7FA',
                border: '1px solid #E3E8EF',
                overflow: 'hidden',
                padding: 2
            }}>
                {/* Header Section */}
                <Box sx={{
                    p: 3,
                    backgroundColor: '#253A7D',
                    color: 'white',
                    borderRadius: '8px 8px 0 0',
                    textAlign: 'left',
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedRecord.msisdn}
                    </Typography>
                </Box>

                {/* Details Section */}
                <Box sx={{ p: 3 }}>
                    {['imsi', 'category', 'batchId', 'batchDate', 'vendorName', 'allocationDate'].map((field) => (
                        <Box key={field} sx={{ mb: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#616161',
                                    display: 'inline-block',
                                }}
                            >
                                {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color: '#253A7D',
                                    display: 'inline-block',
                                    ml: 1,
                                }}
                            >
                                {selectedRecord[field] || 'N/A'}
                            </Typography>
                        </Box>
                    ))}

                    {/* Display AUD (instead of USD) */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#616161',
                                display: 'inline-block',
                            }}
                        >
                            BUYING PRICE (AUD):
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#253A7D',
                                display: 'inline-block',
                                ml: 1,
                            }}
                        >
                            {selectedRecord.buyingPriceUsd
                                ? `AUD ${selectedRecord.buyingPriceUsd.toFixed(2)}`
                                : 'N/A'}
                        </Typography>
                    </Box>
                </Box>

                {/* Edit Button */}
                {/* Uncomment this section if you want to enable the edit button */}
                {/* <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#FBB716',
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#F9A50D',
                            },
                            transition: 'all 0.3s ease',
                            padding: '12px 0',
                        }}
                        onClick={() => navigate('/editSim', { state: { selectObj: selectedRecord } })}
                    >
                        Edit Record
                    </Button>
                </Box> */}
            </Card>
        )
    );


    return (
        <Box sx={{ mt: -2.5 }}>
            <ToastContainer position="bottom-left" />
            <Grid container spacing={3}>
                {/* Left side (70%) */}
                <Grid item xs={12} md={8}>
                    <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                        <Paper elevation={10} sx={{ p: 1, m: 1, backgroundColor: 'white', mx: -0.8 }}>
                            <Typography sx={{ fontSize: '20px', pl: 1, fontWeight: 'bold', color: '#253A7D' }}>
                                SIM/e-SIM Management
                            </Typography>
                        </Paper>
                    </Box>
                    <Paper elevation={3} sx={{ mb: 3 }}>
                        <form onSubmit={handleSearch}>
                            <TextField
                                label="Search"
                                fullWidth
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton type="submit">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </Paper>
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
                                    {filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow
                                                key={index}
                                                onClick={() => setSelectedRecord(row)}
                                                onMouseEnter={() => setHighlightedRow(row)}
                                                onMouseLeave={() => setHighlightedRow(null)}
                                                sx={highlightedRow === row ? { backgroundColor: '#F6B625' } : {}}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} sx={{ textAlign: 'left', fontSize: '17px' }}>
                                                        {column.id === 'specialNumber'
                                                            ? row[column.id] === true
                                                                ? 'True'
                                                                : 'False'
                                                            : String(row[column.id] || 'N/A')}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </Paper>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        <Button style={{ backgroundColor: '#FBB716', color: 'black' }} sx={{ marginX: 1, boxShadow: 20 }} onClick={handleFileUpload}>
                            Save File
                        </Button>
                    </Box>
                </Grid>

                {/* Right side (30%) for selected record details */}
                <Grid item xs={12} md={4}>
                    <SelectedRecordDetails />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SimManage;
