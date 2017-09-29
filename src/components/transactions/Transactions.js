import React, {PropTypes} from "react";
import {Table} from 'semantic-ui-react';
import {INCOME, EXPENSES, TRANSACTIONS} from "../constants/Contstants";

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
        const transactions = this.context[TRANSACTIONS];
        return (
            <Table singleLine selectable>
                <Table.Body>
                    {transactions.map((item, index) => {
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
    [INCOME]: PropTypes.array,
    [EXPENSES]: PropTypes.array,
    [TRANSACTIONS]: PropTypes.array,
    updateContext: PropTypes.func
};

export default Transactions;
