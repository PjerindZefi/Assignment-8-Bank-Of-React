import React, {Component} from 'react';

// here it will displays the user's account balance

export default class AccountBalance extends Component
{
    render()
    {
        return (
            <div>
                Balance: {this.props.accountBalance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
        );
    }
}