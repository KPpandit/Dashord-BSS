import { Box, Grid, Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';
import All from './All';
import AccountType from './AccountType/AccountType';
import BillingProcess from './BillingProcss/BillingProcess';
import Blacklist from './BlackList/Blacklist';
import Company from './Company/Company';

import AgentCommProcess from './AgentComissionProcess/AgentCommProcess';
import Email from './Email/Email';
import Collections from './Collections/Collections';
import Enumeration from './Enumeration/Enumeration';
import InvoiceDisplay from './Invoice Display/InvoiceDisplay';
import Languages from './Languages.jsx/Languages';
import Mediation from './Mediation.jsx/Mediation';
import CustomMetaFields from './CustomMetaField/CustomMetaField.jsx'
import Metafieldgroup from './MetaFieldGroup/Metafieldgroup.jsx';
import Notification from './Notification/Notification.jsx';
import OrderChangeStatus from './OrderChangeStatus/OrderChangeStatus.jsx';
import OrderChangeType from './OrderChangeType/OrderChangeType.jsx';
import OrderPeriod from './OrderPeriod/OrderPeriod.jsx';
import OrderStatuses from './OrderStatuses/OrderStatuses.jsx';
import Roles from './Roles/Roles.jsx';
import Users from './Users/Users.jsx';
import Currencies from './Currencies/Currencies.jsx';
import Plugin from './Plugin/Plugin.jsx';
import PaymentMethod from './Payment Method/PaymentMethod.jsx';
export default function Configuration(props) {
  const configurationItems = [
    { id: 1, name: 'All', component: <All /> },
    { id: 2, name: 'Account Type', component: <AccountType /> },
    { id: 3, name: 'Agent Comission Process', component: <AgentCommProcess /> },
    { id: 4, name: 'Billing Process', component: <BillingProcess /> },
    { id: 5, name: 'Blacklist', component: <Blacklist /> },
    { id: 6, name: 'Collections', component: <Collections /> },
    { id: 7, name: 'Company', component: <Company /> },
    
    { id: 8, name: 'Email', component: <Email /> },
    { id: 9, name: 'Enumerations', component: <Enumeration /> },
    { id: 10, name: 'invoice Dispaly', component: <InvoiceDisplay /> },
     { id: 11, name: 'Languages', component: <Languages /> },
     { id: 12, name: 'Mediation', component: <Mediation /> },
     { id: 13, name: 'Meta Fields', component: <CustomMetaFields /> },
     { id: 14, name: 'Meta Field Groups', component: <Metafieldgroup /> },
     { id: 15, name: 'Notification', component: <Notification /> },
     { id: 16, name: 'Order Change Statuses', component: <OrderChangeStatus /> },
     { id: 17, name: 'Order Change Type', component: <OrderChangeType /> },
     { id: 18, name: 'Order Period', component: <OrderPeriod /> },
     { id: 19, name: 'Order Statuses', component: <OrderStatuses /> },
     { id: 20, name: 'Roles', component: <Roles /> },
     { id: 21, name: 'Users', component: <Users /> },
     { id: 22, name: 'Currencies', component: <Currencies /> },
     { id: 23, name: 'Plug-in', component: <Plugin /> },
     { id: 24, name: 'Payment Method', component: <PaymentMethod /> },
  ];

  const [selectedItem, setSelectedItem] = useState(configurationItems[0]); // Initialize with the first item

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Grid container marginTop={-2.5}>
    {/* Left side with the list */}
    <Grid item xs={5} md={2} marginTop={2} style={{ position: 'relative' }}>
      <Paper elevation={24} style={{ backgroundColor: 'white', maxHeight: '500px', overflow: 'auto' }}>
        <List sx={{ backgroundColor: 'white' }}>
          {configurationItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                button
                key={item.id}
                onClick={() => handleItemClick(item)}
                selected={selectedItem && selectedItem.name === item.name}
              >
                <ListItemText primary={item.name} style={{ color: selectedItem && selectedItem.name === item.name ? '#253A7D' : 'inherit' ,
              
              }} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Grid>

    {/* Right side with the selected component */}
    <Grid item xs={7} md={10}>
      <Grid style={{ height: '100%' }}>
        {selectedItem ? (
          <>
            {selectedItem.component}
          </>
        ) : (
          <Typography>Please select an item from the list.</Typography>
        )}
      </Grid>
    </Grid>
  </Grid>
  );
};
