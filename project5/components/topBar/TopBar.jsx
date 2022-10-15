import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Grid
} from '@material-ui/core';
import './TopBar.css';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      photo: false,
    }
  }

  componentDidUpdate() {

  }

  showInformation = () => {
    return (
      <Typography variant='h6'>

      </Typography>
    )
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
              {this.showInformation()}
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