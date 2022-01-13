import React, { Component } from 'react';

export default class DebitCard extends Component
{
    render()
    {
        return (
            <section className="debit-card">
                <h3 className="debit-description">{this.props.description}</h3>
                <ul className="debit-details">
                    <li>Amount: {this.props.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}</li>
                    <li>Date: {this.props.date}</li>
                </ul>
            </section>
        );
    }
}