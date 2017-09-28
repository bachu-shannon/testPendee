import React, { PropTypes } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Container, Menu } from 'semantic-ui-react';

import Home from "./Home";
import Categories from "./categories/Categories";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
            balance: 0,
            transactionsList: [],
            categoriesList: [],
            categories: [
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
			balance: this.state.balance,
            transactionsList: this.state.transactionsList,
            categoriesList: this.state.categoriesList,
            categories: this.state.categories,
            updateContext: this.updateContext.bind(this)
		}
	}

    componentDidUpdate() {
        localStorage.setItem('categoriesList', JSON.stringify(this.state.categoriesList));
    }

    componentWillMount() {
        this.setState({
            categoriesList: JSON.parse(localStorage.getItem('categoriesList'))
        })
    }

    updateContext(contextName, contextValue) {
    	this.setState({
            contextName: contextValue
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
	balance: PropTypes.number,
    transactionsList: PropTypes.array,
    categoriesList: PropTypes.array,
    categories: PropTypes.array,
	updateContext: PropTypes.func
};

export default App;