import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { List, Typography, Divider, CssBaseline, ListItem, ListItemButton, ListItemText, Collapse, Grid, Icon, Button, TextField, Rating, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';

import { Person } from '@mui/icons-material';

import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';

import PaymentsIcon from '@mui/icons-material/Payments';

import TimelineIcon from '@mui/icons-material/Timeline';
import HandshakeIcon from '@mui/icons-material/Handshake';

import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import LogoMo from '../assets/LogoMo.jpg'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Breadcrumb from '../pages/BreadScrm/Breadcrumb';
const drawerWidth = 358;
function Footer({ open, drawerWidth }) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#253A7D',
        color: 'white',
        textAlign: 'center',
        padding: 2,
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 72px)`, // Adjust width based on drawer state
        marginLeft: open ? `${drawerWidth}px` : '72px', // Match collapsed width (72px as example)
        zIndex: 1000, // Ensure it appears above other content
        transition: 'width 0.3s ease, margin-left 0.3s ease', // Smooth transition
      }}
    >
      &copy; {new Date().getFullYear()} Nauru Telikom Corporation. All rights reserved.
    </Box>
  );
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));


export default function Sidenavbar() {
  const location = useLocation();
  const username = localStorage.getItem('userName');

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  let Links;
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const data = localStorage.getItem('auth')
  const [openSections, setOpenSections] = React.useState({}); // Manage open state of sections

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label], // Toggle the open state of the clicked section
    }));
  };

  // Check if the current route is within a sub-route hierarchy
  const isActiveRoute = (route) => location.pathname === route;

  const isActiveSubRoute = (subRoute) => {
    return subRoute.some(
      ({ route, subRoute }) =>
        isActiveRoute(route) || (subRoute && isActiveSubRoute(subRoute))
    );
  };

  const links = {

    super: [
      { label: 'Subscriber Management ', icon: <Person />, route: '/subscriber' },
      {
        label: 'Reseller Management',
        route: '/partner',
        icon: <HandshakeIcon />,
        subRoute: [
          { label: 'Certified Reseller', route: '/partner' },
          // {label:'Buy Core Balance',route: '#'},
          {
            label: 'Reseller Product Management',
            subRoute: [
              { label: 'Core Balance Management', route: '/partner/coreBalanceManagment' },
              //  { label:'UDM',route:'/hss'},
            ]

          },


        ]
      },
      {
        label: 'Inventory Management',
        icon: <Inventory2Icon />,
        subRoute: [
          { label: 'SIM/e-SIM Management', route: '/simManagement' },
          { label: 'Device Management', route: '/devicemanagement' },
          { label: 'Vendor Management', route: '/vendormanagement' },
          { label: 'Routers Management', route: '/broadband' },
        ],
      },
      {
        label: 'Tariff / Plan Management',
        route: '/availablePack',
        icon: <AppsIcon />,
        subRoute: [
          {
            label: 'Create Tarrif',
            subRoute: [
              { label: 'Category', route: '/category' },
              { label: 'Tariff Creation', route: '/ratingProfile' },

            ],
          },
          {
            label: 'Tarrif Plans',
            subRoute: [
              {
                label: 'Prepaid',
                subRoute: [
                  {
                    label: 'Approved Packs',
                    route: '/prepaidActivatedPlan'
                  },
                  {
                    label: 'Packs Under Process',
                    route: '/prepaidInProgressPack'
                  },
                  {
                    label: 'Unapproved Packs',
                    route: '/prepaidDeActivatedPlan'
                  },
                ]
              },
              {
                label: 'Postpaid',
                subRoute: [
                  {
                    label: 'Approved Plans',
                    route: '/postpaidActivatedPlan'
                  },
                  {
                    label: 'Processing Plans',
                    route: '/postpaidInProgressPack'
                  },
                  {
                    label: 'UnApproved Plans',
                    route: '/postpaidDeActivatedPlan'
                  },
                ]
              },

            ],
          },
          { label: 'BroadBand Plan', route: '/broadband-plan' },
          // { label: 'Prepaid In-Progress Packs', route: '/prepaidInProgressPack' },
          // { label: 'Prepaid Un-Approved Packs', route: '/prepaidDeActivatedPlan' },
          // { label: 'Postpaid Approved Packs', route: '/postpaidActivatedPlan' },
          // { label: 'Postpaid In-Progress Packs', route: '/postpaidInProgressPack' },
          // { label: 'Postpaid Un-Approved Packs', route: '/postpaidDeActivatedPlan' },
        ],
      },

      {
        label: 'Payment & Invoice',
        route: '/invoice',
        icon: <PaymentsIcon />,
        subRoute: [
          {
            label: 'Payment',
            subRoute: [
              {
                label: 'Inward Payment',
                route: '/payment'
              },
              {
                label: 'OutWard Payment'
              }
            ]
          },
          {
            label: 'Invoice',
            subRoute: [
              {
                label: 'Inward Invoice'
              },
              {
                label: 'OutWard Invoice'
              }
            ]
          }
        ]
      },
      // {
      //   label: 'Voucher  Management',
      //   route: '/specialOffers',
      //   icon: <LocalActivityIcon />,
      // },
      {
        label: 'UE Session Management',
        route: '/specialOffers',
        icon: <SettingsCellIcon />,
        subRoute: [
          {
            label: 'Registration',
            route: '/session',
            // subRoute:[
            //   {
            //     label:'4G ',

            //   },
            //   {
            //     label:'5G'
            //   },

            //   {
            //     label:'CPE'
            //   },

            // ]
          },
          {
            label: 'Call',
            route: '/callSession'
          },
          {
            label: 'Data',
            route: '/dataSession'

          },

        ]
      },
      // {
      //   label: 'Complaints Management',
      //   // route: '/configuration',
      //   route: '#',
      //   icon: <DisplaySettingsIcon />,
      // },
      // {
      //   label: 'Payment',
      //   route: '/payment',
      //   icon: <PaymentsTwoToneIcon />,
      // },
      {
        label: 'Complaints Management',
        // route: '/configuration',
        // route: '#',
        icon: <DisplaySettingsIcon />,
        subRoute:[
          {
            label: 'CustomerCare AgentList',
            route: '/CustomerCareAgentList',
          },
          {
            label: 'All Tickets',
            route: '/ticket',
          }
        ]
      },
 
      {
        label: 'Settings',
        route: '/configuration',
        icon: <SettingsApplicationsIcon />,
        subRoute: [
          {
            label: 'Account Configuration ',
            route: '/configuration',

            subRoute: [
              { label: 'Pre-Paid Account', route: '/pre-paidAccount' },
              { label: 'Pre-Paid Roaming Account', route: '/prepaidRoaming' },
            ],

          },
          {
            label: 'Provisioning GateWay ',
            route: '/hss'
          },
          {
            label: 'Campaign',
            route: '/campain'
          },


        ]
      },



      {
        label: 'MIS Reports',
        route: '/report',
        icon: <AssessmentTwoToneIcon />,
      },
      {
        label: 'Analytics',
        route: '/analysis',
        icon: <TimelineIcon />,
      },
    ],
  };
  const NestedMenuItems = ({ subRoute, paddingLeft = 10 }) => {
    return (
      <List component="div" disablePadding>
        {subRoute.map(({ route, label, icon, subRoute }) => {
          const isActive = isActiveRoute(route) || (subRoute && isActiveSubRoute(subRoute));
          const isOpen = openSections[label] ?? isActive; // Use the current state or default to active

          return (
            <React.Fragment key={label}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    pl: paddingLeft,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? isActive
                          ? '#B6BDD3'
                          : 'transparent'
                        : isActive
                          ? 'blue'
                          : 'transparent',
                    '&:hover': { backgroundColor: '#FAC22E' },
                  }}
                  onClick={() => {
                    if (subRoute) {
                      toggleSection(label); // Allow manual toggle
                    } else {
                      navigate(route || '');
                    }
                  }}
                >
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={label} />
                  {subRoute && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {subRoute && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <NestedMenuItems subRoute={subRoute} paddingLeft={paddingLeft + 2} />
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    );
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#253A7D', color: 'white' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems="center">
            <Grid item>
              <Typography noWrap component="div" color={'white'}>
                Welcome : {username}
              </Typography>
            </Grid>
            <Grid item sx={{ marginRight: 2, marginLeft: 'auto', marginTop: -0.5 }}>
              <Button onClick={(e) => {
                localStorage.removeItem('token');
                navigate("/")
              }}>
                <Typography sx={{ color: 'white', paddingRight: 1.5 }}>Logout</Typography>
                <LogoutIcon style={{ color: 'white' }} />
              </Button>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>


      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <Grid>
          <DrawerHeader sx={{ backgroundColor: '#253A7D' }}>
            <img src={LogoMo} alt='_blank' />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
        </Grid>
        <Divider />
        <List>
          {links.super.map(({ label, route, icon, subRoute }) => {
            const isActive = isActiveRoute(route) || (subRoute && isActiveSubRoute(subRoute));
            const isOpen = openSections[label] ?? isActive; // Use current state or default to active

            return (
              <React.Fragment key={label}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      justifyContent: open ? 'initial' : 'center',
                      px: open ? 2.5 : 0,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? isActive
                            ? '#B6BDD3'
                            : 'transparent'
                          : isActive
                            ? 'blue'
                            : 'transparent',
                      '&:hover': { backgroundColor: '#FAC22E' },
                    }}
                    onClick={() => {
                      if (subRoute) {
                        toggleSection(label); // Allow manual toggle
                      } else {
                        navigate(route || '');
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        color: (theme) =>
                          theme.palette.mode === 'light'
                            ? isActive
                              ? 'black'
                              : 'black'
                            : isActive
                              ? 'white'
                              : 'white',
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {/* Hide text when the drawer is closed */}
                    {open && (
                      <ListItemText
                        primary={<Typography fontSize={18}>{label}</Typography>}
                        sx={{
                          opacity: open ? 1 : 0,
                          ml: open ? 2 : 0, // Add spacing when open
                        }}
                      />
                    )}
                    {subRoute && open && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
                {subRoute && open && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <NestedMenuItems subRoute={subRoute} />
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
        <Divider />
      </Drawer>


      <Box component="main" sx={{ flexGrow: 1, p: 1, marginBottom: '50px' }} >
        <DrawerHeader />
        <Breadcrumb />
        <Outlet />
        <Footer open={open} drawerWidth={drawerWidth} />
      </Box>

    </Box >
  );

}
