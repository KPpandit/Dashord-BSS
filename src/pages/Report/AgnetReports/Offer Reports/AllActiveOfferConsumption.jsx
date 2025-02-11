import React, { useEffect, useState } from "react";
import axios from "axios";
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

export default function AllActiveOfferConsumption() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        "https://bssproxy01.neotel.nr/offer/free-offer/customers/active/consumption"
      );
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#253A7D", fontWeight: "bold", mb: 3 }}
      >
        Active Customers Consumptions
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#253A7D" }}>
                  {[
                    "MSISDN",
                    "Data Balance",
                    "SMS MOUs",
                    "Voice MOUs",
                    "Activation Time",
                    "Expiry Time",
                  ].map((col, index) => (
                    <TableCell key={index} sx={{ color: "white" }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {offers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((offer, index) => (
                    <TableRow key={index}>
                      <TableCell>{offer.msisdn}</TableCell>
                      <TableCell>{offer["data-balance"]}</TableCell>
                      <TableCell>
                        {offer["sms-mous"] === 99999 ? "Unlimited" : offer["sms-mous"]}
                      </TableCell>
                      <TableCell>
                        {offer["vo-mous"] === 99999 ? "Unlimited" : offer["vo-mous"]}
                      </TableCell>
                      <TableCell>{offer["active-ts"]}</TableCell>
                      <TableCell>{offer["expiry-ts"]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={offers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
