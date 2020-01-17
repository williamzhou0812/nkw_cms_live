import React, {Fragment, useState, useEffect, useContext}from  'react';
import AuthContext from '../../../../../context/auth/authContext';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ImageLibrary from '../../../imageLibrary/image_library';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';

import './divisions_pages_main.styles.scss';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


import {EditorState, convertToRaw, ContentState,convertFromHTML, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// use React Material-ui Dialogs 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

import ActiveLastBreadcrumb from '../../../../../components/BreadcrumbNav/BreadcrumbNav';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '92%',
      paddingLeft: '1.4rem',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        color: "orange",
        fontWeight: "bold",
        fontSize: "30px",
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
      },
      img: {
        width: '100%',
        display: 'block',
        overflow: 'hidden',
        width: '100%',
      },
  }));




const QuestPacificServices = () => {

    const tutorialSteps = [
        {
          label: 'GALLERY',
          imgPath:'https://upload.wikimedia.org/wikipedia/commons/8/80/Pcv-valve.jpg',
        },
        {
            label: 'GALLERY',
            imgPath:'https://upload.wikimedia.org/wikipedia/commons/8/80/Pcv-valve.jpg',
          },
     
      ];
    
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     
    // http request from api

    const [qps, setQPS]  = useState({
        content: [],
        gallery: [{
            img: '',
            img_title: ''
        }],
        title: '',
        logo: '',
        header_background_img: '',
        editor_context: ''
    });

    const [_id, setId] = useState('');
    const [editBtn, setEditBtn] = useState(false);

             // Dialogs
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');


//Editer State Setting
const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
);
  

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

    useEffect(() => {
        axios.get('/api/qps').then(res =>  {
            console.log(res.data[0]);
            setQPS(res.data[0]);
            setId(res.data[0]._id)

            const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].editor_context}`);
            const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
            setEditorState(
                EditorState.createWithContent(new_editor_context_state)
            )
            
        })
    }, []);


    const showEditBtn = (show) => {
        //  console.log(show);
            let _show = false;
            _show = !show;
            setEditBtn(_show);
    }


    // Update Api 
    const SaveUpdate = (e) => {
        e.preventDefault();
        axios.put(`/api/qps/${_id}`,  qps).then(res => {
            console.log(res.data)
        
        });
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


    const DeleteGarreryImage = (id) => {
        // alert(id);
        let _ImageGarray = qps.gallery;
       
        let newArray = _ImageGarray.filter((imageGarray => imageGarray._id !== id))
        setQPS({...qps, gallery: newArray })

        // axios.put(`/api/qps/${_id}`,  qps).then(res => {
        //     console.log(res.data)
        
        // });
        // _ImageGarray.forEach(imageGarry =>  {

        //     if (imageGarry._id === id) {
        //         _ImageGarray.filter( imagesGarray => imagesGarray._id !== id  )
        //         setQPS({...qps, gallery: _ImageGarray })
        //     }

        // })
       
    

        
    }
    
    return (

     <Fragment>

            <div style={{
                  width: '92%',
                  marginLeft: '1.4rem',
                  padding: '25px 0px',
                  marginTop:"3%"
            }}>
             <ActiveLastBreadcrumb  rootPath="Explore" childOne="Divisions" childTwo="Quest Pacific Services"   />

            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className="views_container" style={{border: '23px solid black'}}>
                            <div className="bacgroundImage" style={{
                            backgroundImage: `url('${qps.header_background_img}')`,
                        }} >
                            <div className="header_title">
                                <h3>{qps.title}</h3>             
                            </div>
                        
                        </div>

                        <div className='qps_contexts'>
                            <div className="qps_contexts_left"> 
                                <div className="right_border_style" >
                                    <img src={qps.logo} />
                                    <p className="contact_card">
                                        GALLERY
                                    </p>

                                 </div>
                            </div>
                            <div className="qps_contexts_right">
                                 <p>{qps.content[0]}</p>
                                 <p>{qps.content[1]}</p>
                                 <p>{qps.content[2]}</p>
                                 <p>{qps.content[3]}</p>
                                 <p>{qps.content[4]}</p>
                                 <p>{qps.content[5]}</p>
                                 <p>{qps.content[6]}</p>
                                 <p>{qps.content[7]}</p>


                            </div>  
                        </div>
                          
                            <div style={{padding: '18% 4%'}}>
                                <div className={classes.root} id="galley">
                                    <Paper square elevation={0} className={classes.header}>
                                        <Typography style={{fontWeight:'600', fontSize: "30px"}}>{tutorialSteps[activeStep].label}</Typography>
                                    </Paper>
                                    <AutoPlaySwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={handleStepChange}
                                        enableMouseEvents
                                        interval={5000}
                                    >
                                        {tutorialSteps.map((step, index) => (
                                        <div key={step.label}>
                                            {Math.abs(activeStep - index) <= 2 ? (
                                            <img className={classes.img} src={step.imgPath} alt={step.label} />
                                            ) : null}
                                        </div>
                                        ))}
                                    </AutoPlaySwipeableViews>
                                    <MobileStepper
                                        steps={maxSteps}
                                        position="static"
                                        variant="text"
                                        activeStep={activeStep}
                                        nextButton={
                                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                            Next
                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                        }
                                        backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                            Back
                                        </Button>
                                        }
                                        />
                                </div>
                            </div>
                        </div>
                    </Grid>

               <Grid item xs={6}>
                        <div style={{textAlign:"left", width:"100%"}}>
                                         
                        {!editBtn ? ( 
                                    <Fab  type="button"  onClick={() => showEditBtn(editBtn)}  color="secondary" aria-label="edit" className={classes.fab}  >
                                        <EditIcon />
                                    </Fab>
                                ) :  (
                                    <Fab onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                                    <CloseIcon />
                                   </Fab>
                                )

                             }


                        { editBtn && (

                            <Fragment>




                              <div style={{border:"1px solid #c4c4c4"}}>
                                <h3>Header Images</h3>
                                <input type="text" 
                                        placeholder="Change your logo here" 
                                        value={qps.header_background_img} 
                                        style={{width: "500px"}}
                                        onChange={(e) => setQPS({...qps, header_background_img: e.target.value}) }
                                    /> 

                                <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                < button type="button" onClick={() => setQPS({...qps, header_background_img : ''})}>Remove</button>


                                    <div>
                                            <h3>Title</h3>
                                            <input type="text" 
                                                placeholder="Change page title" 
                                                value={qps.title} 
                                                onChange={(e) => setQPS({...qps, title: e.target.value})}
                                            /> 
                                    </div>

                                    <div>
                                            <h3>Logo</h3>
                                            <input type="text" 
                                                placeholder="Change page title" 
                                                value={qps.logo} 
                                                onChange={(e) => setQPS({...qps, logo: e.target.value})}
                                            /> 

                                        <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                        < button type="button" onClick={() => setQPS({...qps, logo : ''})}>Remove</button>

                                    </div>
                                </div>



                            
                                         
            <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "atuo"}}>
                      
                      <Editor

                          //  Edit for CEO Message
                          editorState={editorState}
                          onEditorStateChange={setEditorState}
                          value={editorState}
                          onChange={(e) => setQPS({...qps, editor_context : draftToHtml(convertToRaw(editorState.getCurrentContent())).toString()})}

                      />
            </div>

            <div className="!#Image Gallay"> 
            <h4>Page Gallary</h4>  
                
                 {
                   qps.gallery.map(garrery => { 
                       console.log(garrery)
                       return (
                        <ul>
                            <li>
                                <img src={garrery.img} width="40px"/> | 
                                    <button>Edit</button> 
                                    <button onClick={() => DeleteGarreryImage(garrery._id)}>Delete</button> <br/>
                                URI: {garrery.img_title} 
                            </li>
                        </ul>
                       )
                   })

                 }
            
            {/* <button>ADD NEW IMAGE</button>
                
                 <div> 
                    <input placeholder="Your Image here" />
                 </div> */}

            </div>


       




        </Fragment>

        


        )

    }
                                   
                          
</div>


                  
                     
<Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Chosse Image from Libary / OR Upload</DialogTitle>
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
                     type="buttom"
                     onClick={() => setEditBtn(false)}
            >Cancel</Button>

            <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} onClick={SaveUpdate} >Save/Update</Button>
            </div>
     </Fragment>
    )


}

export default QuestPacificServices;


