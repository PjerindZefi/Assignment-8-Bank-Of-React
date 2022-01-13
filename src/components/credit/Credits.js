import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import AccountBalance from '../AccountBalance';
import CreditCard from './CreditCard';

export default class Credits extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = props.addCreditHandler.bind(this.handleSubmit);
    }

    render()
    {
        return (
            <div className="containe">
                <h1>Credits</h1>
                <fieldset>
                    <legend>Options</legend>

                    <Link to="/userProfile"><button>My Profile</button></Link>
                    <Link to="/debits"><button>View Debits</button></Link>
                    <Link to="/"><button>Logout</button></Link>
                </fieldset><br/>

                <AccountBalance accountBalance={this.props.accountBalance} /><br/>

                <fieldset className="container">
                    <legend>Add New Credit</legend>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" placeholder="Item Name" required />
                        <br/>
                        <label htmlFor="amount">Amount (in USD): </label>
                        <input type="number" min="0" step="0.01" name="amount" placeholder="9.99" required />
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                </fieldset>

                <section className="credit-card-grid">
                    {this.generateCreditCards(this.props.data)}
                </section>
            </div>
        );
    }

    generateCreditCards(data)
    {
        let cards = [];

        data.forEach((element, index) =>
        {
            const description = element.description;
            const amount = element.amount;
            const id = element.id;
            const date = element.date;

            cards.push(<CreditCard 
                key={index.toString()}
                description={description}
                amount={amount}
                id={id}
                date={date}
            />);
        })

        return cards;
    }
}