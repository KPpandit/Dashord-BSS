import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import dayjs from "dayjs";
import axios from "axios";

const GraphDialogAgentpack = ({ graphDialogOpen, setGraphDialogOpen, tokenValue }) => {
  const [graphData, setGraphData] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("monthly");
  const [uniquePartners, setUniquePartners] = useState([]); // Track unique partnerMsisdn values
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getColor = (index) => {
    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff7300",
      "#a832a8",
      "#32a89e",
      "#a83242",
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf",
    ];
    return colors[index % colors.length];
  };

  const handleGraphButtonClick = async () => {
    if (startDate.isAfter(endDate)) {
      alert("Start date cannot be later than End date.");
      return;
    }

    if (endDate.isAfter(dayjs().add(1, "day"))) {
      alert("End date cannot be in the future.");
      return;
    }

    setLoading(true);
    try {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");

      const response = await axios.get(
        `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/reports/txns/inward/${formattedStartDate}/${formattedEndDate}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const transformedData = transformGraphData(response.data);
      setGraphData(transformedData);

      // Extract unique partnerMsisdn values
      const partners = new Set();
      transformedData.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
          if (key !== "date") {
            partners.add(key);
          }
        });
      });
      setUniquePartners(Array.from(partners));
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false);
    }
  };

  const transformGraphData = (data) => {
    const groupedData = {};

    // Group data by date and partnerMsisdn
    data.forEach((txn) => {
      const date = dayjs(txn.txnDate).format("YYYY-MM-DD");
      const partnerMsisdn = txn.partnerMsisdn;
      const amount = txn.amount;

      if (!groupedData[date]) {
        groupedData[date] = {};
      }

      if (!groupedData[date][partnerMsisdn]) {
        groupedData[date][partnerMsisdn] = 0;
      }

      groupedData[date][partnerMsisdn] += amount;
    });

    // Convert grouped data into an array format for Recharts
    const chartData = Object.keys(groupedData).map((date) => {
      const entry = { date };
      Object.keys(groupedData[date]).forEach((partnerMsisdn) => {
        entry[partnerMsisdn] = groupedData[date][partnerMsisdn];
      });
      return entry;
    });

    return chartData;
  };

  const handleRangeChange = (range) => {
    setDateRange(range);
    let start, end;
    if (range === "weekly") {
      start = dayjs().startOf("week");
      end = dayjs();
    } else if (range === "monthly") {
      start = dayjs().startOf("month");
      end = dayjs();
    } else if (range === "yearly") {
      start = dayjs().startOf("year");
      end = dayjs();
    }
    setStartDate(start);
    setEndDate(end);
    handleGraphButtonClick();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog open={graphDialogOpen} onClose={() => setGraphDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: "#253A7D" }}>Reseller Topup Report</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={5} sx={{ marginBottom: 2, paddingTop: 2, paddingLeft: 15 }}>
            <Grid item xs={4}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                maxDate={endDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                maxDate={dayjs().add(1, "day")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={4} sx={{ marginTop: 0.2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGraphButtonClick}
                sx={{ height: 50, backgroundColor: "#253A7D" }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>

        {/* Graph */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {uniquePartners.map((partnerMsisdn, index) => (
              <Bar key={partnerMsisdn} dataKey={partnerMsisdn} stackId="a" fill={getColor(index)} />
            ))}
          </BarChart>
        </ResponsiveContainer>

        {/* Paginated Table */}
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#253A7D", color: "#FFF" }}>Date</TableCell>
                {uniquePartners.map((partnerMsisdn) => (
                  <TableCell
                    key={partnerMsisdn}
                    sx={{ fontWeight: "bold", backgroundColor: "#253A7D", color: "#FFF" }}
                  >
                    {partnerMsisdn}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {graphData.length > 0 ? (
                graphData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    {uniquePartners.map((partnerMsisdn) => (
                      <TableCell key={partnerMsisdn}>{row[partnerMsisdn] || 0}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={uniquePartners.length + 1} align="center">
                    No records present
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={graphData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: "#253A7D",
              color: "#FFF",
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                color: "#FFF",
              },
              "& .MuiSelect-icon": {
                color: "#FBB716",
              },
              "& .MuiButtonBase-root": {
                color: "#FBB716",
              },
              "& .MuiButtonBase-root:hover": {
                backgroundColor: "rgba(251, 183, 22, 0.1)",
              },
            }}
          />
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default GraphDialogAgentpack;