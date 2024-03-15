import { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import axios from 'axios';

export default function Currencies() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'symbol', name: 'Symbol' },
        { id: 'code', name: 'Code' },
        { id: 'countryCode', name: 'Country Code' },
        // { id: 'description', name: 'Description' },
        { id: 'rate', name: 'Rate' },
        { id: 'sysRate', name: 'System Rate' },
        { id: 'inUse', name: 'In use' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.5.10.2:9090/api/allcurrency', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    const handleEditRow = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].isEditing = true;
        setRows(updatedRows);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const handleSaveChanges = async (index) => {
        const updatedRows = [...rows];
        updatedRows[index].isEditing = false;
        setRows(updatedRows);

        try {
            const response = await axios.put(`http://172.5.10.2:9090/api/updatecurrency/${updatedRows[index].id}`, updatedRows[index], {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            console.log('Updated row:', response.data);
        } catch (error) {
            console.error('Error updating row:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%', paddingLeft: 2 }}>
        <Paper elevation={10} sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {column.name}
                                </TableCell>
                            ))}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <TableRow key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            {row.isEditing ? (
                                                column.id === 'inUse' ? (
                                                    <FormControl component="fieldset">
                                                        <RadioGroup
                                                            row
                                                            aria-label="inUse"
                                                            name="inUse"
                                                            value={row.inUse ? 'true' : 'false'}
                                                            onChange={(e) => handleInputChange(e, rowIndex)}
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="True" />
                                                            <FormControlLabel value="false" control={<Radio />} label="False" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                ) : (
                                                    <TextField
                                                        name={column.id}
                                                        value={row[column.id]}
                                                        onChange={(e) => handleInputChange(e, rowIndex)}
                                                    />
                                                )
                                            ) : (
                                                String(row[column.id])
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {row.isEditing ? (
                                            <Button onClick={() => handleSaveChanges(rowIndex)}>Save</Button>
                                        ) : (
                                            <Button onClick={() => handleEditRow(rowIndex)}>Edit</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>
    

    
    );
}
