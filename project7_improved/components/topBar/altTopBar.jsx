import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Grid, Paper, Input
} from '@material-ui/core';
import {
    Dialog, DialogActions, DialogContent, Alert
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios';

export default function AltTopBar(props) {
    const [version, setVersion] = React.useState([]);
    const [dialog, setDialog] = React.useState(false);

    const uploadInputRef = React.useRef(null);

    React.useEffect(() => {
        axios.get("http://localhost:3000/test/info")
            .then(response => setVersion(response.data.__v));
    }, []);

    function logout() {
        axios.post('/admin/logout', {})
            .then(res => {
                console.log(res.data);
                props.changeLoggedIn(undefined, false);
                window.location.href = '#/loginregister';
                window.location.reload();
            });
    }

    function uploadPhoto(e) {
        e.preventDefault();
        if (uploadInputRef.current || uploadInputRef.current.files.length > 0) {
            const domForm = new FormData();
            domForm.append('uploadedphoto', uploadInputRef.current.files[0]);
            axios.post('/photos/new', domForm)
                .then(res => {
                    console.log(res.data);
                    setDialog(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <AppBar className="cs142-topbar-appBar" position="absolute">
            <Toolbar>
                <Grid container
                    style={{ margin: 20, justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography variant="h6" style={{ color: 'cyan' }}>
                            Linkling
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" style={{ color: 'violet' }}>
                            {props.view}
                        </Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', gap: 3 }}>
                        {!props.logged_in ?
                            <Link to={'/loginregister'} style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'cyan' }}>
                                    Login
                                </Button>
                            </Link> :
                            <Typography variant='h6' style={{ color: 'cyan' }}>
                                {props.current_user.first_name}
                            </Typography>
                        }
                        {
                            props.logged_in ?
                                <Button onClick={() => setDialog(true)} style={{ color: 'violet' }} >
                                    Upload
                                </Button> :
                                null
                        }
                        <Button onClick={logout}>
                            Logout
                        </Button>
                        <Typography variant="h6" >
                            Version: {version}
                        </Typography>
                    </Grid>
                    <Dialog open={dialog} onClose={() => setDialog(false)} >
                        <form onSubmit={uploadPhoto} >
                            <DialogContent>
                                <input type={'file'} accept="image/*" ref={uploadInputRef} />
                            </DialogContent>
                            <DialogActions>
                                <Button type='submit' >
                                    upload
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Grid>
            </Toolbar>
        </AppBar>
    );

}