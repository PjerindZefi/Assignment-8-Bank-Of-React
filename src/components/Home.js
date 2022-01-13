import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * This component will be the homepage of the app, which will show the app's logo and name, along with
 * a login button that redirects users to the Login page
 */
export default class Home extends Component
{
    render()
    {
        return (
            <div className="page-header">
                <h1>Student: Pjerind Zefi</h1>
                <img src="https://www.freevector.com/uploads/vector/preview/6105/FreeVector-Dollar-Sign.jpg" className="dollar" alt="bank"/>
                <h1>Bank of React</h1>

                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        );
    }
}