import React, {useState, useEffect, Fragment, useContext} from 'react'; 
import AuthContext from '../../../context/auth/authContext';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router'

import axios from 'axios';
import Container from '@material-ui/core/Container';
import ImageLibrary from '../../../components/admin/imageLibrary/image_library';

//List 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


//DialogActions
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Team member card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';  


//Import Layout Martire lariby
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid  from '@material-ui/core/Grid';

// Import main style sheet 
import '../../admin/explore/pages/divisionsDetails/divisions_pages_main.styles.scss';
import { withTheme } from '@material-ui/styles';

// Import video-react 
import { Player , ControlBar, BigPlayButton} from 'video-react';


import './video-edit-page.scss';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
     
    card: {
        width: 220,
        height: 348,
        textAlign: "left",
        margin: '1% 1%'
      },
      media: {
        height:220,
        borderBottom: '4px solid #4F990F'
      },
  }));



const  VideoEditPage = () => {
    
    // Define State
    const classes = useStyles();

  //Auth
  const authContext = useContext(AuthContext);

  useEffect(() => { 
      authContext.loadUser();
      // eslint-disable-next-line
  }, []);
   

    const [editVideo, setEditVideo] = useState({
        header_background_img:'', 
        header_title:'',
        video1_title: '',
        video1_link: '',
        video2_tiltle: '',
        video2_link: '',
        video3_title: '',
        video3_link: ''
    });    

    const [editBtn, setEditBtn] = useState(false);
    const [_id, setId] = useState('');


    // Dialogs
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
  

  // http requrie from @ /api/videoedit
 useEffect(() => {
    axios.get('/api/videoedit').then(res =>  {
        console.log(res.data[0]);
        setEditVideo(res.data[0]);
        setId(res.data[0]._id);

        
    });
      
  }, []);

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


  const SaveUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/videoedit/${_id}`, editVideo ).then(res => {
       console.log(res.data)
  
      // var contentState = ContentState.createFromBlockArray(blocksFromHTML);
  
  
  
    });
}


    return ( 
        <div className={classes.root}> 
            <Grid container  spacing={3}>
                <Grid item xs={6} >
                    <div className="views_contanier">
                        <div className="views_container">
                                <div className="bacgroundImage" style={{
                                backgroundImage: `url('${editVideo.header_background_img}')`,
                            }} >
                                <div className="header_title">
                                    <h3>{editVideo.header_title}</h3>             
                                </div>
                            
                            </div>
                            
                                <div className="vidoes_list">
                                    <div>
                                        <Player 
                                        src={editVideo.video1_link}
                                        >
                                            <BigPlayButton position="center" className="my-class" />
                                        </Player>
                                    </div>

                                    <div>
                                        <Player 
                                        src={editVideo.video2_link}
                                        >
                                            <BigPlayButton position="center" className="my-class" />
                                        </Player>
                                    </div>
                                    <div>
                                        <Player 
                                        src={editVideo.video3_link}
                                        >
                                            <BigPlayButton position="center" className="my-class" />
                                        </Player>
                                    </div>
                                </div>
                             

                        </div>
                    
                    </div> 
                    
                </Grid>

                <Grid item xs={6} >
                 
                    <div style={{textAlign:"left", padding: "0 10px"}}> 

                    {!editBtn ?  (
                            <Fab type="button" onClick={() => showEditBtn(editBtn) } color="secondary" aria-label="edit" className={classes.fab} >
                                <EditIcon />
                            </Fab>
                      ) :  (
                            <Fab  type="button" onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                            <CloseIcon />
                        </Fab>
                    
                      )

                    }

                    { editBtn && ( 
                        <Fragment>
                                                    
                            <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "auto"}}>
                                <h3>Edit Video: </h3>
                                <div style={{listStyle: 'none'}}>
                                    <li> 
                                        1: <input type="text" 
                                                value={editVideo.video1_link} 
                                                onChange={e => 
                                                setEditVideo({...editVideo, video1_link: e.target.value})} 
                                    />
                                    <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                    <button type="button" onClick={e => setEditVideo({...editVideo, video1_link: ''})}>Remove</button> 
                    
                                    </li>

                                    <li>
                                        2: <input type="text"
                                                value={editVideo.video2_link}
                                                onChange={e => 
                                                setEditVideo({...editVideo, video2_link: e.target.value})
                                                }
                                    />
                                    <button type="button" onClick={handleClickOpen} >Libary / Browse Libary</button>
                                    <button type="button" onClick={e => setEditVideo({...editVideo, video2_link: ''})}>Remove</button> 
                                    </li> 
                                  
                                    <li>
                                        3: <input type="text" 
                                            value={editVideo.video3_link}
                                            onChange={e => 
                                                setEditVideo({...editVideo, video3_link: e.target.value})
                                            }
                                    />
                                    <button type="button" onClick={handleClickOpen}>Libary / Browse Libary</button>
                                    <button type="button" onClick={e => setEditVideo({...editVideo, video3_link: ''})} >Remove</button> 
                                    </li>


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

            <div className="fixedFooter" color="secondary">
             <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600"}} onClick={SaveUpdate}>Save/Update</Button>
           </div>
        </div>
    )
}

export default VideoEditPage;
