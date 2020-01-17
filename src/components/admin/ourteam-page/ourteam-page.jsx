import React, {Fragment, useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router'
import AuthContext from '../../../context/auth/authContext';

import axios from 'axios';
import Container from '@material-ui/core/Container';

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




const OurTeamPage = (props) =>  {

    // Define State
    
    const classes = useStyles();


    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    const [dense, setDense] = React.useState(false);

    const [ourTeamPage, setOurTeamPage] = useState({ 
        page_title: '',
        page_header_bg_img: '',
        page_header_title: '',
        page_header_sub_title: '',
        team_details: [{
            img:'',
            name: '',
            job:''
        }]
    });
    const [_id, setId ] = useState('');

    const [teamDetail, setTeamDetail] =  useState({
        img: '',
        name: '',
        job:''
    });

    const [teamDetailID, setTeamDetailID] = useState('')


    // Set Open dialge Model
    const [open, setOpen] = useState(false);

    const [editBtn, setEditBtn] = useState(false);

    // Http 
    useEffect(() => {
        axios.get('/api/ourteampage').then(res => {
           // console.log(res.data[0]);
            setOurTeamPage(res.data[0]);
            setId(res.data[0]._id)

        })
    }, []);


    const showEditBtn = (show) => {
        //  console.log(show);
            let _show = false;
            _show = !show;
            setEditBtn(_show);
    }

    const handleClickOpen = (i) => {
        // let _ourTeamPageData = ourTeamPage;
        let teamMembeDetail = ourTeamPage.team_details;
        console.log(teamMembeDetail[i])
        console.log(teamMembeDetail[i]._id)
        
        // ourTeamPage.team_details.forEach(teamDetail => {
        //     if (teamDetail._id == teamMembeDetail[i]._id) {
        //         console.log(teamDetail)
        //         teamMembeDetail[i] = teamDetail;
        //         // setOurTeamPage({...ourTeamPage, team_details: teamMembeDetail})
        //     }
           
        // })
    
        setTeamDetail(teamMembeDetail[i]);
        setTeamDetailID(i)
        setOpen(true);
      };
    
    

    const handleClose = () => {
        setOpen(false);
    };
        
    
    const handleUpdateClose = () => {
      let _ourTeamPageData = ourTeamPage;
    //   console.log('idididiidid' + teamDetailID)
      let obj = _ourTeamPageData.team_details;
    //   console.log('obojbobjjbo' + obj[0].name);

      obj[teamDetailID] = teamDetail ;

    //   console.log('obojbobjjbo' + obj[teamDetailID].name);
    //   console.log('_ourteampage' + _ourTeamPageData)
      setOurTeamPage(_ourTeamPageData);
      setOpen(false);
      props.history.push("/ourteampage");
    }


        // axios.put(`/api/ourteam/${teamDetailID}`, teamDetail).then(res => { 
        //     console.log(res.data)
        //     setOurteam(res.data);
        // })
        // setOpen(false);
        // props.history.push("/ourteam");
    
        const SaveUpdate = (e) => {
            e.preventDefault();
            axios.put(`/api/ourteampage/${_id}`,  ourTeamPage ).then(res => {
               console.log(res.data)
          
              // var contentState = ContentState.createFromBlockArray(blocksFromHTML);
          
            });
        }
        
    
    

    return (
        <Fragment> 
            <div className={classes.root} >
                <Grid container spacing={3}> 
                    <Grid item xs={6}> 
                        <div className="views_container">
                            <p style={{
                                  fontSize: '18px', 
                                  position:'absolute', 
                                  textAlign: 'center',
                                  marginLeft: '11%',
                                  marginTop: "8%",
                                  color: 'white'}}> {ourTeamPage.page_header_sub_title}</p>
                            <div className="bacgroundImage" style={{ 
                                backgroundImage: `url('${ourTeamPage.page_header_bg_img}')`,
                            }}>
                                <div className="header_title">  
                                    <h3 style={{width: '100%', margin:'auto'}}>{ourTeamPage.page_header_title}</h3>
                                </div>

                            </div>

                            <div> 
                            <Container   className="our_team_card_list" style={{margin:'0px 2.3%', overflow:"scroll", overflowX:"hidden"}}>
                                <div className="meet_our_team_ourteam">
                                { ourTeamPage.team_details.map(( ourteam, index)=> {
                                        return (
                                            <Fragment>

                                            <Card className={classes.card} >
                                                    <CardActionArea>
                                                        <CardMedia
                                                        className={classes.media}
                                                        image={ourteam.img}
                                                        title="Contemplative Reptile"
                                                        />
                                                        <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                                {ourteam.name}
                    
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                {ourteam.job }     
                                                        </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                        
                                                </Card>
                                        
                                            </Fragment>

                                        )
                                        })}
                                    
                                    </div>
                                </Container>

                            </div> 
                                   
                        </div>
                    
                    </Grid>

                    <Grid item xs={6}  >
                        <div>
                             <div style={{textAlign: "left", padding: "0 10px"}}>
                                 { !editBtn ?  ( 

                                    <Fab type="button" onClick={() => showEditBtn(editBtn) }  color="secondary" aria-label="edit" className={classes.fab}>
                                        <EditIcon />
                                    </Fab> 
                                 ) : ( 
                                    <Fab onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                                    <CloseIcon />
                                   </Fab>
                                 )
                                    
                                 }

                                 { editBtn && (
                                     <div>
                                        <div>
                                            <h3>Header Backgroud Image: </h3>
                                            <input type="text"
                                                    placeholder="Header Background Image" 
                                                    value={ourTeamPage.page_header_bg_img} 
                                                    onChange={e => setOurTeamPage({...ourTeamPage, page_header_bg_img: e.target.value})}
                                            />

                                            <button type="button" >Libary / Browse Libary</button>
                                            <button type="button" >Remove</button>
                                        </div>

                                        <div> 
                                            <h3>Page Header Title: </h3>
                                            <input type="text"
                                                   placeholder="Page Header Title" 
                                                   value={ourTeamPage.page_header_title}
                                                   onChange={e => setOurTeamPage({...ourTeamPage, page_header_title: e.target.value})}
                                            /> 
                                        </div>

                                        <div>
                                            <h3>Page Sub Title</h3>
                                            <input type="text" 
                                                placeholder="Page sub Title" 
                                                value={ourTeamPage.page_header_sub_title}
                                                onChange={e => setOurTeamPage({...ourTeamPage, page_header_sub_title: e.target.value})}
                                            />
                                        </div>

                                        <div className="//*Edit ourteam page">  
                                            {
                                                ourTeamPage.team_details.map((teamDetail, index) => {
                                                    return ( 
                                                        <div> 
                                                            <List dense={dense} >
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                    <FolderIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={teamDetail.name}

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

                                        </div>
                                         
                                     </div>
                                   )
                                     
                                 }
                             </div>
                        </div> 
                    </Grid> 

                </Grid>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">edit your Our Team page details</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        <div style={{
                                            width:'320px'
                                        }}>
                                            <h3>Image:
                                                <input type="text" value={teamDetail.img}  onChange={e => setTeamDetail({...teamDetail, name: e.target.value})}/>
                                            </h3>
                                            <h3>Name:
                                                <input type="text" value={teamDetail.name}  onChange={e => setTeamDetail({...teamDetail, name: e.target.value})}/>
                                            </h3>
                                            <h3>Job:
                                                <input type="text" value={teamDetail.job}  onChange={e => setTeamDetail({...teamDetail, job: e.target.value})}/>
                                            </h3>
                                            <hr/>



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
                               
        <div className="fixedFooter" color="secondary" style={{background: "#FFFFFF", zIndex:"999"}}>
             <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px", color:"white", marginLeft:"80.5%" }} onClick={SaveUpdate}>Save/Update</Button>
        </div>
        </Fragment>
    );
};


export default withRouter(OurTeamPage);