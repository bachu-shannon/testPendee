import React from "react";
import { Table, Button, Input } from 'semantic-ui-react';

class CategoriesItem extends React.Component {
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
						<Input type="text" defaultValue={item.name} ref={input => this.editInput = input} />
					</Table.Cell>
					{this.renderEditingSection()}
				</Table.Row>
			)
		}

		return (
			<Table.Row key={this.props.index}>
				<Table.Cell>
					{this.props.item.name}
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
		const newItem = this.editInput.inputRef.value;
		this.props.saveCategory(oldItem, newItem);
		this.setState({
			isEditing: false
		})
	}
	onDeleteClick() {
		this.props.deleteCategory(this.props.item);
	}

	render() {
		return this.renderItemSection();
	}
}

export default CategoriesItem;