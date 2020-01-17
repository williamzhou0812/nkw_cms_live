///
import React, {Fragment, useState, useEffect, useContext} from 'react';
import AuthContext from '../../../../../context/auth/authContext';

import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ImageLibrary from '../../../imageLibrary/image_library'; 
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';

import './divisions_pages_main.styles.scss';

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


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '92%',
      paddingLeft: '1.4rem',
      marginBottom: "60px"
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));



const Expac_png_expac_aus_page2 = ({location}) => { 

    const classes = useStyles();

    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     


    const [expacPNG, setExpacPNG] = useState({
        content:[],
        title:'',
        header_background_img: '',
        logo: '',
        contact: {
                name:'',
                jobs: '',
                phone_a: '',
                phone_b: ''
        },
        editor_context_one: '',
        editor_context_two: '',
        editor_context_three: ''
          
    });
    
    const [_id, setId] = useState('');

    const [editBtn, setEditBtn] = useState(false);


// init Html Editer
const [editorStateOne, setEditorStateOne] = useState(
    EditorState.createEmpty()
);

const [editorStateTwo, setEditorStateTwo] = useState(
    EditorState.createEmpty()
);

const [editorStateThree, setEditorStateThree] = useState(
    EditorState.createEmpty()
);

         // Dialogs
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
    
  useEffect(() => { 
        axios.get('/api/expacpng').then( res => {
    
            console.log(res.data[0])
            setExpacPNG(res.data[0]);
            setId(res.data[0]._id);

            const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].editor_context_one}`);
            const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
            setEditorStateOne(
                EditorState.createWithContent(new_editor_context_state)
            )


            const blockHTML_hvtl_editor_two  = convertFromHTML(`${res.data[0].editor_context_two}`);
            const new_editor_context_state_two  = ContentState.createFromBlockArray(blockHTML_hvtl_editor_two);
            setEditorStateTwo(
                EditorState.createWithContent(new_editor_context_state_two)
            )

            const blockHTML_hvtl_editor_three  = convertFromHTML(`${res.data[0].editor_context_three}`);
            const new_editor_context_state_three  = ContentState.createFromBlockArray(blockHTML_hvtl_editor_three);
            setEditorStateThree(
                EditorState.createWithContent(new_editor_context_state_three)
            )
    
        });
    }, []);


    const showEditBtn = (show) => {
        let _show = false;
        _show = !show;
        setEditBtn(_show);
    }

    const SaveUpdate = (e) => {
        e.preventDefault();
        axios.put(`/api/expacpng/${_id}`,  expacPNG).then(res => {
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



    return (
        <Fragment>
               <div style={{
                  width: '92%',
                  marginLeft: '1.4rem',
                  padding: '25px 0px',
                  marginTop:"3%",
             
            }}>
            <ActiveLastBreadcrumb  rootPath="Explore" childOne="Divisions" childTwo="Expac PNG & Expac AUS" path={location.pathname}  />

            </div>
             <div className={classes.root}>
                <Grid container spacing={3}>
                <Grid item xs={6}> 
                    <div className="views_container" style={{border: '23px solid black'}} >
                        <div className="bacgroundImage" style={{
                        backgroundImage: `url('${expacPNG.header_background_img}')`,
                        }} >
                                  <div className="header_title">
                                <h3>{expacPNG.title}</h3>             
                            </div>
                        
                        </div>  

                        <div className="expac_png_aus_contexts">
                            <div className="expac_png_aus_contexts_left" >
                                <div className="right_border_style">

                                    <img src={`${expacPNG.logo}`} />
                                </div>
                                <div> 
                                     <div className="contact_card">
                                        <h3> Contact </h3>
                                        <h4>{expacPNG.contact.name} <br/>
                                            <span>{expacPNG.contact.jobs}</span>
                                        </h4>
                                        <h4>{`Phone`} 
                                            <br/> <span className="spanStyle">{expacPNG.contact.phone_a} </span> <br/>
                                            <span>{expacPNG.contact.phone_b} </span> 
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="expac_png_aus_contexts_right">
                                    {/* <p> {expacPNG.content[0]} </p>
                                    <p> {expacPNG.content[1]} </p>  */}
                                <div
                                    dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorStateOne.getCurrentContent()))}}
                                /> 
                                <div className="expac_png_aus_contexts_list_view">
                                   <div
                                     dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorStateTwo.getCurrentContent()))}}
                                   /> 

                                       {/* <p>{expacPNG.content[2]}</p>
                                       <ul> 
                                           <li>{expacPNG.content[3]}</li>
                                           <li>{expacPNG.content[4]}</li>
                                           <li>{expacPNG.content[5]}</li>
                                           <li>{expacPNG.content[6]}</li>
                                           <li>{expacPNG.content[7]}</li>
                                           <li>{expacPNG.content[8]}</li>
                                       </ul> */}
                                   </div>
                                   <div>
                                   <div
                                     dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorStateThree.getCurrentContent()))}}
                                   /> 

                                   </div>
                            </div>

                        </div>
                       
                    </div>

                
                </Grid>
                    <Grid item xs={6} >
                    <div style={{textAlign:"left", padding: "0 10px"}}>

                        {!editBtn ? (    
                                <Fab onClick={() => showEditBtn(editBtn)}  type="button"  onClick={() => showEditBtn(editBtn)}  color="secondary" aria-label="edit" className={classes.fab}  >
                                <EditIcon />
                                    </Fab>
                            ) : (

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
                                    value={expacPNG.header_background_img} 
                                    onChange={(e) => setExpacPNG({...expacPNG, header_background_img: e.target.value}) }
                            /> 
                            <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                            < button type="button" onClick={() => setExpacPNG({...expacPNG, header_background_img : ''})}>remove</button>

                            <div>
                                <h3>Title</h3>
                                <input type="text" 
                                    placeholder="Change page title" 
                                    value={expacPNG.title} 
                                    onChange={(e) => setExpacPNG({...expacPNG, title: e.target.value})}
                                /> 
                                 <h3>Logo</h3>
                                <input type="text" 
                                        placeholder="Change your logo here" 
                                        value={expacPNG.logo} 
                                        onChange={(e) => setExpacPNG({...expacPNG, logo: e.target.value}) }
                                    /> 
                                <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                < button type="button" onClick={() => setExpacPNG({...expacPNG,  logo: ''})}>Remove</button>
                            </div>

                        </div>


                            <div style={{border:"1px solid #c4c4c4", marginTop:"5px"}}>
                           <div style={{display:'flex', width:"100%"}}>  
                           <h3>Name:
                                <input value={expacPNG.contact.name} onChange={(e) => setExpacPNG({
                                        ...expacPNG,
                                        contact: { 
                                                ...expacPNG.contact, 
                                                name: e.target.value
                                            }
                                         
                                })} />
                            </h3>
                            <h3>Job: 
                                <input value={expacPNG.contact.jobs} onChange={(e) => setExpacPNG({
                                    ...expacPNG,
                                    contact: {
                                        ...expacPNG.contact,
                                        jobs: e.target.value
                                    }
                                })}/> 
                            </h3>
                            <h3>Phone 1: 
                                <input value={expacPNG.contact.phone_a} onChange={(e) => setExpacPNG({
                                    ...expacPNG,
                                    contact: { 
                                        ...expacPNG.contact,
                                        phone_a: e.target.value
                                    }
                                })}/>
                            </h3>
                           
                            <h3>
                                Phone 2: 
                                <input value={expacPNG.contact.phone_b}  onChange={(e) => setExpacPNG({
                                    ...expacPNG,
                                    contact: { 
                                        ...expacPNG.contact,
                                        phone_b: e.target.value
                                    }
                                })}/>
                            </h3> 
                                
                           </div>
                         
                           
                           </div>

                           <div style={{border:"1px solid #c4c4c4", marginTop:"5px"}}> 
                 
                                <div>
                                    <h4>Frist Pargarh: 
                                        <br/>
                                        
                                        {/* <textarea type="text" value={expacPNG.content[0]}   
                                            style={{
                                                width:'100%',
                                                minHeight: '200px'
                                            }}
                                            onChange={(e) => {
                                                
                                                setExpacPNG({...expacPNG, content: [ e.target.value, expacPNG.content[1], expacPNG.content[2], expacPNG.content[3],expacPNG.content[4], expacPNG.content[5], expacPNG.content[6],
                                                    expacPNG.content[7], expacPNG.content[8], expacPNG.content[9], expacPNG.content[10]
                                                ]})
                                            }}


                                         /> */}
                                    </h4>
                                    <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', minHeight: "300px"}}>
                                        
                                        <Editor

                                            //  Edit for CEO Message
                                            editorState={editorStateOne}
                                            onEditorStateChange={setEditorStateOne}
                                            value={editorStateOne}
                                            onChange={(e) => setExpacPNG({...expacPNG, editor_context_one : draftToHtml(convertToRaw(editorStateOne.getCurrentContent())).toString()})}
                                            />
                                    </div>

                                    <h4>Second Pargarh: 
                                        {/* <br/>
                                        <textarea type="text" value={expacPNG.content[1]}   
                                            style={{
                                                width:'100%',
                                                minHeight: '200px'
                                            }}
                                            onChange={(e) => {
                                                
                                                setExpacPNG({...expacPNG, content: [ expacPNG.content[0], e.target.value, expacPNG.content[2], expacPNG.content[3],expacPNG.content[4], expacPNG.content[5], expacPNG.content[6],
                                                    expacPNG.content[7], expacPNG.content[8], expacPNG.content[9], expacPNG.content[10]
                                                ]})
                                            }}


                                         /> */}
                                    </h4>
                                    <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', minHeight: "300px"}}>
                                        
                                        <Editor

                                            //  Edit for CEO Message
                                            editorState={editorStateTwo}
                                            onEditorStateChange={setEditorStateTwo}
                                            value={editorStateTwo}
                                            onChange={(e) => setExpacPNG({...expacPNG, editor_context_two : draftToHtml(convertToRaw(editorStateTwo.getCurrentContent())).toString()})}

                                        />
                                    </div>


                                    <h4>Third Pargarh: 
                                        {/* <br/>
                                        <textarea type="text" value={expacPNG.content[2]}   
                                            style={{
                                                width:'100%',
                                                
                                            }}
                                            onChange={(e) => {
                                                
                                                setExpacPNG({...expacPNG, content: [ expacPNG.content[0], expacPNG.content[1], e.target.value , expacPNG.content[3],expacPNG.content[4], expacPNG.content[5], expacPNG.content[6],
                                                    expacPNG.content[7], expacPNG.content[8], expacPNG.content[9], expacPNG.content[10]
                                                ]})
                                            }}


                                         />
                                         <ul>

                                            <li>
                                                <input type="text" value={expacPNG.content[3]} /> 
                                            </li>
                                            <li>
                                                <input type="text" value={expacPNG.content[4]} /> 
                                            </li>
                                            <li>
                                                <input type="text" value={expacPNG.content[5]} /> 
                                            </li>
                                            <li>
                                                <input type="text" value={expacPNG.content[6]} /> 
                                            </li>
                                            <li>
                                                <input type="text" value={expacPNG.content[7]} /> 
                                            </li>
                                            <li>
                                                <input type="text" value={expacPNG.content[8]} /> 
                                            </li>
                                         </ul> */}
                                    </h4>

                                    <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', minHeight: "300px"}}>
                                        
                                        <Editor

                                            //  Edit for CEO Message
                                            editorState={editorStateThree}
                                            onEditorStateChange={setEditorStateThree}
                                            value={editorStateThree}
                                            onChange={(e) => setExpacPNG({...expacPNG, editor_context_three : draftToHtml(convertToRaw(editorStateThree.getCurrentContent())).toString()})}

                                        />
                                    </div>




                                </div>
                           </div>

                            </Fragment>
                        )
                          
                        }
                                     
                        


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

                 

                    
                     
                      </div>
                    </Grid>

                </Grid>
             </div>
             <div className="fixedFooter" color="secondary" style={{background: "#FFFFFF", zIndex:"999"}} >
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

export default Expac_png_expac_aus_page2;

