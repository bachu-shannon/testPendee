import React from "react";
import { Table, Button } from 'semantic-ui-react';

import IncomeListItem from "./IncomeListItem";

class IncomeList extends React.Component {
	constructor() {
		super();
		this.state = {
			items: []
		}
	}

	componentDidUpdate() {
        localStorage.setItem('IncomeList', JSON.stringify(this.state.items));
    }

	componentWillMount() {
		this.setState({
			items: JSON.parse(localStorage.getItem('IncomeList'))
		})
	}

	addCategory() {
		let val = this.refs.valueInput.value,
			items = this.state.items;
		(val !== '') ? items.push(val) : '';
		this.setState({
			items
		});
		this.refs.valueInput.value = '';
	}

	saveCategory(prevState, newState) {
		const items = this.state.items;
        items.forEach((item, index) => {
            return (item === prevState) ? items[index] = newState : item;
        });
		this.setState({
			items
		})
	}

	deleteCategory(deleteItem) {
		const items = this.state.items;
		items.forEach((item, index) => {
			return (deleteItem === item) ? items.splice(index, 1) : item;
		});
		this.setState({
			items
		})
	}

	renderListCategory() {
		if(this.state.items.length > 0) {
			return (
				<Table singleLine>
					<Table.Body>
                        {this.state.items.map((item, index) => {
                            return (
								<IncomeListItem
									item={item}
									key={index}
									saveCategory={this.saveCategory.bind(this)}
									deleteCategory={this.deleteCategory.bind(this)}
									{...this.state}
								/>
							)
                        })}
					</Table.Body>
				</Table>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderListCategory()}
				<div className="addCategory">
					<input ref='valueInput' placeholder="Write a category..."/>
					<Button size='mini' content='Create' onClick={this.addCategory.bind(this)} />
				</div>
			</div>
		)
	}
}

export default IncomeList;