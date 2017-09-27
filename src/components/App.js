import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Container, Menu, Header } from 'semantic-ui-react';

import ExpensesList from "./ExpensesList";
import IncomeList from "./IncomeList";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			balance: 3000
		}
	}

	render() {
		return (
			<Container>
				<Menu pointing>
					<Menu.Item header>Кошелек: {this.state.balance} UAH</Menu.Item>
					<Menu.Menu position='right'>
						<Menu.Item>
							<Link to="/">Главная</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/income">Расходы</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/expenses">Доходы</Link>
						</Menu.Item>
					</Menu.Menu>
				</Menu>
				<div className="main-content">
					<Switch>
						<Route path="/income" component={IncomeList} />
						<Route path="/expenses" component={ExpensesList} />
					</Switch>
				</div>
			</Container>
		)
	}
}

export default App;