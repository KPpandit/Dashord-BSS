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
          },
          {
            category: "Prepaid",
            inactiveCustomers: responses[1].data.count_of_pack_inactive_customers,
          },
          {
            category: "Postpaid",
            inactiveCustomers: responses[2].data.count_of_plan_inactive_customers,
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
            Inactive Customers Report
          </Typography>
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
                        color: "#2b6777",
                      }}
                    >
                      {row.inactiveCustomers}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
