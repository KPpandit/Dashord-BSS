import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

;
import { Grid } from '@mui/material';
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))
 export default function EditPopup(props){
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle  style={{ backgroundColor:'#8FE5FF'}}>
                <div style={{ display: 'flex' }}>
                   
                   <Typography variant="h5" component="div" style={{ flexGrow: 1 ,textAlign:'center', fontFamily:'bold', color:'white'}} >
                    {title}
                   </Typography>
                   <Grid 
                   paddingTop={0.5}
                   color='secondary'
                   onClick={()=>{setOpenPopup(false)}}
                   variant='h4'
                   textAlign={'right'}
                   style={{color:'white'}}
                   >
                     <CloseIcon/>

                   </Grid>

                </div>
            </DialogTitle>
            <DialogContent dividers>
               {children}
            </DialogContent>
        </Dialog>
    
    );
    
 }