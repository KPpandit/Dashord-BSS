import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ActiveInActive() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/customer/get/inactive/fwa/count"
          ),
          axios.get(
            "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/customer/get/inactive/count"
          ),
          axios.get(
            "https://bssproxy01.neotel.nr/abmf-postpaid/api/postpaid/customer/get/inactive/count"
          ),
        ]);

        const fetchedData = [
          {
            category: "Prepaid FWA",
            inactiveCustomers: responses[0].data.count_of_pack_inactive_customers,
            activeCustomers: responses[0].data.count_of_pack_active_customers || 0, 
          },
          {
            category: "Prepaid",
            inactiveCustomers: responses[1].data.count_of_pack_inactive_customers,
            activeCustomers: responses[1].data.count_of_pack_active_customers || 0, 
          },
          {
            category: "Postpaid",
            inactiveCustomers: responses[2].data.count_of_plan_inactive_customers,
            activeCustomers: responses[2].data.count_of_plan_active_customers || 0, 
          },
        ];

        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #ece9e6, #ffffff)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Prepare data for the chart
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Inactive Customers",
        data: data.map((item) => item.inactiveCustomers),
        backgroundColor: "#FF6B6B",
      },
      {
        label: "Active Customers",
        data: data.map((item) => item.activeCustomers),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: 3,
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Paper elevation={4} sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
              color: "#2b6777",
              textTransform: "uppercase",
            }}
          >
            Customers Report (Active vs Inactive)
          </Typography>

          {/* Data Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#2b6777",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#2b6777",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Inactive Customers
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "#2b6777",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Active Customers
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f7f7f7" },
                      "&:hover": { backgroundColor: "#e3f2fd" },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      {row.category}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        textAlign: "center",
                        fontWeight: "500",
                        color: "#FF6B6B",
                      }}
                    >
                      {row.inactiveCustomers}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        textAlign: "center",
                        fontWeight: "500",
                        color: "#4CAF50",
                      }}
                    >
                      {row.activeCustomers}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Graph */}
          <Box sx={{ marginTop: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                textAlign: "center",
                color: "#2b6777",
              }}
            >
              Active vs Inactive Customers (Graph)
            </Typography>
            <Bar data={chartData} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
