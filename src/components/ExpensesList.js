import React from "react";
import { List, Segment, Button } from 'semantic-ui-react';

class ExpensesList extends React.Component {
	constructor() {
		super();
		this.state = {
			items: [],
			isEditing: false
		}
	}

	componentWillMount() {
		this.setState({
			items: JSON.parse(localStorage.getItem('ExpensesList')) || []
		})
	}

	addCategory() {
		let val = this.refs.valueInput.value,
			items = this.state.items;
		(val !== '') ? items.push(val) : '';
		localStorage.setItem('ExpensesList', JSON.stringify(items));
		this.setState({
			items
		});
		this.refs.valueInput.value = '';
	}

	deleteCategory() {

	}

	render() {
		return (
			<div>
				<Segment>
					<List divided relaxed>
						{this.state.items.map((item, index) => {
							return(
								<List.Item key={index}>
									<List.Content>
										<List.Header>{item}</List.Header>
									</List.Content>
								</List.Item>
							)
						})}
					</List>
				</Segment>
				<div className="addCategory">
					<input ref='valueInput' />
					<Button content='Add' onClick={this.addCategory.bind(this)} />
				</div>
			</div>
		)
	}
}

export default ExpensesList;