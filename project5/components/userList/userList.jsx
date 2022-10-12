import React from 'react';
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Typography,
}
from '@material-ui/core';
import './userList.css';

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
      this.state.users.map((user) => {
        <div className={user._id}>
          <ListItem divider={true} key={user._id}>
            <Link to={"/users/" + user._id}>
              <ListItemText>
                {this.getFullName(user)}
              </ListItemText>
            </Link>
          </ListItem>
          <Divider/>
        </div>
      })
    );
  }

  render() {
    return (
      <div>
        <Breadcrumbs>
          <List component='nav'>
            {this.listUsers()}
          </List>
        </Breadcrumbs>
        <Typography>
          {this.listUsers()}
        </Typography>
      </div>
    );
  }
}

export default UserList;
