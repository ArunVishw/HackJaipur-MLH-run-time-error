import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import './style.css';

class Home extends Component {
    render() {
        return (
            <div class="container login-container">
                <div class="row">
                    <Login />
                    <Register />
                </div>                
            </div>
        );
    }
}

export default Home
