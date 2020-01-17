import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AddLandingCatalogly from './model/AddLandingCatalogly';


import Divider from '@material-ui/core/Divider';
import { Button } from  '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Styles Sheets
import './explore.styles.scss';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 660,
      display:'flex',
      textAlign:'center',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const ExploreComp = () => {

    const classes = useStyles();

    useEffect(() => { 
        getExploreheader();
    }, []);
    useEffect(() => {
        getDivisionHeader();
    },[]);
    useEffect(() => { 
        getDivisions();
    },[]);

    useEffect(() => {
        getExploreLanding();
    }, []);


    /** Temp State  */
    const [explore, setExplore] = useState({
        exp_title: '',
        sub_exp_title: ''
    });

    const [divisions_header, setDivisions_header] = useState({
        dis_title: '',
        sub_dis_title: ''
    });

    const [divisions, setDivisions ] = useState([{
            name: '',
            phone: '',
            email: '',
            logo: '',
            title_img: '',
            section_img_one: '',
            section_img_two: '',
            p1: '',
            p2: '',
            p3: '',
            p4: '',
            p5: '',
            p6: '',
            p7: '',
            p8: ''

    }]);
    
    const [addivisions, setAddDivisions ] = useState({
        name: '',
        phone: '',
        email: '',
        logo: '',
        title_img: '',
        section_img_one: '',
        section_img_two: '',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: '',
        p6: '',
        p7: '',
        p8: ''

    });

    const [exploreLanding, setExploreLanding] = useState([{
        exp_landing_img: '',
        exp_landing_title: ''

    }]);

    const  [divisionsFindOne, setDivisionsFindOne] = useState({
                name: '',
                phone: '',
                email: '',
                logo: '',
                title_img: '',
                section_img_one: '',
                section_img_two: '',
                p1: '',
                p2: '',
                p3: '',
                p4: '',
                p5: '',
                p6: '',
                p7: '',
                p8: ''
    })

    const [_id, setId] = useState('');
    const [_id_div, setId_div] = useState('');
    const [updateFindOneID, setUpdataFindOneID] = useState('');
    /// Temps model
    const [open, setOpen] = useState(false);

    const  [openAdd, setOpenAdd] = useState(false);

    const  [openAddCata, setOpenAddCata] = useState(false);
    /// 

    const onSubmit = e => {
        e.preventDefault();
        updateExploreheader();
        updateDivisionHeader();
        updateOneDivisionsData();
        AddNewDivision();
        // console.log('updata single Division')
        // reset Fields
        // setExplore({
        //     exp_title: '',
        //     sub_exp_title: ''
        // });
    };

/** End Tamp State */

/** onChange Handelers */
    const onChangeExplore = (e) =>  {
        setExplore({
            ...explore,
            [e.target.name]: e.target.value
        })
    };

    const onChangeDivision = (e) => {
            setDivisions_header({
                ...divisions_header,
                [e.target.name]: e.target.value
            })
    }

    const onChangeDivisionFineOne = (e) => { 
            setDivisionsFindOne({
                ...divisionsFindOne,
                [e.target.name]: e.target.value
            })
    }

    const onChangeDivisionAdd  =  (e) => {
        setAddDivisions({
            ...addivisions,
            [e.target.name]: e.target.value
        })
    }

/** End  onChange Handelers */




/** HTTPS Funcion */

    const getExploreheader  = async () => { 
        const resData = await axios.get('/api/exploreheader');
        setExplore(resData.data[0]);
        setId(resData.data[0]._id);
        //console.log(resData.data[0]);
    }

    const updateExploreheader = async () => {
        const resData = await axios.put(`/api/exploreheader/${_id}`, explore);
        //console.log(resData);
    }
    const getDivisionHeader = async () => {
        const resData = await axios.get('/api/disvisionsheader');
        setDivisions_header(resData.data[0]);
        setId_div(resData.data[0]._id);
        //console.log(resData.data[0]);
    }
    const updateDivisionHeader = async () => {
        const resData = await axios.put(`/api/disvisionsheader/${_id_div}`, divisions_header);
       // console.log(resData);
    }

    const getDivisions = async () => {
        const resData = await axios.get('/api/disvisions');
        setDivisions(resData.data);
       // console.log(resData.data);
    }

    const handleClickOpenEdit = async (id)  => {
        console.log(id);
        // Fetch Single Data
        const resData = await axios.get(`/api/disvisions/${id}`);
        setDivisionsFindOne(resData.data);
        setUpdataFindOneID(id);
       // console.log(resData.data);
        setOpen(true);
      }
    const updateOneDivisionsData = async () => { 
        const resData = await axios.put(`/api/disvisions/${updateFindOneID}`, divisionsFindOne );
        setDivisions(resData.data);
        handleClose();
        // console.log(resData.data);
    }


    const AddNewDivision = async () => { 
        const resData = await axios.post('/api/disvisions', addivisions);
        console.log(resData.data);
        // after get data and get from api to updata state
        getDivisions();
        handleAddClose();
       // setAddDivisions(resData.data);
        // colse modelor clear field ?? 
        // setDivisions(resData.data);
    }


    // GET Exploer Landing page DATA
    const getExploreLanding = async () => {
        const resData = await axios.get('/api/explorelanding');
        console.log(resData.data);
        setExploreLanding(resData.data);
    }

   const  handleOpenAdd = () => {
       setOpenAdd(true);
   }
   
   const handleOpenAddCata = () => {
       // Set State
       setOpenAddCata(true);
   }
        // Del single division data
    const handleDel = async (id) => {
       let resData =  await axios.delete(`/api/disvisions/${id}`);

        setDivisions(resData.data);
    }
    
    const handleClose = () => {
    setOpen(false);
    }
    const handleAddClose = () => {
        setOpenAdd(false);
    }

    const handleAddCataClose = () => {
        setOpenAddCata(false);
    }
  

    

    // const divisionEdit = (id) => {
    //     console.log(id);
    // }

/** End Http Func */
    return (
        <Fragment>
            <form onSubmit={onSubmit}> 
                <div> 
                    <h1>Explore Landing Main Section</h1>
                    <h3>Hearder Titlle</h3>
                    <div>
                        <input  type="text" placeholder="Explore Header Section Title" name="exp_title" value={explore.exp_title} onChange={onChangeExplore} />
                    </div>
                    <h3>Hearder Sub Titlle</h3>
                    <div>
                        <input type="text" placeholder="Explore Sub Header Title" name="sub_exp_title" value={explore.sub_exp_title} onChange={onChangeExplore} />
                    </div>

                    <div>
                        <h3>Landing Catalogly</h3>
                         
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleOpenAddCata}>ADD NEW Catalogly</Button> 
                            <AddLandingCatalogly  openAddCata={openAddCata}   handleAddCataClose={handleAddCataClose}/> 
                        </div>

                        <div>  
                            { exploreLanding.map(explla => {
                                return (
                                    <List className={classes.root}> 
                                        <ListItem button>{explla.exp_landing_img}  
                                        </ListItem>
                                        <ListItem button>{explla.exp_landing_title}  
                                        </ListItem>
                                        <ListItem>

                                            <Button variant="outlined" color="primary" >Edit</Button>
                                            <Button variant="outlined" color="secondary" >Delete</Button>

                                        </ListItem>
                                    </List>
                                )
                            })}
                        </div>

                    </div>

                </div>
                <Divider />
                <div className="nkw_divisions">
                     <h1>Divisions Sections</h1>
                      <h3>Division page header Section</h3>
                      <input type="text" placeholder="Division page header" name="dis_title" value={divisions_header.dis_title} onChange={onChangeDivision} />
                      <input type="text" placeholder="Division page Sub header"   name="sub_dis_title" value={divisions_header.sub_dis_title} onChange={onChangeDivision}/>
                        <div> 

                        </div>
                        <h1>Your Divisions</h1>                            
                        <Button variant="outlined" color="primary" onClick={handleOpenAdd} >ADD Divisions</Button> 

                        <div>  
                            { divisions.map(division => {
                                return (
                                    <List className={classes.root}> 
                                        <ListItem button>{division.name} |  
                                        </ListItem>
                                        <ListItem>

                                            <Button variant="outlined" color="primary" onClick={() => handleClickOpenEdit(division._id)}>Edit</Button>
                                            <Button variant="outlined" color="secondary" onClick={() => handleDel(division._id) }>Delete</Button>

                                        </ListItem>
                                    </List>
                                )
                            })}
                        </div>
                        {/* Edit Model Section TEMP CODE */}
                         <div>
                            
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">{divisionsFindOne.name}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>

                                       <input  placeholder="Division name" name="name" value={divisionsFindOne.name} onChange={onChangeDivisionFineOne}/>
                                       <input  placeholder="Division LOGO" name="logo" value={divisionsFindOne.logo} onChange={onChangeDivisionFineOne} />
                                       <input  placeholder="Division Header Background Image" name="title_img" value={divisionsFindOne.title_img} onChange={onChangeDivisionFineOne} /> 
                                       <Divider/> 
                                       <h4>Contact Info</h4>
                                       <input  placeholder="Email" name="email" value={divisionsFindOne.email} onChange={onChangeDivisionFineOne} />
                                       <input  placeholder="Phone" name="phone" value={divisionsFindOne.phone} onChange={onChangeDivisionFineOne} />
                                       <Divider/>
                                       <h4>Section Images</h4>
                                       <input placeholder="Section Image One" name="section_img_one" value={divisionsFindOne.section_img_one} onChange={onChangeDivisionFineOne}  />
                                       {(divisionsFindOne.section_img_two) && 
                                                <input placeholder="Section Image Two" name="section_img_two" value={divisionsFindOne.section_img_two} onChange={onChangeDivisionFineOne}  />
                                    
                                       }
                                       <Divider/> 
                                       <h4>Pragrapha Section</h4>
    
                                            <TextField 
                                                    
                                                     id="outlined-multiline-static"
                                                     label="Pragrapha One"
                                                     name="p1" 
                                                     multiline
                                                     rows="2"
                                                     defaultValue={divisionsFindOne.p1} 
                                                     onChange={onChangeDivisionFineOne}
                                                     className={classes.textField}
                                                     margin="normal"
                                                     variant="outlined"
                                                                    
                                            />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha two"
                                                    name="p2" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p2} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Three"
                                                    name="p3" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p3} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Four"
                                                    name="p4" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p4} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Five"
                                                    name="p5" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p5} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                                                           <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Six"
                                                    name="p6" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p6} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Seven"
                                                    name="p7" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p7} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Eight"
                                                    name="p8" 
                                                    multiline
                                                    rows="2"
                                                    defaultValue={divisionsFindOne.p8} 
                                                    onChange={onChangeDivisionFineOne}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                 
                                  

                                    </DialogContentText>
                             
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={onSubmit} color="primary">
                                        Save/Update
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                          </div>
                        
                        
                </div> 


                 {/** ADD Model Section TEMP CODE */}
                 <div> 
                         <Dialog open={openAdd} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">ADD  A Divsvision</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>

                                       <input  placeholder="Division name" name="name"  value={addivisions.name}  onChange={onChangeDivisionAdd}/>
                                       <input  placeholder="Division LOGO" name="logo"  value={addivisions.logo} onChange={onChangeDivisionAdd} />
                                       <input  placeholder="Division Header Background Image"  name="title_img"   value={addivisions.title_img} onChange={onChangeDivisionAdd} /> 
                                       <Divider/> 
                                       <h4>Contact Info</h4>
                                       <input  placeholder="Email" name="email"  value={addivisions.email}  onChange={onChangeDivisionAdd} />
                                       <input  placeholder="Phone" name="phone"   value={addivisions.phone} onChange={onChangeDivisionAdd} />
                                       <Divider/>
                                       <h4>Section Images</h4>
                                       <input placeholder="Section Image One"   name="section_img_one" value={addivisions.section_img_one}   onChange={onChangeDivisionAdd}  />
                                     
                                       <Divider/> 
                                       <h4>Pragrapha Section</h4>
    
                                            <TextField 
                                                    
                                                     id="outlined-multiline-static"
                                                     label="Pragrapha One"
                                                     name="p1" 
                                                     multiline
                                                     rows="2"
                                                     value={addivisions.p1} 
                                                     onChange={onChangeDivisionAdd}
                                                     className={classes.textField}
                                                     margin="normal"
                                                     variant="outlined"
                                                                    
                                            />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha two"
                                                    name="p2" 
                                                    multiline
                                                    rows="2"
                                                    value={addivisions.p2} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Three"
                                                    name="p3" 
                                                    multiline
                                                    rows="2"
                                                    value={addivisions.p3} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Four"
                                                    name="p4" 
                                                    multiline
                                                    rows="2"
                                                    value={addivisions.p4} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Five"
                                                    name="p5" 
                                                    multiline
                                                    rows="2"
                                                    value={addivisions.p5} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                                                           <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Six"
                                                    name="p6" 
                                                    multiline
                                                    rows="2"
                                                    value={divisions.p6} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Seven"
                                                    name="p7" 
                                                    multiline
                                                    rows="2"
                                                    value={addivisions.p7} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                            <TextField 
                                                    
                                                    id="outlined-multiline-static"
                                                    label="Pragrapha Eight"
                                                    name="p8" 
                                                    multiline
                                                    rows="2"
                                                    value={addivisions.p8} 
                                                    onChange={onChangeDivisionAdd}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                                   
                                           />
                                 
                                  

                                    </DialogContentText>
                             
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleAddClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={AddNewDivision} color="primary">
                                         ADD
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                         </div>

                <Button type="submit" variant="contained" color="secondary" >Save/Update</Button>
            </form>
        </Fragment>
       
    )
}


export default ExploreComp