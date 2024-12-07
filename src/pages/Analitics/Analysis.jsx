import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const COLORS = ["#FF6384", "#36A2EB"];

export default function Analysis() {
  const [timeframes, setTimeframes] = useState({
    sales: "weekly",
    customers: "weekly",
    revenue: "weekly",
    cost: "weekly",
  });

  const data = {
    sales: {
      weekly: [{ name: "Mon", value: 400 }, { name: "Tue", value: 300 }, { name: "Wed", value: 500 }],
      monthly: [{ name: "Week 1", value: 1200 }, { name: "Week 2", value: 1500 }, { name: "Week 3", value: 1800 }],
      yearly: [{ name: "Jan", value: 4000 }, { name: "Feb", value: 4500 }, { name: "Mar", value: 5000 }],
    },
    customers: {
      weekly: [{ name: "Prepaid", value: 30 }, { name: "Postpaid", value: 70 }],
      monthly: [{ name: "Prepaid", value: 40 }, { name: "Postpaid", value: 60 }],
      yearly: [{ name: "Prepaid", value: 50 }, { name: "Postpaid", value: 50 }],
    },
    revenue: {
      weekly: { value: 2500, profit: true },
      monthly: { value: 10500, profit: true },
      yearly: { value: 125000, profit: false },
    },
    cost: {
      weekly: { value: 2000, profit: false },
      monthly: { value: 8500, profit: false },
      yearly: { value: 110000, profit: true },
    },
  };

  const handleTimeframeChange = (type, timeframe) => {
    setTimeframes((prev) => ({ ...prev, [type]: timeframe }));
  };

  const TimeframeButtons = ({ type }) => (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
      {["weekly", "monthly", "yearly"].map((tf) => (
        <Button
          key={tf}
          variant={timeframes[type] === tf ? "contained" : "outlined"}
          onClick={() => handleTimeframeChange(type, tf)}
        >
          {tf.charAt(0).toUpperCase() + tf.slice(1)}
        </Button>
      ))}
    </Box>
  );

  const ReportCard = ({ title, dataKey }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1">
            Total {title}: ${data[dataKey][timeframes[dataKey]].value}
          </Typography>
          {data[dataKey][timeframes[dataKey]].profit ? (
            <Typography color="success.main" sx={{ display: "flex", alignItems: "center" }}>
              <ArrowUpwardIcon color="success" /> Profit
            </Typography>
          ) : (
            <Typography color="error.main" sx={{ display: "flex", alignItems: "center" }}>
              <ArrowDownwardIcon color="error" /> Loss
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ padding: 4 }}>
      
      <Grid container spacing={4}>
        {/* Sales Reports */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Sales Reports
              </Typography>
              <TimeframeButtons type="sales" />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.sales[timeframes.sales]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Customer Distribution
              </Typography>
              <TimeframeButtons type="customers" />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.customers[timeframes.customers]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Reports */}
        <Grid item xs={12} md={6}>
        <TimeframeButtons type="revenue" />
          <ReportCard title="Revenue Reports" dataKey="revenue" />
          
        </Grid>

        {/* Cost Reports */}
        <Grid item xs={12} md={6}>
        <TimeframeButtons type="cost" />
          <ReportCard title="Cost Reports" dataKey="cost" />
         
        </Grid>
      </Grid>
    </Box>
  );
}
