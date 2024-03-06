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
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Dashboard, GraphicEq, ListAltTwoTone, Person } from '@mui/icons-material';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import MediationTwoToneIcon from '@mui/icons-material/MediationTwoTone';
import DiscountTwoToneIcon from '@mui/icons-material/DiscountTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import AnalyticsIcon from '@mui/icons-material/Analytics';
// import { faTicket} from '@fortawesome/free-solid-svg-icons'
// import { Links, LinksType } from '@/constants';
import StorageIcon from '@mui/icons-material/Storage';
import LogoMo from '../assets/LogoMo.jpg'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
const drawerWidth = 315;
function Footer() {
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
        width: '100%',
        zIndex: 1000, // Ensure it appears above other content
      }}
    >
      Copyright © 2024 All Copyright Reserved ,
      <Link
        href="https://wpits.com/"
        style={{ color: 'white', textDecoration: 'none' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        WPITS
      </Link>
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
  const [openMenu, setOpenMenu] = React.useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState('')
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  let Links;
  const handleDrawerClose = () => {
    setOpen(true);
  };
  const data = localStorage.getItem('auth')
  const links = {
    customer_care: [
      { label: '', route: '/customer' },
      {
        label: 'Customer Care',
        subRoute: [
          {
            label: 'Query',
            route: '/query',
          },
          {

            label: 'All Subscriber',
            route: '/all-sub',
          }
          , {

            label: "Add subscriber",
            route: "/add-sub"
          },
        ]
      }
    ],
    finance: [
      { label: '', route: '/customer' },
      {
        label: 'NOC',
        subRoute: [
          {
            label: 'AddNoc',
            route: '/add-Noc-sub',
          },
          {

            label: 'All NOC Subscriber',
            route: '/all-Noc-sub',
          }
          , {

            label: "Query",
            route: "/all-Noc-query"
          }
        ],
      }, {
        label: "Destination",
        subRoute: [
          {
            label: 'Add Destination',
            route: '/add-destination'
          }, {
            label: "All Destinations",
            route: "/all-destination"
          }

          , {
            label: "Admin",
            route: "/admin"
          }
        ]
      }, {
        label: "Rates",
        subRoute: [
          {
            label: "Add Rates",
            route: "/add_rate"
          }, {
            label: "All Rates",
            route: "/all_rates"
          }
        ]
      }, {
        label: "Category",
        subRoute: [
          {
            label: "Add Category",
            route: '/addCategory'
          }, {
            label: "Edit Category",
            route: "/editCategory"
          }
        ]
      }, {
        label: "Rating Profile",
        subRoute: [
          {
            label: "Add Ratings",
            route: "/addrating"
          }, {
            label: "All Ratings",
            route: "/allratings"
          }
        ]
      }
    ],
    super: [
      { label: 'Customer  ', icon: <Person />, route: '/customer' },
      {
        label: "Agent",
        route: '/agent',
        icon: <DashboardIcon />
      },
      {
        label:'UDM',
        route:'/hss',
        icon:<StorageIcon/>
      },
      {
        label: "Invoice",
        route: '/invoice',
        icon: <GraphicEqIcon />
      },
      {
        label: "Order",
        route: '/orders',
        icon: <ListAltTwoToneIcon />
      },
      {
        label: "Billing",
        route: '/billing',
        icon: <AccountBalanceWalletTwoToneIcon />
      },
      {
        label: "Mediation",
        route: '/mediation',
        icon: <MediationTwoToneIcon />
      },
      {
        label: "Report",
        route: '/report',
        icon: <AssessmentTwoToneIcon />
      },
      {
        label: "Discount",
        route: '/discount',
        icon: <DiscountTwoToneIcon />
      },
      {
        label: "Payment",
        route: '/payment',
        icon: <PaymentsTwoToneIcon />
      },
      {
        label: "Plan",
        route: '/plan',
        icon: <NextPlanIcon />
      },
      {
        label: "Configuration",
        route: '/configuration',
        icon: <DisplaySettingsIcon />
      },
      {
        label: "Available Plan",
        route: '/availablePlan',
        icon: <AppsIcon />
      },
      {
        label: 'Rating Plan',
        route: 'Category',
        icon: <CropLandscapeIcon />,
        subRoute: [
          {
            label: 'Category',
            route: '/category',
          },
          {

            label: 'Rates Offer',
            route: '/ratesOffer',
          }
          , {

            label: "Rating Profile",
            route: "/ratingProfile"
          },
        ]
      }, {
        label: "Account Config",
        route: 'Pre-Paid Account',
        icon: <AccountBoxIcon />,
        subRoute: [
          {
            label: 'Pre-Paid Account',
            route: "/pre-paidAccount"
          },
          {
            label: 'Pre-Paid Roaming Account',
            route: "/prepaidRoaming"
          }
        ]
      },
      {
        label: "Session Managment",
        route: 'Pre-Paid Account',
        icon: <AnalyticsIcon />,
        subRoute: [
          {
            label: 'PCRF/PCF Session',
            route: "/pcrf"
          },
          {
            label:'LU Registrations',
            route:'/lu'
          },
          {
            label:'IMS Session',
            route:'/lu'
          },
          {
            label:'Audio Call Session',
            route:'/lu'
          },
          
          {
            label: 'Video Call Session',
            route: "/callMangent"
          },
          {
            label: 'Data Session',
            route: "/dataMangenet"
          }
          ,
          {
            label: 'VoLTE Registrations',
            route: "/volte"
          },
          
        ]
      },
      {
        label: "Inventory",
        // route: '/inventory',
        icon: <Inventory2Icon />,
        subRoute: [
          {
            label: 'Inventory Management',
            icon:<CircleTwoToneIcon/>,
            route: "/inventory"
          },
          {
            label: 'SIM/e-SIM Management',
            route: "/simManagement"
          }
          ,
          {
            label: 'MSISDN Management',
            route: "/msisdnmanagement"
          },{
            label:'Device Mangement',
            route:'/devicemanagement'

          },{
            label:'Vendor Management',
            route:'/vendormanagement'
          }
        ]
      },
    ],
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#253A7D', color: 'black' }}>
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

            {/* <Grid item sx={{ marginLeft: 'auto', marginRight: -75, textAlign: 'right', padding: 1 }}>
              <TextField
                variant="outlined"
                sx={{
                  width: '250px',
                  backgroundColor: 'white',
                  marginLeft: 'auto',
                  
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid> */}

            
            <Grid item sx={{ marginRight: 2, marginLeft: 'auto', marginTop: -0.5 }}>
              <Button onClick={(e) => {
                localStorage.removeItem('token');
                sessionStorage.clear();
                navigate("/")
              }}>
              <Typography sx={{ color: 'white', paddingRight:1.5}}>Logout</Typography>
              <LogoutIcon style={{ color: 'white' }}  />
              </Button>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>


      <Drawer variant="permanent" open={open} onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose} >
        <Grid>
          <DrawerHeader sx={{ backgroundColor: '#253A7D' }}>
            <img src={LogoMo} alt='_blank' />
            <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
          </DrawerHeader>
        </Grid>
        <Divider />
        <List >

          {links[data].map(({ label, route, icon, subRoute }) => (
            <Grid key={label}>
              <ListItem disablePadding sx={{ display: 'block' }}>

                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? open && location.pathname === route
                          ? '#B6BDD3' // Black color when selected
                          : 'transparent'
                        : open && location.pathname === route
                          ? 'blue' // Black color when selected
                          : 'transparent',
                    '&:hover': {
                      backgroundColor: '#FAC22E',
                    },
                  }}
                  onClick={() => {
                    subRoute ? setOpenMenu(openMenu === label ? '' : label) : navigate(route || '');
                  }}
                >
                  <ListItemIcon
                    sx={{
              opacity: open ? 1 : 0,
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? open && location.pathname === route
                    ? 'black' // Text color when selected
                    : 'black'
                  : open && location.pathname === route
                    ? 'black' // Text color when selected
                    : 'white',
            }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontSize={18} >{label}</Typography>}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? open && location.pathname === route
                            ? 'black' // Text color when selected
                            : 'black'
                          : open && location.pathname === route
                            ? 'black' // Text color when selected
                            : 'white',
                    }}
                  />

                  {subRoute && (label === openMenu ? <ExpandLess sx={{ display: open ? 'block' : 'none' }} /> : <ExpandMore sx={{ display: open ? 'block' : 'none' }} />)}

                </ListItemButton>
              </ListItem>
              {subRoute && (
                <Collapse in={label === openMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                    {subRoute.map(({ route, label, icon }) => (
                      <ListItemButton onClick={() => navigate(route || '')} key={label}
                      sx={{
                        pl: 4,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? open && location.pathname === route
                              ? '#B6BDD3' // Black color when selected
                              : 'transparent'
                            : open && location.pathname === route
                            ? 'blue' // Black color when selected
                            : 'transparent',
                        '&:hover': {
                          backgroundColor: '#FAC22E',
                        },
                        ...(location.pathname === route && {
                          backgroundColor: '#9EA7C5', // Change to black when selected
                        }),
                      }}
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText fontFamily={'bold'} primary={label} />
                      </ListItemButton>
                    ))}
                  </List>

                </Collapse>

              )}

            </Grid>

          ))}
        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3,marginBottom: '50px' }} >
        <DrawerHeader />
        <Outlet />
        <Footer />
      </Box>

    </Box >
  );

}
