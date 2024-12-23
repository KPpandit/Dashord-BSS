import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import FourG from '../../assets/FourG.png';
import FiveG from '../../assets/FiveG.png';
import CPE from '../../assets/CPE.png';
import FourGone from '../../assets/FourGone.png';
import wifiRouter from '../../assets/wifiRouter.png';

const Riple = ({ color, size, text, textColor }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      color: textColor,
    }}
  >
    <Box
      sx={{
        width: size === 'large' ? 50 : 30,
        height: size === 'large' ? 50 : 30,
        border: `4px solid ${color}`,
        borderRadius: '50%',
        borderTop: '4px solid transparent',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      }}
    />
    <Typography variant="h6" sx={{ marginTop: 2, color: textColor }}>
      {text}
    </Typography>
  </Box>
);

export default function SessionsOverview() {
  const tokenValue = localStorage.getItem('token');
  const navigate = useNavigate();

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [data, setData] = useState({
    EUTRA: { active: 0, inactive: 0, total: 0 },
    NR: { active: 0, inactive: 0, total: 0 },
    CPE: { active: 0, inactive: 0, total: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(120);

  const fetchData = async (ratType) => {
    try {
      let activeRes, inactiveRes;

      if (ratType === 'CPE') {
        activeRes = await axios.get(
          `https://bssproxy01.neotel.nr/ftth/api/aaa/subscriber/session/registrations/active/${date}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        inactiveRes = await axios.get(
          `https://bssproxy01.neotel.nr/ftth/api/aaa/subscriber/session/registrations/inactive/${date}`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        [activeRes, inactiveRes] = await Promise.all([
          axios.get(
            `https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/registrations/${date}/${ratType}/REG`,
            {
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          ),
          axios.get(
            `https://bssproxy01.neotel.nr/udrs/api/udr/subscriber/session/registrations/${date}/${ratType}/UNREG`,
            {
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          ),
        ]);
      }

      const activeCount = activeRes.data?.length || 0;
      const inactiveCount = inactiveRes.data?.length || 0;

      setData((prev) => ({
        ...prev,
        [ratType]: {
          active: activeCount,
          inactive: inactiveCount,
          total: activeCount + inactiveCount,
        },
      }));
    } catch (error) {
      console.error(`Error fetching data for ${ratType}:`, error);
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all(['EUTRA', 'NR', 'CPE'].map((ratType) => fetchData(ratType)));
      setLoading(false);
    };

    loadAllData();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadAllData();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const handleNavigate = (ratType) => {
    navigate(`/session/${ratType}`, { state: { date } });
  };

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const rows = [
    { label: '4G', key: 'EUTRA', image: FourGone },
    { label: '5G', key: 'NR', image: FiveG },
    { label: 'CPE', key: 'CPE', image: wifiRouter },
  ];

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '60vh' }}
      >
        <Riple color="#FAC22E" size="large" text="Loading..." textColor="#253A7D" />
      </Grid>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Paper elevation={10} sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#253A7D' }}>
            Session Overview
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#757575' }}>
            Refreshing in: {formatCountdown(countdown)}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={row.image} alt={row.label} style={{ height: 40, marginRight: 8 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {row.label}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: 'green', display: 'inline', fontWeight: 'bold' }}>
                      REG:
                    </Typography>
                    <Typography sx={{ color: 'green', display: 'inline', marginLeft: 1 }}>
                      {data[row.key].active}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: 'red', display: 'inline', fontWeight: 'bold' }}>
                      UNREG:
                    </Typography>
                    <Typography sx={{ color: 'red', display: 'inline', marginLeft: 1 }}>
                      {data[row.key].inactive}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Total: {data[row.key].total}</Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton color="primary" onClick={() => handleNavigate(row.key)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
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
