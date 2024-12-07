import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CreateChild() {
    const location = useLocation();
    const { record } = location.state || {};
    console.log("---------- ",record.simInventory.msisdn)
    const [childNumber, setChildNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState("");

    // Extract parent number from state passed via `navigate`
    const tokenValue = localStorage.getItem('token');

    const handleChildCreation = async () => {
        if (!childNumber) {
            setNotification("Please enter a child number.");
            return;
        }

        setLoading(true);
        setNotification("");

        try {
            const response = await axios.put(
                `https://bssproxy01.neotel.nr/crm/api/map/parent_number/${record.simInventory.msisdn}/child_number/${childNumber}`,
                {}, // Request body if any; here it's empty
                {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                setNotification("Child created successfully!");
                setChildNumber(""); // Clear input field
            }
        } catch (error) {
            console.error("Error creating child:", error);
            setNotification("Something went wrong. Please try again.");
        }
        
    };

    return (
        <Box sx={{ p: 3, maxWidth: 400, margin: "auto", textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Create Child Subscriber
            </Typography>
            <TextField
                label="Enter Child Number"
                value={childNumber}
                onChange={(e) => setChildNumber(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                sx={{ backgroundColor: "#253A7D", color: "white", mb: 2 }}
                onClick={handleChildCreation}
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Child"}
            </Button>
            {notification && (
                <Typography
                    sx={{
                        mt: 2,
                        color: notification.includes("successfully") ? "green" : "red",
                    }}
                >
                    {notification}
                </Typography>
            )}
        </Box>
    );
}
