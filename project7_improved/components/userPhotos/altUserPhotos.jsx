import React from 'react';

import { HashRouter as Router, Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Box, Paper, Typography, Divider, Button, TextField } from '@material-ui/core';
import { Dialog, DialogActions } from '@material-ui/core';

import axios from 'axios';
import './userPhotos.css';
import { useState } from 'react';

// refactored code from original component, though I don't really understand
// what I've done in the original one and why the refactored one is working

export default function AltUserPhotos(props) {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [commentOpen, setCommentOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const userId = props.match.params.userId;

    React.useEffect(() => {
        let url = `/photosOfUser/${userId}`;
        axios.get(url)
            .then(response => {
                setPhotos(response.data);
                axios.get(`/user/${userId}`).then(res => {
                    props.changeView('Photo of', res.data.last_name);
                })
            })
            .catch(err => {
                console.log(`${err} at AltUserPhotos`);
                return;
            });
    }, [userId]);

    function closeDialog() {
        setCommentOpen(false);
    }

    function cardOfComment(photo) {
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

    function lisOfPhotos() {
        return (
            photos.map((photo) => {
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
                                    onClick={() => {
                                        setSelectedPhoto(photo._id);
                                        setCommentOpen(true);
                                        setFileName(photo.file_name);
                                    }}
                                >
                                    comment
                                </Button>
                            </CardActions>
                        </Card>
                        {cardOfComment(photo)}
                    </Paper>
                );
            })
        );
    }

    return (
        <Box>
            {lisOfPhotos()}
            <Comment
                open={commentOpen}
                onClose={closeDialog}
                photoId={selectedPhoto}
                fileName={fileName}
            />
        </Box>
    );
}

function Comment(props) {
    const [comment, setComment] = useState('');

    const { open, onClose, photoId, fileName } = props;

    function sendComment() {
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

    function handleCommentInput(e) {
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
