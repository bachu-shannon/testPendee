import React from "react";
import { Table } from 'semantic-ui-react';

import TransactionsItem from "./TransactionsItem";

class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            transactions: [
                {
                    name: "test",
                    categoryType: "income",
                    date: "27.09.2017",
                    note: ''
                }
            ]
        }
    }

    editTransaction() {

    }

    saveTransaction() {

    }

    deleteTransaction() {

    }

    render() {
        return (
            <Table singleLine selectable onClick={this.editTransaction.bind(this)}>
                <Table.Body>
                    {this.state.transactions.map((item, index) => {
                        return (
                            <TransactionsItem
                                item={item}
                                key={index}
                                editTransaction={this.editTransaction.bind(this)}
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

export default Transactions;