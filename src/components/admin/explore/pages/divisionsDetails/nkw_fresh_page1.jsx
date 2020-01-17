import React, {Fragment, useState, useEffect, useContext} from 'react';
import AuthContext from '../../../../../context/auth/authContext';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';

import axios from 'axios';

import './divisions_pages_main.styles.scss';

//Import Text Editer Larbray

import {EditorState, convertToRaw, ContentState,convertFromHTML, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import ImageLibrary from  '../../../imageLibrary/image_library';


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



const Nkw_fresh_page1 = () => { 

    const classes = useStyles();

    // Auth
    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     


const [nkwFreshPage1, setNkwFreshPage1 ] = useState({
        imgs:[],
        content: [],
        title: '',
        header_background_img: '',
        logo:'',
        phone_a:'',
        phone_b:'',
        email: '',
        context_editor_one:'',
        context_editor_two: '',
        context_editor_three: '',
        context_editor_four: ''
})
const [_id, setId] = useState('');

// Define Edit Button 
const [editBtn, setEditBtn] = useState(false);


// define context_editor 
const [editorState_one, setEditorState_one] = useState(
    EditorState.createEmpty()
)
const [editorState_two, setEditorState_two] = useState(
    EditorState.createEmpty()
)

const [editorState_three, setEditorState_three] = useState(
    EditorState.createEmpty()
);

const [editorState_four, setEditorState_four] = useState(
    EditorState.createEmpty()
)

// Dialogs
const [open, setOpen] = React.useState(false);
const [fullWidth, setFullWidth] = React.useState(true);
const [maxWidth, setMaxWidth] = React.useState('sm');



useEffect(() => {
     axios.get('/api/nkwfreshdetails').then( res => {

         console.log(res.data[0])
         setNkwFreshPage1(res.data[0]);
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



     });
}, []);


const showEditBtn = (show) => {
    let _show = false; 
    _show = !show;
    setEditBtn(_show);
}

const SaveUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/nkwfreshdetails/${_id}`,  nkwFreshPage1).then(res => {
        console.log(res.data.about_page_section1)
    
    
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
            <ActiveLastBreadcrumb  rootPath="Explore" childOne="Divisions" childTwo={nkwFreshPage1.title} path=""/>
        </div>
        <div className={classes.root} style={{paddingBottom: "250px"}}>
        <Grid container spacing={3}>
        <Grid item xs={6}>

            <div className="views_container" style={{border: '23px solid black'}}>
           
                        <div className="bacgroundImage" style={{
                        backgroundImage: `url('${nkwFreshPage1.header_background_img}')`,
                        }} >

                            <div className="header_title">
                                <h3>{nkwFreshPage1.title}</h3>             
                            </div>
                        
                        </div>      
                        <div className="section_one_wraper">
                                
                                <div className="section_left">
                                    <img src={`${nkwFreshPage1.logo}`} />
                                </div>   

                                <div className="section_right" >
                                    <div className="contact_card">
                                        <h3> Contact </h3>
                                        <h4>{nkwFreshPage1.phone_a} </h4>
                                        {nkwFreshPage1.phone_b && (
                                            <h4>

                                                OR {nkwFreshPage1.phone_b}
                                            </h4>
                                           )
                                        }
                                          
                                        <h4>{nkwFreshPage1.email} </h4>
                                    </div>
                                </div>
                        </div>

                        <div className="section_two"> 
                            {/* <div>
                                <p>{nkwFreshPage1.content[0]}</p>
                            </div>
                            <div>
                                <p>{nkwFreshPage1.content[1]}</p>
                            </div>

                            
                            <div className="page_middle_img_one">
                                <img src={nkwFreshPage1.imgs[0]}/> 
                            </div> 

                        

                            <div>
                                <p>{nkwFreshPage1.content[2]}</p>
                            </div>

                            <div>
                                <p>{nkwFreshPage1.content[3]}</p>
                            </div>

                            <div>
                                <p>{nkwFreshPage1.content[4]}</p>
                            </div> */}

                            <div>
                                <div
                                    dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_one.getCurrentContent()))}}

                                /> 
                            </div>


                            <div className="page_middle_img_one">
                                <img src={nkwFreshPage1.imgs[0]}/> 
                            </div> 
                            <br/> 

                            <div>
                                <div
                                    dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_two.getCurrentContent()))}}

                                /> 
                            </div>



                            <div className="pargarh_section_2">
                                    <img src={nkwFreshPage1.imgs[1]} alt=""  width="46%" height="35%"/>
                                    <div className="p_s_left_text">
                                    <p>
                                    
                                        <div>
                                            <div
                                                dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_three.getCurrentContent()))}}

                                            /> 
                                        </div>
                                    </p>
                                    </div>
                            
                            </div>
                            <div>
                                <p>{nkwFreshPage1.content[6]}</p>

                                <div 
                                        dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_four.getCurrentContent()))}}
                                /> 
                            </div>

                        </div>
            
                  

            </div>
            </Grid>
                <Grid item xs={6}>
                        {/* // right contents */}
                        <div style={{textAlign:"left", padding:"0 10px"}}>

                            {!editBtn ? ( 
                                <Fab  type="button" onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}  >
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
                                        placeholder="Chagne Header Iamge or upload Image" 
                                        value={nkwFreshPage1.header_background_img} 
                                        onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, header_background_img: e.target.value}) }
                                    /> 
                              <button type="button" onClick={handleClickOpen}>Libary / Browse</button>
                              <button type="button" onClick={() => setNkwFreshPage1({...nkwFreshPage1, header_background_img: ''})} >Remove</button> 
                                    
                                    <div>
                                        <h3>Title</h3>
                                        <input type="text" 
                                            placeholder="Change page title" 
                                            value={nkwFreshPage1.title} 
                                            onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, title: e.target.value})}
                                        /> 
                                    </div>
                                    </div>

                                         {/* edit sction2 */}
                                    <div style={{textAlign:"left"}}>
                                        
                                       
                                        <div style={{border:"1px solid #c4c4c4"}}>
                                        <h3>Logo Image </h3>
                                        <input type="text" 
                                                placeholder="Change your logo here" 
                                                value={nkwFreshPage1.logo} 
                                                onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, logo: e.target.value}) }
                                        />
                                              <button type="button" onClick={handleClickOpen}>Libary / Browse</button>
                                            <button type="button" onClick={() => setNkwFreshPage1({...nkwFreshPage1, logo: ''})} >Remove</button>  
                                            <div>
                                                <h3>Contect Detail</h3>
                                                <div style={{display:"flex"}}>
                                                
                                                    <input type="text" 
                                                            placeholder="Phone one" 
                                                            value={nkwFreshPage1.phone_a} 
                                                            onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, phone_a: e.target.value})}
                                                    /> 
                                                    <h3>OR</h3>
                                                    <input type="text" 
                                                            placeholder="Phone Two" 
                                                            value={nkwFreshPage1.phone_b} 
                                                            onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, phone_b: e.target.value})}
                                                    />
                                                    <input  type="text" 
                                                            placeholder="Email" 
                                                            value={nkwFreshPage1.email} 
                                                            onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, email: e.target.value})}
                                                    />  
                                                </div> 
                                                
                                                </div>
                                        </div>
                                    
                                    </div>

                                                            {/* edit sction3 */}
                        <div style={{textAlign:"left"}}>
                           
                          
                           <div style={{border:"1px solid #c4c4c4"}}>

               
                                       
                               <Editor

                               //  Edit for CEO Message
                               editorState={editorState_one}
                               onEditorStateChange={setEditorState_one}
                               value={editorState_one}
                               onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, context_editor_one : draftToHtml(convertToRaw(editorState_one.getCurrentContent())).toString()})}


                               />
                                                               
                                   
                               
                           </div>

                       <h3>Section Image</h3>
                       <input type="text" value={nkwFreshPage1.imgs[0]} />

                       <button type="button" onClick={handleClickOpen}>Libary / Browse</button>
                        <button type="button" onClick={() => setNkwFreshPage1({...nkwFreshPage1, imgs:['', nkwFreshPage1.imgs[1] ]})} >Remove</button>  

                       <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "auto"}}>
                           <Editor 
                               //  Edit for CEO Message
                               editorState={editorState_two}
                               onEditorStateChange={setEditorState_two}
                               value={editorState_two}
                               onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, context_editor_two : draftToHtml(convertToRaw(editorState_two.getCurrentContent())).toString()})}


                           />

                       </div> 

                       <div style={{display: 'flex'}}> 

                           <div style={{flex: 1}}>
                               <Editor
                                   // Editer for three for div
                                   editorState={editorState_three}
                                   onEditorStateChange={setEditorState_three}
                                   value={editorState_three}
                                   onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, context_editor_three: draftToHtml(convertToRaw(editorState_three.getCurrentContent())).toString()})}
                               />
                           </div>
                           <div style={{flex: 1}}>
                                <h3>Image Two</h3>
                                <input type="text" value={nkwFreshPage1.imgs[1]}  />

                                <button type="button" onClick={handleClickOpen}>Libary / Browse</button>
                                <button type="button" onClick={() => setNkwFreshPage1({...nkwFreshPage1, imgs:[nkwFreshPage1.imgs[0], '']})} >remove</button>  
                           </div>
                        
                        </div> 


                        <div>
                           <Editor
                                   // Editer for three for div
                                   editorState={editorState_four}
                                   onEditorStateChange={setEditorState_four}
                                   value={editorState_four}
                                   onChange={(e) => setNkwFreshPage1({...nkwFreshPage1, context_editor_four: draftToHtml(convertToRaw(editorState_four.getCurrentContent())).toString()})}
                           />

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
                     type="buttom"
                     onClick={() => setEditBtn(false)}
            >Cancel</Button>


<Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} onClick={SaveUpdate}>Save/Update</Button>
</div>
        </Fragment>
    )
}




export default Nkw_fresh_page1;

