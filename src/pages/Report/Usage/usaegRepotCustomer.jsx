import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

export default function UsageReportCustomer() {
  const [smsData, setSmsData] = useState([]);
  const [dataUsage, setDataUsage] = useState([]);
  const [callUsage, setCallUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  const [smsPage, setSmsPage] = useState(0);
  const [smsRowsPerPage, setSmsRowsPerPage] = useState(5);

  const [dataPage, setDataPage] = useState(0);
  const [dataRowsPerPage, setDataRowsPerPage] = useState(5);

  const [callPage, setCallPage] = useState(0);
  const [callRowsPerPage, setCallRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const smsResponse = await axios.get(
          "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/all/sms/usage/report"
        );
        const dataResponse = await axios.get(
          "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/all/data/usage/report"
        );
        const callResponse = await axios.get(
          "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/all/call/usage/report"
        );

        setSmsData(smsResponse.data);
        setDataUsage(dataResponse.data);
        setCallUsage(callResponse.data);
      } catch (error) {
        console.error("Error fetching usage reports", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "90%", margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Usage Report of All Customer
      </Typography>

      {/* SMS Usage Report */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        SMS Usage Report
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#253A7D', color: 'white' }}>
              <TableCell style={{ color: 'white' }}>Activation Date</TableCell>
              <TableCell style={{ color: 'white' }}>MSISDN</TableCell>
              <TableCell style={{ color: 'white' }}>Pack Name</TableCell>
              <TableCell style={{ color: 'white' }}>Offered SMS</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed SMS</TableCell>
              <TableCell style={{ color: 'white' }}>Offered OFF NET SMS</TableCell>
              
              <TableCell style={{ color: 'white' }}>Consumed OFF NET SMS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {smsData
              .slice(smsPage * smsRowsPerPage, smsPage * smsRowsPerPage + smsRowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.activation_date}</TableCell>
                  <TableCell>{row.msisdn}</TableCell>
                  <TableCell>{row.pack_name}</TableCell>
                  <TableCell>{row.offered_sms}</TableCell>
                  <TableCell>{row.consumed_sms}</TableCell>
                  <TableCell>{row.offered_ofn_sms}</TableCell>
                 
                  <TableCell>{row.consumed_ofn_sms}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
       sx={{ color: '#253A7D' }}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={smsData.length}
        rowsPerPage={smsRowsPerPage}
        page={smsPage}
        onPageChange={(event, newPage) => setSmsPage(newPage)}
        onRowsPerPageChange={(event) => {
          setSmsRowsPerPage(parseInt(event.target.value, 10));
          setSmsPage(0);
        }}
      />

      {/* Data Usage Report */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Data Usage Report
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#253A7D', color: 'white' }}>
              <TableCell style={{ color: 'white' }}>Activation Date</TableCell>
              <TableCell style={{ color: 'white' }}>MSISDN</TableCell>
              <TableCell style={{ color: 'white' }}>Pack Name</TableCell>
              <TableCell style={{ color: 'white' }}>Offered Data</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed Data</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed Data (GB)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataUsage
              .slice(dataPage * dataRowsPerPage, dataPage * dataRowsPerPage + dataRowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.activation_date}</TableCell>
                  <TableCell>{row.msisdn}</TableCell>
                  <TableCell>{row.pack_name}</TableCell>
                  <TableCell>{row.offered_data==='931 GB'?'unlimited':row.offered_data}</TableCell>
                  <TableCell>{row.consumed_data}</TableCell>
                  <TableCell>{row.consumed_data_in_gb}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
       sx={{ color: '#253A7D' }}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={dataUsage.length}
        rowsPerPage={dataRowsPerPage}
        page={dataPage}
        onPageChange={(event, newPage) => setDataPage(newPage)}
        onRowsPerPageChange={(event) => {
          setDataRowsPerPage(parseInt(event.target.value, 10));
          setDataPage(0);
        }}
      />

      {/* Call Usage Report */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Call Usage Report
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#253A7D', color: 'white' }}>
              <TableCell style={{ color: 'white' }}>Activation Date</TableCell>
              <TableCell style={{ color: 'white' }}>MSISDN</TableCell>
              <TableCell style={{ color: 'white' }}>Pack Name</TableCell>
              <TableCell style={{ color: 'white' }}>Offered Calls</TableCell>
              <TableCell style={{ color: 'white' }}>Offered OFN Calls</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed Mins</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed OFN Mins</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed Calls</TableCell>
              <TableCell style={{ color: 'white' }}>Consumed OFN Calls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callUsage
              .slice(callPage * callRowsPerPage, callPage * callRowsPerPage + callRowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.activation_date}</TableCell>
                  <TableCell>{row.msisdn}</TableCell>
                  <TableCell>{row.pack_name}</TableCell>
                  <TableCell>{row.offered_calls}</TableCell>
                  <TableCell>{row.offered_ofn_calls}</TableCell>
                  <TableCell>{row.consumed_mins}</TableCell>
                  <TableCell>{row.consumed_ofn_mins}</TableCell>
                  <TableCell>{row.consumed_calls}</TableCell>
                  <TableCell>{row.consumed_ofn_calls}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
       sx={{ color: '#253A7D' }}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={callUsage.length}
        rowsPerPage={callRowsPerPage}
        page={callPage}
        onPageChange={(event, newPage) => setCallPage(newPage)}
        onRowsPerPageChange={(event) => {
          setCallRowsPerPage(parseInt(event.target.value, 10));
          setCallPage(0);
        }}
      />
    </Box>
  );
}
