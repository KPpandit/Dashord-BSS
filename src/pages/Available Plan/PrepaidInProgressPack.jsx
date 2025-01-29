import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Card, CardContent, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import PlanDetailsModal from './PlanDetailsModal';
import LogoMo from '../../assets/LogoMo.jpg';

export default function PrepaidInProgressPlan() {
    const [tabList, setTabList] = useState([]);
    const [tabData, setTabData] = useState({});
    const [value, setValue] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const tabContentsRef = useRef([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [remark, setRemark] = useState('');
    const [selectedPlanName, setSelectedPlanName] = useState('');
    const [checkedPlan, setCheckedPlan] = useState(null); // State to track the checked plan

    useEffect(() => {
        fetch('https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs?pack_status=Pending')
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
        setSelectedCategory(tabList[newValue]);
        tabContentsRef.current[newValue]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleDetailsClick = (plan) => {
        setSelectedPlan(plan);
        setOpenModal(true);
    };

    const handleReject = (name) => {
        setSelectedPlanName(name);
        setOpen(true);
        setCheckedPlan(null); // Reset checked plan on reject
    };

    const handleApprove = async (name) => {
        // console.log(name,'  hello how are you')
        try {
            await axios.post('https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/update/detail', {
                pack_name: name,
                approver_user_id: localStorage.getItem("customer_id"),
                approver_name: localStorage.getItem("userName"),
                approver_rejection_remark: "",
                pack_status: "Approved",
            }, { headers: { 'Content-Type': 'application/json' } });
            toast.success('Pack Approved', { autoClose: 2000 });
        } catch (error) {
            console.error("Error while approving the pack:", error);
        }
    };

    const handleRejectSubmit = async () => {
        try {
            await axios.post('https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/update/detail', {
                pack_name: selectedPlanName,
                approver_user_id: localStorage.getItem("customer_id"),
                approver_name: localStorage.getItem("userName"),
                approver_rejection_remark: remark,
                pack_status: "Rejected",
            }, { headers: { 'Content-Type': 'application/json' } });
            toast.success('Plan Rejected', { autoClose: 2000 });
            setOpen(false);
        } catch (error) {
            console.error("Error while rejecting the pack:", error);
        }
    };

    return (
        <Box>
            <ToastContainer position="bottom-left" />
            <Box sx={{ position: 'fixed', width: '100%', zIndex: 1, backgroundColor: 'white', borderBottom: '1px solid #ddd', top: '48px', marginTop: 3 }}>
                <Paper elevation={20} sx={{ marginBottom: 2, padding: 0.5 }}>
                    <Typography sx={{ color: "#253A7D", fontSize: '20px', fontWeight: 'Bold', marginLeft: 2, marginBottom: 0.7 }}>Packs Under Process</Typography>
                </Paper>
                <Paper elevation={20}>
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" sx={{ backgroundColor: '#FAC22E' }}>
                        {tabList.map((category, index) => (
                            <Tab key={index} label={category} sx={{ textAlign: 'center', flexGrow: 0, flexBasis: 'auto', fontSize: "16px", backgroundColor: value === index ? '#FBD46C' : 'transparent', color: value === index ? 'White' : 'Black' }} style={{ textTransform: 'none' }} />
                        ))}
                    </Tabs>
                </Paper>
            </Box>
            <Box sx={{ marginTop: '-25px', overflowY: 'auto', position: 'relative', minHeight: 'calc(100vh - 144px)', margin: '-45px' }}>
                {selectedCategory && (
                    <Box ref={(el) => (tabContentsRef.current[value] = el)} mt={20} ml={4} display="flex" flexDirection="column" alignItems="left">
                        <Typography textAlign={'left'} sx={{ fontFamily: 'Roboto', fontSize: '18px', paddingLeft: 2.5 }}>All Plans For {selectedCategory}</Typography>
                        <Grid container spacing={2}>
                            {tabData[selectedCategory]?.map((plan) => (
                                <Grid item xs={4} key={plan.rating_profile_id}>
                                    <Card elevation={10} sx={{ margin: '8px', border: '4px solid #e0e0e0', backgroundColor: '#253A7D', borderRadius: '40px', paddingLeft: 2, paddingTop: 2 }}>
                                        <CardContent sx={{ color: 'White' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <Typography>AUD$ {plan.pack_price ?? 0}</Typography>
                                                            <Typography sx={{ font: 'Bold', color: 'yellow', cursor: 'pointer' }} onClick={() => handleDetailsClick(plan)}>View Details...</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}><img src={LogoMo} alt='_blank' /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6} sx={{ marginTop: 2 }}>
                                                    <Typography>Validity: {plan.validity ?? 0} Days</Typography>
                                                </Grid>
                                                <Grid item xs={6} sx={{ marginTop: 2 }}>
                                                    <Typography>
                                                        Data: {plan.data_balance === 931 ? 'Unlimited' : `${plan.data_balance ?? 0} ${plan.data_balance_parameter ?? ''}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sx={{ marginTop: 1 }}>
                                                    <Typography>
                                                        Voice: {plan.onn_call_balance === 1666 ? 'Unlimited' : `${plan.onn_call_balance ?? 0} mins`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sx={{ marginTop: 1 }}>
                                                    <Typography>
                                                        SMS: {plan.onn_sms_balance === 99999 ? 'Unlimited' : plan.onn_sms_balance ?? 0}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ marginTop: 1 }}>
                                                    <Typography style={{ fontSize: '15px', fontFamily: 'Roboto' }}>Additional Benefits(s)</Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>

                                    <Grid item xs={12} sx={{ marginTop: 1, paddingLeft: 2,paddingBottom:5 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} textAlign={'left'}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            sx={{ color: '#FAC22E', '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                            checked={checkedPlan === plan.pack_name}
                                                            onChange={() => {
                                                                if (checkedPlan === plan.pack_name) {
                                                                    setCheckedPlan(null); // Unselect the current plan
                                                                } else {
                                                                    setCheckedPlan(plan.pack_name); // Select this plan for approval
                                                                    handleApprove(plan.pack_name);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="Approve"
                                                />
                                            </Grid>
                                            <Grid item xs={6} textAlign={'right'}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            sx={{ color: 'Red', '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                            checked={checkedPlan === `reject_${plan.pack_name}`}
                                                            onChange={() => {
                                                                if (checkedPlan === `reject_${plan.pack_name}`) {
                                                                    setCheckedPlan(null); // Unselect the current plan
                                                                } else {
                                                                    setCheckedPlan(`reject_${plan.pack_name}`); // Select this plan for rejection
                                                                    handleReject(plan.pack_name);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="Reject"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
            <PlanDetailsModal open={openModal} onClose={() => setOpenModal(false)} planDetails={selectedPlan} />

            <Dialog open={open} onClose={() => { setOpen(false); setCheckedPlan(null); }}>
                <Grid sx={{ backgroundColor: '#FAC22E', width: 450 }}>
                    <DialogTitle>Reason for Rejection</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="remark"
                            // label="Enter reason"
                            fullWidth
                            sx={{ backgroundColor: 'white' }}
                            multiline
                            rows={3}
                            variant="standard"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false); setRemark(''); setCheckedPlan(null); }} color="primary">Cancel</Button>
                        <Button onClick={handleRejectSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Grid>

            </Dialog>
        </Box>
    );
}
