import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function DataDetailedView() {
  const location = useLocation();
  const { state } = location;
  const { data, ratType } = state; // Contains data and RAT type (EUTRA, NR, or CPE)

  // Separate registered and unregistered data
  const registeredData = data.registered.map((item) => ({
    ...item,
    status: "Registered",
  }));
  const unregisteredData = data.unregistered.map((item) => ({
    ...item,
    status: "Unregistered",
  }));

  // State for filtering data and default selection
  const [filter, setFilter] = useState("Registered");

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get filtered data based on the selected filter
  const filteredData =
    filter === "Registered"
      ? registeredData
      : filter === "Unregistered"
      ? unregisteredData
      : [];

  // Determine columns dynamically
  const columns =
    ratType === "CPE"
      ? [
          { label: "User", field: "user" },
          { label: "Start Time", field: "startTimeTs" },
          { label: "Status", field: "status" },
        ]
      : [
          { label: "SUPI", field: "supi" },
          { label: "GPSI", field: "gpsi" },
          { label: "DNN", field: "dnn" },
          { label: "PDU Session ID", field: "pduSessionId" },
          { label: "Start Timestamp", field: "start_ts" },
          { label: "Status", field: "status" },
        ];

  return (
    <Grid container spacing={3} padding={3}>
      {/* Page Title */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#253A7D" }}>
          Detailed View - {ratType} Data
        </Typography>
      </Grid>

      {/* Filter Buttons */}
      <Grid item xs={12}>
        <Button
          variant={filter === "Registered" ? "contained" : "outlined"}
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={() => {
            setFilter("Registered");
            setPage(0);
          }}
        >
          Registered
        </Button>
        <Button
          variant={filter === "Unregistered" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => {
            setFilter("Unregistered");
            setPage(0);
          }}
        >
          Unregistered
        </Button>
      </Grid>

      {/* Table Section */}
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ boxShadow: 24 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#253A7D", color: "white" }}>
                {columns.map((col, index) => (
                  <TableCell key={index}>
                    <Typography sx={{ fontWeight: "bold", color: "white" }}>
                      {col.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex}>{row[col.field]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          sx={{ bgcolor: "#253A7D", color: "white", boxShadow: 24 }}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
