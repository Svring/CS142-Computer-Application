import React from 'react';
import { Typography, Paper, Button, Input } from '@material-ui/core';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_name: '',
            password: '',
        };
    };

    handleInput = e => {

    };

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
                <Typography> Welcome to login </Typography>
                <form className='login_form' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width: '300px',
                    height: '300px',
                }}>
                    <Input
                        id="email"
                        formControlProps={{
                        fullWidth: true
                        }}
                        handleChange={this.handleInput}
                        type="text"
                    />
                    <Input
                        id="password"
                        formControlProps={{
                        fullWidth: true
                        }}
                        handleChange={this.handleInput}
                        type="password"
                    />
                    <Button type="button" color="primary" className="form_button">
                        Log in
                    </Button>
                </form>
            </Paper>
        );
    };
}

export default LoginRegister;