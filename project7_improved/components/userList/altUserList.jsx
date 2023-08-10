import React from 'react';
import {
    List, ListItem, ListItemText, Button,
} from '@material-ui/core';
import './userList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AltUserList(props) {
    const [users, setUsers] = React.useState([]);
    const logged_in = props.logged_in;

    React.useEffect(() => {
        let url = '/user/list';

        if (logged_in) {
            axios.get(url)
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => {
                console.log(`Error fetching users: ${err}`);
            });
        } else {
            console.log('Not logged in, no users fetched');
            return;
        }

    }, [logged_in]);

    function listUsers() {
        return (
            users.map(user =>
                <ListItem divider={true} key={user._id}>
                    <Link to={`/users/:${user._id}`} style={{ textDecoration: 'none' }}>
                        <Button style={{ textTransform: 'capitalize' }}>
                            <ListItemText style={{ color: 'violet' }}>
                                {user.first_name + ' ' + user.last_name}
                            </ListItemText>
                        </Button>
                    </Link>
                </ListItem>
            )
        );
    }

    return (
        <List component='nav'>
            {listUsers()}
        </List>
    );
}