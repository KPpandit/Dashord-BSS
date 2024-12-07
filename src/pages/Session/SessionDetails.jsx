import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Grid,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Riple } from 'react-loading-indicators';

export default function SessionDetails() {
  const location = useLocation();
  const { date } = location.state || {}; // Extract date from navigation state
  const ratType = location.pathname.split('/').pop(); // Extract RAT type from URL

  const tokenValue = localStorage.getItem('token');

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // For storing REG/UNREG filtered rows
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewType, setViewType] = useState('REG'); // Default to REG sessions

  // Updated columns for displaying only required fields
  const columns = [
    { id: 'supi', name: 'IMSI' },
    { id: 'gpsi', name: 'MSISDN' },
    { id: 'attachStatus', name: 'Status' },
    { id: 'start_ts', name: 'Start Time' },
    { id: 'smfPolicyId', name: 'Policy ID' },
  ];

  const fetchData = async () => {
    try {
      const url = `https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/registrations/${date}/${ratType}/${viewType.toUpperCase()}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setRows(response.data || []);
      setFilteredRows(
        response.data.filter((row) => row.attachStatus === viewType.toUpperCase())
      );
    } catch (error) {
      console.error('Error fetching session details:', error);
    }
  };

  useEffect(() => {
    if (date && ratType) {
      fetchData();
    }
  }, [date, ratType, viewType]); // Re-fetch data when viewType changes

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewChange = (type) => {
    setViewType(type);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Paper elevation={10} sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {ratType.toUpperCase()} Session Details
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant={viewType === 'REG' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleViewChange('REG')}
            sx={{ marginRight: 1 }}
          >
            REG
          </Button>
          <Button
            variant={viewType === 'UNREG' ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => handleViewChange('UNREG')}
          >
            UNREG
          </Button>
        </Box>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ backgroundColor: '#253A7D', color: 'white' }}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {row[column.id] || 'N/A'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '60vh' }}

                >
                    <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
                </Grid>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ marginTop: 2 }}
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={filteredRows.length}
          component="div"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
}
