import React from 'react';
import { Typography, Paper, Button, TextField, } from '@material-ui/core';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_name: '',
            password: '',
        };
    };

    handleSubmit = e => {
        const url = '/admin/login';

        axios.post(url, this.state)
            .then(res => { 
                const user = res.data;
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
                    <Button type="submit" color='primary' className="form_button">
                        Log in
                    </Button>
                </form>
            </Paper>
        );
    };
}

export default LoginRegister;