import React, {Fragment, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../../context/auth/authContext';

import  ImageLibrary from '../../../components/admin/imageLibrary/image_library'; 

import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid  from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './about.scss';
import {EditorState, convertToRaw, ContentState,convertFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; 

import {FaRegImage} from 'react-icons/fa';

// use React Material-ui Dialogs 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//use Sytle Components
import {
  Wrapper,
  AboutHeaderImg,
  MainTitle,
  Subtitle,
  AboutNav,
  Ul,
  Li,
  Section1,
  Section2,
  Section3,
  SecLeft,
  SecRight,
  Section4,
  MissionDiv,
  VisionDiv,
  ValueDiv,
  Section5,
  Section6,
  Row,
  Col1,
  Col2

} from './about.styled';

import LibraryButton from '../../LibraryButton/Library_button.component';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: "80px",
    width: '92%',
    paddingLeft: '2rem',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
    marginBottom: "26px",
    height: 66.65,
    width: 227,
    color: 'white',
    background: '#F7941B',
    '&:hover' : {
        backgroundColor: '#e36110'
    }
},
button_link: {
    margin: '35px 16px',
    padding: '5px 6px',
    height: '46.98px',
    width: '270px',
    color: 'white',
    fontSize:'18px',
    textTransform: 'none',
    background: '#02368C',
    '&:hover' : {
        backgroundColor: '#02368C'
    }
},
input: {
    display: 'none',
},
card: {
  maxWidth: 345,
  height: 330,
  fontSize: '18px',
  textAlign: 'left',
},
cardtwo: {
    maxWidth: 345,
    marginLeft: '33px',
    width: '263.39px',
    height: '369.18px',
    textAlign: 'left',

},
media: {
  height:235,
},
mediatwo:{
    maxWidth: 345,
    height: 235,
    borderBottom: '4px solid #8CC740'
}


}));



const About = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [editBtn, setEditBtn] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // init About  State
  const [about, setAbout] = useState({

    about_page_header_bg_image: '',
    about_page_header_title: '',
    about_page_header_sub_title: '',
    about_page_nav1: '',
    about_page_nav2: '',
    about_page_nav3: '',
    about_page_nav4: '',

    about_page_section1: '',

    about_page_section2: '',

    about_page_section3_title: '',
    about_page_section3_p1: '',
    about_page_section3_p2: '',
    about_page_section3_p3: '',
    about_page_section3_img1: '',
    about_page_section3_img2: '',
    about_page_section3_left: '',

    about_page_section4_t1: '',
    about_page_section4_t2: '',
    about_page_section4_t3: '',
    about_page_section4_p1: '',
    about_page_section4_p2: '',
    about_page_section4_p3: '',

// about page  Meet our team

    about_page_section5_title: '',

    about_page_section5_img1: '',
    about_page_section5_img_title1: '',
    about_page_section5_img_sub_title1: '',

    about_page_section5_img2: '',
    about_page_section5_img_title2: '',
    about_page_section5_img_sub_title2: '',

    about_page_section5_img3: '',
    about_page_section5_img_title3: '',
    about_page_section5_img_sub_title3: '',

    about_page_section5_img4: '',
    about_page_section5_img_title4: '',
    about_page_section5_img_sub_title4: '',

    about_page_section5_button_text: '',
    about_page_section5_button_link: '',

// CEO Message
    about_page_section6_title: '',
    about_page_section6_p1: '',
    about_page_section6_p2: '',
    about_page_section6_p3: '',
    about_page_section6_p4: '',
    about_page_section6_img1: '',
    about_page_section6_img_title1: '',
    about_page_section6_img_sub_title1: '',
    about_page_section6_editor_three: '',


// footer button section
    about_page_section7_p1: '',
    about_page_section7_p2: '',
    about_page_section7_p3: '',
    about_page_section7_link3: '',

// About diaing data
    nkw_group_chart: '',


    nkw_group_capability_statement1: '',
    nkw_group_capability_statement2: '',
    nkw_group_capability_statement3: '',
    nkw_group_capability_statement4: '',
    nkw_group_capability_statement5: '',
    nkw_group_capability_statement6: '',
    nkw_group_capability_statement7: '',
    nkw_group_capability_statement8: '',
    nkw_group_capability_statement9: ''

  });

const [_id, setId] = useState('');

// const [_d, setD] = useState({})

let _init_p = `${`<strong>NKW Group has developed into a leading provider of diverse,</strong> short and long-term special projects and services. Our commitment to delivering high quality service is evident both in our ability to develop strong partnerships and work alongside our Clients to increase potential and maintain a professional workforce that offers solutions specific to customer needs.`}`;

    // Draft.js state Hooks

    var  blocksFromHTML = convertFromHTML(`<p>${_init_p}</p>`);

    var contentState = ContentState.createFromBlockArray(blocksFromHTML);



const [editorStateOne, setEditorStateOne] = useState(
  EditorState.createWithContent(contentState)
  // EditorState.createEmpty('Hello')
);

const [editorStateTwo, setEditorStateTwo] = useState(
  EditorState.createEmpty()
);

// Init CEO Messge Editor

const [editorStateThree, setEditorStateThree] = useState(
  EditorState.createEmpty()
);


  // Dialogs
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');



const onEditorStateChange = (editorStateOne) => {

  setEditorStateOne(editorStateOne);

  setEditorStateTwo(editorStateTwo);

  setEditorStateThree(editorStateThree);

};

// init  AuthCon
const authContext = useContext(AuthContext);

useEffect(() => { 
  authContext.loadUser();
  // eslint-disable-next-line
}, []);

//  get  Data from api
useEffect(() => {
    axios.get('/api/about').then(res => {
      //console.log(res.data[0]);
      setAbout(res.data[0]);
      setId(res.data[0]._id);
      const blockHTML = convertFromHTML(`${res.data[0].about_page_section1}`);
      const cState = ContentState.createFromBlockArray(blockHTML);

      const blockHTML_about_section3_left = convertFromHTML(`${res.data[0].about_page_section3_left}`);
      const section3_left_state = ContentState.createFromBlockArray(blockHTML_about_section3_left);

      // Editor Three
      const blockHTML_about_section6_editor = convertFromHTML(`${res.data[0].about_page_section6_editor_three}`);
      const about_section6_editor = ContentState.createFromBlockArray(blockHTML_about_section6_editor);
      setEditorStateOne(
        EditorState.createWithContent(cState)
      );
      setEditorStateTwo(
        EditorState.createWithContent(section3_left_state)
      );
      setEditorStateThree(
        EditorState.createWithContent(about_section6_editor)
      );
   

    })
    
    
}, []);



const showEditBtn = (show) => {
  //  console.log(show);
   let _show = false;
   _show = !show;
   setEditBtn(_show);
}


const SaveUpdate = (e) => {
  e.preventDefault();
  axios.put(`/api/about/${_id}`, about).then(res => {
    // console.log(res.data.about_page_section1)

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

// Button 
// const handleClearFun = () => { 
//   setHeader({...header, logo_img: '' });
// }


  return (

    <Fragment>
      <div className={classes.root}>
         <div style={{textAlign:"left", marginLeft: "-12px", marginBottom: "10px" }}>
              <h1 style={{ paddingBottom: "15px" }}>Section 1</h1>
        </div>
      <Grid container spacing={3}>

        <Grid item xs={6}>
            <Wrapper> 
          
                <AboutHeaderImg img={about.about_page_header_bg_image}>
                    <MainTitle>{about.about_page_header_title}
                    </MainTitle>
                    <Subtitle>{about.about_page_header_sub_title}
                    </Subtitle>
                </AboutHeaderImg>

                    <AboutNav>
                        <Ul>
                          <Li>
                            {about.about_page_nav1}
                          </Li>
                          <Li>
                            {about.about_page_nav2}
                          </Li>
                          <Li>
                            {about.about_page_nav3}
                          </Li>
                          <Li>
                            {about.about_page_nav4}
                          </Li>
                        </Ul>
                    </AboutNav>
                    <Section1>
                      {/* {about.about_page_section1}  */}
                      <div
                        dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorStateOne.getCurrentContent()))}}

                      />
                      {/* <div>
                         {  editorStateOne.toString()}
                      </div> */}
                      {/* <div>
                       { draftToHtml(convertToRaw(editorStateOne.getCurrentContent())) }
                      </div> */}

                </Section1>
                <Section2 img={about.about_page_section2}> </Section2>

                <Section3 >
                  <SecLeft>
                        {/* <h3>{about.about_page_section3_title}</h3>
                        <p>{about.about_page_section3_p1}</p>
                        <p>{about.about_page_section3_p2}</p>
                        <p>{about.about_page_section3_p3}</p> */}

                        <div 
                          dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorStateTwo.getCurrentContent()))}}

                        />

                  </SecLeft>
                  <SecRight >
                        <img src={about.about_page_section3_img1} alt="about_page_section3_img1"  width="100%" style={{marginTop: '43px'}}/>
                        <img src={about.about_page_section3_img2} alt="about_page_section3_img2" />
                  </SecRight>

                </Section3>

                <Section4>
              <MissionDiv>
                <h3>{about.about_page_section4_t1}</h3>
                <p>{about.about_page_section4_p1}</p>
              </MissionDiv>
              <VisionDiv>
                <h3>{about.about_page_section4_t2}</h3>
                <p>{about.about_page_section4_p2}</p>
              </VisionDiv>
              <ValueDiv>
                  <h3>{about.about_page_section4_t3}</h3>
                  <p>{about.about_page_section4_p3}</p>
              </ValueDiv>

          </Section4>

          <div>
          <h1 style={{textAlign: 'left', marginLeft:"5% "}}>{about.about_page_section5_title}</h1>
          <Section5>
            <div style={{flex: "1", margin: "0.4rem 0.4rem"}}>
              <Card className={classes.card} >
                  <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={about.about_page_section5_img1}
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                                {about.about_page_section5_img_title1}

                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'18px'}}>
                                  {about.about_page_section5_img_sub_title1 }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <div style={{flex: "1", margin: "0.4rem 0.4rem"}}>
              <Card className={classes.card} >
                 <CardActionArea>
                      <CardMedia
                      className={classes.media}
                      image={about.about_page_section5_img2}
                      title="Contemplative Reptile"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                              {about.about_page_section5_img_title2}

                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'18px'}}>
                                {about.about_page_section5_img_sub_title2 }
                      </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
            </div>

            <div style={{flex: "1", margin: "0.4rem 0.4rem"}}>

              <Card className={classes.card} >
                 <CardActionArea>
                      <CardMedia
                      className={classes.media}
                      image={about.about_page_section5_img3}
                      title="Contemplative Reptile"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                              {about.about_page_section5_img_title3}

                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'18px'}}>
                                {about.about_page_section5_img_sub_title3 }
                      </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
              </div>
              <div style={{flex: "1", margin: "0.4rem 0.4rem"}}>

              <Card className={classes.card} >
                 <CardActionArea>
                      <CardMedia
                      className={classes.media}
                      image={about.about_page_section5_img4}
                      title="Contemplative Reptile"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                              {about.about_page_section5_img_title4}

                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'18px'}}>
                                {about.about_page_section5_img_sub_title4}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
              </div>
          </Section5>
                  <div>
                      <Link to={about.about_page_section5_button_link} style={{textDecoration: 'none'}}>
                          <Button variant="contained" color="secondary" className={classes.button}>
                              {about.about_page_section5_button_text}
                          </Button>
                      </Link>
                  </div>

                  <Section6>
            {/* <h3>{about.about_page_section6_title}</h3> */}
              <Row>
                  <Col2>
                      {/* <p>{about.about_page_section6_p1}</p>
                      <p
                        style={{
                           borderLeft:'4px solid #0236BC',
                           paddingLeft: '36px',
                           lineLeft: '24px',
                           color: '#707070',
                           fontSize: '18px',
                           fontWeight: 'bold'
                        }}
                      >{about.about_page_section6_p2}</p>
                      <p>{about.about_page_section6_p3}</p>
                      <p>{about.about_page_section6_p4}</p>
 */}

                      <div
                        dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorStateThree.getCurrentContent()))}}

                        />


                  </Col2>
                  <Col1>
                      <Card className={classes.cardtwo} >
                      <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={about.about_page_section6_img1}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                    {about.about_page_section6_img_title1}

                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'18px'}}>
                                      {about.about_page_section6_img_sub_title1 }
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                  </Col1>
              </Row>
               <Divider  />
               <div style={{textAlign:"left"}}>

                  <ul  style={{
                        display:'flex',
                        listStyle: 'none'
                  }}>
                            <li><Button variant="contained" color="primary"  className={classes.button_link} >{about.about_page_section7_p1}</Button></li>
                            <li><Button variant="contained" color="primary"  className={classes.button_link} >{about.about_page_section7_p2}</Button></li>
                            <Link to='/videos'><Button variant="contained" color="primary"  className={classes.button_link}>{about.about_page_section7_p3}</Button></Link>

                  </ul>
                </div>
          </Section6>
          </div>

              </Wrapper>
            </Grid>

            <Grid item xs={6}>

            <div style={{textAlign: "left", padding: "6px 10px"}}> {/**about section header  */}
                  
                  {!editBtn ? (
                    <Fab  onClick={() => showEditBtn(editBtn)}  color="secondary" aria-label="edit" className={classes.fab}  >
                                <EditIcon />
                    </Fab>
                  ) : ( 
                    <Fab onClick={() => showEditBtn(editBtn)} color="secondary" aria-label="edit" className={classes.fab}>
                        <CloseIcon />
                    </Fab>
                  )

                }

                { 
                  editBtn && (
                    <div style={{border: '1px solid rgb(230, 230, 230)', minHeight: '260px'}}>
                    <h3>About Header Image</h3>
                   <input type="text"  placeholder="Image URL:http:www" value={about.about_page_header_bg_image}  onChange={(e) => setAbout({...about, about_page_header_bg_image: e.target.value }) }/>
                   <br/>
                   <div
                    style={{display: "flex"}}
                   >
                        <LibraryButton type="button" onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} />  Libary / Browse</LibraryButton>
                        <LibraryButton onClick={() => setAbout({...about, about_page_header_bg_image: '' })}>Remove</LibraryButton>
                     
                   </div>

                   <h4>Title</h4>
                   <input type="text"  placeholder="Header Title" value={about.about_page_header_title} onChange={(e) => setAbout({...about, about_page_header_title: e.target.value})} />

                   <h4>Sub-Title</h4>
                   <input type="text"  placeholder="Sub Title" value={about.about_page_header_sub_title} onChange={(e) => setAbout({...about, about_page_header_sub_title: e.target.value})} />

                   <div style={{display:"flex"}}>
                     <input type="text" value={about.about_page_nav1} onChange={e => setAbout({...about, about_page_nav1: e.target.value})} />
                     <input type="text" value={about.about_page_nav2} onChange={e => setAbout({...about, about_page_nav2: e.target.value})} />
                     <input type="text" value={about.about_page_nav3} onChange={e => setAbout({...about, about_page_nav3: e.target.value})} />
                     <input type="text" value={about.about_page_nav4} onChange={e => setAbout({...about, about_page_nav4: e.target.value})} />
                   </div>
                    

                   <div style={{textAlign: "left", padding: "0 10px"}}>
                  
                  <div style={{border: '0px solid rgb(230, 230, 230)', minHeight: '300px', margin:'10px, 10px'}}>
                    <Editor
                        
                        editorState={editorStateOne}
                        onEditorStateChange={setEditorStateOne}
                        value={editorStateOne}
                        onChange={(e) => setAbout({...about, about_page_section1: draftToHtml(convertToRaw(editorStateOne.getCurrentContent())).toString()})}
                          // const onChangeValue = (e) => {

                          //     console.log(e.blocks)
                          // }

                    />

                   </div>

                 </div>


                    <div style={{textAlign: "left", padding: "0 10px"}}>

                      <div style={{border: '1px solid rgb(230, 230, 230)', minHeight: '160px'}}>
                        <p>Middle Section Image</p> 
                        <input 
                            type="text"  
                            placeholder="url:http://wwww" value={about.about_page_section2} 
                            onChange={e => setAbout({...about, about_page_section2: e.target.value})}
                        /><br/>
                        <div style={{display:'flex'}}>
                          <LibraryButton type="button" onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Lirbary / Browse</LibraryButton>
                          <LibraryButton type="button" onClick={() => setAbout({...about, about_page_section2: ''})}>Remove</LibraryButton>
                        </div>
                       </div>
                    </div>


                    <div style={{textAlign: "left", padding: "24px 10px"}}>

                        <Section3 style={{ minHeight: '400px'}}>
                          <SecLeft style={{border: '1px solid rgb(230, 230, 230)' , minHeight: '400px'}}>
                                  <Editor
                                        editorState={editorStateTwo}
                                        onEditorStateChange={setEditorStateTwo}
                                        value={editorStateTwo}
                                        onChange={(e) => setAbout({...about, about_page_section3_left: draftToHtml(convertToRaw(editorStateTwo.getCurrentContent())).toString()})}
                                            // const onChangeValue = (e) => {

                                            //     console.log(e.blocks)
                                            // }


                                  />
                          </SecLeft>
                          <SecRight style={{border: '1px solid rgb(230, 230, 230)'}} >
                                  {/* 
                                  <Editor



                                  /> */}

                                  <div >
                                    <h5> Image One</h5>
                                    <input type="text" placeholder="Image One"  
                                            value={about.about_page_section3_img1} 
                                            onChange={(e) => setAbout({...about, about_page_section3_img1: e.target.value}) }
                                      /><br/>
                                      <div style={{display: 'flex'}}>
                                        <LibraryButton type="button" onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</LibraryButton>
                                        <LibraryButton onClick={() => setAbout({...about, about_page_section3_img1: ''})}>Remove</LibraryButton>
                                      </div>
                                  </div>


                                  <div>
                                    <h5>Image Two</h5>
                                    <input type="text" 
                                            placeholder="Image two"  
                                            value={about.about_page_section3_img2}
                                            onChange={(e) => setAbout({...about, about_page_section3_img2: e.target.value}) } 
                                      /><br/>  
                                      <div style={{display: 'flex'}}>

                                      <LibraryButton type="button" onClick={handleClickOpen}> <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</LibraryButton>
                                      <LibraryButton onClick={() => setAbout({...about, about_page_section3_img2: ''})} >Remove</LibraryButton>
                                      </div>

                                  </div>

                          </SecRight>

                        </Section3>


                    </div>



              <div style={{textAlign: "left", padding: "10px 10px", marginTop:"140px"}}>

    

                      <div style={{display: 'flex'}}>

                        <input  type='text' placeholder="title one"    
                                value={about.about_page_section4_t1}
                                onChange={e => setAbout({...about, about_page_section4_t1: e.target.value})}
                        />

                        <input type='text' placeholder="title two"   
                              value={about.about_page_section4_t2} 
                              onChange={e => setAbout({...about, about_page_section4_t2: e.target.value})}
                        />

                        <input type='text' placeholder="title three" 
                              value={about.about_page_section4_t3}
                              onChange={e => setAbout({...about, about_page_section4_t3: e.target.value})}
                        />

                      </div>
                      <div style={{display: 'flex', width:"100%"}}>

                            <textarea  placeholder="sub one"  rows="10" cols="63"  
                                      value= {about.about_page_section4_p1} 
                                      onChange={e => setAbout({...about, about_page_section4_p1: e.target.value})} 
                            />
                                
                        
                            <textarea  type="text" placeholder="sub two" rows="10" cols="63" 
                                      value={about.about_page_section4_p2} 
                                      onChange={e => setAbout({...about, about_page_section4_p2: e.target.value})}
                            />
                            
                            <textarea  type="text" placeholder="sub dec three"  
                                      rows="10" cols="63" 
                                      value={about.about_page_section4_p3} 
                                      onChange={e => setAbout({...about, about_page_section4_p3: e.target.value})}
                            />
                      </div>

                    </div>




                    <div style={{textAlign: "left", padding: "24px 10px", marginTop:"120px"}}>


        <div style={{display:"flex"}}>

            <div style={{border: '1px solid black', flex:"1"}}>
                <input type="text" placeholder="Image one" width="120" 
                      value={about.about_page_section5_img1}
                      onChange={e => setAbout({...about, about_page_section5_img1: e.target.value})}  
                />
                <input type="text" placeholder="title one" 
                      value={about.about_page_section5_img_title1}
                      onChange={e => setAbout({...about, about_page_section5_img_title1: e.target.value})}  
                />
                <input type="text" placeholder="sub text one" 
                      value={about.about_page_section5_img_sub_title1}
                      onChange={e => setAbout({...about, about_page_section5_img_sub_title1: e.target.value})}  
                />

            </div>

            <div style={{border: '1px solid black',  flex:"1"}}>
                <input type="text" placeholder="Image two"
                      value={about.about_page_section5_img2}
                      onChange={e => setAbout({...about, about_page_section5_img2: e.target.value})} 
                />
                <input type="text" placeholder="title two" 
                      value={about.about_page_section5_img_title2}
                      onChange={e => setAbout({...about, about_page_section5_img_title2: e.target.value})}  
                />
                <input type="text" placeholder="sub text two" 
                      value={about.about_page_section5_img_sub_title2}
                      onChange={e => setAbout({...about, about_page_section5_img_sub_title2: e.target.value})}  
                />
            </div>

    <div style={{border: '1px solid black',  flex:"1"}}>
        <input type="text" placeholder="Image three" 
              value={about.about_page_section5_img3}
              onChange={e => setAbout({...about, about_page_section5_img3: e.target.value})} 
        />
        <input type="text" placeholder="title three" 
              value={about.about_page_section5_img_title3}
              onChange={e => setAbout({...about, about_page_section5_img_title3: e.target.value})} 
        />
        <input type="text" placeholder="sub text three" 
              value={about.about_page_section5_img_sub_title3}
              onChange={e => setAbout({...about, about_page_section5_img_sub_title3: e.target.value})} 
        />
    </div>

    <div style={{border: '1px solid black',  flex:"1"}}>
        <input type="text" placeholder="Image Four"
              value={about.about_page_section5_img4}
              onChange={e => setAbout({...about, about_page_section5_img4: e.target.value})} 
        />
        <input type="text" placeholder="title Four" 
              value={about.about_page_section5_img_title4}
              onChange={e => setAbout({...about, about_page_section5_img_title4: e.target.value})} 
        />
        <input type="text" placeholder="sub text Four" 
              value={about.about_page_section5_img_sub_title4}
              onChange={e => setAbout({...about, about_page_section5_img_sub_title4: e.target.value})} 
        />
    </div>



</div>


</div>


<div style={{textAlign: "left", padding: "24px 10px", marginTop:"20px"}}>


<div>
  <input type="text"  placeholder="Button Text" 
    
      value={about.about_page_section5_button_text}
      onChange={(e) => setAbout({...about, about_page_section5_button_text: e.target.value})}
  />
  <br/>
  <h3>Button links </h3>
  <select  onChange={(e) => { 
        setAbout({...about, about_page_section5_button_link: e.target.value}) 
         //  console.log(e.target.value)
        } }>

    <option  value="#"> __ --- __ </option>
    <option value={about.about_page_section5_button_link}>{about.about_page_section5_button_link}</option>
  </select>

</div>

</div>

<div style={{textAlign: "left", padding: "24px 10px", margin:"10px 10px"}}>


<div style={{display: 'flex'}}>
      <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', height: "atuo"}}>
            <Editor

                //  Edit for CEO Message
                editorState={editorStateThree}
                onEditorStateChange={setEditorStateThree}
                value={editorStateThree}
                onChange={(e) => setAbout({...about, about_page_section6_editor_three: draftToHtml(convertToRaw(editorStateThree.getCurrentContent())).toString()})}

            />
      </div>
        <div style={{flex: 1, paddingLeft: '19px'}}>

         <h3>Image: </h3>
        <input type="text" placeholder="Image One"
               value={about.about_page_section6_img1}
               onChange={e => setAbout({...about, about_page_section6_img1: e.target.value})}
              // value={about.about_page_section5_img1}
              //onChange={e => setAbout({...about, about_page_section5_img_title1: e.target.value})}
        />
        <br/>
                                      <LibraryButton onClick={handleClickOpen} > <FaRegImage style={{fontSize: '14px'}} /> Library / Browse</LibraryButton>
                                      <LibraryButton  onClick={() => setAbout({...about, about_page_section6_img1: ''})}>Remove</LibraryButton>

        <h3>Text: </h3>
        <input type="text" placeholder="Image Title"
              value={about.about_page_section6_img_title1}
              onChange={e => setAbout({...about, about_page_section6_img_title1 : e.target.value})}
        
        />

        <h3>Title: </h3>
        <input type="text" placeholder="Sub Title" 
              value={about.about_page_section6_img_sub_title1}
              onChange={e => setAbout({...about, about_page_section6_img_sub_title1: e.target.value})}
        />
    </div>

   

        </div>
        <div style={{display: 'flex'}}>
        <div>
          <input type="text" placeholder="Button one text" 
            value={about.about_page_section7_p1}
            onChange={e => setAbout({...about, about_page_section7_p1: e.target.value}) }
          />
          <input type="text" placeholder="Button two text"
            value={about.about_page_section7_p2}
            onChange={e => setAbout({...about, about_page_section7_p2: e.target.value})}
          />
          <input type="text" placeholder="Button three text"
            value={about.about_page_section7_p3}
            onChange={e => setAbout({...about, about_page_section7_p3: e.target.value})}
          />

    </div>
 </div>




                </div>

         </div>

   )
}

                  



            

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

           


            



              </div>

          </Grid>

        </Grid>

      </div>

       <div className="fixedFooter" color="secondary" style={{background: "#FFFFFF", zIndex:"999"}} > 
        <Button  variant="contained" 
                     style={{ position:"absolute",marginLeft:"73%", marginTop:"20px"}}  
                     onClick={() => setEditBtn(false)}
            >Cancel</Button>
        
        <Button  variant="contained" color="secondary"  type="submit" style={{lineHeight:'80px' ,fontSize:"20px", fontWeight:"600", backgroundColor:"#0D64F8", width: "260px",  color:"white", marginLeft:"80.5%"}} onClick={SaveUpdate}>Update & Save</Button>

            
       </div>

    </Fragment>
  );
}


export default About;