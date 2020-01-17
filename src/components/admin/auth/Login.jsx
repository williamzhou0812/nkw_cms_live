import React, {useState, Fragment, useContext, useEffect} from 'react';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';

const Login = (props) => { 


    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {login, error, clearErrors, isAuthenticated} = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;
    


    useEffect( ()  => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);

    // binding with input field
    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    // recive submit data from from 
    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else {
            login({
                email,
                password
            })
            //console.log('Register Submit');
        }
    };

    


    return (
        <Fragment>
            <div className='form-login'> 

                <form onSubmit={onSubmit}>

                    <div style={{maxWidth: '700px', height:'600px', border:'0px solid black', margin:"auto", padding: "200px 60px"}} >
                    <h1>Account <span className='text-primary'>Login</span></h1>

                        <div style={{display:'flex', alignItems:'center', justifyContent:"center", margin:'auto'}}>
                            <label htmlFor='name'>Email</label>
                            <input style={{marginLeft:'38px',  marginRight:"2px"}} type='email' name='email' value={email} onChange={onChange}   required/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:"center", margin:'auto'}}>
                            <label htmlFor='password'>Password</label>
                            <input
                                style={{marginRight:"2px"}}
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}    
                                required    
                                minLength="6"
                            />

                        </div> 

                        <div style={{paddingTop:"10px"}}>
                            <input 
                                style={{backgroundColor:"#60bef3", color: 'white', fontWeight: "bold", width:"72%"}}
                                type='submit'
                                value='Login' 
                            />
                        </div>
                    </div>

                </form>


            </div>


        </Fragment>
    )




}

export default Login;

