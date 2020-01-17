import React, {Fragment} from 'react';


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Home from '@material-ui/icons/Home';
import Explore from '@material-ui/icons/Explore';
import Info from '@material-ui/icons/Info';
import ContactSupport from '@material-ui/icons/ContactSupport';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';

// Import Admin Dashboard Comp
import Dashboard from './components/admin/dashboard';
import Header from './components/admin/header/header';
import ShowCase from './components/admin/showcase/showcase';
import About from './components/admin/about/about';
import Ourteam from './components/admin/ourteam/ourteam';
import ExploreComp from './components/admin/explore/explore.comp';
// import Pages from './components/admin/pages/pages';

import Alerts from './components/Alerts/Alerts';

import Login from './components/admin/auth/Login';

//get auth 
import AuthState from './context/auth/AuthState';

import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';



import './App.css';

import NavbarLink from './components/NavbarLink/NavbarLink';


import Nkw_fresh_page1 from './components/admin/explore/pages/divisionsDetails/nkw_fresh_page1';
import expac_png_expac_aus_page2 from './components/admin/explore/pages/divisionsDetails/expac_png_expac_aus_page2';

import OurTeamPage from './components/admin/ourteam-page/ourteam-page';
import QuestPacificServices from './components/admin/explore/pages/divisionsDetails/quest_pacific_services';
import HiddenValleyTransportLogistics  from './components/admin/explore/pages/divisionsDetails/hidden_valley_transport_logistics';  
import NkwCatering  from './components/admin/explore/pages/divisionsDetails/nkw_catering';  
import MountainCoffee  from './components/admin/explore/pages/divisionsDetails/mountain_coffee';  
import PngCommercialVehicles  from './components/admin/explore/pages/divisionsDetails/png_commercial_vehicles';  
import AllPowerServices  from './components/admin/explore/pages/divisionsDetails/alll_power_services';  
import JetSmartServices  from './components/admin/explore/pages/divisionsDetails/jet_smart_travel_services';  
import NkwTraining  from './components/admin/explore/pages/divisionsDetails/nkw_training';
import PacificCargoServices  from './components/admin/explore/pages/divisionsDetails/pacific_cargo_services';
import NkwBuildingConstrucion  from './components/admin/explore/pages/divisionsDetails/nkw_building_construcion';
import HVC  from './components/admin/explore/pages/divisionsDetails/hvc';

// Explore sub Pages
import NkwBuildingandConstruction from './components/admin/explore/pages/exploreDetails/nkw_building_and_construction';
import NkwCateringExploreDetails  from './components/admin/explore/pages/exploreDetails/nkw_catering';
import LogisticsAndTransport from './components/admin/explore/pages/exploreDetails/logistics_and_transport';
import NkwFreshExplore from './components/admin/explore/pages/exploreDetails/nkw_fresh';
import ProcurementExploreDetails from './components/admin/explore/pages/exploreDetails/procurement';
import MtoTraining from './components/admin/explore/pages/exploreDetails/mto_training';
import CampManagement from './components/admin/explore/pages/exploreDetails/camp_management';
import ImageLibrary from './components/admin/imageLibrary/image_library';
import VideoEditPage from './components/admin/video-edit-page/video-edit-page';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import PrivateRoute from './routing/PrivateRoute';
import ViewSite from './components/admin/ViewSite.component';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'white',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));



function App() {

 
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
   
  
  return (
      <AuthState>
        <AlertState>
              <div className={classes.root}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  style={{backgroundColor:'black'}}
                  className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                  })}
                >
                  <Toolbar>
                  
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                      })}
                    >
                      <MenuIcon />
                    </IconButton>


                    {/* <Typography variant="h6" noWrap>
                      LOGO Image 
                        
                    </Typography>  */}
                    <div  style={{borderLeft:'1px solid white', marginLeft: "-24px" }}> 
                    <Link to="/"> 
                      <img style={{marginLeft:'14px'}} src="http://nkwapi.jbgconcierge.com.au:5000/logo/NKWLogo_white-01.png" alt="nkw logo" width="100"  />
                    </Link>
                    </div>

                    <Typography variant="h6" style={{marginLeft: 'auto', paddingRight: "5%"}} >
                       <ul>
                        <NavbarLink/>
                       </ul>
                    </Typography>
                  </Toolbar>
                </AppBar>
            {localStorage.token && (
                <Drawer
                  variant="permanent"
                  className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  })}
                  classes={{
                    paper: clsx({
                      [classes.drawerOpen]: open,
                      [classes.drawerClose]: !open,
                    }),
                  }}
                  open={open}
                >
                 

                  <div className={classes.toolbar}>
                    <h3>Touchscreen CMS </h3>
                    <IconButton   onClick={handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                  </div>
  
                  <Divider />
                  <List>
                        <ListItem button className={classes.nested}> 
                            <ListItemIcon><RemoveRedEye/></ListItemIcon>
                            <Link to="/viewsite">
                              <ListItemText primary='View Site' />
                            </Link>
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <Link to="/" >
                                <ListItemIcon><Home/></ListItemIcon>
                            </Link> 
                             <Link to="/header">
                                <ListItemText primary='Header' />
                             </Link>

                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <Link to="#!">
                            <ListItemIcon><Explore/></ListItemIcon>
                          </Link>
                          <Link to="/showcase">
                            <ListItemText primary='Showcase' />
                          </Link>
                        </ListItem>
                        <ListItem button className={classes.nested}>
                           <ListItemIcon><Info/></ListItemIcon>
                            <Link to="/about">
                                <ListItemText primary='Section 1' />
                            </Link>
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon><Info/></ListItemIcon>
                               <Link to="/admin/explore">
                                 <ListItemText primary='Section 2' />
                               </Link> 
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon><ContactSupport/></ListItemIcon>
                            <Link to="/ourteam">
                              <ListItemText primary='Section 3' />
                            </Link>
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon><PhotoLibrary/></ListItemIcon>
                            <Link to="/library">
                               <ListItemText primary='Library' />
                            </Link>
                        </ListItem>
                  </List>
                
                </Drawer>

)}
                <main className={classes.content}>
                  
                  <Switch>
                            <PrivateRoute   exact path='/' component={Dashboard}/>
                            <Route    path='/login' component={Login} />

                            <Route  path='/viewsite' component={ViewSite} />
                    
                            <PrivateRoute exact path='/admin/explore'  component={ExploreComp} />
                            <PrivateRoute exact path='/ourteam'  component={Ourteam} /> 
                            <PrivateRoute exact path='/library' component={ImageLibrary} />
                            <PrivateRoute exact path='/ourteampage' component={OurTeamPage} />
                            <PrivateRoute exact path='/videoedit' component={VideoEditPage} />
                                    
                            <PrivateRoute  exact   path='/header'   component={Header} />
                            <PrivateRoute  exact  path='/showcase' component={ShowCase} />
                            <PrivateRoute  exact  path='/about'    component={About} />

                            {/* <Route   exact  path='/admin/pages' component={Pages} />  */}
                            <PrivateRoute  exact  path="/admin/expacdetail" component={expac_png_expac_aus_page2} />
                            <PrivateRoute   exact path="/admin/nkwdetail" component={Nkw_fresh_page1} />
                            <PrivateRoute   exact path="/admin/qpsdetail" component={QuestPacificServices} />
                            <PrivateRoute   exact path="/admin/hiddenvalley" component={HiddenValleyTransportLogistics} />
                            <PrivateRoute   exact path="/admin/nkwcatering" component={NkwCatering} />
                            <PrivateRoute   exact path="/admin/mountaincoffeeroasters" component={MountainCoffee} />
                            <Route   exact path="/admin/pngcommvehic" component={PngCommercialVehicles} />
                            <PrivateRoute   exact path="/admin/allpowerservice" component={AllPowerServices} />
                            <PrivateRoute   exact path="/admin/jetsmart" component={JetSmartServices} />
                            <PrivateRoute   exact path="/admin/mototrain" component={NkwTraining} />
                            <PrivateRoute   exact path="/admin/pcs" component={PacificCargoServices} />
                            <PrivateRoute   exact path="/admin/nkwbuilding" component={NkwBuildingConstrucion} />
                            <PrivateRoute   exact path="/admin/hvc" component={HVC} />

                            <PrivateRoute exact path="/admin/explore-nkwbuilding-and-construction" component={NkwBuildingandConstruction} />
                            <PrivateRoute exact path="/admin/explore-nkwcatering" component={NkwCateringExploreDetails} />
                            <PrivateRoute exact path="/admin/explore-logists-and-transport"  component={LogisticsAndTransport} /> 
                            <PrivateRoute exact path="/admin/explore-nkw-fresh" component={NkwFreshExplore} />
                            <PrivateRoute exact path="/admin/explore-procurement" component={ProcurementExploreDetails}  />
                            <PrivateRoute exact path="/admin/explore-mto-training" component={MtoTraining} /> 
                            <PrivateRoute exact path="/admin/explore-camp_management" component={CampManagement} />
                        </Switch>
                       

                </main>

              
                  </div>
          </AlertState>
      </AuthState>
    
  );
}

export default App; 
