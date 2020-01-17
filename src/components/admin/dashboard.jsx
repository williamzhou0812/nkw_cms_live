import React, {Fragment, useEffect, useContext} from 'react';
import AuthCotext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

const  Dashboard = () => {
    const authContext = useContext(AuthCotext);

    useEffect(() => { 
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div style={{textAlign:'left'}}>
              <h1>CMS Dashboard: Welcome</h1> 
              <div >
                  <h2><strong>Quick Links</strong></h2>
                <ul style={{listStyle:'none', fontSize: '20px', paddingTop:"0px", lineHeight:"40px" }}>
                    <div>
                        <Link to="/admin/about"> 
                            About
                        </Link>
                    </div>
                    <div>
                    <Link to="/admin/explore"> 
                        Explore 
                    </Link>
                    </div>
                    <div>

                    <Link to="/ourteam"> 
                       Our Team 
                    </Link>

                    <div>

                    <Link to="/"> 
                       Library
                    </Link>
                     
                    </div>
                     
                    

                    </div>
        
                </ul>
              </div>
            </div>
        </Fragment>
    )
}



export default  Dashboard;