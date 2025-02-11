import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TablePagination, Typography, CircularProgress, Box 
} from "@mui/material";

export default function AllFreeOffers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get("https://bssproxy01.neotel.nr/offer/free-offer/offers/all");
            setOffers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Stop loading
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
            <Typography variant="h4" gutterBottom sx={{ color: "#253A7D", fontWeight: "bold", marginBottom: 3 }}>
                All Free Offers
            </Typography>

            {loading ? (
                <Box 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh"
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#253A7D' }}>
                                    <TableCell sx={{ color: 'white' }}>Offer ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Data Balance</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Voice Balance</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Offnet Voice Balance</TableCell>
                                    <TableCell sx={{ color: 'white' }}>SMS Balance</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Offnet SMS Balance</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Validity (Days)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {offers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((offer, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{offer.offerId}</TableCell>
                                        <TableCell>{offer.dataBalance}</TableCell>
                                        <TableCell>{offer.voiceBalance}</TableCell>
                                        <TableCell>{offer.offnetVoiceBalance}</TableCell>
                                        <TableCell>{offer.smsBalance}</TableCell>
                                        <TableCell>{offer.offnetSmsBalance}</TableCell>
                                        <TableCell>{offer.validity}</TableCell>
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
