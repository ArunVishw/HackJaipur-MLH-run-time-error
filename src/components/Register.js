import React, { Component } from 'react';

export default class Register extends Component {
    render() {
        return (
            <div className="col-md-6 register-form">
                <h3>Register</h3>
                <form method="POST" action="/admin/register">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Name *" name="name" required="{true}" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Organization *" name="organization" required="{true}" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Email *" name="email" required="{true}" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Your Password *" name="password" required="{true}" />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" name="Register" />
                    </div>
                </form>
            </div>
        );
    }
}
