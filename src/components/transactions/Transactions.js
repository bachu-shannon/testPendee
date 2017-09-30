import React, {PropTypes} from "react";
import {Table, Button, Modal, Tab, Form} from 'semantic-ui-react';
import {INCOME, EXPENSES, TRANSACTIONS, TRANSACTION_TYPES, BALANCE} from "../constants/Contstants";

import TransactionsItem from "./TransactionsItem";

class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            formData: {
                categoryType: null,
                transactionType: null,
                value: null,
                date: null,
                note: '',
                price: null
            },
            modalStatus: false
        }
    }

    onHandleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        const formData = this.state.formData;

        formData[inputName] = inputValue;
        this.setState({
            formData
        })
    }

    balanceCount(sum) {
        let balance = this.context[BALANCE];
        const numSum = Number(sum);

        balance += numSum;

        this.context.updateContext(BALANCE, balance);
    }

    addTransaction() {
        const transactions = this.context[TRANSACTIONS];
        const formData = this.state.formData;

        transactions.push({
            ...formData,
            ...{key: transactions.length}
        });

        this.context.updateContext(TRANSACTIONS, transactions);

        this.balanceCount(this.state.formData.price);

        this.setState({
            modalStatus: false
        })
    }

    saveTransaction(item) {
        const transactions = this.context[TRANSACTIONS];
        transactions[item.key] = item;

        this.context.updateContext(TRANSACTIONS, transactions);

        this.balanceCount(item.price);
    }

    deleteTransaction(deletingItem) {
        const transactions = this.context[TRANSACTIONS];
        const elementIndex = transactions.indexOf(deletingItem);

        transactions.splice(elementIndex, 1);
        this.context.updateContext(TRANSACTIONS, transactions);

        this.balanceCount("-" + deletingItem.price);
    }

    renderModalAddForm() {
        let panes = [];
        this.context[TRANSACTION_TYPES].forEach((type) => {
            const categories = this.context[type.value];
            const options = categories.map(category => {
                return {
                    key: category.key,
                    value: category.value,
                    text: category.value
                }
            });
            const defaultCategory = options[0] ? options[0].value : '';

            panes.push(
                {
                    menuItem: type.value,
                    pane: (
                        <Tab.Pane key={type.key}>
                            <Form onSubmit={this.addTransaction.bind(this)}>
                                <Form.Group widths='equal'>
                                    <Form.Select
                                        label='Categories'
                                        onChange={(e, {value}) => this.setState({
                                            formData: {
                                                ...this.state.formData,
                                                ...{
                                                    transactionType: type.value,
                                                    categoryType: value,
                                                    text: value,
                                                    value
                                                }
                                            }
                                        })}
                                        options={options}
                                        defaultValue={defaultCategory}
                                        placeholder='Choose category'
                                    />
                                    <Form.Input
                                        label='Date'
                                        name="date"
                                        placeholder='Date'
                                        onChange={this.onHandleChange.bind(this)}
                                    />
                                    <Form.Input
                                        label='Note' name="note"
                                        placeholder='Wright text'
                                        onChange={this.onHandleChange.bind(this)}
                                    />
                                    <Form.Input
                                        label='Price'
                                        name="price" placeholder='0.00'
                                        onChange={this.onHandleChange.bind(this)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Button>Create</Form.Button>
                                    <Form.Button onClick={this.onHandleModalHide.bind(this)}>Cancel</Form.Button>
                                </Form.Group>
                            </Form>
                        </Tab.Pane>
                    )

                }
            );
        });

        return (
            <div>
                <Button positive onClick={this.onHandleModalShow.bind(this)}>Add transaction</Button>
                <Modal size="fullscreen" open={this.state.modalStatus}>
                    <Modal.Header>Add transaction</Modal.Header>
                    <Modal.Content>
                        <Tab panes={panes} renderActiveOnly={false}/>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

    onHandleModalShow() {
        this.setState({
            modalStatus: true
        })
    }

    onHandleModalHide() {
        this.setState({
            modalStatus: false
        })
    }

    renderTransactions() {
        const transactions = this.context[TRANSACTIONS];
        if (transactions.length) {
            return (
                <Table singleLine selectable>
                    <Table.Body>
                        {transactions.map((item, index) => {
                            return (
                                <TransactionsItem
                                    item={item}
                                    key={index}
                                    saveTransaction={this.saveTransaction.bind(this)}
                                    deleteTransaction={this.deleteTransaction.bind(this)}
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
                {this.renderModalAddForm()}
                {this.renderTransactions()}
            </div>
        )
    }
}

Transactions.contextTypes = {
    [BALANCE]: PropTypes.number,
    [INCOME]: PropTypes.array,
    [EXPENSES]: PropTypes.array,
    [TRANSACTIONS]: PropTypes.array,
    [TRANSACTION_TYPES]: PropTypes.array,
    updateContext: PropTypes.func
};

export default Transactions;
