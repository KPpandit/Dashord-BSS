import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Typography,
    Grid,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function OrderChangeStatus() {
    const [language, setLanguage] = useState('');
    const [rows, setRows] = useState([{ name: 'English', order: '', applied: false }]);

    const handleCheckboxChange = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].applied = !updatedRows[index].applied;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { name: language, order: '', applied: false }]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1); // Remove both English and the selected language
        setRows(updatedRows);
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' ,paddingLeft:2 }}>
            <Paper elevation={5} sx={{ maxWidth: '80%', overflowX: 'auto' }}>
                <Grid sx={{ backgroundColor: '#253A7D' }}>
                    <Paper elevation={3}>
                        <Grid backgroundColor={'#253A7D'} color={'white'}>
                            <Typography sx={{fontSize:'19px',paddingLeft:1}}>
                                ORDER CHANGE STATUSES
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Box sx={{ p: 3, color: 'white' }}>
                    <FormControl sx={{ width: 350 }}>
                        <InputLabel id="language-label">Edit statuses for</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language-select"
                            value={language}
                            label="Edit statuses for"
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Portugues">Portugues</MenuItem>
                            <MenuItem value="Deutsch">Deutsch</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                            <MenuItem value="Hindi">Hindi</MenuItem>
                            <MenuItem value="Chinese">Chinese</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer sx={{ pl:1,paddingRight:2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#253A7D', color: 'white' }}>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#253A7D', color: 'white' }}>NAME</TableCell>
                                <TableCell sx={{ backgroundColor: '#253A7D', color: 'white' }}>ORDER</TableCell>
                                <TableCell sx={{ backgroundColor: '#253A7D', color: 'white' }}>APPLIED</TableCell>
                                <TableCell sx={{ backgroundColor: '#253A7D', color: 'white' }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (

                                <TableRow key={index} onClick={() => { console.log(row.name + "where is the key") }}>
                                    <TableCell>
                                        <Grid container spacing={2}>
                                            {language === 'English' && (
                                                <Grid item lg={12}>
                                                    <TextField value={row.name} />
                                                </Grid>
                                            )}
                                            {language !== 'English' && (
                                                <>
                                                    <Grid item lg={12}>
                                                        <TextField label={'English'} />
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <TextField label={language} />
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={row.order} onChange={(e) => handleOrderChange(e, index)} />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            name={`applied-${index}`}
                                            checked={row.applied}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleRemoveRow(index)}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                        {index === rows.length - 1 && (
                                            <IconButton onClick={handleAddRow}>
                                                <AddCircleIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
