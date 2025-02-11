import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Riple } from "react-loading-indicators";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const Analysis = () => {
  const [apiData, setApiData] = useState(null);
  const [page, setPage] = useState({ data: 0, call: 0, sms: 0 });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://bssproxy01.neotel.nr/abmf-prepaid/api/v1/get/entire/customers/report")
      .then((res) => res.json())
      .then(setApiData)
      .catch(console.error);
  }, []);

  if (!apiData) return <Grid
    container
    justifyContent="center"
    alignItems="center"
    style={{ height: '60vh' }}

  >
    {/* <Riple color="#32cd32" size="medium" text="" textColor="" /> */}
    <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
  </Grid>;

  const handleChangePage = (type, newPage) => setPage((prev) => ({ ...prev, [type]: newPage }));
  const handleChangeRowsPerPage = (e) => setRowsPerPage(parseInt(e.target.value, 10));

  const renderPieChart = (title, data) => (
    <Grid item xs={12} md={6}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" align="center">{title}</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}: ${value}`}>
                {COLORS.map((color, index) => <Cell key={index} fill={color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderTable = (title, data, columns, type) => (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">{title}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map(({ key, label }) => (
                    <TableCell key={key} sx={{ fontWeight: "bold", backgroundColor: "#253A7D", color: "white" }}>
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page[type] * rowsPerPage, page[type] * rowsPerPage + rowsPerPage).map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.map(({ key }) => (
                      <TableCell key={key}>
                        {key === "offered_data" && row[key] === '931 GB'
                          ? "Unlimited"
                          : key === "offered_sms" && row[key] === 99999
                            ? "Unlimited"
                            : key === "offered_calls" && row[key] === '1666 Mins'
                              ? "Unlimited"
                              : row[key]}
                      </TableCell>
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
              page={page[type]}
              onPageChange={(_, newPage) => handleChangePage(type, newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: "#253A7D",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { color: "#FFF" },
                "& .MuiButtonBase-root": { color: "#FBB716" },
              }}
              ActionsComponent={({ onPageChange, page, count, rowsPerPage }) => (
                <Box sx={{ flexShrink: 0, ml: 2 }}>
                  <IconButton onClick={() => onPageChange(null, page - 1)} disabled={page === 0} sx={{ color: "white" }}>
                    <KeyboardArrowLeft />
                  </IconButton>
                  <IconButton onClick={() => onPageChange(null, page + 1)} disabled={page >= Math.ceil(count / rowsPerPage) - 1} sx={{ color: "#FBB716" }}>
                    <KeyboardArrowRight />
                  </IconButton>
                </Box>
              )}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography sx={{ textAlign: 'center', fontSize: '40px', fontWeight: '500', color: '#253A7D', paddingBottom: 6 }}>
        Customer & Inventory Statistics
      </Typography>
      <Grid container spacing={4}>
        {renderPieChart("Prepaid Distribution", [
          { name: "Active Prepaid", value: apiData.active_prepaid_customers },
          { name: "Inactive Prepaid", value: apiData.inactive_prepaid_customers },
        ])}
        {renderPieChart("Postpaid Distribution", [
          { name: "Active Postpaid", value: apiData.active_postpaid_customers || 160 },
          { name: "Inactive Postpaid", value: apiData.inactive_postpaid_customers },
        ])}
        {renderPieChart("Customer eKYC Status", [
          { name: "eKYC Customers", value: apiData.customers_ekyc },
          { name: "Partial eKYC Customers", value: apiData.customers_partial_ekyc },
        ])}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" align="center">SIM Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: "Used SIMs", value: apiData.total_used_sim },
                  { name: "Available SIMs", value: apiData.available_sim },
                  { name: "Used eSIMs", value: apiData.total_used_esims },
                  { name: "Available eSIMs", value: apiData.available_total_eSim },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {renderTable("Top 10 Data Users", apiData.prepaid_customers_usages.top_10_data_users, [
          { key: "msisdn", label: "MSISDN" },
          { key: "pack_name", label: "Pack Name" },
          { key: "activation_date", label: "Activation Date" },
          { key: "offered_data", label: "Offered Data" },
          { key: "consumed_data_in_gb", label: "Consumed Data (GB)" },
        ], "data")}
        {renderTable("Top 10 Call Users", apiData.prepaid_customers_usages.top_10_call_users, [
          { key: "msisdn", label: "MSISDN" },
          { key: "pack_name", label: "Pack Name" },
          { key: "activation_date", label: "Activation Date" },
          { key: "offered_calls", label: "Offered Calls" },
          { key: "consumed_calls", label: "Consumed Calls" },
        ], "call")}
        {renderTable("Top 10 SMS Users", apiData.prepaid_customers_usages.top_10_sms_users, [
          { key: "msisdn", label: "MSISDN" },
          { key: "pack_name", label: "Pack Name" },
          { key: "activation_date", label: "Activation Date" },
          { key: "offered_sms", label: "Offered SMS" },
          { key: "consumed_sms", label: "Consumed SMS" },
        ], "sms")}
      </Grid>
    </Box>
  );
};

export default Analysis;