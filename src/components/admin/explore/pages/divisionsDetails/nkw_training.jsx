import React, {Fragment, useState, useEffect, useContext} from  'react';
import AuthContext from '../../../../../context/auth/authContext';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './divisions_pages_main.styles.scss';
import { fontSize } from '@material-ui/system';
import ImageLibrary from '../../../imageLibrary/image_library'; 

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
}));


const NkwTraining = () => {
    const classes = useStyles();

    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     

    const [mtoTraning, setMtoTraning] = useState({
        title: '',
        logo: '',
        header_background_img: '',
        contact: {
            phone_a: '',
            phone_b: '',
            website: '',
            email: ''
        },
        editor_context: '',

        context: [],
        li_a: [],
        li_b: [],
        li_c: [],
        li_d: []
    });

    const [_id, setId] = useState('');  
    const [editBtn, setEditBtn] = useState(false);

  // Editer State Setting
const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
);

   // Dialogs
   const [open, setOpen] = React.useState(false);
   const [fullWidth, setFullWidth] = React.useState(true);
   const [maxWidth, setMaxWidth] = React.useState('sm');

    useEffect(() => {
        axios.get('/api/mtotraining').then(res =>  {
            console.log(res.data[0]);
            setMtoTraning(res.data[0]);
            setId(res.data[0]._id);
    
            const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].editor_context}`);
            const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
            setEditorState(
                EditorState.createWithContent(new_editor_context_state)
            )
            
        })
    }, []);

    const SaveUpdate = (e) => {
        e.preventDefault();
        axios.put(`/api/mtotraining/${_id}`,  mtoTraning).then(res => {
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

            <ActiveLastBreadcrumb  rootPath="Explore" childOne="Divisions" childTwo="NKW Training"   path="" />

            </div>
            <div className={classes.root} style={{paddingBottom: "200px"}} >

            <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <div className="views_container" style={{border: '23px solid black'}}>
                       <div className="bacgroundImage" style={{
                                    backgroundImage: `url('${mtoTraning.header_background_img}')`,
                                    }} >
                                        
                                    <div className="header_title">
                                        <h3>{mtoTraning.title} </h3>
                    
                                    </div>
                             
                        </div>
                     
                        <div className="qps_contexts">
                            
                        <div className="qps_contexts_left"> 
                                        <div className="right_border_style">
                                            <img src={mtoTraning.logo} />
                                        </div>
                                        <div className="contact_card">
                                            <p>WebSite</p>
                                            <p>{mtoTraning.contact.website}</p>
                                            <p>Email:</p>
                                            <p>{mtoTraning.contact.email}</p>
                                            <p>Phone</p>
                                            <p>{mtoTraning.contact.phone_a}</p>
                                            <p>{mtoTraning.contact.phone_b}</p>
                                        </div>


                                    </div>
                                    <div className="qps_contexts_right">


                                   <div
                                     dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState.getCurrentContent()))}}

                                    /> 

                                    </div>


                        </div>

                            <div className={classes.root} style={{margin: "0% 0%"}}>
                            <ExpansionPanel style={{ backgroundColor:'#e9f4db'}}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ backgroundColor:'#e9f4db'}}
                              >
                                <Typography className={classes.heading}>{mtoTraning.context[3]}</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails >
                                <Typography>
                                    <div className="wrap_panel" style={{color: "#707070", fontSize: "20px"}}> 
                                          <div className="frist_list">
                                              <ul style={{textAlign: 'left'}}>
                                                  <li>{mtoTraning.li_a[0]}</li>
                                                  <li>{mtoTraning.li_a[1]}</li> 
                                                  <li>{mtoTraning.li_a[2]}</li>
                                                  <li>{mtoTraning.li_a[3]}</li>
                                              </ul>
                                          </div>
                                          <div className="second_list">
                                            <ul style={{textAlign: 'left'}}>
                                                  <li>{mtoTraning.li_b[0]}</li>
                                                  <li>{mtoTraning.li_b[1]}</li> 
                                                  <li>{mtoTraning.li_b[2]}</li>
                                                  <li>{mtoTraning.li_b[3]}</li>
                                              </ul>
                                          </div>
                                          <div className="thrid_list">
                                              <ul style={{textAlign: 'left'}}>
                                                      <li>{mtoTraning.li_c[0]}</li>
                                                      <li>{mtoTraning.li_c[1]}</li> 
                                                      <li>{mtoTraning.li_c[2]}</li>
                                                      <li>{mtoTraning.li_c[3]} </li>
                                                  </ul>
                                          </div>
                                    </div>
                                </Typography>
                              </ExpansionPanelDetails>
                            </ExpansionPanel> <br/>
                            <ExpansionPanel style={{ backgroundColor:'#e9f4db'}}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{ backgroundColor:'#e9f4db'}}
                              >
                                <Typography className={classes.heading}>{mtoTraning.context[4]}</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                <Typography>
                                  <ul style={{textAlign: 'left', color: "#707070", fontSize: "20px" }} >
                                      <li>{mtoTraning.li_d[0]}</li>
                                      <li>{mtoTraning.li_d[1]}</li>
                                      <li>{mtoTraning.li_d[2]}</li>
                                      <li>{mtoTraning.li_d[3]}</li>
                                      <li>{mtoTraning.li_d[4]}</li>
                                      <li>{mtoTraning.li_d[5]}</li>
                                      <li>{mtoTraning.li_d[6]}</li>
                                      <li>{mtoTraning.li_d[7]}</li>


                                  </ul>
                                </Typography>
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                            {/* <ExpansionPanel disabled>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                              >
                                <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
                              </ExpansionPanelSummary>
                            </ExpansionPanel> */}
                            </div>

                       </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div> 
                            <div style={{textAlign:"left", padding:"0 10px"}}>        
                                    
                            {!editBtn ? (
                                    <Fab  type="button"  onClick={() => showEditBtn(editBtn)}  color="secondary" aria-label="edit" className={classes.fab}  >
                                    <EditIcon />
                                    </Fab>
                                ) : (
                                    <Fab onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                                    <CloseIcon />
                                    </Fab>
                                )
                                
                            }
                            </div>

                        { editBtn && (
                            <Fragment>

                                <div style={{border:"1px solid #c4c4c4"}}>
                                    <h3>Change Header Images</h3>
                                    <input type="text" 
                                            placeholder="Change your logo here" 
                                            value={mtoTraning.header_background_img} 
                                            onChange={(e) => setMtoTraning({...mtoTraning, header_background_img: e.target.value}) }
                                    /> 
                                    
                                    <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                    <button type="button" onClick={() => setMtoTraning({...mtoTraning, header_background_img: ''})}>remove</button>


                                    <div>
                                            <h3>Change Title</h3>
                                            <input type="text" 
                                                placeholder="Change page title" 
                                                value={mtoTraning.title} 
                                                onChange={(e) => setMtoTraning({...mtoTraning, title: e.target.value})}
                                            /> 
                                    </div>

                                </div> 

                                <div style={{textAlign:"left", padding:"0 10px"}}> 
                                    <div>
                                            Edit Contact Info

                                        <div>
                                            <label htmlFor="Name">WEB Site:</label>
                                            <input type="text" 
                                                placeholder="NAME" 
                                                value={mtoTraning.contact.website}
                                                onChange={e => 
                                                        {setMtoTraning({...mtoTraning,
                                                                    contact: { 
                                                                        ...mtoTraning.contact,
                                                                        website: e.target.value
                                                                    }
                                                                })
                                                        } }
                                            />
                                        </div> 
                                        <div>
                                            <label htmlFor="Job">Email:</label>
                                            <input 
                                                type="text" 
                                                placeholder="Job" 
                                                value={mtoTraning.contact.email} 
                                                onChange={e => 
                                                    {setMtoTraning({...mtoTraning,
                                                                contact: { 
                                                                    ...mtoTraning.contact,
                                                                    email: e.target.value
                                                                }
                                                            })
                                                    } }
                                            />

                                        </div> 


                                        <div>
                                            <label htmlFor="Job">Phone One:</label>
                                            <input 
                                                type="text" 
                                                placeholder="Job" 
                                                value={mtoTraning.contact.phone_a} 
                                                onChange={e => 
                                                    {setMtoTraning({...mtoTraning,
                                                                contact: { 
                                                                    ...mtoTraning.contact,
                                                                    phone_a: e.target.value
                                                                }
                                                            })
                                                    } }
                                            />

                                        </div> 

                                        <div>
                                            <label htmlFor="Job">Phone Two:</label>
                                            <input 
                                                type="text" 
                                                placeholder="Job" 
                                                value={mtoTraning.contact.phone_b} 
                                                onChange={e => 
                                                    {setMtoTraning({...mtoTraning,
                                                                contact: { 
                                                                    ...mtoTraning.contact,
                                                                    phone_b: e.target.value
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
                                    onChange={(e) => setMtoTraning({...mtoTraning, editor_context : draftToHtml(convertToRaw(editorState.getCurrentContent())).toString()})}

                                />
                            </div>
                        </div> 


                        <div>
                           <div style={{textAlign: "left", padding: "0 10px"}}>
                            <Fab   color="secondary" aria-label="edit" className={classes.fab}  >
                                            <EditIcon />
                            </Fab>
                            </div>
                            <h3>Panel List one</h3>
                            <h3 >Panel Title: 
                                     <input type="text" 
                                            value={mtoTraning.context[3]} 
                                            onChange={
                                                (e) => setMtoTraning({
                                                    ...mtoTraning,
                                                    context: [mtoTraning.context[0], mtoTraning.context[1], mtoTraning.context[2], e.target.value, mtoTraning.context[4] ]
                                                })
                                             }
                                      /> 
                            </h3>
                               
                            <li>
                                <input type="text" 
                                       value={mtoTraning.li_a[0]} 
                                       onChange={
                                           (e) => setMtoTraning({...mtoTraning, 
                                            li_a:[e.target.value, mtoTraning.li_a[1], mtoTraning.li_a[2], mtoTraning.li_a[3]]})
                                       }

                                />             
                            </li> 
                            <li>
                                <input type="text"  
                                       value={mtoTraning.li_a[1]} 
                                       onChange={
                                        (e) => setMtoTraning({...mtoTraning,
                                             li_a:[mtoTraning.li_a[0], e.target.value, mtoTraning.li_a[2], mtoTraning.li_a[3]]})
                                    }
                                />             
                            </li> 
                            <li>
                                <input type="text"  
                                       value={mtoTraning.li_a[2]} 
                                       onChange={ 
                                           (e) => setMtoTraning({...mtoTraning, 
                                            li_a:[mtoTraning.li_a[0], mtoTraning.li_a[1],  e.target.value , mtoTraning.li_a[3]]})
                                       }
                                        
                                />             
                            </li>   
                            <li>
                                <input type="text"  
                                       value={mtoTraning.li_a[3]} 
                                       onChange={ 
                                        (e) => setMtoTraning({...mtoTraning, 
                                            li_a:[mtoTraning.li_a[0], mtoTraning.li_a[1], mtoTraning.li_a[2], e.target.value]})
                                       }
                                />             
                            </li> 


                            <li>
                                <input type="text"  
                                       value={mtoTraning.li_b[0]}
                                       onChange={
                                           (e) => setMtoTraning({
                                               ...mtoTraning,
                                               li_b: [e.target.value, mtoTraning.li_b[1], mtoTraning.li_b[2], mtoTraning.li_b[3]]
                                           })
                                       }

                                />             
                            </li> 
                            <li>
                                <input type="text"  
                                       value={mtoTraning.li_b[1]}
                                       onChange={
                                        (e) => setMtoTraning({
                                            ...mtoTraning,
                                            li_b: [mtoTraning.li_b[0], e.target.value, mtoTraning.li_b[2], mtoTraning.li_b[3]]
                                        })
                                    }
                                />             
                            </li>   
                            <li>
                                <input  type="text" 
                                        value={mtoTraning.li_b[2]}
                                        onChange={
                                            (e) => setMtoTraning({
                                                ...mtoTraning,
                                                li_b: [mtoTraning.li_b[0], mtoTraning.li_b[1], e.target.value , mtoTraning.li_b[3]]
                                            })
                                        }
                                />             
                            </li> 
                            <li>
                                <input type="text" 
                                       value={mtoTraning.li_b[3]}
                                       onChange={
                                        (e) => setMtoTraning({
                                            ...mtoTraning,
                                            li_b: [mtoTraning.li_b[0], mtoTraning.li_b[1], mtoTraning.li_b[2], e.target.value ]
                                        })
                                    }
                                />             
                            </li> 


                            <li>
                                <input type="text" 
                                       value={mtoTraning.li_c[0]} 
                                       onChange={
                                           (e) => setMtoTraning({
                                               ...mtoTraning,
                                               li_c: [e.target.value, mtoTraning.li_c[1], mtoTraning.li_c[2], mtoTraning.li_c[3] ]
                                           })
                                       }
                                    
                                />             
                            </li> 
                            <li>
                                <input type="text" 
                                       value={mtoTraning.li_c[1]} 
                                       onChange={
                                        (e) => setMtoTraning({
                                            ...mtoTraning,
                                            li_c: [mtoTraning.li_c[0], e.target.value, mtoTraning.li_c[2], mtoTraning.li_c[3] ]
                                        })
                                    }

                                />             
                            </li> 
                            <li>
                                <input type="text" 
                                       value={mtoTraning.li_c[2]} 
                                       onChange={
                                        (e) => setMtoTraning({
                                            ...mtoTraning,
                                            li_c: [mtoTraning.li_c[0], mtoTraning.li_c[1], e.target.value, mtoTraning.li_c[3] ]
                                        })
                                    }
                                />             
                            </li> 
                            <li>
                                <input type="text" 
                                       value={mtoTraning.li_c[3]} 
                                       onChange={
                                        (e) => setMtoTraning({
                                            ...mtoTraning,
                                            li_c: [mtoTraning.li_c[0], mtoTraning.li_c[1], mtoTraning.li_c[2], e.target.value ]
                                        })
                                    }
                                />             
                            </li> 

                        </div> 

                        <div>
                     <h3>Panel List Two</h3>
                     <h3 >Panel Title:  <input type="text" value={mtoTraning.context[4]}  
                         onChange={
                            (e) => setMtoTraning({
                                ...mtoTraning,
                                context: [mtoTraning.context[0], mtoTraning.context[1], mtoTraning.context[2], mtoTraning.context[3], e.target.value ]
                            })
                         }
                     />
                     </h3>

                     <li>
                      <input type="text" 
                             value={mtoTraning.li_d[0]}
                            onChange={
                                (e) => setMtoTraning({
                                    ...mtoTraning,
                                    li_d: [e.target.value, mtoTraning.li_d[1], mtoTraning.li_d[2], mtoTraning.li_d[3],
                                     mtoTraning.li_d[4], mtoTraning.li_d[5],mtoTraning.li_d[6],mtoTraning.li_d[7]]
                                })
                             }
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[1]} 
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], e.target.value, mtoTraning.li_d[2], mtoTraning.li_d[3],
                             mtoTraning.li_d[4], mtoTraning.li_d[5],mtoTraning.li_d[6],mtoTraning.li_d[7]]
                        })
                     }
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[2]}
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], mtoTraning.li_d[1], e.target.value, mtoTraning.li_d[3],
                             mtoTraning.li_d[4], mtoTraning.li_d[5],mtoTraning.li_d[6],mtoTraning.li_d[7]]
                        })
                     }
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[3]} 
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], mtoTraning.li_d[1], mtoTraning.li_d[2], e.target.value,
                             mtoTraning.li_d[4], mtoTraning.li_d[5],mtoTraning.li_d[6],mtoTraning.li_d[7]]
                        })
                     }
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[4]} 
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], mtoTraning.li_d[1], mtoTraning.li_d[2], mtoTraning.li_d[3],
                            e.target.value, mtoTraning.li_d[5],mtoTraning.li_d[6],mtoTraning.li_d[7]]
                        })
                     }
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[5]} 
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], mtoTraning.li_d[1], mtoTraning.li_d[2], mtoTraning.li_d[3],
                             mtoTraning.li_d[4], e.target.value,mtoTraning.li_d[6],mtoTraning.li_d[7]]
                        })
                     }
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[6]} 
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], mtoTraning.li_d[1], mtoTraning.li_d[2], mtoTraning.li_d[3],
                             mtoTraning.li_d[4], mtoTraning.li_d[5],e.target.value,mtoTraning.li_d[7]]
                        })
                     }
                      
                      />             
                     </li>
                     <li>
                      <input type="text" value={mtoTraning.li_d[7]} 
                       onChange={
                        (e) => setMtoTraning({
                            ...mtoTraning,
                            li_d: [mtoTraning.li_d[0], mtoTraning.li_d[1], mtoTraning.li_d[2], mtoTraning.li_d[3],
                             mtoTraning.li_d[4], mtoTraning.li_d[5],mtoTraning.li_d[6],e.target.value]
                        })
                     }
                      />             
                     </li>

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

             <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} onClick={SaveUpdate}>Save/Update</Button>
           </div>
        </Fragment>
      
    )


}

export default NkwTraining;


