import React, { PropTypes } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Container, Menu } from 'semantic-ui-react';
import { BALANCE, CATEGORIES_INCOME, CATEGORIES_EXPENSES, TRANSACTIONS, TRANSACTION_TYPE } from "./constants/Contstants";

import Home from "./Home";
import Categories from "./categories/Categories";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
            [BALANCE]: 0,
            [CATEGORIES_INCOME]: [],
            [CATEGORIES_EXPENSES]: [],
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
            [TRANSACTION_TYPE]: [
                {
                    key: 0,
                    value: "Income",
                    text: "Income",
                },
                {
                    key: 1,
                    value: "Expenses",
                    text: "Expenses",
                }
            ],
        };
	}

    getChildContext() {
		return {
            [BALANCE]: this.state[BALANCE],
            [TRANSACTIONS]: this.state[TRANSACTIONS],
            [CATEGORIES_EXPENSES]: this.state[CATEGORIES_EXPENSES],
            [TRANSACTION_TYPE]: this.state[TRANSACTION_TYPE],
            updateContext: this.updateContext.bind(this)
		}
	}

    componentDidUpdate() {
        localStorage.setItem(CATEGORIES_INCOME, JSON.stringify(this.state[CATEGORIES_INCOME] || []));
        localStorage.setItem(CATEGORIES_EXPENSES, JSON.stringify(this.state[CATEGORIES_EXPENSES] || []));
    }

    componentWillMount() {
        this.setState({
            [CATEGORIES_INCOME]: JSON.parse(localStorage.getItem(CATEGORIES_INCOME)),
			[CATEGORIES_EXPENSES]: JSON.parse(localStorage.getItem(CATEGORIES_EXPENSES))
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
						<Route exact path="/" component={Home} />
						<Route path="/categories" component={Categories} />
					</Switch>
				</div>
			</Container>
		)
	}
}

App.childContextTypes = {
    [BALANCE]: PropTypes.number,
    [TRANSACTIONS]: PropTypes.array,
    [CATEGORIES_EXPENSES]: PropTypes.array,
    [TRANSACTION_TYPE]: PropTypes.array,
	updateContext: PropTypes.func
};

export default App;