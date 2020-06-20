import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div class="col-md-6 login-form">
                <h3>Login</h3>
                <form method="POST" action="/admin/login" >
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Email *" name="email" required="true" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Your Password *" name="password" required="true" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" name="Login" />
                    </div>
                </form>
            </div>
        );
    }
}
