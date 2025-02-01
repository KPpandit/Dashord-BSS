import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function PackGraph() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date().toISOString().split("T")[0]; 
        const response = await axios.get(
          `https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/activation/packs/report?start_date=${currentDate}`
        );

        setData(response.data); // Set response data into state
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
        background: "linear-gradient(135deg, #f4f6f8, #ffffff)",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: 3,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 3,
            textAlign: "center",
            color: "#253A7D",
            textTransform: "uppercase",
          }}
        >
          Pack Activation Report
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pack_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pack_count" fill="#1976d2" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
