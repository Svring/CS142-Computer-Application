import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Redirect, Route, Switch
} from 'react-router-dom';
import {
  Grid, Paper
} from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Home",
      current_user: undefined,
      logged_in: false,
    }
    this.changeView = this.changeView.bind(this);
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
  }

  changeView = (newView, name) => {
    this.setState({ view: newView + ' ' + name });
  }

  changeLoggedIn = (user, stat) => {
    this.setState({ current_user: user, logged_in:  stat });
  }

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TopBar 
            view={this.state.view} 
            current_user={this.state.current_user} 
            logged_in={this.state.logged_in}
            changeLoggedIn={this.changeLoggedIn} 
          />
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
          <Grid item sm={3}>
            <Paper className="cs142-main-grid-item">
              <UserList logged_in={this.state.logged_in} />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="cs142-main-grid-item">
              <Switch>
                <Route path="/loginregister"
                  render={ props => <LoginRegister {...props} changeLoggedIn={this.changeLoggedIn} changeView={this.changeView} />}
                />
                { this.state.logged_in ?
                <Route path="/users/:userId"
                  render={ props => <UserDetail {...props} changeView={this.changeView} /> }
                /> :
                <Redirect path='/users/:userId' to='/loginregister' />
                }
                { this.state.logged_in ?
                <Route path="/photos/:userId"
                  render ={ props => <UserPhotos {...props} changeView={this.changeView}/> }
                /> :
                <Redirect path='/photos/:userId' to='/loginregister' />
                }
                <Route path="/users" component={UserList} />
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);

/*
<Route exact path="/"
                render={() => (
                <Typography variant="body1">
                  Welcome to your photosharing app! This <a href="https://mui.com/components/paper/">Paper</a> component
                  displays the main content of the application. The {"sm={9}"} prop in
                  the <a href="https://mui.com/components/grid/">Grid</a> item component makes it responsively
                  display 9/12 of the window. The Switch component enables us to conditionally render different
                  components to this part of the screen. You don&apos;t need to display anything here on the homepage,
                  so you should delete this Route component once you get started.
                </Typography>
                )}
              />
*/