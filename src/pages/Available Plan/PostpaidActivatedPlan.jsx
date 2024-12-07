import React, { useState, useEffect, useRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider, Grid } from '@mui/material';
import LogoMo from '../../assets/LogoMo.jpg';
import PlanDetailsModal from './PlanDetailsModal';

export default function PostpaidActivatedPlan() {
    const [tabList, setTabList] = useState([]);
    const [tabData, setTabData] = useState({});
    const [value, setValue] = useState(0); // Initialize with 0 for the first tab
    const [selectedCategory, setSelectedCategory] = useState(null);
    const tabContentsRef = useRef([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        fetch('https://bssproxy01.neotel.nr/abmf-postpaid/api/postpaid/packs?pack_status=Approved')
            .then(response => response.json())
            .then(data => {
                const uniqueTabList = [...new Set(data.map(item => item.category_name))];
                setTabList(uniqueTabList);
                setTabData(uniqueTabList.reduce((acc, category) => ({ ...acc, [category]: data.filter(item => item.category_name === category) }), {}));
            })
            .catch(error => {
                console.error('Error fetching category names and plans:', error);
                if (error.response && error.response.status === 401) localStorage.removeItem('token');
            });
    }, []);

    useEffect(() => {
        if (tabList.length) setSelectedCategory(tabList[value]);
    }, [tabList, value]);




    const handleChange = (event, newValue) => {
        setValue(newValue);
        const category = tabList[newValue];
        setSelectedCategory(category);
        // Use the ref to scroll into view
        if (tabContentsRef.current[newValue]) {
            tabContentsRef.current[newValue].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleDetailsClick = (plan) => {
        setSelectedPlan(plan);
        setOpenModal(true);
    };

    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    width: '100%',
                    zIndex: 1,
                    backgroundColor: 'white',
                    textAlign: 'center',
                }}
            >
                {/* <Typography variant="h6">Content Above Tabs</Typography> */}
            </Box>

            <Box
                sx={{
                    position: 'fixed',
                    width: '100%',
                    zIndex: 1,
                    backgroundColor: 'white',
                    borderBottom: '1px solid #ddd',
                    textAlign: 'center',
                    top: '48px',
                    paddingTop: 0,
                    marginTop: 3,
                    paddingRight: 0,
                }}
            >
                <Paper elevation={20} sx={{ marginBottom: 2 }}>
                    <Typography sx={{
                        color: "#253A7D", fontSize: '20px',
                        fontWeight: 'Bold',
                        fontFamily: 'Roboto',
                        marginRight: 45,
                        marginBottom: 0.7,
                        textAlign: 'left',
                        padding: 1,
                        paddingLeft: 2,
                    }}>
                        Postpaid Activated Plan
                    </Typography>
                </Paper>

                <Paper elevation={20}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                            backgroundColor: '#FAC22E',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {tabList.map((category, index) => (
                            <Tab
                                key={index}
                                label={category}
                                sx={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    flexGrow: 0,
                                    flexBasis: 'auto',
                                    fontSize: "16px",
                                    backgroundColor: value === index ? '#FBD46C' : 'transparent',
                                    color: value === index ? 'White' : 'Black'
                                }}
                                style={{ textTransform: 'none' }}
                            />
                        ))}
                    </Tabs>
                </Paper>
            </Box>

            <Box
                sx={{
                    marginTop: '-25px',
                    overflowY: 'auto',
                    position: 'relative',
                    minHeight: 'calc(100vh - 144px)',
                    margin: '-45px'
                }}
            >
                {selectedCategory && (
                    <Box
                        ref={(el) => (tabContentsRef.current[value] = el)}
                        mt={20}
                        ml={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="left"
                        justifyContent="left"
                        paddingTop={0}
                    >
                        <Typography textAlign={'left'} sx={{ fontFamily: 'Roboto', fontSize: '18px', paddingLeft: 2.5 }}>
                            All Plans For {selectedCategory}
                        </Typography>
                        {console.log(selectedCategory + "Selected Category")}
                        <Grid container spacing={2}>
                            {tabData[selectedCategory] && tabData[selectedCategory].map((plan) => {
                                if (plan.category_name === selectedCategory) {
                                    return (
                                        <Grid item xs={4} key={plan.rating_profile_id}>
                                            <Card elevation={10} sx={{ margin: '8px', border: '4px solid #e0e0e0', backgroundColor: '#253A7D', borderRadius: '40px', paddingLeft: 2, paddingTop: 2 }}>
                                                <CardContent sx={{ color: 'White' }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <Typography>AUD$ {plan.price ?? 0}</Typography>
                                                                    <Typography sx={{ font: 'Bold', color: 'yellow', cursor: 'pointer' }} onClick={() => handleDetailsClick(plan)}>View Details...</Typography>
                                                                </Grid>
                                                                <Grid item xs={6}><img src={LogoMo} alt='_blank' /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                                                            <Typography>Validity: {plan.validity ?? 0} Days</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                                                            <Typography>Data: {plan.data_balance ?? 0} {plan.data_balance_parameter ?? ''}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 1 }}>
                                                            <Typography>Voice: {plan.onn_call_balance ?? 0} mins</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 1 }}>
                                                            <Typography>SMS: {plan.onn_sms_balance ?? 0}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sx={{ marginTop: 1 }}>
                                                            <Typography style={{ fontSize: '15px', fontFamily: 'Roboto' }}>Additional Benefits(s)</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                }
                                return null;
                            })}
                        </Grid>
                        <PlanDetailsModal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            planDetails={selectedPlan}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
