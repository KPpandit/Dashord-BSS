import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, TextField, IconButton, CircularProgress, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import video from "../../assets/video.png";
import voice from "../../assets/voice.png";
import { Riple } from "react-loading-indicators";

export default function CallSession() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
    const [sessionData, setSessionData] = useState([]);
    const [voiceCalls, setVoiceCalls] = useState(0);
    const [videoCalls, setVideoCalls] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(120); // 2 minutes countdown

    const API_URL = `https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/voice/${selectedDate}`;
    const navigate = useNavigate();

    const totalCalls = voiceCalls + videoCalls;

    // Fetch data from the API based on the selected date
    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(API_URL);
            const data = response.data;

            // Separate calls based on policyName
            const totalVoiceCalls = data.filter(
                (item) => item.policyName === "Conversational_Voice"
            ).length;
            const totalVideoCalls = data.filter(
                (item) => item.policyName === "Conversational_Video"
            ).length;

            setSessionData(data);
            setVoiceCalls(totalVoiceCalls);
            setVideoCalls(totalVideoCalls);
            setError(null); // Reset error
        } catch (err) {
            setError("Failed to fetch data. Please check your API connection.");
            console.error(err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Auto-reload data every 2 minutes
    useEffect(() => {
        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 120000); // Fetch every 2 minutes

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [selectedDate]);

    // Countdown timer logic
    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 120)); // Reset countdown after reaching 0
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on unmount
    }, []);

    return (
        <Grid container spacing={2} padding={3}>
            <Grid item xs={12}>
                <Paper sx={{ padding: 2, boxShadow: 10 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#253A7D" }}>
                                Call Session Overview
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FF0000",textAlign:'right' }}>
                                Auto-reload in: {countdown}s
                            </Typography>
                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            {/* Countdown Timer */}
            <Grid item xs={12} style={{ textAlign: "right" }}>

            </Grid>

            {/* Date Picker */}
            <Grid item xs={12} sm={12}>
                <TextField
                    label="Select Date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    fullWidth
                />
            </Grid>

            {loading ? (
                // Show loading spinner while fetching data
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "60vh" }}
                >
                    <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
                </Grid>
            ) : (
                <>
                    {/* Display Voice Calls, Video Calls, Total, and Visibility Button */}
                    <Grid item xs={12} container spacing={2} alignItems="center">
                        {/* Voice Calls */}
                        <Grid item xs={3} container alignItems="center">
                            <img src={voice} alt="Voice" width={60} height={60} />
                            <Typography variant="h6" style={{ marginLeft: "10px" }}>
                                Voice:{" "}
                                <span style={{ color: "#253A7D", fontSize: "1.5rem" }}>
                                    {voiceCalls}
                                </span>
                            </Typography>
                        </Grid>

                        {/* Video Calls */}
                        <Grid item xs={3} container alignItems="center">
                            <img src={video} alt="Video" width={60} height={60} />
                            <Typography variant="h6" style={{ marginLeft: "10px" }}>
                                Video:{" "}
                                <span style={{ color: "#ECC02C", fontSize: "1.5rem" }}>
                                    {videoCalls}
                                </span>
                            </Typography>
                        </Grid>

                        {/* Total Calls */}
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Total:{" "}
                                <span style={{ color: "#3CB371", fontSize: "1.5rem" }}>
                                    {totalCalls}
                                </span>
                            </Typography>
                        </Grid>

                        {/* Visibility Button */}
                        <Grid item xs={3} style={{ textAlign: "right" }}>
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    navigate("/call-session-details", { state: { sessionData } })
                                }
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    {/* Display Error if API Fails */}
                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                </>
            )}
        </Grid>
    );
}
