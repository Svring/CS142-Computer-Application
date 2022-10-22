import React from 'react';
import {HashRouter as Router, Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './userDetail.css';
import fetchModel from '../../lib/fetchModelData';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let userId = this.props.match.params.userId;
    if (userId.slice(1) !== this.state.user._id) {
      let url = `/user/${userId}`;
      fetchModel(url).then(response => this.setState({user: response.data}));
    }
  }

  render() {
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
                <Link to={"/photos/:" + this.state.user._id} style={{textDecoration: 'None'}}>
                  <Button style={{width: 128, height: 128, color: 'Highlight'}}>Photos</Button>
                </Link>
              </Grid>
              <Grid item>
                <Grid container direction='column' spacing={1}>
                  <Grid item>
                    <Typography style={{color: 'chocolate'}}>
                      {this.state.user.first_name + " " + this.state.user.last_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{color: "pink"}}>
                      {'Location: ' + this.state.user.location}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{color: 'coral'}}>
                      {'Occupation: ' + this.state.user.occupation}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{color: 'brown'}}>
                      {'Description: ' + this.state.user.description}
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
}

export default UserDetail;

/*
<Router>
  <Box className="user-detail" sx={{}}>
    <Paper style={{height: 200, display: Grid, }} variant='outlined' elevation={9} >
      <Typography variant='h5'>
        {this.state.user.first_name + " " + this.state.user.last_name}
      </Typography>
      <Typography variant='h6'>
        {'Location: ' + this.state.user.location}
      </Typography>
      <Typography variant='h6'>
        {'Occupation: ' + this.state.user.occupation}
      </Typography>
      <Typography variant='h6'>
        {'Description: ' + this.state.user.description}
      </Typography>
    </Paper>
    <Link to={"/photos/" + this.state.user._id} style={{textDecoration: 'None'}}>
      <Button style={{}}>Photos</Button>
    </Link>
  </Box>
</Router>
*/