import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const API_ENDPOINTS = [
  { url: "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/active/customers", label: "Active Customers" },
  { url: "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/inactive/customers", label: "Inactive Customers" },
  { url: "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/repeated/customers", label: "Repeated Customers" },
  { url: "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/new/customers", label: "New Customers" },
];

const CustomerPackDetails = () => {
  const [data, setData] = useState({});
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    API_ENDPOINTS.forEach(({ url, label }) => {
      setLoading((prev) => ({ ...prev, [label]: true })); // Set loading to true for each API call
      axios
        .get(url)
        .then((response) => {
          setData((prev) => ({ ...prev, [label]: response.data }));
          setPagination((prev) => ({ ...prev, [label]: { page: 0, rowsPerPage: 5 } }));
        })
        .catch((error) => console.error(`Error fetching ${label}:`, error))
        .finally(() => setLoading((prev) => ({ ...prev, [label]: false }))); // Set loading to false after API call completes
    });
  }, []);

  const handleChangePage = (label, newPage) => {
    setPagination((prev) => ({ ...prev, [label]: { ...prev[label], page: newPage } }));
  };

  const handleChangeRowsPerPage = (label, event) => {
    setPagination((prev) => ({
      ...prev,
      [label]: { ...prev[label], rowsPerPage: parseInt(event.target.value, 10), page: 0 },
    }));
  };

  return (
    <div>
      {API_ENDPOINTS.map(({ label }) => (
        <Paper key={label} sx={{ width: "100%", overflow: "hidden", mb: 3 }}>
          <Typography variant="h6" sx={{   padding: "10px" }}>
            {label}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#253A7D", color: "white" }}>
                  {data[label] &&
                    Object.keys(data[label][0] || {}).map((column) => (
                      <TableCell key={column} style={{ color: "white" }}>
                        {column.replace(/_/g, " ").toUpperCase()}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading[label] ? (
                  <TableRow>
                    <TableCell colSpan={data[label] ? Object.keys(data[label][0] || {}).length : 1} align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
                        <CircularProgress sx={{ color: "#253A7D" }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : data[label] && data[label].length > 0 ? (
                  data[label]
                    .slice(
                      pagination[label]?.page * pagination[label]?.rowsPerPage,
                      pagination[label]?.page * pagination[label]?.rowsPerPage + pagination[label]?.rowsPerPage
                    )
                    .map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i}>{value || "N/A"}</TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={data[label] ? Object.keys(data[label][0] || {}).length : 1} align="center">
                      <Typography variant="body1" sx={{ color: "text.secondary" }}>
                        No records exist
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {data[label] && data[label].length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={data[label].length}
              rowsPerPage={pagination[label]?.rowsPerPage || 5}
              page={pagination[label]?.page || 0}
              onPageChange={(event, newPage) => handleChangePage(label, newPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(label, event)}
            />
          )}
        </Paper>
      ))}
    </div>
  );
};

export default CustomerPackDetails;