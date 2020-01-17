import React, {Fragment, useState, useEffect, useContext} from 'react';
import { withRouter } from 'react-router';
import AuthContext from '../../../context/auth/authContext';

import OurTeamMember from './ourteammember/contactourteam';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import Grid  from '@material-ui/core/Grid';
import axios from 'axios';

import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import FolderIcon from '@material-ui/icons/Folder';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '92%',
      paddingLeft: '3.5%',
      paddingLeft: '1.4rem',
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
}));

const Ourteam = (props) => {
    const classes = useStyles();

    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     
  

    const [dense, setDense] = React.useState(false);


    //Init Contact DATA
    const [contact,  setContact] = useState({
        title: '',
        header_background_img: '',
        context_editor_one: '',
        context_editor_two: ''

    });

    //Init ID From Contact
    const [_id, setId ] = useState('');


    const [ourteam, setOurteam] = useState([{
        ot_profile_img: '',
        ot_job: '',
        ot_name: '',
        ot_email: '',
        ot_phone_one: '',
        ot_phone_two: '',
        ot_phone_three: '',
        ot_info: '',
        ot_address: {
           po_box: '',
           street: '',
           sub: '',
           country: ''
        },
        website: '',

    }]);

    const [teamDetail, setTeamDetail] =  useState({
            ot_profile_img: '',
            ot_job: '',
            ot_name: '',
            ot_email: '',
            ot_phone_one: '',
            ot_phone_two: '',
            ot_phone_three: '',
            ot_info: '',
            ot_address: {
                po_box: '',
                street: '',
                sub: '',
                country: ''
            },
            website: '',
    })

    const [teamDetailID, setTeamDetailID] = useState('')

    // GET Our Team Data from api/ourteam
    useEffect(() => {
        axios.get('/api/ourteam').then(res => {
            console.log(res.data);
            setOurteam(res.data);
        });
    }, [])



// Set Open dialge Model
const [open, setOpen] = useState(false);

const handleClickOpen = (i) => {
    let teamMembeDetail = ourteam;
    console.log(teamMembeDetail[i])
    console.log(teamMembeDetail[i]._id)

    setTeamDetail(teamMembeDetail[i]);
    setTeamDetailID(teamMembeDetail[i]._id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    };
    

const handleUpdateClose = () => {
    axios.put(`/api/ourteam/${teamDetailID}`, teamDetail).then(res => { 
        console.log(res.data)
        setOurteam(res.data);
    })
    setOpen(false);
    props.history.push("/ourteam");
};


    // Editer State Setting
const [editorState_one, setEditorState_one] = useState(
    EditorState.createEmpty()
);

const [editorState_two, setEditorState_two] = useState(
    EditorState.createEmpty()
);

    useEffect(() => {
        axios.get('/api/contact').then(res => {
            console.log(res.data[0]);
            setContact(res.data[0]);
            setId(res.data[0]._id);

            const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].context_editor_one}`);
            const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
            setEditorState_one(
                EditorState.createWithContent(new_editor_context_state)
            );

            const blockHTML_editor_two  = convertFromHTML(`${res.data[0].context_editor_two}`);
            const new_editor_context_state_two  = ContentState.createFromBlockArray(blockHTML_editor_two);
            setEditorState_two(
                EditorState.createWithContent(new_editor_context_state_two)
            );

        })
    }, []);

    const SaveUpdate = (e) => {
        e.preventDefault();
        axios.put(`/api/contact/${_id}`,  contact ).then(res => {
           console.log(res.data)
      
          // var contentState = ContentState.createFromBlockArray(blocksFromHTML);
      
        });
    }
    


    const handleEditOurteam = (_id) => {
        console.log('Single _OurTeam _id', _id);
    }


    return (
        <Fragment>
         <div>
            <div className={classes.root}>
                <div style={{textAlign:'left'}} >
                <h1>Section 3</h1>
                </div>
                    <Grid container spacing={0} >
                        <Grid item xs={6}>
                            <div className="views_container" style={{border:"23px solid black"}}>

                                <div className="bacgroundImage" style={{
                                        backgroundImage: `url('${contact.header_background_img}')`
                                    }} >
                                    <div className="header_title">
                                        <h3 style={{textAlign: 'center'}} >
                                                {contact.title}
                                        </h3>

                                    </div>

                                </div>


                                <div style={{
                                    display: 'flex',
                                    margin: '20px 15px',
                                    textAlign:'left'

                                }}>

                                    <div  style={{
                                                flex: 1,
                                                marginLeft: '25px',
                                                borderRight: '3px solid green'
                                            }}
                                    >

                                        <div
                                            dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_one.getCurrentContent()))}}

                                        />


                                    </div>

                                    <div  style={{
                                                flex: 1,
                                                marginLeft: '45px',
                                            }}
                                    >

                                        <div
                                            dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState_two.getCurrentContent()))}}

                                        />


                                    </div>



                                </div>

                                <div style={{padding: '8px 8px'}}>

                                  <OurTeamMember />
                                </div>

                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <div style={{textAlign: "left", padding: "0 10px"}}>
                                    <Fab   color="secondary" aria-label="edit" className={classes.fab}  >
                                            <EditIcon />
                                    </Fab>

                                </div>


                                <div style={{display:"flex",  border: '1px solid rgb(230, 230, 230)', }}>
                                    <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "auto"}}>

                                    <Editor

                                        //  Edit for CEO Message
                                        editorState={editorState_one}
                                        onEditorStateChange={setEditorState_one}
                                        value={editorState_one}
                                        onChange={(e) => setContact({...contact, context_editor_one : draftToHtml(convertToRaw(editorState_one.getCurrentContent())).toString()})}

                                    />
                                    </div>

                                    <div style={{flex: 1, border: '1px solid rgb(230, 230, 230)', }}>
                                        <Editor
                                            //  Edit for CEO Message
                                            editorState={editorState_two}
                                            onEditorStateChange={setEditorState_two}
                                            value={editorState_two}
                                            onChange={(e) => setContact({...contact, context_editor_two : draftToHtml(convertToRaw(editorState_two.getCurrentContent())).toString()})}

                                            />
                                    </div>



                                </div>


                                <h3>Edit a memeber contect</h3>


                                {
                                    ourteam.map((_ourteam, index) => {

                                        return (
                                            <div key={index+3}>
                                                 <List dense={dense}>

                                                        <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                            <FolderIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={_ourteam.ot_name}

                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(index) }>
                                                            <EditIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                        </ListItem>

                                             </List>

                                            </div>
                                        )
                                    })
                                }

                            <div>

                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        <div style={{
                                            minWidth: '400px'
                                        }}>
                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3>Name: </h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} type="text" value={teamDetail.ot_name}  onChange={e => setTeamDetail({...teamDetail, ot_name: e.target.value})}/>
                                                    </div>
                                            </div> 
                                        
                                           
                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3>Job Title: </h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input style={{width:'300px',textAlign: "left", paddingLeft:'5px'}}  type="text" value={teamDetail.ot_job}  onChange={e => setTeamDetail({...teamDetail, ot_job: e.target.value})}/>
                                                    </div>
                                            </div> 
                                    
                                            <hr/>

             
                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3>Phone 1: </h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input  style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} type="text" value={teamDetail.ot_phone_one}  onChange={e => setTeamDetail({...teamDetail, ot_phone_one: e.target.value})}/> <br/>

                                                    </div>
                                            </div> 


                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3>Phone 2: </h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input  style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} type="text" value={teamDetail.ot_phone_two}  onChange={e => setTeamDetail({...teamDetail, ot_phone_two: e.target.value})}/>

                                                    </div>
                                            </div> 





                                            {
                                                teamDetail.ot_phone_three && (
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{flex: 1, textAlign:'left'}}>
                                                        <h3>Phone 3: </h3> 
                                                        </div>
                                                        <div style={{flex: 1}}>
                                                          <input style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} type="text" value={teamDetail.ot_phone_three}  onChange={e => setTeamDetail({...teamDetail, ot_phone_three: e.target.value})}/>

                                                        </div>
                                                  </div> 


                                                )
                                            }

                                            <div>
                                                <h3>Address:</h3> 


                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3 style={{fontWeight: '200'}}>PO Box:</h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                     <input style={{width:'300px', textAlign: "left", paddingLeft:'5px'}}
                                                            type="text"
                                                            value={teamDetail.ot_address.po_box}
                                                            onChange={ e =>
                                                            setTeamDetail({
                                                                ...teamDetail,
                                                                ot_address: {
                                                                    ...teamDetail.ot_address,
                                                                    po_box: e.target.value
                                                                }})
                                                           } />
                                                    </div>
                                            </div> 

                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3 style={{fontWeight: '200'}}>Street:</h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} 
                                                          type="text"
                                                           value={teamDetail.ot_address.street}
                                                           onChange={ e =>
                                                            setTeamDetail({
                                                                ...teamDetail,
                                                                ot_address: {
                                                                    ...teamDetail.ot_address,
                                                                    street: e.target.value
                                                                }
                                                            })
                                                           } />
                                                    </div>
                                            </div> 


                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3 style={{fontWeight: '200'}}>Suburb:</h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input
                                                        style={{width:'300px', textAlign: "left", paddingLeft:'5px'}}  
                                                        type="text"
                                                        value={teamDetail.ot_address.sub}
                                                         onChange={ e => setTeamDetail({
                                                             ...teamDetail,
                                                             ot_address: {
                                                                 ...teamDetail.ot_address,
                                                                 sub: e.target.value
                                                             }
                                                         })}

                                                  />
                                                    </div>
                                            </div> 


                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3 style={{fontWeight: '200'}}>Country:</h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input 
                                                        style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} 
                                                        type="text"
                                                        value={teamDetail.ot_address.country}
                                                        onChange={e => setTeamDetail({
                                                            ...teamDetail,
                                                            ot_address: {
                                                                ...teamDetail.ot_address,
                                                                country: e.target.value
                                                            }
                                                        })}

                                                  /> 
                                                    </div>
                                            </div> 

   
                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3 style={{fontWeight: '200'}}>Email: </h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} type="text" value={teamDetail.ot_email}  onChange={e => setTeamDetail({...teamDetail, ot_name: e.target.value})}/>
                                                    </div>
                                            </div> 
                                        
                                            <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1, textAlign:'left'}}>
                                                       <h3 style={{fontWeight: '200'}}>Website: </h3> 
                                                    </div>
                                                    <div style={{flex: 1}}>
                                                    <input style={{width:'300px', textAlign: "left", paddingLeft:'5px'}} type="text" value={teamDetail.website} onChange={e => setTeamDetail({...teamDetail, ot_name: e.target.value})}/>
                                                    </div>
                                            </div> 
                                        

                                             </div>

                                        </div>
                                    </DialogContentText>
                             
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpdateClose} color="primary">
                                        Save/Update
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                                </div>

                            </div>
                        </Grid>
                    </Grid>
            </div>

        </div>

        <div className="fixedFooter" color="secondary" style={{background: "#FFFFFF", zIndex:"999"}} >
            <Button  variant="contained" 
                     style={{ position:"absolute",marginLeft:"73%", marginTop:"20px"}}  
                           
            >Cancel</Button>
             <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} onClick={SaveUpdate}>Save/Update</Button>
        </div>
        </Fragment>
    );
}

export default withRouter(Ourteam);