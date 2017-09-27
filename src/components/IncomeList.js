import React from "react";
import { Table, Segment, Button } from 'semantic-ui-react';

import IncomeListItem from "./IncomeListItem";

class IncomeList extends React.Component {
	constructor() {
		super();
		this.state = {
			items: []
		}
	}

	componentWillMount() {
		this.setState({
			items: JSON.parse(localStorage.getItem('IncomeList')) || []
		})
	}

	addCategory() {
		let val = this.refs.valueInput.value,
			items = this.state.items;
		(val !== '') ? items.push(val) : '';
		localStorage.setItem('IncomeList', JSON.stringify(items));
		this.setState({
			items
		});
		this.refs.valueInput.value = '';
	}

	saveCategory(prevState, newState) {
		console.log(newState);
		const editItems = this.state.items.filter((item) => {
			return (item === prevState) ? item = newState : '';
		});

		console.log(editItems);
		this.setState({
			items: editItems
		})
	}

	render() {
		return (
			<div>
				<Table singleLine>
					<Table.Body>
						{this.state.items.map((item, index) => {
							return <IncomeListItem item={item} key={index} saveCategory={this.saveCategory.bind(this)} {...this.state} />
						})}
					</Table.Body>
				</Table>
				<div className="addCategory">
					<input ref='valueInput' />
					<Button size='mini' content='Add' onClick={this.addCategory.bind(this)} />
				</div>
			</div>
		)
	}
}

export default IncomeList;