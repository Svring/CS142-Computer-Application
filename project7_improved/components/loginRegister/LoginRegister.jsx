import React from 'react';
import { Typography, Paper, Button, TextField,
Dialog, DialogTitle, Snackbar
} from '@material-ui/core';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            on: false,
        };
    };

    componentDidMount() {
        this.props.changeView('Please', 'login');
    }

    handleSubmit = e => {
        const url = '/admin/login';

        axios.post(url, this.state)
            .then(res => {
                const user = res.data;
                this.props.changeLoggedIn(user, true);
                window.location.href = `#/users/:${user._id}`;
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    openDialog = () => {
        this.setState({ dialog: true });
    }

    closeDialog = () => {
        this.setState({ dialog: false });
    }

    handleClose = () => {
        this.setState({ on: false });
    }

    handleRegister = () => {
        if ( this.state.password !== this.state.repeat_password ) {
            this.setState({ on: true });
            return;
        }

        const url = '/user';
        axios.post(url, this.state)
            .then( res => {
                console.log(res);
                window.location.reload();
            })
            .catch( err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Paper className='login_paper' style={{
                display: 'flex',
                margin: 'auto',
                maxWidth: '100%',
                flexGrow: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Snackbar 
                    open={this.state.on} 
                    autoHideDuration={3000} 
                    onClose={this.handleClose} 
                    message={'The two message do not match'}
                />
                <Typography style={{ color: 'hotpink' }}> Welcome to login </Typography>
                <form className='login_form' onSubmit={this.handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width: '300px',
                    height: '300px',
                }}>
                    <TextField
                        id="login_name"
                        name='login_name'
                        className='login_name'
                        label="login name"
                        type="text"
                        helperText="Enter your login name"
                        onChange={this.handleInput}
                    />
                    <TextField
                        id="password"
                        name='password'
                        className='password'
                        label="password"
                        type="password"
                        helperText="Enter your password"
                        onChange={this.handleInput}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button type='button' color='primary' onClick={this.openDialog} >
                            Register
                        </Button>
                        <Button type="submit" color='primary' className="login">
                            Log in
                        </Button>
                    </div>
                </form>
                <Dialog open={this.state.dialog} onClose={this.closeDialog} >
                    <DialogTitle>Register</DialogTitle>
                    <Paper style={{ margin: 'auto', }} >
                        <form onSubmit={this.handleRegister} 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                gap: 3,
                                width: '500px',
                                height: '650px',
                            }}
                        >
                            <TextField 
                                name='first_name'
                                label='first name' 
                                type={'text'}
                                helperText="what's your first name?"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='last_name'
                                label='last name' 
                                type={'text'}
                                helperText="what's your last name?"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='location'
                                label='location' 
                                type={'text'}
                                helperText="where you live?"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='description'
                                label='description' 
                                type={'text'}
                                helperText="about yourself"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='occupation'
                                label='occupation' 
                                type={'text'}
                                helperText="about your job"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='login_name'
                                label='login_name' 
                                type={'text'}
                                helperText="which avatar name do you prefer?"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='password'
                                label='password' 
                                type={'password'}
                                helperText="Enter your password"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <TextField 
                                name='repeat_password'
                                label='repeat password' 
                                type={'password'}
                                helperText="repeat your password"
                                style={{ width: '80%' }}
                                onChange={this.handleInput}
                            />
                            <Button type='submit' >
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Dialog>
            </Paper>
        );
    };
}

export default LoginRegister;