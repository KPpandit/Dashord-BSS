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

export default function PrepaidActivatedPlans() {
    const [tabList, setTabList] = useState([]);
    const [tabData, setTabData] = useState({});
    const [value, setValue] = useState(0); // Initialize with 0 for the first tab
    const [selectedCategory, setSelectedCategory] = useState(null);
    const tabContentsRef = useRef([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        // Fetch category names from the API
        fetch('https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs?pack_status=Approved')
            .then(response => response.json())
            .then(data => {
                const uniqueTabList = [...new Set(data.map(item => item.category_name))];
                setTabList(uniqueTabList);
            })
            .catch(error => console.error('Error fetching category names:', error));
    }, []);

    useEffect(() => {
        // Fetch plans data from the API based on selected category and tab name
        if (tabList.length > 0) {
            const promises = tabList.map(category =>
                fetch(`https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/get/all?category_name=${category}`)
                    .then(response => response.json())
                    .then(data => ({ category, data }))
            );

            Promise.all(promises)
                .then(results => {
                    const dataMap = results.reduce((acc, { category, data }) => {
                        acc[category] = data;
                        return acc;
                    }, {});
                    setTabData(dataMap);
                })
                .catch(error => {
                    console.error('Error fetching plans data:', error)
                    if (error.response && error.response.status === 401) {
                        console.log("From inside if condition");
                        localStorage.removeItem('token');
                        navigate("/");
                    }
                });
        }
    }, [tabList]);

    useEffect(() => {
        // Set the default selected category when the tab list is available
        if (tabList.length > 0) {
            setSelectedCategory(tabList[value]);
        }
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
                       Prepaid Approved Plan
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
                    margin:'-45px'
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
                                            <Card
                                                elevation={10}
                                                sx={{
                                                    margin: '8px',
                                                    border: '4px solid #e0e0e0',
                                                    backgroundColor: '#253A7D',
                                                    
                                                    flex: '1 0 auto',
                                                    // height: '270px',
                                                    borderRadius: '40px',
                                                    paddingLeft: 2,
                                                    paddingTop: 2
                                                }}
                                            >
                                                <CardContent sx={{ backgroundColor: '#253A7D', color: 'White' }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12}>
                                                                            <Typography>
                                                                                AUD$ {plan.price}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Typography
                                                                                sx={{ font: 'Bold', color: 'yellow' }}
                                                                                style={{ cursor: 'pointer' }}
                                                                                onClick={() => handleDetailsClick(plan)}
                                                                            >
                                                                                View Details...
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Grid container>
                                                                        <Grid item>
                                                                            <img src={LogoMo} alt='_blank' />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Typography>Validity :</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography>{plan.validity} Days</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Typography>Data :</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography>{plan.data_balance} {plan.data_balance_parameter}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 1 }}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Typography>Voice :</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography>{plan.onn_call_balance} mins</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ marginTop: 1 }}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12}>
                                                                    <Typography>SMS :</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography>{plan.onn_sms_balance}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sx={{ marginTop: 3 }}>
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
