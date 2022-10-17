import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Grid
} from '@material-ui/core';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData';

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
      fetchModel("http://localhost:3000/test/info")
      .then(response => this.setState({version: response.data.__v}));
    }
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
              {this.state.view}
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