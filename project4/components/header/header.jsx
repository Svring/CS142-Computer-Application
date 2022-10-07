import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src='./components/header/bili.png' width='1470'/>
            </div>
        );
    }
}

export default Header;