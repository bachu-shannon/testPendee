import React, {PropTypes} from "react";
import {Link, Switch, Route} from "react-router-dom";
import {Container, Menu} from 'semantic-ui-react';
import {
    BALANCE,
    INCOME,
    EXPENSES,
    TRANSACTIONS,
    TRANSACTION_TYPES,
    DEFAULT_TRANSACTION_TYPE
} from "./constants/Contstants";

import Home from "./Home";
import Categories from "./categories/Categories";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            [DEFAULT_TRANSACTION_TYPE]: INCOME,
            [BALANCE]: 0,
            [INCOME]: [],
            [EXPENSES]: [],
            [TRANSACTIONS]: [
                {
                    name: "test",
                    categoryType: "income",
                    date: "27.09.2017",
                    note: 'asdasdasdasdas',
                    price: 3000 + "UAH",
                    color: "green"
                }
            ],
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
        localStorage.setItem(INCOME, JSON.stringify(this.state[INCOME] || []));
        localStorage.setItem(EXPENSES, JSON.stringify(this.state[EXPENSES] || []));
    }

    componentWillMount() {
        this.setState({
            [INCOME]: JSON.parse(localStorage.getItem(INCOME)) || [],
            [EXPENSES]: JSON.parse(localStorage.getItem(EXPENSES)) || []
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
                    <Menu.Item header>Кошелек: {this.state.balance} UAH</Menu.Item>
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
                        <Route exact path="/" component={Home}/>
                        <Route path="/categories" component={Categories}/>
                    </Switch>
                </div>
            </Container>
        )
    }
}

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
