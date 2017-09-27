import React from "react";
import { Table, Form, Input, Select } from 'semantic-ui-react';

import CategoriesItem from "./CategoriesItem";

class IncomeList extends React.Component {
	constructor() {
		super();
		this.state = {
            list: [],
			categories: [
				{
					key: 0,
					value: "income",
					text: "income",
				},
				{
					key: 1,
                    value: "expenses",
					text: "expenses",
				}
			],
			categoryTypeActive: ''
		}
	}

	componentDidUpdate() {
        localStorage.setItem('categoriesList', JSON.stringify(this.state.list));
    }

	componentWillMount() {
		this.setState({
			list: JSON.parse(localStorage.getItem('categoriesList'))
		})
	}

	addCategory(e) {
		e.preventDefault();
		let valInput = this.valueInput.inputRef.value,
			valSelect = this.state.categoryTypeActive,
			list = this.state.list;
		console.log(valSelect);
		(valInput !== '') ? list.push({
			name: valInput,
			type: valSelect
		}) : '';
		this.setState({
			list
		});
		this.valueInput.inputRef.value = '';
	}

	saveCategory(prevState, newState) {
		const list = this.state.list;
        list.forEach((item, index) => {
            return (item.name === prevState) ? item.name = newState : item;
        });
		this.setState({
			list: list
		})
	}

	deleteCategory(deletingItem) {
		const list = this.state.list;
		list.splice(list.indexOf(deletingItem), 1);
		this.setState({
			list
		})
	}

	renderListCategory() {
        let list = this.state.list,
			incomeList = [],
            expensesList = [];

        list.forEach(item => {
			(item.type === "income") ? incomeList.push(item) : expensesList.push(item);
		});

        if(list.length > 0) {
            return (
				<div>
					<h4>Income categories</h4>
					<Table singleLine>
						<Table.Body>
							{incomeList.map((item, index) => {
								return (
									<CategoriesItem
										item={item}
										key={index}
										saveCategory={this.saveCategory.bind(this)}
										deleteCategory={this.deleteCategory.bind(this)}
									/>
								)
							})}
						</Table.Body>
					</Table>

					<h4>Expenses categories</h4>
					<Table singleLine>
						<Table.Body>
                            {expensesList.map((item, index) => {
                                return (
									<CategoriesItem
										item={item}
										key={index}
										saveCategory={this.saveCategory.bind(this)}
										deleteCategory={this.deleteCategory.bind(this)}
									/>
                                )
                            })}
						</Table.Body>
					</Table>
				</div>
            )
		}
	}

	renderAddCategory() {
		return (
			<Form onSubmit={this.addCategory.bind(this)}>
				<Form.Group>
					<Input ref={input => this.valueInput = input} placeholder="Write a category..." />
					<Select onChange={(e, { value }) => this.setState({categoryTypeActive: value})} options={this.state.categories} placeholder='Choose...' />
					<Form.Button>Create</Form.Button>
				</Form.Group>
			</Form>
		)
	}

	render() {
		return (
			<div>
				{this.renderAddCategory()}
				{this.renderListCategory()}
			</div>
		)
	}
}

export default IncomeList;