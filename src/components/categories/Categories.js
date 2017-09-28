import React, { PropTypes } from "react";
import { Table, Form, Input, Select } from 'semantic-ui-react';

import CategoriesItem from "./CategoriesItem";

class CategoriesList extends React.Component {
	constructor() {
		super();
		this.state = {
			categoryTypeChoosed: ''
		}
	}

	addCategory(e) {
		e.preventDefault();
		let valInput = this.valueInput.inputRef.value,
			valSelect = this.state.categoryTypeChoosed,
			list = this.context.categoriesList;
		let count = list.length - 1;
		(valInput !== '') ? list.push({
			key: count + 1,
			text: valInput,
			name: valInput,
			value: valInput,
			type: valSelect
		}) : '';
		this.context.updateContext("categoriesList", list);
		this.valueInput.inputRef.value = '';
	}

	saveCategory(prevState, newState) {
		const list = this.context.categoriesList;
        let listLength = list.length;
        for(let i = 0; i < listLength; i++) {
            (list[i].name === prevState) ? list[i].name = newState : '';
		}
        this.context.updateContext("categoriesList", list);
	}

	deleteCategory(deletingItem) {
		const list = this.context.categoriesList;
		list.splice(list.indexOf(deletingItem), 1);
        this.context.updateContext("categoriesList", list);
	}

	renderIncomeList(array) {
		if(array.length > 0) {
            return (
				<div>
					<h4>Income categories</h4>
					<Table singleLine>
						<Table.Body>
                            {array.map((item, index) => {
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

    renderExpensesList(array) {
        if(array.length > 0) {
            return (
				<div>
					<h4>Expenses categories</h4>
					<Table singleLine>
						<Table.Body>
                            {array.map((item, index) => {
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

	renderListCategory() {
        let list = this.context.categoriesList,
            incomeList = [],
            expensesList = [];

        list.forEach(item => {
			(item.type === "Income") ? incomeList.push(item) : expensesList.push(item);
		});

        if(list.length > 0) {
            return (
				<div>
					{this.renderIncomeList(incomeList)}
					{this.renderExpensesList(expensesList)}
				</div>
            )
		}
	}

	renderAddCategory() {
		console.log(this.context.categories);
		return (
			<Form onSubmit={this.addCategory.bind(this)}>
				<Form.Group>
					<Input ref={input => this.valueInput = input} placeholder="Write a category..." />
					<Select onChange={(e, { value }) => this.setState({categoryTypeChoosed: value})} options={this.context.categories} placeholder='Choose...' />
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

CategoriesList.contextTypes = {
    categoriesList: PropTypes.array,
    categories: PropTypes.array,
	updateContext: PropTypes.func
};

export default CategoriesList;