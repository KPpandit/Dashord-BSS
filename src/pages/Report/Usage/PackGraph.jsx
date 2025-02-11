import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PackGraph() {
  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/active/inactive/packs/count"
        );

        setActiveData(response.data.active_packs);
        setInactiveData(response.data.inactive_packs);
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

        {/* Active Packs Graph */}
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginBottom: 2, color: "#1976d2" }}
        >
          Customers Active Pack wise
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pack_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pack_count" fill="#4CAF50" barSize={40} />
          </BarChart>
        </ResponsiveContainer>

        {/* Inactive Packs Graph */}
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2, color: "#D32F2F" }}
        >
         Customers InActive Pack wise
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inactiveData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pack_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pack_count" fill="#D32F2F" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
