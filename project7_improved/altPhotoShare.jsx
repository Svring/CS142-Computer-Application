import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    HashRouter, Redirect, Route, Switch
} from 'react-router-dom';
import {
    Grid, Paper
} from '@material-ui/core';
import './styles/main.css';

import AltLoginRegister from './components/loginRegister/altLoginRegister';
import AltTopBar from './components/topBar/altTopBar';
import AltUserDetail from './components/userDetail/altUserDetail';
import AltUserList from './components/userList/altUserList';
import AltUserPhotos from './components/userPhotos/altUserPhotos';

function AltPhotoShare() {
    const [view, setView] = React.useState('Home');
    const [currentUser, setCurrentUser] = React.useState(undefined);
    const [loggedIn, setLoggedIn] = React.useState(false);

    function changeView(newView, name) {
        setView(newView + ' ' + name);
    }

    function changeLoggedIn(user, loggedIn) {
        setCurrentUser(user);
        setLoggedIn(loggedIn);
    }

    return (
        <HashRouter>
            <div>
                {view}
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <AltTopBar
                            view={view}
                            current_user={currentUser}
                            logged_in={loggedIn}
                            changeLoggedIn={changeLoggedIn}
                        />
                    </Grid>
                    <div className="cs142-main-topbar-buffer" />
                    <Grid item sm={3}>
                        <Paper className="cs142-main-grid-item">
                            <AltUserList logged_in={loggedIn} />
                        </Paper>
                    </Grid>
                    <Grid item sm={9}>
                        <Paper className="cs142-main-grid-item">
                            <Switch>
                                <Route path="/loginregister"
                                    render={props => <AltLoginRegister {...props} changeLoggedIn={changeLoggedIn} changeView={changeView} />}
                                />
                                {loggedIn ?
                                    <Route path="/users/:userId"
                                        render={props => <AltUserDetail {...props} changeView={changeView} />}
                                    /> :
                                    <Redirect path='/users/:userId' to='/loginregister' />
                                }
                                {loggedIn ?
                                    <Route path="/photos/:userId"
                                        render={props => <AltUserPhotos {...props} changeView={changeView} />}
                                    /> :
                                    <Redirect path='/photos/:userId' to='/loginregister' />
                                }
                                <Route path="/users" component={AltUserList} />
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </HashRouter>
    );
}

const photoshareapp = document.getElementById('photoshareapp');
const root = ReactDOM.createRoot(photoshareapp);
root.render(<AltPhotoShare />);
