import React, {Component} from 'react';

import { Link } from 'react-router-dom';

//in this page it will display users account

export default class UserProfile extends Component
{
    render()
    {
        return (
            <div className="page-header">
                <fieldset>
                    <legend>User Profile</legend>

                    <div>Username: {this.props.username}</div>
                    <div>Member Since: {this.props.memberSince}</div><br/>

                    <fieldset>
                        <legend>Options</legend>

                        <Link to="/debits"><button>View Debits</button></Link>
                        <Link to="/credits"><button>View Credits</button></Link>
                        <Link to="/"><button>Logout</button></Link>
                    </fieldset>
                </fieldset>
            </div>
        );
    }
}