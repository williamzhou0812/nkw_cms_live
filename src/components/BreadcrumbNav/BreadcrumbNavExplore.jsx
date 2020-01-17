import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'

const handleClick = (event, props) => {
    // event.preventDefault();
    //  console.info('You clicked a breadcrumb.', event.target.href);
    
    return ( 
       <Redirect to="/"/>
    )
  }

const ActiveLastBreadcrumbExplore = ({rootPath, childOne, path}) =>  {

  
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="http://192.168.0.250:3000/admin/explore" onClick={handleClick}>
          
         
          { rootPath }   
        
            
    </Link>

      <Link
        color="textPrimary"
        href={path}
        onClick={handleClick}
        aria-current="page"
      >
        {childOne}
      </Link>
    </Breadcrumbs>
  );
}

export default withRouter(ActiveLastBreadcrumbExplore);