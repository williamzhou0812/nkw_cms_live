//** */
import React, { Fragment, useState, useEffect, useContext} from 'react';
import AuthContext from '../../../context/auth/authContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import moment from 'moment';
import './image_library.scss';


const ImageLibrary = () =>  {

// Auth
const authContext = useContext(AuthContext);

useEffect(() => { 
    authContext.loadUser();
    // eslint-disable-next-line
}, []);
 


    const  [image, setImage] = useState({
        file:null
    })

    const [libraryImages, setLirbraryImages] = useState([{ 
        imageName: '',
        uploadDateTime: Date
    }]);

    const [ copied, setCopied ] = useState(false);

    useEffect(() => {
        axios.get(`/api/library`).then(res => {
            console.log(res.data)
            setLirbraryImages(res.data)
        })
    }, [])

 
    const onFormSubmit = (e) => { 
        e.preventDefault();
        const data = new FormData() 
        data.append('myImage', image.file)

        const config = { 
            headers: {
                'context-type': 'multipart/form-data'
            }
        }
        axios.post('/api/library', data, config).then(res => { 
            setLirbraryImages(res.data);
            alert('The file is successfully uploaded');
            
        })
      // console.log(data)
    }


    // handel delete

    const DeleteImage = (id) => { 
        let isDeleteImg = window.confirm('Are you sure wann Delete Image');
        //alert(isDeleteImg);
        if (isDeleteImg) {
            axios.delete(`/api/library/${id}`).then(res => {
                setLirbraryImages(res.data);
            })
            console.log('Delete item ' + id);

        }
    }





    return  (
            <Fragment>
                <form onSubmit={onFormSubmit}>

                <div className="main_contenter" style={{marginTop:"28px"}}>
                {copied ? <span style={{color: 'red', width:'100%', height:'45px', background:'yellow', fontWeight:'500'}}>Image URI Copied.</span> : null }
                    <p>Upload image here </p>
                    <input type='file' name='myImage' onChange={e => setImage({...image, file: e.target.files[0]})} />
        
                </div>
                    <Button type="submit" variant="outlined" color="secondary">Upload</Button>
                    <hr  style={{border:'1px solid gray'}} />
                
                <div  style={{
                    maxWidth: '1920px',
                    height: '700px',
                    border: '0px solid black',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow:'scroll',
                    justifyContent: 'space-between'
                }}>

                    { 
                        libraryImages.map(libraryImage => (
                            <div key={libraryImage.imageName} style={{padding: '10px 10px', flex: '1', flexWrap:'wrap'}}>
                                    <div className='imgCard' >
                                    <img src={`http://localhost:5000/${libraryImage.imageName}`} alt={libraryImage.imageName} width="100%"/>
                                    
                                    <div style={{textAlign: 'left', padding:'2px 6px', width: '360px'}}>
                                        <p>name: {libraryImage.imageName}</p>   
                                        <p>uri:  http://localhost:5000/{libraryImage.imageName}  | 
                                            <CopyToClipboard 
                                                text={`http://localhost:5000/${libraryImage.imageName}`}
                                                onCopy={() => setCopied(true)}
                                            >
                                                <button type="button" style={{background: '#3F50B5', color:'white'}}>copy url</button>
                                            </CopyToClipboard>    
                                        </p> 
                                        <p>upload at: <span style={{fontSize: '12px', color:"gray"}}>{moment(libraryImage.uploadDateTime).format('MMMM Do YYYY, h:mm:ss a')}</span></p>

                                        <Button type="button" variant="outlined"  onClick={() => DeleteImage(libraryImage._id)}>Delete</Button>
                                        {/* <Button type="button" variant="outlined" >View Full Image</Button> */}

                                    </div>
                                    </div> 
                            </div>


))
                    }
                 

                       
                </div> 
                
                </form>
        
                
            </Fragment>
        );
    
}    


export default ImageLibrary;