import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div className="col-md-6 login-form">
                <h3>Login</h3>
                <form method="POST" action="/api/admin/login" >
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Email *" name="email" required="{true}" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Your Password *" name="password" required="{true}" />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" name="Login" />
                    </div>
                </form>
            </div>
        );
    }
}
