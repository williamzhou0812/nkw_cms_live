import React, {Fragment, useState, useEffect, useContext} from 'react';
import AuthContext from '../../../context/auth/authContext';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './explore.styles.scss';


// Import temps env 
import {initConig } from '../../../utils/setHttpConfig';

const useTreeItemStyles = makeStyles(theme => ({
    root: {
      color: theme.palette.text.secondary,
      '&:focus > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  }));


  const  StyledTreeItem = (props) =>  {
    


    let history = useHistory();

    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, links,  ...other } = props;
    console.log('Other Props' + history);
   
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">

            <a href={`http://${initConig.env}:${initConig.port}/admin/${links}`}>
           
                    {labelInfo}
            </a>

            {/* <button type="button" onClick={history.push(`${links}`)}>
               {labelInfo}
            </button> */}

            </Typography>
         
        
          </div>
          
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    );
  }
  
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.elementType.isRequired,
    labelText: PropTypes.string.isRequired,
  };
  
  const useStyles = makeStyles({
    root: {
      minHeight: 264,
      flexGrow: 1,
      maxWidth: '50%',
      textAlign: "left",
      paddingLeft: '3.5%',
    },
  });
// import Styles Sheets

const ExploreComp = (props) => {


  // console.log("This props from exploreComp !!!!!! "+ props.location.pathname)

    const classes = useStyles();

    const authContext = useContext(AuthContext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
     

    const [expanded, setExpanded] = React.useState([]);
    const [disvisinName, setDisvisinsName] =  useState([
       { 
           name: '',
       }
    ])
  
    const handleChange = (event, nodes) => {
      setExpanded(nodes);
    };


    //Axios http req, res 
    // useEffect(async () => {
    //     const Disvisin_name = await axios.get('/api/disvisions/');
    //     console.log(Disvisin_name.data.disvisions);
    //     setDisvisinsName(Disvisin_name.data.disvisions);
    // }, [])

    useEffect(() => {
      axios.get('/api/disvisions/').then(res => {
        console.log(res.data.disvisions);
        setDisvisinsName(res.data.disvisions);

      });
      // eslint-disable-next-line
  }, [])



    return ( 
        <div style={{marginTop:"5%"}}> 
     <h3 style={{textAlign:"left", paddingLeft: '20px'}}>Section 2</h3>
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {/* <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} /> */}
      <StyledTreeItem nodeId="1" 
                      
                      labelText="Explore" 
                      labelIcon={Label}  
                      links="/" 
                      labelInfo="Edit" >  
        <StyledTreeItem
          nodeId="1"
          labelText="NKW DIVISIONS"
          labelIcon={Label}
          labelInfo=""
         
          color="#1a73e8"
          bgColor="#e8f0fe"
          
        >
            { 
                disvisinName.map((labelName, i) => {
                    return (
                        <StyledTreeItem nodeId="1" labelText={labelName.name} labelIcon={ArrowRightIcon}  links={labelName.links} labelInfo="Edit" key={i}/>  
                    )
                })
            }  


        </StyledTreeItem>
        <StyledTreeItem
          nodeId="3"
          labelText="NKW BUILDING & CONSTRUCTION"
          labelIcon={Label}
          labelInfo="EDIT"
          color="#e3742f"
          links="explore-nkwbuilding-and-construction"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="4"
          labelText="NKW CATERING"
          labelIcon={Label}
          labelInfo="EDIT"
          color="#a250f5"
          links="explore-nkwcatering"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="5"
          labelText="LOGISTICS & TRANSPORT"
          labelIcon={Label}
          labelInfo="EDIT"
          links="explore-logists-and-transport"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
     

          <StyledTreeItem
          nodeId="6"
          labelText="NKW FRESH"
          labelIcon={Label}
          labelInfo="EDIT"
          links="explore-nkw-fresh"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
         <StyledTreeItem
          nodeId="7"
          labelText="PROCUREMENT"
          labelIcon={Label}
          labelInfo="EDIT"
          links="explore-procurement"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
         <StyledTreeItem
          nodeId="8"
          labelText="MTO TRAINING"
          labelIcon={Label}
          labelInfo="EDIT"
          links="explore-mto-training"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
         <StyledTreeItem
          nodeId="9"
          labelText="CAMP MANAGEMENT"
          labelIcon={Label}
          labelInfo="EDIT"
          links="explore-camp_management"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      {/* <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} /> */}
    </TreeView>
        
        </div>
    )



     
}



export default withRouter(ExploreComp);