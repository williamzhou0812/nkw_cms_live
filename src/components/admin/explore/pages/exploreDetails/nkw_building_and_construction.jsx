import React, {Fragment, useState, useEffect, useContext}from  'react';
import AuthContext from '../../../../../context/auth/authContext';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ImageLibrary from '../../../imageLibrary/image_library'; 

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';

import './explore_details.main.styles.scss';
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

import ActiveLastBreadcrumbExploreDetail from '../../../../../components/BreadcrumbNav/BreadcrumbNavExplore';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '92%',
      paddingLeft: '1.4rem',
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));





const  NkwBuildingandConstruction = () => { 
    const classes = useStyles();

    // Auth 
    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     


    const  [nkwBC, setNKWBC ] = useState({
        title: '',
        logo1:'',
        logo2: '',
        header_background_img: '',
        cotegory_footer_img:'',
        subtitle: [],
        context_editor_one:'',
        context_editor_two: '',
        context_editor_three: '',
        context_editor_four: '',
        context_editor_five: ''

    });


    const [_id, setId] = useState('');  

    const [editBtn, setEditBtn] = useState(false);


    // Editer State Setting
const [editorState_one, setEditorState_one] = useState(
    EditorState.createEmpty()
);
const [editorState_two, setEditorState_two] = useState(
    EditorState.createEmpty()
);
const [editorState_three, setEditorState_three] = useState(
    EditorState.createEmpty()
);
const [editorState_four, setEditorState_four] = useState(
    EditorState.createEmpty()
);
const [editorState_five, setEditorState_five] = useState(
    EditorState.createEmpty()
);

  // Dialogs
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');




    useEffect(() => {
        
        axios.get('/api/nkwbc').then(res => { 
                console.log(res.data[0]);
                setNKWBC(res.data[0]);
                setId(res.data[0]._id);

                const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].context_editor_one}`);
                const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
                setEditorState_one(
                    EditorState.createWithContent(new_editor_context_state)
                )

                const blockHTML_editor_two  = convertFromHTML(`${res.data[0].context_editor_two}`);
                const new_editor_context_state_two  = ContentState.createFromBlockArray(blockHTML_editor_two);
                setEditorState_two(
                    EditorState.createWithContent(new_editor_context_state_two)
                )

                const blockHTML_editor_three  = convertFromHTML(`${res.data[0].context_editor_three}`);
                const new_editor_context_state_three  = ContentState.createFromBlockArray(blockHTML_editor_three);
                setEditorState_three(
                    EditorState.createWithContent(new_editor_context_state_three)
                )

                const blockHTML_editor_four = convertFromHTML(`${res.data[0].context_editor_four}`);
                const new_editor_context_state_four  = ContentState.createFromBlockArray(blockHTML_editor_four);
                setEditorState_four(
                    EditorState.createWithContent(new_editor_context_state_four)
                )

                const blockHTML_editor_five = convertFromHTML(`${res.data[0].context_editor_five}`);
                const new_editor_context_state_five = ContentState.createFromBlockArray(blockHTML_editor_five);
                setEditorState_five(
                    EditorState.createWithContent(new_editor_context_state_five)
                )


        })

    }, [])


const showEditBtn = (show) => {
    //  console.log(show);
        let _show = false;
        _show = !show;
        setEditBtn(_show);
}
    

const SaveUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/nkwbc/${_id}`, nkwBC ).then(res => {
       console.log(res.data)
  
      // var contentState = ContentState.createFromBlockArray(blocksFromHTML);
  
  
  
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
                  marginTop:"3%"

            }}>
            <ActiveLastBreadcrumbExploreDetail rootPath="Explore" childOne="NKW Building And Construction" path="" />
            </div>

            <div className={classes.root} >

                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <div className="views_container" style={{border: '23px solid black'}}>
                                <div className="bacgroundImage" style={{
                                        backgroundImage: `url('${nkwBC.header_background_img}')`,
                                        }} >
                                            
                                        <div className="header_title">
                                            <h3 sytle={{textAlign: 'center'}}>{nkwBC.title}
                                        
                                            </h3>
                        
                                        </div>
                                
                                </div>
                                <div style={{padding:'10px 30px', textAlign: 'left', color:'#707070', fontSize:"18px"}}>

                                    
                                    <div>
                                

                                    <div
                                         dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_one.getCurrentContent()))}}
    
                                        /> 
    

                                    </div>

                                   <div style={{ padding: "20px 0px", textAlign: 'left', color:'#707070', fontSize:"18px", 
                                                display: "flex"
                                        }}>
                                       <div style={{flex: 1}}>
                                           

                                            <div
                                             dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_two.getCurrentContent()))}}
    
                                            /> 
                                       </div>
                                       <div style={{flex: 1}}>

                                            <div
                                             dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_three.getCurrentContent()))}}
    
                                            /> 
                                        </div>
                                   </div>

                                   <div style={{ padding: "20px 0px", textAlign: 'left', color:'#707070', fontSize:"18px", 
                                                display: "flex"
                                        }}>
                                      
                                       <div style={{flex: 1}}>
                                        
                                            <div
                                             dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_four.getCurrentContent()))}}
    
                                            /> 
                                        </div>
                                   </div>

                                    <div className="section_title">
                                            <p style={{fontSize:"20px"}}>{nkwBC.subtitle[0]}</p>
                                            <hr />
                                    </div>
                                    <div className="construction_logo_section"> 
                                        <div>
                                            <img src={nkwBC.logo1} alt="" width="100%"/>
                                        </div> 
                                        <div>
                                            <img src={nkwBC.logo2} alt="" width="100%"/>

                                        </div>
                                    </div>
   

                                    <div>
                                       
                                        <div
                                             dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_five.getCurrentContent()))}}
    
                                         /> 
                                        
                                    </div>

                                       

                                </div>


                                       <img  src={nkwBC.cotegory_footer_img} alt="" width="100%" height="100%" style={{paddingTop: "20px"}} />
                        </div>
                       
                                
                    </Grid>
                    <Grid item xs={6}>

                          <div>
                            <div style={{textAlign: "left", padding: "0 10px"}}>


                                {!editBtn? (
                                    <Fab   onClick={() => showEditBtn(editBtn)}  color="secondary" aria-label="edit" className={classes.fab}  >
                                                    <EditIcon />
                                    </Fab>

                                 ): (
                                    <Fab onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                                         <CloseIcon />
                                    </Fab>
                                 )

                                } 
                                { editBtn && (
                                    <Fragment>
                                         <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "auto"}}>
                                                        
                                        <Editor
    
                                            //  Edit for CEO Message
                                            editorState={editorState_one}
                                            onEditorStateChange={setEditorState_one}
                                            value={editorState_one}
                                            onChange={(e) => setNKWBC({...nkwBC, context_editor_one : draftToHtml(convertToRaw(editorState_one.getCurrentContent())).toString()})}
    
                                        />
                                        </div>
    
                                        <div style={{display:"flex",  border: '1px solid rgb(230, 230, 230)', }}>
    
                                            <div style={{flex: 1, border: '1px solid rgb(230, 230, 230)', }}>
                                                <Editor
                                                    //  Edit for CEO Message
                                                    editorState={editorState_two}
                                                    onEditorStateChange={setEditorState_two}
                                                    value={editorState_two}
                                                    onChange={(e) => setNKWBC({...nkwBC, context_editor_two : draftToHtml(convertToRaw(editorState_two.getCurrentContent())).toString()})}
    
                                                    />
                                            </div>
                                            <div style={{flex: 1, border: '1px solid rgb(230, 230, 230)', }}>
                                                <Editor
                                                    //  Edit for CEO Message
                                                    editorState={editorState_three}
                                                    onEditorStateChange={setEditorState_three}
                                                    value={editorState_three}
                                                    onChange={(e) => setNKWBC({...nkwBC, context_editor_three : draftToHtml(convertToRaw(editorState_three.getCurrentContent())).toString()})}
    
                                                    />
                                            </div>
                                               
                                      </div> 
                                      <div style={{flex: 1, border: '1px solid rgb(230, 230, 230)', }}>
                                     <Editor
                                        //  Edit for CEO Message
                                        editorState={editorState_four}
                                        onEditorStateChange={setEditorState_four}
                                        value={editorState_four}
                                        onChange={(e) => setNKWBC({...nkwBC, context_editor_four : draftToHtml(convertToRaw(editorState_four.getCurrentContent())).toString()})}

                                                />
                                        </div>
                                        
                                        <br/>
                                        <hr/>

                                        <div>
                                     <div style={{textAlign: "left", padding: "0 10px"}}>
                               
                                            </div>
                                            <h3>Change Logos</h3>
                                            LOGO 1: 
                                                <input type="text"  value={nkwBC.logo1}  />
                                                <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                                <button type="button" onClick={() => setNKWBC({...nkwBC, logo1: ''})} >remove</button> <br/> 
                                            LOGO 2: 
                                                <input type="text" value={nkwBC.logo2} />
                                                <button type="button" onClick={handleClickOpen} >Libary / Browse Libary</button>
                                                <button type="button" onClick={() => setNKWBC({...nkwBC.logo2})} >remove</button>
                                                <div style={{flex: 1, border: '1px solid rgb(230, 230, 230)', }}>
                                                <Editor
                                                    //  Edit for CEO Message
                                                    editorState={editorState_five}
                                                    onEditorStateChange={setEditorState_five}
                                                    value={editorState_five}
                                                    onChange={(e) => setNKWBC({...nkwBC, context_editor_five : draftToHtml(convertToRaw(editorState_five.getCurrentContent())).toString()})}

                                                />
                                                </div>
                                        
                                            <div>
                                                <h3>Edit Footer Image</h3>
                                                <input type="text" value={nkwBC.cotegory_footer_img} 
                                                        onChange={e => setNKWBC({...nkwBC,  cotegory_footer_img: e.target.value}) } />  

                                                <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                                <button type="button" onClick={() => setNKWBC({...nkwBC, cotegory_footer_img: ''})}>remove</button>
                                                        {/* keep update header and title comlplete rest lof= sect */}
                                            </div>

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



                        </div> 

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

export default NkwBuildingandConstruction;