import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Grid,
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
  const tokenValue = localStorage.getItem("token");

  // Column definitions
  const columns = {
    sim: [
      { id: "msisdn", name: "MSISDN" },
      { id: "imsi", name: "IMSI" },
      { id: "category", name: "Category" },
      { id: "simType", name: "SIM Type" },
      { id: "amount", name: "Amount" },
    ],
    router: [
      { id: "serialNumber", name: "Serial Number" },
      { id: "macAddress", name: "MAC Address" },
      { id: "type", name: "Type" },
      { id: "brand", name: "Brand" },
      { id: "allocationDate", name: "Allocation Date" },
    ],
    device: [
      { id: "deviceModel", name: "Device Model" },
      { id: "deviceType", name: "Device Type" },
      { id: "osType", name: "OS Type" },
      { id: "buyingPriceUsd", name: "Buying Price (USD)" },
      { id: "sellingPriceUsd", name: "Selling Price (USD)" },
    ],
  };

  const [data, setData] = useState({
    sim: { inStock: [], outStock: [] },
    router: { inStock: [], outStock: [] },
    device: { inStock: [], outStock: [] },
  });

  const [pagination, setPagination] = useState({
    sim: { inStock: { page: 0, rowsPerPage: 5 }, outStock: { page: 0, rowsPerPage: 5 } },
    router: { inStock: { page: 0, rowsPerPage: 5 }, outStock: { page: 0, rowsPerPage: 5 } },
    device: { inStock: { page: 0, rowsPerPage: 5 }, outStock: { page: 0, rowsPerPage: 5 } },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const simResponse = await axios.get(
          `https://bssproxy01.neotel.nr/crm/api/sim/stock/partner/${record}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        const routerResponse = await axios.get(
          `https://bssproxy01.neotel.nr/crm/api/router/stock/partner/${record}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        const deviceResponse = await axios.get(
          `https://bssproxy01.neotel.nr/crm/api/device/stock/partner/${record}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );

        setData({
          sim: {
            inStock: simResponse.data.inStockSim || [],
            outStock: simResponse.data.outStockSim || [],
          },
          router: {
            inStock: routerResponse.data.inStockRouters || [],
            outStock: routerResponse.data.outStockRouters || [],
          },
          device: {
            inStock: deviceResponse.data.inStockDevice || [],
            outStock: deviceResponse.data.outStockDevice || [],
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [record, tokenValue]);

  const handlePageChange = (category, type) => (event, newPage) => {
    setPagination((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: { ...prev[category][type], page: newPage },
      },
    }));
  };

  const handleRowsPerPageChange = (category, type) => (event) => {
    setPagination((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: {
          ...prev[category][type],
          rowsPerPage: +event.target.value,
          page: 0,
        },
      },
    }));
  };

  const renderTable = (category, type) => {
    const rows = data[category][type];
    const { page, rowsPerPage } = pagination[category][type];
    const currentColumns = columns[category];

    return (
      <Paper elevation={10} sx={{ marginBottom: 2 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {currentColumns.map((column) => (
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
                    {currentColumns.map((column) => (
                      <TableCell key={column.id}>
                        {row[column.id] || "N/A"}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange(category, type)}
          onRowsPerPageChange={handleRowsPerPageChange(category, type)}
        />
      </Paper>
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      {["sim", "router", "device"].map((category) => (
        <Box key={category} sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            {category.toUpperCase()}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">In-Stock</Typography>
              {renderTable(category, "inStock")}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Sold</Typography>
              {renderTable(category, "outStock")}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
