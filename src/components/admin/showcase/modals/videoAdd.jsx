// import React,{useState} from 'react';
// import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import AddIcon from '@material-ui/icons/Add';
// import Fab from '@material-ui/core/Fab';
// import Input from '@material-ui/core/Input';
// import Grid from '@material-ui/core/Grid';


// const useStyles = makeStyles(theme => ({
//     root: {
//       width: '100%',
//       maxWidth: '100%',
//       backgroundColor: theme.palette.background.paper,
//     },
//     inline: {
//       display: 'inline',
//     },
//     fab: {
//         position: 'absolute',
//         bottom: theme.spacing(2),
//         textAlign: 'center',
//         right: theme.spacing(2),
//     },
//     input: {
//         margin: theme.spacing(1),
//         width: '90%',
//     },
//   }));

// const VideoAddFormModal = () => { 

//     const classes = useStyles();
//     const [open, setOpen] = useState(false);


//     const [showCase, setShowCase] = useState({
//         title: '',
//         video: '',
//         poster_img: '',
//         slider: '',
//         bannerImg:''
//   });

//   const [_id, setId] = useState('');


//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
  


//  /** POST SHOW CASE DATA  */

// const handleSave = () => {
//     axios.post(`/api/showcase`, showCase).then(res => {
//         console.log(res.data)
//     });
//     setShowCase({
//         title: '',
//         video: '',
//         poster_img: '',
//         slider: '',
//         bannerImg:''
//     });
//    // console.log(showCase);
// }

// const onChange = e => {

//     setShowCase({
//         ...showCase,
//         [e.target.name]: e.target.value
        
//     });

// };

// //  const onSubmit = e => {
// //     e.preventDefault();
// //     // axios.post(`/api/showcase`, showCase).then(res => {
// //     //     console.log(res.data)
// //     // })
// //     // console.log(showCase);
// // }


//  //End Post 
//     return (
//         <div>
//             <form > 
//                 <Grid item xs={12}>
//                             <Fab aria-label="Add" className={classes.fab} color="secondary"  onClick={handleClickOpen}>
//                                 <AddIcon />
//                             </Fab>
//                     </Grid>

//                     <Dialog  fullWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//                     <DialogTitle id="form-dialog-title">ADD or Uploade your Video</DialogTitle>
//                     <DialogContent>
//                     <Input
//                         placeholder="Video Title"
//                         name="title"
//                         value={showCase.title}
//                         onChange={onChange}
//                         className={classes.input}
//                         inputProps={{
//                         'aria-label': 'description',
//                         }}
//                     />
//                     <Input
//                         placeholder="Video URI: http://www.video.com"
//                         name="video"
//                         value={showCase.video}
//                         onChange={onChange}
//                         className={classes.input}
//                         inputProps={{
//                         'aria-label': 'description',
//                         }}
//                     />
//                     <Input
//                         placeholder="Poster Image"
//                         name="poster_img"
//                         value={showCase.poster_img}
//                         onChange={onChange}
//                         className={classes.input}
//                         inputProps={{
//                         'aria-label': 'description',
//                         }}
//                     />
//                     <Input
//                         placeholder="Image Slider"
//                         name="slider"
//                         value={showCase.slider}
//                         onChange={onChange}
//                         className={classes.input}
//                         inputProps={{
//                         'aria-label': 'description',
//                         }}
//                     />
//                     <Input
//                         placeholder="Banner Image"
//                         name="bannerImg"
//                         value={showCase.bannerImg}
//                         onChange={onChange}
//                         className={classes.input}
//                         inputProps={{
//                         'aria-label': 'description',
//                         }}
//                     />
                
//                     </DialogContent>
//                     <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button  onClick={handleSave} color="primary">
//                         Save
//                     </Button>
//                     </DialogActions>
//                 </Dialog>
//             </form>
              
//         </div>
//     )
// }

// export default  VideoAddFormModal;