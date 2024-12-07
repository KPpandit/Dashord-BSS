import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function CallSessionDetails() {
  const location = useLocation();
  const sessionData = location.state?.sessionData || [];

  // State variables
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("voice"); // Default to 'voice'

  const columns = [
    { id: "supi", name: "IMSI " },
    { id: "policyName", name: "Policy Name" },
    { id: "startTs", name: "Start Time" },
    { id: "endTs", name: "End Time" },
    { id: "voiceRule", name: "Voice Rule Enabled" },
  ];

  // Filter data based on selected category
  const filterData = (category) => {
    setLoading(true); // Show loader
    setTimeout(() => {
      const filteredData = sessionData.filter((item) =>
        category === "voice"
          ? item.policyName === "Conversational_Voice"
          : item.policyName === "Conversational_Video"
      );
      setData(filteredData);
      setLoading(false); // Hide loader
    }, 500); // Simulate data fetch delay
  };

  // Handle initial data load and category switch
  useEffect(() => {
    filterData(selectedCategory); // Load initial data for 'voice'
  }, [selectedCategory]);

  // Pagination handlers
  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Call Session Details
        </Typography>
      </Grid>

      {/* Toggle Buttons for Voice/Video */}
      <Grid item xs={12} marginBottom={2}>
        <Button
          variant={selectedCategory === "voice" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setSelectedCategory("voice")}
          sx={{ marginRight: 2 }}
        >
          Voice
        </Button>
        <Button
          variant={selectedCategory === "video" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setSelectedCategory("video")}
        >
          Video
        </Button>
      </Grid>

      {/* Data Table */}
      <Grid item xs={12}>
        <Paper elevation={10}>
          <TableContainer sx={{ maxHeight: 600 }}>
            {loading ? (
              // Loading spinner while data is being fetched
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ height: 400 }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <Table stickyHeader size="medium" padding="normal">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ backgroundColor: "#253A7D", color: "white" }}
                        sx={{ textAlign: "left" }}
                      >
                        <Typography fontFamily={"Sans-serif"}>
                          {column.name}
                        </Typography>
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
                          <TableCell
                            key={column.id}
                            sx={{ textAlign: "left", fontSize: "17px" }}
                          >
                            {column.id === "startTs" || column.id === "endTs"
                              ? row[column.id]
                                ? new Date(row[column.id]).toLocaleString()
                                : "Ongoing"
                              : column.id === "voiceRule"
                              ? row[column.id]
                                ? "Yes"
                                : "No"
                              : row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {!loading && (
            <TablePagination
              sx={{ color: "#253A7D" }}
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              page={page}
              count={data.length}
              component="div"
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
