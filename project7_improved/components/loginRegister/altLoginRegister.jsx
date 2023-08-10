import React from 'react';
import {
    Typography, Paper, Button, TextField,
    Dialog, DialogTitle, Snackbar
} from '@material-ui/core';
import axios from 'axios';

export default function AltLoginRegister(props) {
    const [dialog, setDialog] = React.useState(false);
    const [on, setOn] = React.useState(false);
    const [formData, setFormData] = React.useState({});

    React.useEffect(() => {
        props.changeView('Please', 'login');
        console.log('AltLoginRegister mounted');
    }, []);

    function handleInput(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const url = '/admin/login';

        axios.post(url, formData)
            .then(res => {
                const user = res.data;
                props.changeLoggedIn(user, true);
                window.location.href = `#/users/:${user._id}`;
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleRegister(e) {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setOn(true);
            return;
        }

        const url = '/user';
        axios.post(url, formData)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                open={on}
                autoHideDuration={3000}
                onClose={() => setOn(false)}
                message={'The two message do not match'} />
            <Typography style={{ color: 'hotpink' }}> Welcome to login </Typography>
            <form className='login_form' onSubmit={handleSubmit} style={{
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
                    defaultValue={formData.login_name}
                    onChange={handleInput} />
                <TextField
                    id="password"
                    name='password'
                    className='password'
                    label="password"
                    type="password"
                    helperText="Enter your password"
                    onChange={handleInput} />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button type='button' color='primary' onClick={() => setDialog(true)}>
                        Register
                    </Button>
                    <Button type="submit" color='primary' className="login">
                        Log in
                    </Button>
                </div>
            </form>
            <Dialog open={dialog} onClose={() => setDialog(false)}>
                <DialogTitle>Register</DialogTitle>
                <Paper style={{ margin: 'auto', }}>
                    <form onSubmit={handleRegister}
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
                            onChange={handleInput} />
                        <TextField
                            name='last_name'
                            label='last name'
                            type={'text'}
                            helperText="what's your last name?"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <TextField
                            name='location'
                            label='location'
                            type={'text'}
                            helperText="where you live?"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <TextField
                            name='description'
                            label='description'
                            type={'text'}
                            helperText="about yourself"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <TextField
                            name='occupation'
                            label='occupation'
                            type={'text'}
                            helperText="about your job"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <TextField
                            name='login_name'
                            label='login_name'
                            type={'text'}
                            helperText="which avatar name do you prefer?"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <TextField
                            name='password'
                            label='password'
                            type={'password'}
                            helperText="Enter your password"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <TextField
                            name='repeat_password'
                            label='repeat password'
                            type={'password'}
                            helperText="repeat your password"
                            style={{ width: '80%' }}
                            onChange={handleInput} />
                        <Button type='submit'>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Dialog>
        </Paper>
    );

}