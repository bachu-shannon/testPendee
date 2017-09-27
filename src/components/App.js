import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Container, Menu } from 'semantic-ui-react';

import Home from "./Home";
import Categories from "./categories/Categories";

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

export default App;