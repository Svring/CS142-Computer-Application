import React from 'react';
import {
  Typography
} from '@material-ui/core';
import './userPhotos.css';
import { cs142models } from '../../modelData/photoApp';


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      photo: [],
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let userId = this.props.match.params.userId;
    let photos = cs142models.photoOfUserModel(userId);
    if (userId !== this.state.userId) {
      this.setState({userId: userId});
      this.setState({photo: photos});
    }
  }

  listPhotos = () => {
    this.state.photo.map((photo) => {
      return (
        <div>
          <div>{photo._id}</div>
          <div>{photo.date_time}</div>
          <div>
            <img src={'images/' + photo.file_name} />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.userId}
      </div>
    );
  }
}

export default UserPhotos;

/*
<Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. Since
      it is invoked from React Router the params from the route will be
      in property match. So this should show details of user:
      {this.props.match.params.userId}. You can fetch the model for the user from
      window.cs142models.photoOfUserModel(userId):
        <Typography variant="caption">
          {JSON.stringify(window.cs142models.photoOfUserModel(this.props.match.params.userId))}
        </Typography>
</Typography>
*/