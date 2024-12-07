import React, { useEffect, useState } from "react";
import {
    Grid,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    IconButton,
} from "@mui/material";
import axios from "axios";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import FourG from "../../assets/FourG.png";
import { Riple } from "react-loading-indicators";
import FiveG from "../../assets/FiveG.png";
import FourGone from '../../assets/FourGone.png';
import RouterIcon from '@mui/icons-material/Router';
export default function DataSession() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default date: today
    const [sessionData, setSessionData] = useState({ EUTRA: {}, NR: {}, CPE: {} });
    const [fullData, setFullData] = useState({ EUTRA: {}, NR: {}, CPE: {} });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [countdown, setCountdown] = useState(120); // 2 minutes in seconds

    const API_BASE_URL = "https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/registrations";
    const CPE_API_URL = "https://bssproxy01.neotel.nr/ftth/api/aaa/subscriber/session/registrations/active/2024-11-30";
    const DNN = "Web.neotel.nr";

    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const responses = await Promise.all([
                axios.get(`${API_BASE_URL}/${selectedDate}/EUTRA/REG/${DNN}`), // 4G Registered
                axios.get(`${API_BASE_URL}/${selectedDate}/EUTRA/UNREG/${DNN}`), // 4G Unregistered
                axios.get(`${API_BASE_URL}/${selectedDate}/NR/REG/${DNN}`), // 5G Registered
                axios.get(`${API_BASE_URL}/${selectedDate}/NR/UNREG/${DNN}`), // 5G Unregistered
                axios.get(`https://bssproxy01.neotel.nr/ftth/api/aaa/subscriber/session/registrations/active/${selectedDate}`), // Active CPE
                axios.get(`https://bssproxy01.neotel.nr/ftth/api/aaa/subscriber/session/registrations/inactive/${selectedDate}`), // Inactive CPE
            ]);

            // CPE data from separate APIs
            const cpeRegistered = responses[4].data || []; // Active
            const cpeUnregistered = responses[5].data || []; // Inactive

            // Create summary data
            const summaryData = {
                EUTRA: {
                    registered: responses[0].data.length,
                    unregistered: responses[1].data.length,
                    total: responses[0].data.length + responses[1].data.length,
                },
                NR: {
                    registered: responses[2].data.length,
                    unregistered: responses[3].data.length,
                    total: responses[2].data.length + responses[3].data.length,
                },
                CPE: {
                    registered: cpeRegistered.length,
                    unregistered: cpeUnregistered.length,
                    total: cpeRegistered.length + cpeUnregistered.length,
                },
            };

            // Fetch full data for detailed view
            const fullDataFetched = {
                EUTRA: {
                    registered: responses[0].data,
                    unregistered: responses[1].data,
                },
                NR: {
                    registered: responses[2].data,
                    unregistered: responses[3].data,
                },
                CPE: {
                    registered: cpeRegistered,
                    unregistered: cpeUnregistered,
                },
            };

            setSessionData(summaryData);
            setFullData(fullDataFetched);
        } catch (err) {
            console.error("Error fetching session data:", err);
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const handleViewClick = (ratType) => {
        navigate("/detailed-view", {
            state: { ratType, data: fullData[ratType] },
        });
    };

    // Timer countdown logic
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCountdown((prevCountdown) => {
    //             if (prevCountdown === 1) {
    //                 fetchData(); // Refresh data when countdown reaches 0
    //                 return 120; // Reset countdown to 2 minutes
    //             }
    //             return prevCountdown - 1;
    //         });
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Grid container spacing={4} padding={3}>
            <Grid item xs={12}>
                <Paper sx={{ padding: 2, boxShadow: 10 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#253A7D" }}>
                                Data Session Overview
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FF0000", textAlign: 'right' }}>
                                {/* Auto-refresh in: {formatTime(countdown)} */}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Select Date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    fullWidth
                />
            </Grid>

            {loading ? (
                <Grid container justifyContent="center" alignItems="center" style={{ height: "60vh" }}>
                    <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
                </Grid>
            ) : error ? (
                <Grid item xs={12}>
                    <Typography color="error">{error}</Typography>
                </Grid>
            ) : (
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>RAT Type</TableCell>
                                    <TableCell align="center">Registered Count</TableCell>
                                    <TableCell align="center">Unregistered Count</TableCell>
                                    <TableCell align="center">Total Count</TableCell> {/* Added Total Count */}
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <img src={FourGone} alt="4G" style={{ width: 50, height: 50 }} />
                                            </Grid>
                                            <Grid item>4G (EUTRA)</Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="center">{sessionData.EUTRA?.registered || 0}</TableCell>
                                    <TableCell align="center">{sessionData.EUTRA?.unregistered || 0}</TableCell>
                                    <TableCell align="center">{sessionData.EUTRA?.total || 0}</TableCell> {/* Total Count for EUTRA */}
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleViewClick("EUTRA")}>
                                            <ArrowForward />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <img src={FiveG} alt="5G" style={{ width: 50, height: 50 }} />
                                            </Grid>
                                            <Grid item>5G (NR)</Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="center">{sessionData.NR?.registered || 0}</TableCell>
                                    <TableCell align="center">{sessionData.NR?.unregistered || 0}</TableCell>
                                    <TableCell align="center">{sessionData.NR?.total || 0}</TableCell> {/* Total Count for NR */}
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleViewClick("NR")}>
                                            <ArrowForward />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <RouterIcon sx={{ width: 50, height: 50 }} />
                                            </Grid>
                                            <Grid item>CPE</Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="center">{sessionData.CPE?.registered || 0}</TableCell>
                                    <TableCell align="center">{sessionData.CPE?.unregistered || 0}</TableCell>
                                    <TableCell align="center">{sessionData.CPE?.total || 0}</TableCell> {/* Total Count for CPE */}
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleViewClick("CPE")}>
                                            <ArrowForward />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            )}
        </Grid>
    );
}
