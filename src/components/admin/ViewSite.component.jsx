import React from 'react';
import Iframe from 'react-iframe';


const ViewSite = () => (
    <div style={{marginTop:'75px', background:'white'}}>
        <Iframe url="http://localhost:3001/"
        width="1080px"
        height="1920px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
    </div>

);

export default ViewSite;



