import React, {PropTypes} from "react";
import {Table, Button, Input, Select} from 'semantic-ui-react';
import {TRANSACTIONS, INCOME, EXPENSES, DEFAULT_CURRENCY} from "../constants/Contstants";

class TransactionsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingItem: {},
            isEditing: false
        }
    }

    onHandleChange(event) {
        const editInputName = event.target.name;
        const editInputValue = event.target.value;
        const editingItem = this.state.editingItem;

        editingItem[editInputName] = editInputValue;
        this.setState({
            editingItem
        })
    }

    onEditHandleClick() {
        this.setState({
            isEditing: true
        });
    }

    onSaveClick() {
        const editItem = {...this.props.item, ...this.state.editingItem};

        this.props.saveTransaction(editItem);
        this.setState({
            isEditing: false
        })
    }

    onDeleteClick(e) {
        e.preventDefault();
        this.props.deleteTransaction(this.props.item);
        this.setState({
            isEditing: false
        })
    }

    renderItemSection() {
        const {item, index} = this.props;
        const categoriesType = this.context[item.transactionType];

        if (this.state.isEditing) {
            return (
                <Table.Row key={index}>
                    <Table.Cell>
                        <Select
                            onChange={(e, {value}) => this.setState({
                                editingItem: {
                                    ...this.state.editingItem,
                                    ...{
                                        categoryType: value,
                                        text: value,
                                        value
                                    }
                                }
                            })}
                            options={categoriesType}
                            defaultValue={item.value}
                            placeholder='Choose category'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Input size='small' name="date" defaultValue={item.date}
                               onChange={this.onHandleChange.bind(this)}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input size='small' name="note" defaultValue={item.note}
                               onChange={this.onHandleChange.bind(this)}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input
                            labelPosition='right'
                            label={DEFAULT_CURRENCY}
                            size='small' name="price"
                            defaultValue={item.price}
                            onChange={this.onHandleChange.bind(this)}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Button compact onClick={this.onSaveClick.bind(this)}>Save changes</Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button compact onClick={this.onDeleteClick.bind(this)} negative>Delete</Button>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <Table.Row key={index} onClick={this.onEditHandleClick.bind(this)}>
                <Table.Cell>
                    {item.categoryType}
                </Table.Cell>
                <Table.Cell>
                    {item.date}
                </Table.Cell>
                <Table.Cell>
                    {item.note}
                </Table.Cell>
                <Table.Cell textAlign='right'>
                    {item.price + " " + DEFAULT_CURRENCY}
                </Table.Cell>
            </Table.Row>
        )
    }


    render() {
        return this.renderItemSection();
    }
}

TransactionsItem.contextTypes = {
    [TRANSACTIONS]: PropTypes.array,
    [INCOME]: PropTypes.array,
    [EXPENSES]: PropTypes.array,
    updateContext: PropTypes.func
};

export default TransactionsItem;