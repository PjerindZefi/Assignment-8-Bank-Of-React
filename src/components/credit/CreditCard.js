import React, { Component } from 'react';

export default class CreditCard extends Component
{
    render()
    {
        return (
            <section className="credit-card">
                <h3 className="credit-description">{this.props.description}</h3>
                <ul className="credit-details">
                    <li>Amount: {this.props.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}</li>
                    <li>Date: {this.props.date}</li>
                </ul>
            </section>
        );
    }
}