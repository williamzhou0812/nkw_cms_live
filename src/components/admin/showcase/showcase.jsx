import React, { Fragment, useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import axios from 'axios';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import './showcase.scss';


import Grid  from '@material-ui/core/Grid';



// use React Material-ui Dialogs 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageLibrary from '../../../components/admin/imageLibrary/image_library';

import {FaRegImage} from 'react-icons/fa';

import LibraryButton from '../../LibraryButton/Library_button.component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '92%',
        paddingLeft: '1.4rem',
      },
    fab: {
      margin: theme.spacing(1),
      position:"absolute",
      zIndex:"999"
    },
    paper: { 
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  
const ShowCase = () => {

    
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);


    const classes = useStyles();

        const [showCase, setShowCase] = useState({
            video:'',
            middle_banner: '',
            footer_banner: ''
        });

        const [_id, setId] = useState('');

        const [editVideoBtn, setEditVideoBtn] = useState(false);
        const [editMiddleBanner, setEditMiddleBanner] = useState(false);
        const [editFooterBanner, setEditFooterBanner] = useState(false);

         // Dialogs
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
 

        useEffect(() => {

            axios.get('/api/showcase').then(res => {
                setShowCase(res.data[0]);
                setId(res.data[0]._id);
                 console.log(res.data[0]);
                // setId(res.data[0]._id);
            })
        }, []);
        


    const onChange = (e) => {
        setShowCase({...showCase, [e.target.name]: e.target.value});
    } 


    // Submit and updata ShowCase Api
    const  onSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/showcase/${_id}`, showCase).then(res => {
            console.log(res.data[0]);
            setShowCase(res.data[0]);
            try {
     
              if (res.data) {
                toast.success(`Data has been updated`, {
                 position: toast.POSITION.TOP_CENTER
               });
              } 
             } catch (err) {
              toast.error(`${err.message}`, {
                position: toast.POSITION.TOP_CENTER
              });
             }
            
        })
    }


    const showVideoInput = (show) => {
       //  console.log(show);
        let _show = false;
        _show = !show;
        setEditVideoBtn(_show);
    }

    const  showMidBannerInput = (show) => { 
        let _show = false;
        _show = !show;
        setEditMiddleBanner(_show);
    }

    const showFooterInput = (show) => {
        console.log(show)
        let _show = false;
        _show = !show;
        setEditFooterBanner(_show);
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
  
  //Clear Fill Button  
  const handleClearFun = () => { 
    setShowCase({...showCase, video: '' });
  }

  const handleClearBannerImage  = () => { 
    setShowCase({...showCase, middle_banner: ''})
  }

  const handleClearFooterBanneImage = () => {
      setShowCase({...showCase, footer_banner:  ''})
  }
  

    return (

        <Fragment>
     <form onSubmit={onSubmit}>

       

          <div className={classes.root} style={{paddingBottom: "60px"}} >
          <div style={{textAlign: "left"}}>
              <h1>ShowCase</h1>
          </div>
              <Grid container spacing={3} >
                  <Grid item xs={6}>
                        <div  className="showcase_contaner">
                        
                            
                        <div>  
                       
            
                                    <video width="100%"  autoPlay src={showCase.video} type="video/mp4"></video>
                                    {/* add a button and input to allow updat api */}
                                </div> 
                                <div style={{width: "100%",height:"350px"}}>

                     
                                    <img src={showCase.middle_banner}  width="100%"  height="100%"/>

                                </div>
                                <div style={{width: "100%",height:"350px"}}>

                                    <img src={showCase.footer_banner}  width="100%"  height="100%"/>

                                </div>
                            </div>
                            {/* <Button  variant="contained" color="secondary"  type="submit" >Save/Update</Button> */}

                       
                  </Grid>

                <Grid item xs={6}>
                    <div style={{textAlign:'left'}}>
                    {!editVideoBtn ? (
                                        <Fab onClick={() => showVideoInput(editVideoBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                                        <EditIcon />
                                        </Fab>
                                )  : (
                                        <Fab onClick={() => showVideoInput(editVideoBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                                            <CloseIcon />
                                        </Fab>
                                )}
                           </div>
                    {editVideoBtn && (
                        <div style={{textAlign:"left"}}>
                            
                            <div>
                              Video: 
                            <input type="text"   
                                    placeholder="Copy a Video Link here"
                                    name="video"
                                    value={showCase.video}
                                    onChange={onChange}
                                    style={{fontSize: "20px",maxWidth:"670px", marginTop: '120px', zIndex:"999", backgroundColor: "rgb(255,255,224, 0.7)"}}/> 
                            <br/>
                              <div className="uploadButton">
                                      {/* <button type="button" onClick={handleClickOpen} >Library / Browse</button> */}
                                      <button  type="button"  onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</button>
                                      {/* <button>Browser computer</button> */}
                                      <button type="button" onClick={handleClearFun}>Remove</button>
                              </div>
                                  
                            </div>

                           
 
                            {/* <br/> */}
                       

                            Banner Image: <input type="text"   
                                    placeholder="Copy you Mid Banner Imgage URL"
                                    name="middle_banner"
                                    value={showCase.middle_banner}
                                    onChange={onChange}
                                    style={{fontSize: "20px", maxWidth:"670px", backgroundColor: "rgb(255,182,193, 0.7)"}}/>
                            <br/>
                            <div  className="uploadButton">
                                   <button type="button"  onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</button>
                                    {/* <button>Browser computer</button> */}
                                    <button type="button" onClick={handleClearBannerImage}>Remove</button>
                            </div>

                            Footer Banner Image: <input type="text"
                                    placeholder="Copy Footer Banner Image URL " 
                                    name="footer_banner" 
                                    value={showCase.footer_banner}
                                    onChange={onChange}
                                    style={{fontSize: "20px", maxWidth:"670px", backgroundColor: "rgb(211,211,211, 0.8)"}}/> 
                            <br/>

                            <div  className="uploadButton">
                                  <button type="button"  onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</button>
                                    {/* <button>Browser computer</button> */}
                                  <button type="button" onClick={handleClearFooterBanneImage}>Remove</button>
                            </div>

                        </div>



                        )}

<Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Choice Image from Libary / Upload</DialogTitle>
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

                                    
                   
                </Grid>          

              </Grid>

          </div>

          
          <div className="fixedFooter" color="secondary" style={{background: "#FFFFFF", zIndex:"999"}}>
          <Button  variant="contained" 
                     style={{ position:"absolute",marginLeft:"73%", marginTop:"20px"}}  
                     onClick={() => setEditVideoBtn(false)}
            >Cancel</Button>
             <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} >Update & Save</Button>
          </div>
          </form> 
        </Fragment>


    )

}

export default ShowCase;

