import React, { PropTypes } from "react";
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
                    note: 'asdasdasdasdas',
                    price: 3000 + "UAH",
                    color: "green"
                }
            ]
        }
    }

    addTransaction() {
        console.log(0);
    }

    editTransaction() {
        console.log(1);
    }

    saveTransaction() {
        console.log(2);
    }

    deleteTransaction() {
        console.log(3);
    }

    render() {
        return (
            <Table singleLine selectable>
                <Table.Body>
                    {this.state.transactions.map((item, index) => {
                        return (
                            <TransactionsItem
                                item={item}
                                key={item}
                                {...this}
                            />
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }
}

Transactions.contextTypes = {
    categoriesList: PropTypes.array,
    updateContext: PropTypes.func
};

export default Transactions;