import React, {Fragment, useState, useEffect}  from 'react';
import axios from 'axios';



import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import './contactourteam.scss';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        height: 64,
        width: 300,
        color: 'white',
        background: '#F7941D'
    },
    button_link: {
        margin: theme.spacing(1),
        height: 64,
        width: 300,
        color: 'white',
        background: '#0063B0'
    },
    input: {
        display: 'none',
    },
    card: {
      width: 200,
      height: 70,
      padding: "10px 9px",
      borderBottom: '3px solid #4f990f'
    },
    card_Sec: {
        width: 200,
        height: 370,
        wordWrap: "break-word",
        padding: "10px 9px",

    },
    media: {
      height:100,
    },
  }));

const ContactOurTeam = () => {

    const classes = useStyles();

    const [ourteam, setOurteam] = useState([{
        ot_profile_img: '',
        ot_job: '',
        ot_name: '',
        ot_email: '',
        ot_phone_one: '',
        ot_phone_two: '',
        ot_phone_three: '',
        ot_info: '',
        ot_address: {
           po_box: '',
           street: '',
           sub: '',
           country: ''
        },
        website: '',

    }]);

    // GET Our Team Data from api/ourteam
    useEffect(() => {
        axios.get('/api/ourteam').then(res => {
            console.log(res.data);
            setOurteam(res.data);
        });
    }, [])

    return (
        <Fragment>
            <div className="contact_our_team_main">
                <h1>Contact A Team Member </h1>

                <div className="meet_our_team">
                        { ourteam.map(( _ourteam, index)=> {
                             return (
                                 <Fragment>

                                <div className="card_a" style={{margin:'4px 4px'}}>
                                <Card className={classes.card}>
                                        <CardActionArea>

                                             <Typography gutterBottom variant="h6" component="h3"   className={classes.media}>
                                                    {_ourteam.ot_name}
                                                    <Typography variant="body2" color="textSecondary" component="p" >
                                                     {_ourteam.ot_job }


                                            </Typography>
                                            </Typography>

                                        </CardActionArea>

                                        {/* <CardActions>
                                            <Button size="small" color="primary">
                                            Share
                                            </Button>
                                            <Button size="small" color="primary">
                                            Learn More
                                            </Button>
                                        </CardActions> */}
                                    </Card>
                                    <Card className={classes.card_Sec}>
                                        <CardActionArea>


                                            <Typography variant="body2" color="textSecondary" component="p" >
                                                     <strong>Phone/Mobile</strong> <br/>
                                                      {_ourteam.ot_phone_one}<br/>
                                                      {_ourteam.ot_phone_two}<br/>
                                                      {_ourteam.ot_phone_three}<br/>

                                                      <br/>
                                                      <strong>Address</strong><br/>

                                                      {_ourteam.ot_address.po_box}<br/>
                                                      {_ourteam.ot_address.street}<br/>
                                                      {_ourteam.ot_address.sub}<br/>
                                                      {_ourteam.ot_address.country}<br/><br/>

                                                      <strong>Email</strong><br/>

                                                        {_ourteam.ot_email}<br/><br/>

                                                      <strong>Website</strong><br/>
                                                        {_ourteam.website}

                                                     {/* contact@nkwgroup.com.pgsfsfdfdfddfdf */}

                                            </Typography>

                                        </CardActionArea>

                                        {/* <CardActions>
                                            <Button size="small" color="primary">
                                            Share
                                            </Button>
                                            <Button size="small" color="primary">
                                            Learn More
                                            </Button>
                                        </CardActions> */}
                                    </Card>
                                </div>
                                

                                </Fragment>

                             )
                        })}

                    </div>

            </div>
        </Fragment>

    )
}




export default ContactOurTeam;