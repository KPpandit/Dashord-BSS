import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography } from "@mui/material";
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

  useEffect(() => {
    API_ENDPOINTS.forEach(({ url, label }) => {
      axios.get(url)
        .then(response => {
          setData(prev => ({ ...prev, [label]: response.data }));
          setPagination(prev => ({ ...prev, [label]: { page: 0, rowsPerPage: 5 } }));
        })
        .catch(error => console.error(`Error fetching ${label}:`, error));
    });
  }, []);

  const handleChangePage = (label, newPage) => {
    setPagination(prev => ({ ...prev, [label]: { ...prev[label], page: newPage } }));
  };

  const handleChangeRowsPerPage = (label, event) => {
    setPagination(prev => ({
      ...prev,
      [label]: { ...prev[label], rowsPerPage: parseInt(event.target.value, 10), page: 0 },
    }));
  };

  return (
    <div>
      {API_ENDPOINTS.map(({ label }) => (
        data[label] && data[label].length > 0 ? (
          <Paper key={label} sx={{ width: "100%", overflow: "hidden", mb: 3 }}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{label}</Typography>
            {/* <h3 style={{ textAlign: "center", backgroundColor: "#253A7D", color: "white", padding: "10px" }}>
              
            </h3> */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#253A7D", color: "white" }}>
                    {Object.keys(data[label][0]).map((column) => (
                      <TableCell key={column} style={{ color: "white" }}>
                        {column.replace(/_/g, " ").toUpperCase()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data[label]
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
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={data[label].length}
              rowsPerPage={pagination[label]?.rowsPerPage || 5}
              page={pagination[label]?.page || 0}
              onPageChange={(event, newPage) => handleChangePage(label, newPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(label, event)}
            />
          </Paper>
        ) : null
      ))}
    </div>
  );
};

export default CustomerPackDetails;
