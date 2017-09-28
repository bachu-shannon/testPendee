import React, { PropTypes } from "react";
import { Table } from 'semantic-ui-react';
import { CATEGORIES_INCOME, CATEGORIES_EXPENSES, TRANSACTIONS } from "../constants/Contstants";

import TransactionsItem from "./TransactionsItem";

class Transactions extends React.Component {

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
                    {this.context[TRANSACTIONS].map((item, index) => {
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
    [CATEGORIES_INCOME]: PropTypes.array,
    [CATEGORIES_EXPENSES]: PropTypes.array,
    [TRANSACTIONS]: PropTypes.array,
    updateContext: PropTypes.func
};

export default Transactions;