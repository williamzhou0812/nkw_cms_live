import React, {Fragment, useState} from 'react';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import { Button } from  '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 660,
      display:'flex',
      textAlign:'center',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const AddLandingCatalogly = ({openAddCata, handleAddCataClose}) => {

    const classes = useStyles();

    /** TEMP STATE  */

    const [exporLanding, setExporLanding] = useState({
        exp_landing_img: '',
        exp_landing_title: ''
    });



   const  onChangeLanding  = (e) => {
         setExporLanding({
            ...exporLanding,
            [e.target.name]: e.target.value
         })
   }

   /** HTTP  */

const  addCataPost =  async () => {
     console.log('sent post requie ');
     console.log(exporLanding);
     const resData =   await axios.post('/api/explorelanding', exporLanding);
      
     handleAddCataClose();

     console.log(resData.data);
}

/** end http */

    return (
        <Fragment>
         
                     <Dialog open={openAddCata} onClose={handleAddCataClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">ADD a Landing catalog</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>

                                       <input  type="text" placeholder="Landing Cataglog Image" value={exporLanding.exp_landing_img} name="exp_landing_img"  onChange={onChangeLanding} />
                                       <input  type="text" placeholder="Landing Catalog Title " value={exporLanding.exp_landing_title}  name="exp_landing_title" onChange={onChangeLanding} />


                                    </DialogContentText>

                                    </DialogContent>
                                    <DialogActions>
                                    <Button   onClick={handleAddCataClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button  color="primary" onClick={addCataPost}>
                                         ADD
                                    </Button>
                                    </DialogActions>
                            </Dialog>
             
        </Fragment>

    );
}


export default  AddLandingCatalogly;