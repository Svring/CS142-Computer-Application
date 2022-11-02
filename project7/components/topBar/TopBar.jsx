import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Grid
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
      version: [],
    }
  }

  componentDidUpdate() {
    if (this.state.view !== this.props.view) {
      this.setState({view: this.props.view});
      axios.get("http://localhost:3000/test/info")
      .then(response => this.setState({version: response.data.__v}));
    }
  }

  logout() {
    axios.post('/admin/logout', {}).then(res => { console.log(res.data); });
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
              <Link to={'/loginregister'} style={{ textDecoration: 'none' }}>
                <Button style={{ color: 'cyan' }}>
                  Login
                </Button>
              </Link>
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