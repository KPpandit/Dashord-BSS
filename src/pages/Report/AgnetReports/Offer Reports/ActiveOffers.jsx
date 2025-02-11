import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

export default function ActiveOffer() {
  const [data, setData] = useState([]); // API Data State
  const [loading, setLoading] = useState(true); // Loading State
  const [page, setPage] = useState(0); // Pagination Page State
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows Per Page State

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://bssproxy01.neotel.nr/offer/free-offer/customers/active");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Page Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows Per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Table Columns
  const columns = [
    { id: "msisdn", label: "MSISDN" },
    { id: "active-ts", label: "Activation Time" },
    { id: "expiry-ts", label: "Expiry Time" },
    { id: "data-balance", label: "Data Balance (MB)" },
    { id: "sms-mous", label: "SMS MOU" },
    { id: "vo-mous", label: "Voice MOU" },
  ];

  // Format Data
  const formatValue = (key, value) => {
    if (key === "data-balance") {
      return (value / 1048576).toFixed(2) + " MB"; // Convert bits to MB
    }
    if (["sms-mous", "vo-mous"].includes(key) && value === 99999) {
      return "Unlimited"; // Display "Unlimited"
    }
    return value || "N/A"; // Handle empty values
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#253A7D", fontWeight: "bold", marginBottom: 3 }}>
        Customers With Active Offers
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#253A7D" }}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ color: "#FFF", fontWeight: "bold" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{formatValue(column.id, row[column.id])}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: "#253A7D",
              color: "#FFF",
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { color: "#FFF" },
              "& .MuiSelect-icon": { color: "#FBB716" },
              "& .MuiButtonBase-root": { color: "#FBB716" },
              "& .MuiButtonBase-root:hover": { backgroundColor: "rgba(251, 183, 22, 0.1)" },
            }}
          />
        </TableContainer>
      )}
    </div>
  );
}
