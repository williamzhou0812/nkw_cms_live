import React, {useContext} from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import AlertContext from '../../context/alert/alertContext';


const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 600,
    },
    snackbar: {
      margin: theme.spacing(1),
    },
  }));

const Alerts = () => {
    const classes = useStyles();

    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (

            <div key={alert.id}>
                <SnackbarContent
                className={classes.snackbar}
                message={alert.msg}
                
                />

            </div>
        ))
        
        // alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
           
        //     console.log(alert.msg)
        // ))
    )
}

export default Alerts;