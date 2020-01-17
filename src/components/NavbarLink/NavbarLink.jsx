import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AuthContext from './../../context/auth/authContext';
import Icon from '@material-ui/core/Icon';
import './NavbarLink.scss';

const NavbarLink = () => {

    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    }

    const authLinks = (
    <Fragment>
        <Typography variant="h6"  style={{marginLeft: 'auto', paddingRight: "5%"}}>
        <ul style={{display:"flex", padding: "auto" , width: "260px", listStyle:"none"}}>
            <li >Hello, { user && user.name} </li>
            <li style={{padding: "auto", marginTop:"4px", marginLeft:"4px" }}>
                <a onClick={onLogout} href="#!" sytle={{marginLeft:"10px", color: 'white'}} className="a_navbarlink">
                    < Icon> exit_to_app </Icon> 
                </a>
            </li>
        </ul>
        

        </Typography> 
    </Fragment>
  );

  const guestLinks = (
    <Fragment>

          <Link to="/login">
                <li>
                Login
                </li>  
            </Link>
    </Fragment>
  )

    console.log(isAuthenticated);

    return (
  
          <Fragment>
              {isAuthenticated ? authLinks : guestLinks}
          </Fragment>
        
    )

}

export default NavbarLink;


