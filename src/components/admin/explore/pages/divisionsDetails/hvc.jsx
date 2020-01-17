import React, {Fragment, useState, useEffect, useContext}from  'react';
import AuthContext from '../../../../../context/auth/authContext';


import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ImageLibrary from '../../../imageLibrary/image_library'; 

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';

import './divisions_pages_main.styles.scss';
import { fontSize } from '@material-ui/system';

import {EditorState, convertToRaw, ContentState,convertFromHTML, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
}));





const HVC = ({location}) => {

    const classes = useStyles();

    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

   // http request from api
   const [HVC, setHVC]  = useState({
    title: '',
    logo: '',
    header_background_img: '',
    content: [],
    contact: {
        name: '',
        jobs: '',
        phone_a: '',
        phone_b: '',
        email:''
        
    },
    editor_context: '',
});

const [_id, setId] = useState('');  
const [editBtn, setEditBtn] = useState(false);


// Dialogs
const [open, setOpen] = React.useState(false);
const [fullWidth, setFullWidth] = React.useState(true);
const [maxWidth, setMaxWidth] = React.useState('sm');

// Editer State Setting
const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
);

const SaveUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/hvc/${_id}`,  HVC).then(res => {
       console.log(res.data)
  
      // var contentState = ContentState.createFromBlockArray(blocksFromHTML);
  
  
  
    });
}


const showEditBtn = (show) => {
    //  console.log(show);
        let _show = false;
        _show = !show;
        setEditBtn(_show);
}
     

useEffect(() => {
    axios.get('/api/hvc').then(res =>  {
        console.log(res.data[0]);
        setHVC(res.data[0]);
        setId(res.data[0]._id);

        const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].editor_context}`);
        const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
        setEditorState(
            EditorState.createWithContent(new_editor_context_state)
        )
        
    })
}, []);



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


    return (
        <Fragment>
            <div style={{
                  width: '92%',
                  marginLeft: '1.4rem',
                  padding: '25px 0px',
                  marginTop:"3%"

            }}>
            <ActiveLastBreadcrumb  rootPath="Explore" childOne="Divisions" childTwo="HVC" path={location.pathname}  />

            </div>

            <div className={classes.root} style={{paddingBottom: "60px"}}>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <div className="views_container" style={{border: '23px solid black'}}>
                             <div className="bacgroundImage" style={{
                                    backgroundImage: `url('${HVC.header_background_img}')`,
                                    }} >
                                        
                                    <div className="header_title">
                                        <h3>{HVC.title}
                                    
                                        </h3>
                    
                                    </div>
                             
                            </div>

                                    
                        <div className="qps_contexts">
                            
                            <div className="qps_contexts_left"> 
                                            <div className="right_border_style">
                                                <img src={HVC.logo} />
                                            </div>
                                            <div className="contact_card">
                                                <h3>Contact</h3>
                                                <p>{HVC.contact.phone_a}</p>
                                                <p>{HVC.contact.phone_b}</p>

                                                <p>Email:</p>
                                                <p>{HVC.contact.email}</p>
                                               
                                         </div>
    
    
    
    
                            </div>
                                <div className="qps_contexts_right"> 

                                
                                       <div
                                        dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState.getCurrentContent()))}}
    
                                        /> 
    
                                </div>
    
                             </div>


                       </div>
                    </Grid>
                    <Grid item xs={6} >
                     <div>
                        <div style={{textAlign:"left", padding:"0 10px"}}>

                            { !editBtn ?  (
                                <Fab   type="button" onClick={() => showEditBtn(editBtn) } color="secondary" aria-label="edit" className={classes.fab}  >
                                    <EditIcon />
                                </Fab>

                                ) : (
                                <Fab type="button" onClick={() => showEditBtn(editBtn) }  color="secondary" aria-label="edit" className={classes.fab}  >
                                    <CloseIcon />
                                </Fab>

                                )

                            }

                            { editBtn && (
                                <Fragment>
                                    <div style={{border:"1px solid #c4c4c4"}}>
                                        <h3>Change Header Images</h3>
                                        <input type="text" 
                                                placeholder="Change your logo here" 
                                                value={HVC.header_background_img} 
                                                onChange={(e) => setHVC({...HVC, header_background_img: e.target.value}) }
                                        /> 

                                                                   
                        <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                        < button type="button" onClick={() => setHVC({...HVC, header_background_img: ''})}>remove</button>


                                            <div>
                                                    <h3>Change Title</h3>
                                                    <input type="text" 
                                                        placeholder="Change page title" 
                                                        value={HVC.title} 
                                                        onChange={(e) => setHVC({...HVC, title: e.target.value})}
                                                    /> 
                                            </div>

                                    </div>

                            <div style={{textAlign:"left", padding:"0 10px"}}>
                                   
                                        <div>
                                                Edit Contact Info

                                            <div>
                                                <label htmlFor="Phone One">Phone One:</label>
                                                <input type="text" 
                                                    placeholder="Phone One" 
                                                    value={HVC.contact.phone_a}
                                                    onChange={e => 
                                                            {setHVC({...HVC,
                                                                        contact: { 
                                                                            ...HVC.contact,
                                                                            phone_a: e.target.value
                                                                        }
                                                                    })
                                                            } }
                                                />
                                            </div> 
                                            <div>
                                                <label htmlFor="Phone Two">Phone Two:</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Phone Two" 
                                                    value={HVC.contact.phone_b} 
                                                    onChange={e => 
                                                        {setHVC({...HVC,
                                                                    contact: { 
                                                                        ...HVC.contact,
                                                                        phone_b: e.target.value
                                                                    }
                                                                })
                                                        } }
                                                />
                                        
                                            </div> 

                                            <div>
                                                <label htmlFor="Email">Email:</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Email" 
                                                    value={HVC.contact.email} 
                                                    onChange={e => 
                                                        {setHVC({...HVC,
                                                                    contact: { 
                                                                        ...HVC.contact,
                                                                        email: e.target.value
                                                                    }
                                                                })
                                                        } }
                                                />
                                        
                                            </div> 
                                        
                                        </div>


                                </div>



                        <div>
                            <div style={{textAlign: "left", padding: "0 10px"}}>
                      
                            </div>
                            <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "atuo"}}>
                            
                                <Editor

                                    //  Edit for CEO Message
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    value={editorState}
                                    onChange={(e) => setHVC({...HVC, editor_context : draftToHtml(convertToRaw(editorState.getCurrentContent())).toString()})}

                                />
                            </div>


                        </div> 




                                </Fragment>
                             )
                                
                            }


                                
                            </div> 
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

             <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} onClick={SaveUpdate}>Save/Update</Button>
           </div>


        </Fragment>
    )


}

export default HVC;


