import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalysisAgent = () => {
    const { state } = useLocation();
    const { selectedRecord } = state || {};
    const [transactionData, setTransactionData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedRecord) {
            fetchTransactionData();
        }
    }, [selectedRecord]);

    const fetchTransactionData = async () => {
        try {
            const response = await axios.get(
                `https://bssproxy01.neotel.nr/cbms/cbm/api/v1/partner/reports/txns/outward/2025-02-01/2025-02-02`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            // Filter transactions for the selected partnerId
            const partnerTransactions = response.data[selectedRecord.partnerMsisdn];
            if (partnerTransactions) {
                // Transform the data for the graph
                const transformedData = transformData(partnerTransactions);
                setTransactionData(transformedData);
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Transform the API response into a format suitable for Recharts
    const transformData = (transactions) => {
        const amountCountMap = {};

        // Iterate through all amounts and their nested transactions
        for (const [amount, transactionList] of Object.entries(transactions)) {
            amountCountMap[amount] = transactionList.length; // Count of transactions for this amount
        }

        // Convert the map into an array of objects for Recharts
        return Object.entries(amountCountMap).map(([amount, count]) => ({
            amount: parseFloat(amount), // Convert amount to number
            count, // Count of transactions
        }));
    };

    if (!selectedRecord) {
        return <Typography>No record selected.</Typography>;
    }

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>Analysis for Partner ID: {selectedRecord.partnerId}</Typography>
                <Typography><strong>Total Core Balance:</strong> {selectedRecord.totalCoreBalance}</Typography>
                <Typography><strong>Credit Balance:</strong> {selectedRecord.creditBalance}</Typography>
                <Typography><strong>Reserve Balance:</strong> {selectedRecord.reserveBalance}</Typography>
                <Typography><strong>Transaction Reference:</strong> {selectedRecord.txnReference}</Typography>
                <Typography><strong>Status:</strong> {selectedRecord.status}</Typography>

                {/* Graph Section */}
                <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
                    Transaction Count by Amount
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={transactionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="amount"
                            label={{ value: 'Amount', position: 'insideBottom', offset: -10 }}
                            type="number"
                            domain={[0, 'auto']}
                        />
                        <YAxis
                            label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                            allowDecimals={false}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default AnalysisAgent;