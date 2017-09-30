import React from "react";
import PropTypes from 'prop-types';
import { setData, getData } from "../storage"
import {Link, Switch, Route} from "react-router-dom";
import {Container, Menu} from 'semantic-ui-react';
import {
    BALANCE,
    INCOME,
    EXPENSES,
    TRANSACTIONS,
    TRANSACTION_TYPES,
    DEFAULT_TRANSACTION_TYPE,
    DEFAULT_CURRENCY
} from "./constants/Contstants";

import Transactions from "./transactions/Transactions";
import Categories from "./categories/Categories";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            [DEFAULT_TRANSACTION_TYPE]: INCOME,
            [BALANCE]: 0,
            [INCOME]: [],
            [EXPENSES]: [],
            [TRANSACTIONS]: [],
            [TRANSACTION_TYPES]: [
                {
                    key: 0,
                    value: INCOME,
                    text: "Income",
                },
                {
                    key: 1,
                    value: EXPENSES,
                    text: "Expenses",
                }
            ],
        };
    }

    getChildContext() {
        return {
            [BALANCE]: this.state[BALANCE],
            [TRANSACTIONS]: this.state[TRANSACTIONS],
            [EXPENSES]: this.state[EXPENSES],
            [INCOME]: this.state[INCOME],
            [TRANSACTION_TYPES]: this.state[TRANSACTION_TYPES],
            [DEFAULT_TRANSACTION_TYPE]: this.state[DEFAULT_TRANSACTION_TYPE],
            updateContext: this.updateContext.bind(this)
        }
    }

    componentDidUpdate() {
        setData("data", this.state);
    }

    componentWillMount() {
        this.setState({
            ...this.state,
            ...data
        })
    }

    updateContext(contextName, contextValue) {
        this.setState({
            [contextName]: contextValue
        })
    }

    render() {
        return (
            <Container>
                <Menu pointing>
                    <Menu.Item header>Кошелек: {this.state[BALANCE]} {DEFAULT_CURRENCY}</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Link to="/">Main</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/categories">Categories</Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <div className="main-content">
                    <Switch>
                        <Route exact path="/" component={Transactions}/>
                        <Route path="/categories" component={Categories}/>
                    </Switch>
                </div>
            </Container>
        )
    }
}

const data = getData("data");

App.childContextTypes = {
    [BALANCE]: PropTypes.number,
    [TRANSACTIONS]: PropTypes.array,
    [EXPENSES]: PropTypes.array,
    [INCOME]: PropTypes.array,
    [TRANSACTION_TYPES]: PropTypes.array,
    [DEFAULT_TRANSACTION_TYPE]: PropTypes.string,
    updateContext: PropTypes.func
};

export default App;
