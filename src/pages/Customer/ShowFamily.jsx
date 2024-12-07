import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, Divider } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ShowFamily() {
    const location = useLocation();
    const { record } = location.state || {}; // Retrieve the record from the state
    const [childrenData, setChildrenData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tokenValue = localStorage.getItem("token");
    console.log('msisdn ',record)
    useEffect(() => {
        if (record && record.simInventory.msisdn) {
            // Fetch child accounts based on the parent's MSISDN
            axios
                .get(`https://bssproxy01.neotel.nr/crm/api/child_account_of_parent/${record.simInventory.msisdn}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setChildrenData(response.data);
                })
                .catch((err) => {
                    console.error("Error fetching children data:", err);
                    setError("Failed to fetch data. Please try again.");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false); // No record, no need to load
        }
    }, [record]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mt: 3,
                mb: 3,
            }}
        >
            {/* Heading */}
            <Typography variant="h4" sx={{ mb: 3, color: "#253A7D", fontWeight: "bold" }}>
                Family Tree
            </Typography>

            {/* Parent Card */}
            {record && (
                <Card
                    sx={{
                        backgroundColor: "#253A7D",
                        color: "white",
                        padding: 2,
                        textAlign: "center",
                        width: "450px",
                        height: "200px",
                        mb: 1.8,
                        boxShadow: 24,
                        borderRadius: "10px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                        },
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ paddingBottom: 2 }}>
                        Parent
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            textAlign: "left",
                        }}
                    >
                        <Box sx={{ width: "50%" }}>
                            <Typography>
                                <strong>First Name:</strong>
                            </Typography>
                            <Typography>
                                <strong>Last Name:</strong>
                            </Typography>
                            <Typography>
                                <strong>MSISDN:</strong>
                            </Typography>
                            <Typography>
                                <strong>DOB:</strong>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "50%",
                                display: "flex",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                                textAlign: "left",
                            }}
                        >
                            <Typography>{record.firstName || "N/A"}</Typography>
                            <Typography>{record.lastName || "N/A"}</Typography>
                            <Typography>{record.simInventory.msisdn || "N/A"}</Typography>
                            <Typography>{record.dateOfBirth || "N/A"}</Typography>
                        </Box>
                    </Box>
                </Card>
            )}

            {/* Decorative Divider */}
            <Divider
                sx={{
                    width: "80%",
                    my: 4,
                    borderColor: "#FFC50D",
                    "&::before, &::after": {
                        content: '""',
                        flex: 1,
                        borderBottom: "2px solid #FFC50D",
                    },
                    "& .MuiDivider-wrapper": {
                        color: "#253A7D",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontSize: "14px",
                    },
                }}
            >
                Below are the children
            </Divider>

            {/* Children Grid */}
            <Grid container spacing={10} justifyContent="center">
                {childrenData.length > 0 ? (
                    childrenData.map((child, index) => (
                        <Grid item key={index}>
                            <Card
                                sx={{
                                    backgroundColor: "#FFC50D",
                                    color: "black",
                                    padding: 2,
                                    textAlign: "center",
                                    width: "400px",
                                    height: "200px",
                                    border: "1px solid black",
                                    boxShadow: 24,
                                    borderRadius: "10px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                                    },
                                }}
                            >
                                <Typography variant="h6" gutterBottom sx={{ paddingBottom: 2 }}>
                                    Child {index + 1}
                                </Typography>
                                <Box
                                    sx={{
                                        paddingTop: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        textAlign: "left",
                                    }}
                                >
                                    <Box sx={{ width: "50%" }}>
                                        <Typography>
                                            <strong>Name:</strong>
                                        </Typography>
                                        <Typography>
                                            <strong>Last Name:</strong>
                                        </Typography>
                                        <Typography>
                                            <strong>MSISDN:</strong>
                                        </Typography>
                                        <Typography>
                                            <strong>DOB:</strong>
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "50%",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            flexDirection: "column",
                                            textAlign: "left",
                                        }}
                                    >
                                        <Typography>{child.firstName || "N/A"}</Typography>
                                        <Typography>{child.lastName || "N/A"}</Typography>
                                        <Typography>{child.simInventory.msisdn|| "N/A"}</Typography>
                                        <Typography>{child.dateOfBirth || "N/A"}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No children found for this parent.</Typography>
                )}
            </Grid>
        </Box>
    );
}
