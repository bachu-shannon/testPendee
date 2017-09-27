import React from "react";
import { Table, Button } from 'semantic-ui-react';

class IncomeListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false
		}
	}

	renderItemSection() {
		const { item } = this.props;

		if(this.state.isEditing) {
			return (
				<Table.Row key={this.props.index}>
					<Table.Cell>
						<input type="text" defaultValue={item} ref="editInput"/>
					</Table.Cell>
					{this.renderEditingSection()}
				</Table.Row>
			)
		}

		return (
			<Table.Row key={this.props.index}>
				<Table.Cell>
					{this.props.item}
				</Table.Cell>
				{this.renderEditingSection()}
			</Table.Row>
		)
	}

	renderEditingSection(){
		if(this.state.isEditing) {
			return (
				<Table.Cell>
					<Button size='mini' onClick={this.onSaveClick.bind(this)}>Save</Button>
					<Button size='mini' onClick={this.onCancelClick.bind(this)}>Cancel</Button>
				</Table.Cell>
			)
		}

		return(
			<Table.Cell>
				<Button size='mini' onClick={this.onEditClick.bind(this)}>Edit</Button>
				<Button size='mini' onClick={this.onDeleteClick.bind(this)}>Delete</Button>
			</Table.Cell>
		)
	}

	onEditClick() {
		this.setState({
			isEditing: true
		})
	}
	onCancelClick() {
		this.setState({
			isEditing: false
		})
	}
	onSaveClick() {
		const oldItem = this.props.item;
		const newItem = this.refs.editInput.value;
		this.props.saveCategory(oldItem, newItem);
		this.setState({
			isEditing: false
		})
	}
	onDeleteClick() {
		this.props.deleteCategory(this.props.item);
	}

	render() {
		return this.renderItemSection()
	}
}

export default IncomeListItem;