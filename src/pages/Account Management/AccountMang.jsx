import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Paper, createTheme } from '@mui/material';

import { useLocation } from 'react-router-dom';
import LineChanges from '../ORDERS/Review/LineChanges';
import Details from '../ORDERS/Details';
import SubOrder from '../ORDERS/SubOrder';
import Product from '../ORDERS/Product';
import Discounts from '../ORDERS/Discounts';
import ChangeLog from '../ORDERS/ChangeLog';
import PrePaidAccount from './PrepaidAccount.jsx/PrePaidAccount';
import PrePaidRoaming from './PrePaidRoamingAccount/PrePaidRoaming';
// import Category from './Category/Category';
// import RatesOffer from './RatesOffer/RatesOffer';
// import RatingProfile from './RatingProfile/RatingProfile';



export default function AccountMang() {
    //   const { customerObject } = useLocation().state;
    const [leftTabValue, setLeftTabValue] = useState(0);
    const [rightTabValue, setRightTabValue] = useState(0);
    //   console.log("Customer Object----->" + customerObject.id)

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
                        >Accounts Management</Typography>
                    </Grid>
                </Paper>
            </Box>
            <Box sx={{ display: 'flex', alignContent: 'center', marginTop: -2.5 }}>
                {/* Left Tab with 50% width */}

                <Grid item xs={12} sx={{ margin: '10px' }}>
                    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px',textAlign:'center' }}>
                        <Tabs value={leftTabValue} onChange={handleLeftTabChange} sx={{ backgroundColor: '#253A7D', borderRadius: '5px', boxShadow: 10 }}>
                            <Tab label="Pre Paid Account"
                                sx={{
                                    color: leftTabValue === 0 ? 'yellow' : 'white',
                                    '&.Mui-selected': {
                                        color: 'yellow',
                                    },
                                }} />
                            <Tab label="Pre Paid Roaming Account"
                                sx={{
                                    color: leftTabValue === 1 ? 'yellow' : 'white',
                                    '&.Mui-selected': {
                                        color: 'yellow',
                                    },
                                }} />
                            {/* <Tab label="Rating Profile"
                                sx={{
                                    color: leftTabValue === 2 ? 'yellow' : 'white',
                                    '&.Mui-selected': {
                                        color: 'yellow',
                                    },
                                }} /> */}
                          
                        </Tabs>

                        {/* Content below tabs with 50% height */}
                        <Box sx={{ flex: '1', overflow: 'auto',marginLeft:-2.8,marginRight:-2.8}}>
                            <TabPanel  value={leftTabValue} index={0}>
                                <PrePaidAccount/>
                            </TabPanel>
                            <TabPanel value={leftTabValue} index={1}>
                                <PrePaidRoaming />
                            </TabPanel>
                            <TabPanel value={leftTabValue} index={2}>
                                {/* <RatingProfile /> */}
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
