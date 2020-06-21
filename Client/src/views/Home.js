import React, { Component } from 'react';
import Login from '../components/home/Login';
import Register from '../components/home/Register';
import '../shards-dashboard/styles/style.css';

class Home extends Component {
    render() {
        return (
            <div className="container login-container">
                <div className="row">
                    <Login />
                    <Register />
                </div>                
            </div>
        );
    }
}

export default Home
