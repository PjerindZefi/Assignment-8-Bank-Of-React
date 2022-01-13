import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import AccountBalance from '../AccountBalance';
import DebitCard from './DebitCard';

export default class Debits extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = props.addDebitHandler.bind(this.handleSubmit);
    }

    render()
    {
        return (
            <div>
                <h1>Debits</h1>
                <fieldset>
                    <legend>Options</legend>

                    <Link to="/userProfile"><button>My Profile</button></Link>
                    <Link to="/credits"><button>View Credits</button></Link>
                    <Link to="/"><button>Logout</button></Link>
                </fieldset><br/>

                <AccountBalance accountBalance={this.props.accountBalance} /><br/>
                
                <fieldset>
                    <legend>Add New Debit</legend>
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
                

                <section className="debit-card-grid">
                    {this.generateDebitCards(this.props.data)}
                </section>
            </div>
        );
    }

    generateDebitCards(data)
    {
        let cards = [];

        data.forEach((element, index) =>
        {
            const description = element.description;
            const amount = element.amount;
            const id = element.id;
            const date = element.date;

            cards.push(<DebitCard 
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