import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Grid, Paper
} from '@material-ui/core';
import {
  Dialog, DialogActions
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
      current_user: this.props.current_user,
      logged_in: this.props.logged_in,
      version: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      this.setState({view: this.props.view, current_user: this.props.current_user, logged_in: this.props.logged_in });
      axios.get("http://localhost:3000/test/info")
      .then(response => this.setState({version: response.data.__v}));
    }
  }

  logout = () => {
    axios.post('/admin/logout', {})
      .then(res => {
        console.log(res.data);
        this.props.changeLoggedIn(undefined, false);
        window.location.href = '#/loginregister';
        window.location.reload();
      });
  }

  uploadPhoto = () => {

  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Grid container
            style={{margin: 20, justifyContent: 'space-between'}}
          >
            <Grid item>
              <Typography variant="h6" style={{color: 'cyan'}}>
                Linkling
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" style={{color: 'violet'}}>
                {this.state.view}
              </Typography>
            </Grid>
            <Grid item style={{ display: 'flex', gap: 3 }}>
              { !this.state.logged_in ?
              <Link to={'/loginregister'} style={{ textDecoration: 'none' }}>
                <Button style={{ color: 'cyan' }}>
                  Login
                </Button>
              </Link> :
              <Typography variant='h6' style={{color: 'cyan' }}>
                {this.state.current_user.first_name}
              </Typography>
              }
              {
                this.state.logged_in ?
                <Button onClick={this.uploadPhoto} style={{ color: 'violet' }} >
                  Upload
                </Button> :
                null
              }
              <Button onClick={this.logout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;

/*
<AppBar className="cs142-topbar-appBar" position="absolute">
  <Toolbar>
    <Typography variant="h6" color="inherit" component='div' sx={{ flexGrow: 1 }}>
      linkling
    </Typography>
    <Typography>
      hello
    </Typography>
  </Toolbar>
</AppBar>
        */