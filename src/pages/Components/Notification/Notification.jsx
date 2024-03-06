import { Alert } from '@material-ui/lab';
import { Snackbar, makeStyles } from '@mui/material';

import React, { Component } from 'react'


export default function Notification(props){
    const { notify, setNotify } = props;
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }
    return(
        <Snackbar
       style={{top:'center'}}
        open={notify.isOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
         onClose={handleClose}
        >
        <Alert
            severity={notify.type}
             onClose={handleClose}
            >
            {notify.message}
        </Alert>
    </Snackbar>
    )
}