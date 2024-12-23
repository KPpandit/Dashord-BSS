import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  TablePagination,
} from "@mui/material";

export default function ShowProduct() {
  const location = useLocation();
  const { record } = location.state || {};
  console.log(record, "record");

  const tokenValue = localStorage.getItem("token");

  // Columns for each table
  const columns1 = [
    { id: "msisdn", name: "MSISDN" },
    { id: "imsi", name: "IMSI" },
    { id: "category", name: "Category" },
    { id: "simType", name: "SIM Type" },
    { id: "amount", name: "Amount" },
  ];

  const columns2 = [
    { id: "SerialNumber", name: "Serial Number" },
    { id: "MacAddress", name: "Mac Address" },
    { id: "type", name: "Type" },
    { id: "AccountNumber", name: "Account No" },
    { id: "Password", name: "Password" },
  ];

  const columns3 = [
    { id: "deviceId", name: "Device ID" },
    { id: "deviceModel", name: "Model" },
    { id: "deviceType", name: "Type" },
    { id: "osType", name: "OS Type" },
    { id: "price", name: "Price" },
  ];

  // States for Table 1
  const [rows1, setRows1] = useState([]);
  const [page1, setPage1] = useState(0);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);

  // States for Table 2
  const [rows2, setRows2] = useState([]);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(5);

  // States for Table 3
  const [rows3, setRows3] = useState([]);
  const [page3, setPage3] = useState(0);
  const [rowsPerPage3, setRowsPerPage3] = useState(5);

  // Fetch data for each table
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 1
        const response1 = await axios.get(
          `https://bssproxy01.neotel.nr/crm/api/assigned/sim/partner/${record}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setRows1(response1.data);

        // API 2
        const response2 = await axios.get(
          `https://bssproxy01.neotel.nr/crm/api/assigned/router/partner/${record}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setRows2(response2.data);

        // API 3
        const response3 = await axios.get(
          `https://bssproxy01.neotel.nr/crm/api/assigned/device/partner/${record}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setRows3(response3.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, [record, tokenValue]);

  // Handlers for Table Pagination
  const handlePageChange = (setPage) => (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (setRowsPerPage, setPage) => (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Render Table
  const renderTable = (rows, page, rowsPerPage, columns, setPage, setRowsPerPage) => (
    <Paper elevation={10} sx={{ marginBottom: 2 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ backgroundColor: "#253A7D", color: "white" }}
                >
                  <Typography>{column.name}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange(setPage)}
        onRowsPerPageChange={handleRowsPerPageChange(setRowsPerPage, setPage)}
      />
    </Paper>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        All Assigned SIMs
      </Typography>
      {renderTable(rows1, page1, rowsPerPage1, columns1, setPage1, setRowsPerPage1)}

      <Typography variant="h5" gutterBottom>
        All Assigned CPE
      </Typography>
      {renderTable(rows2, page2, rowsPerPage2, columns2, setPage2, setRowsPerPage2)}

      <Typography variant="h5" gutterBottom>
        All Assigned Devices
      </Typography>
      {renderTable(rows3, page3, rowsPerPage3, columns3, setPage3, setRowsPerPage3)}
    </Box>
  );
}
