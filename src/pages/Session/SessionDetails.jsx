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
  const { date } = location.state || {};
  const ratType = location.pathname.split('/').pop();

  const tokenValue = localStorage.getItem('token');

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewType, setViewType] = useState('REG');
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const UTRA_NR_COLUMNS = [
    { id: 'supi', name: 'IMSI' },
    { id: 'gpsi', name: 'MSISDN' },
    { id: 'attachStatus', name: 'Status' },
    { id: 'start_ts', name: 'Start Time' },
    { id: 'smfPolicyId', name: 'Policy ID' },
  ];

  const CPE_COLUMNS = [
    { id: 'sessionId', name: 'Session ID' },
    { id: 'user', name: 'User' },
    { id: 'deviceId', name: 'Device ID' },
    { id: 'startTimeTs', name: 'Start Time' },
    { id: 'sessionStatus', name: 'Status' },
    { id: 'framedIp', name: 'IP Address' },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const isCPE = ratType === 'CPE';
      const baseUrl = isCPE
        ? `https://bssproxy01.neotel.nr/ftth/api/aaa/subscriber/session/registrations`
        : `https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/registrations`;
      const endpoint = isCPE
        ? `${baseUrl}/${viewType === 'REG' ? 'active' : 'inactive'}/${date}`
        : `${baseUrl}/${date}/${ratType}/${viewType.toUpperCase()}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = response.data || [];
      setRows(data);
      setFilteredRows(
        data.filter((row) =>
          isCPE ? true : row.attachStatus === viewType.toUpperCase()
        )
      );
      setColumns(isCPE ? CPE_COLUMNS : UTRA_NR_COLUMNS);
    } catch (error) {
      console.error('Error fetching session details:', error);
      setRows([]);
      setFilteredRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (date && ratType) {
      fetchData();
    }
  }, [date, ratType, viewType]);

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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Riple
                      color="#FAC22E"
                      size="large"
                      text="Loading..."
                      textColor="#253A7D"
                    />
                  </TableCell>
                </TableRow>
              ) : filteredRows.length > 0 ? (
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
                    No records present
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
          count={filteredRows.length || 0}
          component="div"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
}
