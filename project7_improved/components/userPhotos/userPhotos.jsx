import React from 'react';

import { HashRouter as Router, Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Box, Paper, Typography, Divider, Button, TextField } from '@material-ui/core';
import { Dialog, DialogActions } from '@material-ui/core';

import axios from 'axios';
import './userPhotos.css';
import { useState } from 'react';


function Comment(props) {

  const [comment, setComment] = useState('');

  let { open, onClose, photoId, fileName } = props;

  const sendComment = () => {
    let url = '/commentsOfPhoto/:' + photoId;
    let message = {
      comment: comment,
      photo_id: photoId,
    };
    axios.post(url, message)
      .then(res => {
        console.log('comment successful');
        onClose();
      })
      .catch(res => {
        console.log('comment failed');
      });
  }

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  }

  return (
    <Dialog open={open} onClose={onClose} >
      <Paper style={{ width: 500, height: 400, padding: 3 }}>
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia component={'img'} image={'images/' + fileName}
            style={{ width: '100%', height: 200 }} />
          <TextField
            type={'text'}
            onChange={handleCommentInput}
            minRows='5'
            fullWidth
            multiline
          />
        </Card>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={onClose} >
            Quit
          </Button>
          <Button onClick={sendComment} >
            Add
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      photo: [],
      open: false,
      photoId: [],
      fileName: [],
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let userId = this.props.match.params.userId;
    if (userId !== this.state.userId) {
      this.setState({ userId: userId });
      let url = `/photosOfUser/${userId}`;
      axios.get(url)
        .then(response => {
          this.setState({ photo: response.data });
          axios.get(`/user/${userId}`).then(res => {
            this.props.changeView('Photo of', res.data.last_name);
          })
        });
    }
  }

  openDialog = (e, photoId, fileName) => {
    this.setState({ open: true, photoId: photoId, fileName: fileName });
  }

  closeDialog = (e) => {
    this.setState({ open: false });
  }

  cardOfComment = (photo) => {
    return (
      photo.comments ?
        photo.comments.map((comment) =>
          <Card style={{ width: 300, height: 250 }} variant='outlined' key={comment._id} >
            <CardContent>
              <Typography style={{ color: 'ActiveBorder' }}>
                {((comment) => {
                  let date = new Date(comment.date_time);
                  return date.toLocaleString();
                })(comment)}
              </Typography>
              <Router>
                <Link to={"/users/:" + comment.user._id} style={{ textDecoration: 'None' }} key={comment._id}>
                  <Typography style={{ color: 'violet' }}>
                    {comment.user.first_name + ' ' + comment.user.last_name}
                  </Typography>
                </Link>
              </Router>
              <Divider />
              <Typography variant='body2' style={{ pt: 5 }}>
                {comment.comment}
              </Typography>
            </CardContent>
          </Card>
        )
        :
        null
    );
  }

  listPhotos = () => {
    return (
      this.state.photo.map((photo) => {
        return (
          <Paper style={{ display: 'flex' }} key={photo._id} >
            <Card style={{ width: 300, height: 250 }} variant='outlined'>
              <CardMedia component={'img'} image={'images/' + photo.file_name}
                style={{ width: '100%', height: 200 }} />
              <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' >
                  {((photo) => {
                    let date = new Date(photo.date_time);
                    return date.toLocaleString();
                  })(photo)}
                </Typography>
                <Button
                  size='small'
                  style={{ color: 'ActiveBorder' }}
                  onClick={e => this.openDialog(e, photo._id, photo.file_name)}
                >
                  comment
                </Button>
              </CardActions>
            </Card>
            {this.cardOfComment(photo)}
          </Paper>
        );
      })
    );
  }

  render() {
    return (
      <Box>
        {this.listPhotos()}
        <Comment
          open={this.state.open}
          onClose={this.closeDialog}
          photoId={this.state.photoId}
          fileName={this.state.fileName}
        />
      </Box>
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
<Typography>{photo._id}</Typography>
            <Typography>{photo.date_time}</Typography>
*/