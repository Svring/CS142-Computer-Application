import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
}
from '@material-ui/core';
import './userList.css';
import { Link } from 'react-router-dom';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.setState({users: window.cs142models.userListModel()});
  }

  getFullName = (user) => {
    return user.first_name + ' ' + user.last_name;
  }

  listUsers = () => {
    return (
      this.state.users.map((user) => 
          <ListItem divider={true} key={user._id}>
            <Link to={'/users/:' + user._id} style={{ textDecoration: 'none' }}>
              <Button style={{textTransform: 'capitalize'}}>
                <ListItemText style={{color: 'violet'}}>
                  {this.getFullName(user)}
                </ListItemText>
              </Button>
            </Link>
          </ListItem>
      )
    );
  }

  render() {
    return (
      <div>
          <List component='nav'>
            {this.listUsers()}
          </List>
      </div>
    );
  }
}

export default UserList;
