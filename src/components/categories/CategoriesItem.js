import React from "react";
import {Table, Button, Input} from 'semantic-ui-react';

class CategoriesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        }
    }

    renderItemSection() {
        const {item} = this.props;

        if (this.state.isEditing) {
            return (
                <Table.Row key={item.key}>
                    <Table.Cell>
                        <Input type="text" defaultValue={item.value} ref={input => this.editInput = input}/>
                    </Table.Cell>
                    {this.renderEditingSection()}
                </Table.Row>
            )
        }

        return (
            <Table.Row key={item.key}>
                <Table.Cell>
                    {this.props.item.value}
                </Table.Cell>
                {this.renderEditingSection()}
            </Table.Row>
        )
    }

    renderEditingSection() {
        if (this.state.isEditing) {
            return (
                <Table.Cell textAlign='right'>
                    <Button size='mini' onClick={this.onSaveClick.bind(this)}>Save</Button>
                    <Button size='mini' onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                </Table.Cell>
            )
        }

        return (
            <Table.Cell textAlign='right'>
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
        const value = this.editInput.inputRef.value;
        const editItem = {...this.props.item, ...{value}};

        this.props.saveCategory(editItem);
        this.setState({
            isEditing: false
        })
    }

    onDeleteClick() {
        this.props.deleteCategory(this.props.item, this.props.item.transactionType);
    }

    render() {
        return this.renderItemSection();
    }
}

export default CategoriesItem;
