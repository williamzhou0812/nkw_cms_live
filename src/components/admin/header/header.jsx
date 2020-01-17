import React, {Fragment, useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";

import AuthContext from '../../../context/auth/authContext';
import ImageLibrary  from '../../../components/admin/imageLibrary/image_library';

import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';



import './header.scss';



import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import Grid  from '@material-ui/core/Grid';

// use React Material-ui Dialogs 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {FaRegImage} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '92%',
    paddingLeft: '1.4rem',
  },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        color: "#707070",
        fontWeight: theme.typography.fontWeightRegular,
       
    },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));



toast.configure({
  autoClose: 4000,
  draggable: false,
  //etc you get the idea
});


const Header = () => {

  const classes = useStyles();
  const history = useHistory();

  const authContext = useContext(AuthContext);

  useEffect(() => { 
      authContext.loadUser();
      // eslint-disable-next-line
  }, []);
   
    const [header, setHeader] = useState({
      logo_img: '',
      nav_one: '',
      nav_two: '',
      nav_three: ''

  });

  const [_id, setId] = useState('');

  const [show, setShow] = useState(false);

  // Dialogs
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
 
 
useEffect(() => {
  axios.get('/api/header').then(res => {
    setHeader(res.data[0]);
    console.log(res.data[0])
    setId(res.data[0]._id)
  })
}, []);

const {logo_img, nav_one, nav_two, nav_three} = header;

const onChange = e => {
  setHeader({...header, [e.target.name]: e.target.value});

}

const onSubmit = e => { 
  e.preventDefault();
  axios.put(`/api/header/${_id}`, header).then(res => {
    console.log(res.data)
   // alert(res.data.message);
  //  if (res.data) {
  //    toast.success(`${res.data.message}`, {
  //     position: toast.POSITION.TOP_CENTER
  //   });
  //  } 
  //  if (res.data.error === 'Hooow, server error') {
  //   toast.error('Wooow, Somingthing when to wrong', {
  //     position: toast.POSITION.TOP_CENTER
  //   });
  //  }

   try {
     
    if (res.data) {
      toast.success(`${res.data.message}`, {
       position: toast.POSITION.TOP_CENTER
     });
    } 
   } catch (err) {
    toast.error(`${err.message}`, {
      position: toast.POSITION.TOP_CENTER
    });
   }
  
    
  });

  setHeader({...header, [e.target.name]: e.target.value});
  history.push('/header')
  
}

const showeditHeaderLogoInput = (show) => { 
     let _show = false;
     _show = !show;
    setShow(_show)
}


// Make Dialogs Functon
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleMaxWidthChange = event => {
  setMaxWidth(event.target.value);
};

const handleFullWidthChange = event => {
  setFullWidth(event.target.checked);
};

// Button 
const handleClearFun = () => { 
  setHeader({...header, logo_img: '' });
}

  return (
    <Fragment>

            <form onSubmit={onSubmit} > 
            <div className={classes.root} style={{paddingBottom: '200px'}} >
            <div style={{textAlign: "left"}}>
            <ToastContainer  />
              <h1>Header</h1>
             </div>
              <Grid container spacing={3}>
                  <Grid item xs={6}>
                  <div className="header_contanter" >

                          <div  style={{background:"white", padding:"13px 13px"}}>
                            { 
                              header.logo_img && ( 

                                <img src={logo_img} alt="nkw group logo image"  width="100%" height="100%"/> 
                              )
                            }
                              

                          </div>
                          <div className="timer">
                              {`03:54PM 31OCT 2019`}
                          </div>
                          <div className="navbar">

                            <Button type='button'
                                    placeholder='Main Navbar Left' 
                                    name="nav_one" 
                                    className='button'
                                    value={nav_one}>{nav_one}</Button>
                                     

                            <Button type='button' 
                                    placeholder='Main Navbar Middle'
                                    name="nav_two"
                                    value={nav_two}
                                    className='button'
                                    >{nav_two}</Button>

                            <Button type='button' 
                                    placeholder='Main Navbar Right' 
                                    name="nav_three"
                                    value={nav_three}
                                    className='button'
                                    >{nav_three}</Button>
                          </div>
                         
                      </div>
                       
                  </Grid>

                  <Grid item xs={6} >
                  <div style={{textAlign:"left", padding:"0 10px"}}> 
                      
                  {!show ? (
                    <Fab onClick={() => showeditHeaderLogoInput(show)} color="secondary" aria-label="edit" className={classes.fab} >
                    <EditIcon />
                    </Fab>
                  ) :
                  (<Fab onClick={() => showeditHeaderLogoInput(show)} color="secondary" aria-label="edit" className={classes.fab}>
                    <CloseIcon />
                   </Fab>
                  )

                  }
                  {show && (
                    <div>
                      <h3>Edit Image: </h3> 
                          <input 
                                
                                type='text' 
                                placeholder='Header Image  Logo URL'
                                name="logo_img"
                                value={logo_img}
                                onChange={onChange} /> 
                                <div className="uploadButton">
                                    <button onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</button>
                                    {/* <button>Browser computer</button> */}
                                    <button onClick={handleClearFun}>Remove</button>
                                </div>

                                
                                <input type='text'
                                placeholder='Main Navbar Left' 
                                name="nav_one" 
                                value={nav_one}
                                onChange={onChange} />

                        <input type='text' 
                                placeholder='Main Navbar Middle'
                                name="nav_two"
                                value={nav_two}
                                onChange={onChange} />

                        <input type='text' 
                                placeholder='Main Navbar Right' 
                                name="nav_three"
                                value={nav_three}
                                onChange={onChange}/>
                    </div>
                  ) 

                  }


      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Choces Image from Libary / Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
         
          </DialogContentText>
          <ImageLibrary />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

                  </div>


                  </Grid>


              </Grid>



           
                
            </div>
            
            <div className="fixedFooter" style={{background: "#FFFFFF", zIndex:"999"}}>

            <Button  variant="contained" 
                     style={{ position:"absolute",marginLeft:"73%", marginTop:"20px"}}  
                    
                     onClick={() => setShow(false)}        
            >Cancel</Button>


             <Button  variant="contained"   type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white",  marginLeft:"80.5%"}} >Update & Save</Button>
           </div>
         
           </form> 
    </Fragment>
  );
}

export default Header;
