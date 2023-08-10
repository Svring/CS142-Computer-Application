import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './userDetail.css';

import axios from 'axios';

export default function AltUserDetail(props) {
    const [user, setUser] = React.useState({});
    const userId = props.match.params.userId;

    React.useEffect(() => {
        let isCancelled = false;
        
        if (userId) {
            axios.get(`/user/${userId}`)
                .then(response => {
                    if (!isCancelled) {
                        const newUser = response.data;
                        setUser(newUser);
                        props.changeView('Here is', newUser.last_name);
                    }
                })
                .catch((err) => {
                    if (!isCancelled) {
                        console.log(`${err} at UserDetail.DidUpdate`);
                    }
                });
        } else {
            console.error('userId do not exit!');
            return;
        }

        return () => {
            isCancelled = true;
        };
    }, [userId, setUser]);

    return (
        <Router>
            <Box className="user-detail" sx={{}}>
                <Paper style={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: '100%',
                    flexGrow: 1,
                    minHeight: 100,
                    marginTop: 20,
                }}
                >
                    <Grid container spacing={2} wrap='nowrap' alignItems='center'>
                        <Grid item>
                            <Link to={"/photos/:" + user._id} style={{ textDecoration: 'None' }}>
                                <Button style={{ width: 128, height: 128, color: 'Highlight' }}>Photos</Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Grid container direction='column' spacing={1}>
                                <Grid item>
                                    <Typography style={{ color: 'chocolate' }}>
                                        {user.first_name + " " + user.last_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ color: "pink" }}>
                                        {'Location: ' + user.location}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ color: 'coral' }}>
                                        {'Occupation: ' + user.occupation}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ color: 'brown' }}>
                                        {'Description: ' + user.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Router>
    );

}