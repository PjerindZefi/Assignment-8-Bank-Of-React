import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import axios from 'axios';
import { v5 as uuidv5 } from 'uuid';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Debits from './components/debit/Debits';
import Credits from './components/credit/Credits';

//all the routes will connect here

export default class App extends Component 
{
    constructor()
    {
        super();
        this.state =
        {
            currentUser:
            {
                username: 'bob_loblaw',
                memberSince: '08/23/99',
            },
            debitData: [],
            creditData: [],
            totalDebit: -1,
            totalCredit: -1
        }
    }

    componentDidMount()
    {
        this.fetchDebitData();
        this.fetchCreditData();
    }

    fetchDebitData()
    {
        const debitUrl = "https://moj-api.herokuapp.com/debits";

        axios.get(debitUrl)
        .then((response) =>
        {
            const debitData = response.data;

            this.setState({ debitData });
            this.setState({ totalDebit: this.calculateTotalAmount(debitData) });
        })
        .catch((error) =>
        {
            console.log(error);
            this.setState({ debitData: [] });
        })
    }

    fetchCreditData()
    {
        const creditUrl = "https://moj-api.herokuapp.com/credits";

        axios.get(creditUrl)
        .then((response) =>
        {
            const creditData = response.data;

            this.setState({ creditData });
            this.setState({ totalCredit: this.calculateTotalAmount(creditData) });
        })
        .catch((error) =>
        {
            console.log(error);
            this.setState({ creditData: [] });
        })
    }

    calculateTotalAmount(data)
    {
        return data.reduce((sum, current) =>
        {
            sum += current.amount;
            return sum;
        }, 0);
    }

    mockLogin = (loginInfo) =>
    {
        const newUser = {...this.state.currentUser};
        newUser.username = loginInfo.username;
        this.setState({ currentUser: newUser });
    }

    handleAddDebit = (event) =>
    {
        //prevent browser refresh
        event.preventDefault();

        const debitDescription = event.target.description.value;
        const debitAmount = event.target.amount.value;
        const date = new Date().toISOString();
        const id = uuidv5(date, 'addcd184-a939-11ea-a852-0f0463844a38');

        let newDebit = 
        {
            id: id,
            description: debitDescription,
            amount: Number(debitAmount),
            date: date
        }
        let newDebitData = new Array(...this.state.debitData, newDebit);
        this.setState({ debitData: newDebitData });
        this.setState({ totalDebit: this.calculateTotalAmount(newDebitData) });

        event.target.reset();
    }

    handleAddCredit = (event) =>
    {
        
        event.preventDefault();

        const debitDescription = event.target.description.value;
        const debitAmount = event.target.amount.value;
        const date = new Date().toISOString();
        const id = uuidv5(date, 'addcd184-a939-11ea-a852-0f0463844a38');

        let newCredit =
        {
            id: id,
            description: debitDescription,
            amount: Number(debitAmount),
            date: date
        }
        let newCreditData = new Array(...this.state.creditData, newCredit);
        this.setState({ creditData: newCreditData });
        this.setState({ totalCredit: this.calculateTotalAmount(newCreditData) });

        event.target.reset();
    }

    render()
    {
        const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
        const UserProfileComponent = () => 
        (<UserProfile username={this.state.currentUser.username} memberSince={this.state.currentUser.memberSince} />);
        const LoginComponent = () => (<Login user={this.state.currentUser} mockLogin={this.mockLogin} {...this.props} />);

        const DebitComponent = () => 
        (
            <Debits 
                data={this.state.debitData} 
                accountBalance={this.state.totalCredit - this.state.totalDebit} 
                addDebitHandler={this.handleAddDebit}
            />
        );
        const CreditComponent = () => 
        (
            <Credits 
                data={this.state.creditData} 
                accountBalance={this.state.totalCredit - this.state.totalDebit} 
                addCreditHandler={this.handleAddCredit}
            />
        );

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Switch>
                            <Route exact path="/" component={HomeComponent} />
                            <Route exact path="/userProfile" render={UserProfileComponent} />
                            <Route exact path="/login" render={LoginComponent} />
                            <Route exact path="/debits" render={DebitComponent} />
                            <Route exact path="/credits" render={CreditComponent} />
                        </Switch>
                    </header>
                </div>
            </Router>
        );
    }
}