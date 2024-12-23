import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material";

const ShowProductsPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook to programmatically navigate to another page
    const recordId = location.state?.record; // Retrieve the record ID passed through navigation

    const handleSimClick = () => {
        navigate("/partner/AssignProducts", { state: { record: recordId } });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Select the Product
            </Typography>
            <Grid container spacing={2}>
                {/* SIM Card */}
                <Grid item xs={12} sm={6}>
                    <Card sx={{ boxShadow: 5 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                SIM
                            </Typography>
                            <Typography variant="body2">
                                Choose from our range of SIM plans tailored to your needs.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={handleSimClick} // Trigger navigation on click
                            >
                                SIM
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                {/* Device Card */}
                <Grid item xs={12} sm={6}>
                    <Card sx={{ boxShadow: 5 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Device
                            </Typography>
                            <Typography variant="body2">
                                Explore the latest devices that pair perfectly with our services.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                            >
                                Device
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShowProductsPage;
