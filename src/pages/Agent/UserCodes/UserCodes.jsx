import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
const UserDetails = ({ selectedRows }) => {
    const navigate = useNavigate();
    if (!selectedRows.length) {
        return (

            <></>
        );
    }

    return (
        <Card elevation={20}>
            <Paper elevation={20} variant="outlined" sx={{ maxWidth: 360 ,padding:0.5}}>
                <Box sx={{ p: 0.5 }}>
                    {selectedRows.map((selectedRow, index) => (
                        <Grid key={index}>
                            <Grid sx={{ backgroundColor: '#253A7D', color: 'white' }} padding={0.1}>
                                <Typography gutterBottom  sx={{padding:1,paddingLeft:1.8}} component="div" >
                                    {selectedRow.user_code}
                                </Typography>
                            </Grid>
                            <Grid container spacing={3} paddingTop={2} padding={2}>
                                <Grid item lg={12}>
                                    <Typography sx={{fontSize:'17px'}} gutterBottom variant="body2">
                                        External Ref: {selectedRow.external_ref}
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography sx={{fontSize:'17px'}} gutterBottom variant="body2">
                                        Type: {selectedRow.type}
                                    </Typography>
                                    <Divider />
                                </Grid>
                                
                                <Grid item lg={12}>
                                    <Typography sx={{fontSize:'17px'}} gutterBottom variant="body2">
                                        Description:
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography sx={{fontSize:'17px'}} gutterBottom variant="body2">
                                        Valid From :
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item lg={12}>
                                    <Typography sx={{fontSize:'17px'}} gutterBottom variant="body2">
                                        Valid To :
                                    </Typography>

                                </Grid>
                                <Box  sx={{ paddingLeft: '45px', paddingBottom: '6px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                                    <Button variant="contained" backgroundColor="#253A7D"
                                     sx={{backgroundColor:'#253A7D'}}
                                        onClick={() => navigate('/editUserCode', { state: { id: selectedRow.user_code } })}
                                    >
                                        {<EditIcon sx={{ paddingRight: 1 }} />}Edit
                                    </Button>
                                    <Button variant="contained" backgroundColor="#253A7D"
                                    sx={{backgroundColor:'#253A7D'}}
                                    >
                                        {<CloseIcon sx={{ paddingRight: 1 }} />} Deactivate
                                    </Button>
                                </Box>

                            </Grid>




                        </Grid>
                    ))}
                </Box>
            </Paper>

        </Card>
    );
};

export default function UserCodes() {
    const location = useLocation();
    const { id } = location.state || {};
    const columns = [
        { id: 'user_code', name: 'User Code' },
        { id: 'external_ref', name: 'External Ref' },
        { id: 'type', name: 'Type' },
        { id: 'valid_to', name: 'Valid To' },
    ];
    const navigate = useNavigate();
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                user_code: `User Code ${i}`,
                external_ref: `External Ref ${i}`,
                type: `Type ${i}`,
                valid_to: `Valid To ${i}`,
            });
        }
        return data;
    };

    const [rows, setRows] = useState(generateData());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (row) => {
        setSelectedRows([row]);
    };

    return (
        <Box sx={{ display: 'container' }}>
            <Box sx={{ width: '70%', padding: '5px' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%' }}>
                    <Paper elevation={10}>
                        <Grid sx={{ backgroundColor: '#253A7D', padding: 1 }}>
                            <Typography color="white" component="h6" sx={{ fontSize: '17px', paddingLeft: 1 }}>
                                User Code For Agent
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} padding={2}>
                            <Grid item lg={12} textAlign="center">
                                <TextField id="outlined-basic" label="Filter By User Code or External Ref" variant="outlined" />
                            </Grid>
                            <Grid item lg={12} sx={{ marginLeft: -4.3 }} textAlign="center">
                                <FormControlLabel control={<Checkbox checked={false} />} label="My Checkbox" />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={10} sx={{ marginTop: 2 }}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader size="medium" padding="normal">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                style={{ backgroundColor: '#253A7D', color: 'white' }}
                                                key={column.id}
                                                sx={{ textAlign: 'left' }}
                                            >
                                                <Typography sx={{ fontSize: '17px' }}>{column.name}</Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <TableRow
                                            key={index}
                                            onClick={() => handleRowClick(row)}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: selectedRows.find((selectedRow) => selectedRow.user_code === row.user_code)
                                                    ? '#F6C228'
                                                    : 'inherit',
                                            }}
                                        >
                                            {columns.map((column) => (
                                                <TableCell key={column.id} sx={{ textAlign: 'left' }}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{ color: '#253A7D' }}
                            rowsPerPageOptions={[5, 10, 25]}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            count={rows.length}
                            component="div"
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>

                    <Box sx={{ paddingLeft: '16px', paddingBottom: '16px', paddingTop: '14px', display: 'flex', gap: '16px' }}>
                        <Button variant="contained" backgroundColor="#253A7D"
                            sx={{ backgroundColor: '#253A7D', boxShadow: 20 }}
                            onClick={e => { navigate("/addUserCode") }}>
                            ADD NEW
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ paddingLeft: 3, paddingTop: 1.5 }}>
                <UserDetails selectedRows={selectedRows} />
            </Box>
        </Box>
    );
}
