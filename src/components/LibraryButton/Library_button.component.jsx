import React from 'react';
import './Library_button.styles.scss';


const LibraryButton = ({children, ...otherProps}) => (
    <div className="uploadButton"> 
        <button {...otherProps}>
          {children}
         </button>
    </div>
);


export default LibraryButton;
