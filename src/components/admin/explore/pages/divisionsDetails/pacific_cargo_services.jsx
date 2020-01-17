import React, {Fragment, useState, useEffect, useContext } from  'react';
import AuthContext from '../../../../../context/auth/authContext';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ImageLibrary from '../../../imageLibrary/image_library'; 

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

//Icons
import {FaTrashAlt, FaRegEdit, FaRegPlusSquare} from "react-icons/fa";

//PuupModel
import AddCard from './PupupModel/AddCard';

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


const PacificCargoServices = () => {
    const classes = useStyles();


    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     
     
    //qps get card 
    const [card, setCards] = useState([{
        card_title:'',
        card_editor_contents: ''
    }]); 

    const [editCard, setEditCard] = useState({
        card_title: '',
        card_editor_contents: ''
    })

    const [openEditCard, setOpenEditCard] = useState(false);
    
    const [PCS, setPCS] = useState({
    title: '',
    logo: '',
    header_background_img: '',
    website: '',
    contact: [ 
       { 
        name: '',
        job: '',
        phone_a: '',
        phone_b: '',
        email: ''
       }
    ],
    company: [
        {
            location: '',
            po_box: '',
            company_phone: ''
        }
    ],
   
    imgs: [],
    context: {
        p:{
            p_a: '',
            p_b: '',
            p_c: '',
            p_d: '',
            p_e: '',
            p_f: '',
            p_g: '',
            p_h: '',
            p_i: '',
            p_j: '',
            p_k: '',
            p_l: ''
        },
        subtitle: [],
        sub_lists: {
            li_a: [],
            li_b: [],
            li_c: []
        },
    },
    editor_context: '',
});

    const [_id, setId] = useState('');  
    const [editBtn, setEditBtn] = useState(false);

      // Editer State Setting
const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
);

const [CardEditorState, setCardEditorState] = useState(
    EditorState.createEmpty()
);
   // Dialogs
   const [open, setOpen] = React.useState(false);
   const [openAddCard, setOpenAddCard] = React.useState(false);

   const [fullWidth, setFullWidth] = React.useState(true);
   const [maxWidth, setMaxWidth] = React.useState('sm');

    useEffect(() => {
        axios.get('/api/pcs').then(res =>  {
            console.log(res.data[0]);
            setPCS(res.data[0]);
            setId(res.data[0]._id);
    
            const blockHTML_hvtl_editor  = convertFromHTML(`${res.data[0].editor_context}`);
            const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_hvtl_editor);
            setEditorState(
                EditorState.createWithContent(new_editor_context_state)
            )

         
            
        })
    }, []);

    useEffect(() => {
        axios.get('/api/cards').then(res => {
            console.log(res.data);
            setCards(res.data);

         

        });

    }, []);

        
    const showEditBtn = (show) => {
        //  console.log(show);
            let _show = false;
            _show = !show;
            setEditBtn(_show);
    }
        


    const SaveUpdate = (e) => {
        e.preventDefault();
        axios.put(`/api/pcs/${_id}`,  PCS).then(res => {
           console.log(res.data)
      
          // var contentState = ContentState.createFromBlockArray(blocksFromHTML);
      
        });

   
        
    }
    

    const onChange = (e, index,id) => { 
        console.log(id);
        console.log('property name' + e.target.name);
        console.log(PCS.contact[index]);

        let newArr = [...PCS.contact];
        newArr[index] = e.target.value;

        console.log('NEW ARR' + newArr[index])

        setPCS({
            ...PCS,
             contact: newArr

                
        })

        
        
    }

//Card Functions
const onDeleteCard = (_id) => {
    // alert(_id);
    card.map(data => {
        if (data._id === _id) {
            let newArray = card.filter(datafilter => datafilter._id !== _id )
            console.log('this is a new array  ' + newArray)
            setCards(newArray);

            axios.delete(`/api/cards/${_id}`).then(res => {
                console.log('Card by deleted !!')
            })
        }
    })
}


const onEditCard = (_id) => {
    // editcard
    card.map(data => {
        if(data._id === _id) {
            
            setEditCard(data);

            const blockHTML_Card_editor  = convertFromHTML(`${data.card_editor_contents}`);
            const new_editor_context_state  = ContentState.createFromBlockArray(blockHTML_Card_editor);
            setCardEditorState(
                EditorState.createWithContent(new_editor_context_state) 
            )

        }
    })
}

const onSaveUpdateEditCard = (data) => {
    // console.log('This is onSaveUpdateEditCard fucciton ' + data.card_title)
    // console.log('This is onSaveUpdateEditCard fucciton ' + data.card_editor_contents)


    axios.put(`/api/cards/${data._id}`, data).then(res => {
        setCards(res.data);
    })
}

    // Make Dialogs Functon
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCardOpen = () => {
    setOpenAddCard(true);
  }; 
  const handleAddCardClose = () => {
    setOpenAddCard(false);
  }
  
  const handleMaxWidthChange = event => {
    setMaxWidth(event.target.value);
  };
  
  const handleFullWidthChange = event => {
    setFullWidth(event.target.checked);
  };


// props 
const handleSaveNewCard = (newCard) => {  
    console.log(`new Data by saved ` + newCard.card_editor_contents, newCard.card_title )
        axios.post('/api/cards', newCard).then(res => { 
            console.log(res.data)
            setCards(res.data);
            setOpenAddCard(false)
        
        })
}
    return (
        <Fragment> 
            <div style={{
                  width: '92%',
                  marginLeft: '1.4rem',
                  padding: '25px 0px',
                  marginTop:"3%"
            }}>
                <ActiveLastBreadcrumb  rootPath="Explore" childOne="Divisions" childTwo="Pacific Cargo Services"   path="" />

            </div>
                    <div className={classes.root} style={{paddingBottom: "200px"}} >

                    <Grid container spacing={3}>
                            <Grid item xs={6}>
                            <div className="views_container" style={{border: '23px solid black'}}>
                       <div className="bacgroundImage" style={{
                                    backgroundImage: `url('${PCS.header_background_img}')`,
                                    }} >
                                        
                                    <div className="header_title">
                                        <h3>{PCS.title} </h3>
                    
                                    </div>
                             
                        </div>
                     
                        <div className="qps_contexts">
                            
                        <div className="qps_contexts_left"> 
                                        <div className="right_border_style">
                                            <img src={PCS.logo} />
                                        </div>
                                        { card.map(data => (
                                            <div className="contact_card" style={{marginBottom: '40px'}}>
                                                <h3>{data.card_title}</h3>
                                                <div dangerouslySetInnerHTML={{__html: data.card_editor_contents}}></div>
                                            </div>
                                           ))
                                        
                                        }
                                        {/* <div className="contact_card">
                                            <h3>Contact</h3>
                                            { PCS.contact.map(contact => {
                                                return (
                                                   <div>

                                                    <p>{contact.name}</p>
                                                    <p>{contact.job}</p>
                                                    <p>{contact.phone_a}</p>
                                                    <p>{contact.phone_b}</p>
                                                    <p>{contact.email}</p> 
                                                   </div>

                                                ) 
                                              }) 
                                            
                                            }

                                            <p>WebSite</p>
                                            <p>{PCS.contact.website}</p>
                                           
                                            
                                        </div> */}
{/* 
                                        <div className="contact_card" style={{marginTop: '40px'}}>
                                        <h3>Location</h3>

                                            { PCS.company.map(company => {
                                                return (
                                                <div>
                                                   <p><strong>{company.office_title}</strong><br/>
                                                      {company.location}
                                                   </p>
                                                 
                                                   
                                                   <p><strong>Postal Address:</strong><br/>
                                                      {company.po_box}
                                                   </p>

                                                   <p><strong>Phone:</strong><br/>
                                                      {company.company_phone}
                                                   </p>
                                                   
                                                   

                                                </div>

                                                ) 
                                            }) 

                                            }

                                            <p>WebSite</p>
                                             <p>{PCS.contact.website}</p>



                                        </div> */}

                                            <div style={{marginTop: "30px", paddingBottom:"10px"}}>
                                                <img src={PCS.imgs[0]} width="100%"/>
                                            </div> 
                                            <div style={{marginTop: "30px", paddingBottom:"10px"}}>
                                                <img src={PCS.imgs[1]} width="100%"/>
                                            </div> 
                                            <div style={{marginTop: "30px", paddingBottom:"10px"}}>
                                                <img src={PCS.imgs[2]} width="100%"/>
                                            </div> 
                                            <div style={{marginTop: "30px", paddingBottom:"10px"}}>
                                                <img src={PCS.imgs[3]} width="100%"/>
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

                        <Grid item xs={6}> 
                           <div>
                               <div style={{textAlign:"left", padding: "0 10px"}}> 
                                {!editBtn ?  (
                          
                                <Fab  type="text"  onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}  >
                                    <EditIcon />
                                </Fab>

                                   ) : (
                          
                                <Fab   type="text"  onClick={() => showEditBtn(editBtn)}  color="secondary" aria-label="edit" className={classes.fab}  >
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
                                                    value={PCS.header_background_img} 
                                                    onChange={(e) => setPCS({...PCS, header_background_img: e.target.value}) }
                                            /> 

<button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
< button type="button" onClick={() => setPCS({...PCS, header_background_img: ''})}>remove</button>
                                            <div>
                                                    <h3>Change Title</h3>
                                                    <input type="text" 
                                                        placeholder="Change page title" 
                                                        
                                                        value={PCS.title} 
                                                        onChange={(e) => setPCS({...PCS, title: e.target.value})}
                                                    /> 
                                            </div>

                                        </div>


                            <div style={{textAlign:"left", padding:"0 10px"}}>
                                <h2>Cards Lists |  </h2> 
                                <h1 ><FaRegPlusSquare onClick={handleAddCardOpen}/></h1>
                                
                                
                                {
                                    card.map((data, i) => ( 
                                        <>
                                        <div>
                                            Card {i+1}: {data.card_title} 

                                              <FaTrashAlt style={{marginLeft:"30px"}}  onClick={ () => onDeleteCard(data._id)} />
                                              <FaRegEdit style={{marginLeft:"30px"}} onClick={ () => onEditCard(data._id)}/> 
                                        </div>
                                      
                                        </>
                                    ))
                                }
                                <div >
                                    <h2>Edit Card</h2>
                                    <input style={{textAlign: 'left'}} 
                                            placeholder="card title" 
                                           value={editCard.card_title} 
                                           onChange={(e) => setEditCard({...editCard, card_title: e.target.value}) }
                                    />

                                        
                                    {/* <input  style={{textAlign: 'left'}} 
                                            placeholder="card body"  
                                            value={editCard.card_editor_contents} 
                                            onChange={(e)=> setEditCard({...editCard, card_editor_contents: e.target.value})}

                                    />  */}

                                <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "atuo"}}>
                                
                                <Editor

                                    //  Edit for CEO Message
                                    editorState={CardEditorState}
                                    onEditorStateChange={setCardEditorState}
                                    value={CardEditorState}
                                    onChange={(e) => setEditCard({...editCard, card_editor_contents : draftToHtml(convertToRaw(CardEditorState.getCurrentContent())).toString()})}

                                    />
                                </div>

                                    <div>

                                        <button onClick={() => onSaveUpdateEditCard(editCard)}  >Save</button>

                                    </div>
                                </div>
               
                                {/* <div>
                                     <h3>Cards</h3>
                                {
                                    PCS.contact.map((contacts, index) => { 
                                        return (
                                            <div>
                                                
                                                <input type="text"  name="name"  value={contacts.name} onChange={e => onChange(e, index ,contacts._id)} />
                                                <input type="text"  name="job"  value={contacts.job} onChange={e => onChange(e, index ,contacts._id)} />
                                                <input type="text"  name="job"  value={contacts.phone_a} onChange={e => onChange(e, index ,contacts._id)} />
                                                <input type="text"  name="job"  value={contacts.phone_b} onChange={e => onChange(e, index ,contacts._id)} />
                                                <input type="text"  name="job"  value={contacts.email} onChange={e => onChange(e, index ,contacts._id)} />





                                            </div>
                                        )
                                    })
                                }
                                
                                    
                                </div> */}
{/* 
                                <div>
                                        Edit Location Info
                                {
                                    PCS.company.map((company, index) => { 
                                     return (
                                         <div>
                                             
                                             <input type="text"  name="location"  value={company.location} onChange={e => onChange(e, index ,company._id)} />
                                             <input type="text"  name="po_box"  value={company.po_box} onChange={e => onChange(e, index ,company._id)} />
                                             <input type="text"  name="company_phone"  value={company.company_phone} onChange={e => onChange(e, index ,company._id)} />
                                             




                                         </div>
                                     )
                                 })
                             }
                               
                                
                            </div> */}

                            <div>
                                <h3>Edit Images One</h3>
                                <input type="text"  
                                       value={PCS.imgs[0]} 
                                       onChange={e => { setPCS({...PCS, imgs:[e.target.value, PCS.imgs[1], PCS.imgs[2]]})}}
                                /> 
                                  
                                  <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                  <button type="button" onClick={() => setPCS({...PCS, imgs:['', PCS.imgs[1], PCS.imgs[2]] })}>remove</button>
                                
                                <input type="text"  
                                        value={PCS.imgs[1]} 
                                        onChange={e => { setPCS({...PCS, imgs:[PCS.imgs[0], e.target.value, PCS.imgs[2]]})}}
                                /> 
                                  <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                  <button type="button" onClick={() => setPCS({...PCS, imgs:[PCS.imgs[0], '', PCS.imgs[2]] })}>remove</button>
                                
                                
                                <input type="text"  
                                       value={PCS.imgs[2]} 
                                       onChange={e => { setPCS({...PCS, imgs:[PCS.imgs[0], PCS.imgs[1], e.target.value]})}}
                                /> 

                                <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                <button type="button" onClick={() => setPCS({...PCS, imgs:[PCS.imgs[0], PCS.imgs[1], ''] })}>remove</button>


                               
                                <input type="text"  
                                       value={PCS.imgs[3]} 
                                       onChange={e => { setPCS({...PCS, imgs:[PCS.imgs[0], PCS.imgs[1], PCS.imgs[2], e.target.value]})}}
                                /> 

                                <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                <button type="button" onClick={() => setPCS({...PCS, imgs:[PCS.imgs[0], PCS.imgs[1], PCS.imgs[2], ''] })}>remove</button>

                            </div> 


                        </div>
                            
                        <div style={{textAlign: "left", padding: "0 10px"}}>
                              
                            </div>
                            <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "atuo"}}>
                            
                            <Editor

                                //  Edit for CEO Message
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                value={editorState}
                                onChange={(e) => setPCS({...PCS, editor_context : draftToHtml(convertToRaw(editorState.getCurrentContent())).toString()})}

                                />
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

{/* add card model */}

<AddCard  
    handleSaveNewCard={handleSaveNewCard}
    open={openAddCard}
    handleClose={handleAddCardClose}
/>



                       
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

export default PacificCargoServices;


