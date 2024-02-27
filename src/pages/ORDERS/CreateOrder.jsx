import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Paper, createTheme } from '@mui/material';
import Details from './Details';
import SubOrder from './SubOrder';
import Review from './Review/Review';
import { useLocation } from 'react-router-dom';
import LineChanges from './Review/LineChanges';
import Product from './Product';
import Discounts from './Discounts';
import ChangeLog from './ChangeLog';

export default function CreateOrder() {
  const { customerObject } = useLocation().state;
  const [leftTabValue, setLeftTabValue] = useState(0);
  const [rightTabValue, setRightTabValue] = useState(0);
  console.log("Customer Object----->" + customerObject.id)

  const handleLeftTabChange = (event, newValue) => {
    setLeftTabValue(newValue);
  };

  const handleRightTabChange = (event, newValue) => {
    setRightTabValue(newValue);
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, padding: 2, marginRight: -1, marginLeft: -0.5, marginTop: -3.2 }}>
        <Paper elevation={10} sx={{ padding: 1, paddingLeft: 1.2, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
          <Grid>
            <Typography
              style={{

                fontSize: '20px',

                fontWeight: 'bold',

              }}
            >Create Order</Typography>
          </Grid>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', alignContent: 'center', marginTop: -2.5 }}>
        {/* Left Tab with 50% width */}

        <Grid item xs={6} sx={{ margin: '10px' }}>
          <Paper elevation={24} sx={{ display: 'flex', flexDirection: 'column'}}>
            <Tabs value={leftTabValue} onChange={handleLeftTabChange} sx={{ backgroundColor: '#253A7D', borderRadius: '5px', boxShadow: 10 }}>
              <Tab label="Details"
                sx={{
                  color: leftTabValue === 0 ? 'yellow' : 'white',
                  '&.Mui-selected': {
                    color: 'yellow',
                  },
                }} />
              <Tab label="Suborder"
                sx={{
                  color: leftTabValue === 1 ? 'yellow' : 'white',
                  '&.Mui-selected': {
                    color: 'yellow',
                  },
                }} />
              <Tab label="Product"
                sx={{
                  color: leftTabValue === 2 ? 'yellow' : 'white',
                  '&.Mui-selected': {
                    color: 'yellow',
                  },
                }} />
              <Tab label="Discount"
                sx={{
                  color: leftTabValue === 3 ? 'yellow' : 'white',
                  '&.Mui-selected': {
                    color: 'yellow',
                  },
                }} />
              <Tab label="Change Log"
                sx={{
                  color: leftTabValue === 4 ? 'yellow' : 'white',
                  '&.Mui-selected': {
                    color: 'yellow',
                  },
                }} />
            </Tabs>

            {/* Content below tabs with 50% height */}
            <Box sx={{ flex: '1', overflow: 'auto', padding: '16px', boxSizing: 'border-box' }}>
              <TabPanel value={leftTabValue} index={0}>
                <Details />
              </TabPanel>
              <TabPanel value={leftTabValue} index={1}>
                <SubOrder />
              </TabPanel>
              <TabPanel value={leftTabValue} index={2}>
                <Product />
              </TabPanel>
              <TabPanel value={leftTabValue} index={3}>
                <Discounts />
              </TabPanel>
              <TabPanel value={leftTabValue} index={4}>
                <ChangeLog />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>


        {/* Right Tab with 50% width */}
        <Grid item xs={6} sx={{ margin: '10px' }}>
          <Paper elevation={24} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px' }}>
            <Tabs value={rightTabValue} onChange={handleRightTabChange} sx={{ backgroundColor: '#253A7D', borderRadius: '10px', boxShadow: 10 }}>
              <Tab label="Review" sx={{
                color: rightTabValue === 0 ? 'yellow' : 'white',
                '&.Mui-selected': {
                  color: 'yellow',
                },
              }} />
              <Tab label="Line Changes" sx={{
                color: rightTabValue === 1 ? 'yellow' : 'white',
                '&.Mui-selected': {
                  color: 'yellow',
                },
              }} />

            </Tabs>

            {/* Content below right tabs with 50% height */}
            <Box sx={{ flex: '1', overflow: 'auto', padding: '16px', boxSizing: 'border-box' }}>
              <TabPanel value={rightTabValue} index={0}>
                <Review customerObject={customerObject} />
              </TabPanel>
              <TabPanel value={rightTabValue} index={1}>
                <LineChanges />
              </TabPanel>

            </Box>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}



function SuborderComponent() {
  return <Typography>Suborder Content</Typography>;
}

function ProductComponent() {
  return <Typography>Product Content</Typography>;
}

function DiscountComponent() {
  return <Typography>Discount Content</Typography>;
}
