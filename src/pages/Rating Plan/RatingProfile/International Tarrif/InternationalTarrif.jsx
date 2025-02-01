import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box,
    TablePagination,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = {
    COUNTRY_WISE: "https://bssproxy01.neotel.nr/abmf-idd/idd/api/v1/tariff/countries",
    ZONE_WISE: "https://bssproxy01.neotel.nr/abmf-idd/idd/api/v1/tariff/zones",
    SEARCH: "https://bssproxy01.neotel.nr/abmf-idd/idd/api/v1/tariff/country/",
    EDIT: "https://bssproxy01.neotel.nr/abmf-idd/idd/api/v1/tariff/set",
};

const InternationalTariff = () => {
    const [data, setData] = useState([]);
    const [isCountryWise, setIsCountryWise] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditing, setIsEditing] = useState({});
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchEmpty, setSearchEmpty] = useState(false);
    const [page, setPage] = useState(0);
    const [rowperpage, setRowPerPage] = useState(5);

    const fetchData = async (url, isSearch = false) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            const responseData = response.data;
            setData(isSearch ? [responseData] : responseData);
            setIsEditing({});
            setEditedData({});
            if (isSearch && responseData.length === 0) {
                setSearchEmpty(true);
            } else {
                setSearchEmpty(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setSearchEmpty(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(API.ZONE_WISE);
    }, []);

    const handleSearch = async () => {
        if (!searchQuery) return;
        fetchData(`${API.SEARCH}${searchQuery}`, true);
    };

    const handleEditChange = (id, field, value) => {
        const regex = /^[0-9]*\.?[0-9]*$/; // Allow valid numeric input
        if (regex.test(value)) {
            setEditedData((prev) => ({
                ...prev,
                [id]: { ...prev[id], [field]: value },
            }));
        }
    };

    const handleEditBlur = (id, field) => {
        setEditedData((prev) => {
            const currentValue = prev[id]?.[field];
            if (currentValue) {
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        [field]: parseFloat(currentValue).toFixed(2),
                    },
                };
            }
            return prev;
        });
    };

    const handleSave = async (id) => {
        const updatedData = editedData[id];
        const country = data.find((item) => item.id === id)?.country;
        const price = updatedData?.priceAud;

        try {
            const response = await axios.post(`${API.EDIT}/${country}/${price}`);
            if (response.status === 200) {
                const updated = {
                    ...data.find((item) => item.id === id),
                    ...editedData[id],
                };
                setData((prev) => prev.map((item) => (item.id === id ? updated : item)));
                setIsEditing((prev) => ({ ...prev, [id]: false }));
                toast.success(response.data.status, { autoClose: 2000 });
            } else {
                console.error("Failed to update tariff");
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const navigate=useNavigate();
    return (
        <div style={{ padding: "20px", backgroundColor: "#F8F9FA" }}>
            <Typography
                variant="h4"
                gutterBottom
                style={{ color: "#253A7D", textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}
            >
                International Tariff
            </Typography>
            <ToastContainer position="bottom-left" />
            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                {["Country-wise", "Zone-wise"].map((label, idx) => (
                    <Grid item key={label}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                const isCountry = idx === 0;
                                setIsCountryWise(isCountry);
                                fetchData(isCountry ? API.COUNTRY_WISE : API.ZONE_WISE);
                            }}
                            style={{
                                backgroundColor:
                                    (isCountryWise && idx === 0) || (!isCountryWise && idx === 1)
                                        ? "#DEAC1D"
                                        : "#253A7D",
                                color: "#FFFFFF",
                            }}
                        >
                            {label}
                        </Button>
                    </Grid>
                ))}
                <Grid item>
                    <TextField
                        label="Search Country"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        style={{ backgroundColor: "#253A7D", color: "#FFFFFF" }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            {loading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <CircularProgress style={{ color: "#FFD700" }} />
                    <Typography variant="body1" style={{ marginTop: "10px" }}>
                        Loading...
                    </Typography>
                </div>
            ) : searchEmpty ? (
                <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginTop: "20px", color: "#FF0000" }}
                >
                    Record not found
                </Typography>
            ) : (
                <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
                    <Paper elevation={10}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size="medium" padding="normal">
                                <TableHead>
                                    <TableRow>
                                        {["Country","Country Code","Country Litral", "Zone", "Price (AUD)", "Actions"].map((header) => (
                                            <TableCell
                                                style={{ backgroundColor: "#253A7D", color: "white" }}
                                                key={header}
                                                sx={{ textAlign: "left" }}
                                            >
                                                <Typography>{header}</Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        .slice(page * rowperpage, page * rowperpage + rowperpage)
                                        .map((item) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{
                                                    backgroundColor: isEditing[item.id] ? "#F6B625" : "",
                                                }}
                                            >
                                                {[,"country", "countryCode","country3Letter","zone", "priceAud"].map((field) => (
                                                    <TableCell key={field} sx={{ textAlign: "left", fontSize: "17px" }}>
                                                        {field === "priceAud" && isEditing[item.id] ? (
                                                            <TextField
                                                                value={editedData[item.id]?.[field] || item[field]?.toFixed(2) || ""}
                                                                onChange={(e) => handleEditChange(item.id, field, e.target.value)}
                                                                onBlur={() => handleEditBlur(item.id, field)}
                                                                type="text"
                                                            />
                                                        ) : field === "priceAud" ? (
                                                            parseFloat(item[field]).toFixed(2)
                                                        ) : (
                                                            item[field]
                                                        )}
                                                    </TableCell>
                                                ))}
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            isEditing[item.id]
                                                                ? handleSave(item.id)
                                                                : setIsEditing((prev) => ({ ...prev, [item.id]: true }))
                                                        }
                                                        style={{
                                                            backgroundColor: isEditing[item.id] ? "#DEAC1D" : "#253A7D",
                                                            color: "#FFFFFF",
                                                        }}
                                                    >
                                                        {isEditing[item.id] ? "Save" : "Edit"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{ color: "#253A7D" }}
                            rowsPerPageOptions={[5, 10, 25]}
                            rowsPerPage={rowperpage}
                            page={page}
                            count={data.length}
                            component="div"
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleRowsPerPage}
                        />
                    </Paper>
                    <Box sx={{
                        paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px',

                    }}>
                        <Button
                            sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                            variant="contained" backgroundColor="#253A7D" 
                            onClick={() => { navigate('/ratingProfile/internationalTarrif/add') }}
                            >
                            Create New
                        </Button>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default InternationalTariff;
