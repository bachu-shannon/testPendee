import React, { PropTypes } from "react";
import { Button, Modal, Tab, Select } from 'semantic-ui-react';

import Transactions from "./transactions/Transactions";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            balance: 0,
            transactionsList: [],
            categoriesList: [],
            categories: [
                {
                    key: 0,
                    value: "Income",
                    text: "Income",
                },
                {
                    key: 1,
                    value: "Expenses",
                    text: "Expenses",
                }
            ],
            categoryType: ''
        }
    }

    componentWillMount() {
        console.log(this.context.categories, 6456465464);
    }

    renderModalAddForm() {
        let panes = [];
        this.state.categories.forEach((pane) => {
            panes.push(
                {
                    menuItem: pane.text,
                    render: () =>
                        <Tab.Pane attached={false}>
                            <Select
                                onChange={(e, { value }) => this.setState({categoryType: value})}
                                options={this.state.categoriesList}
                                placeholder='Choose category'
                            />
                        </Tab.Pane>
                }
            );
        });
        return (
            <Modal trigger={<Button positive>Add transaction</Button>}>
                <Modal.Header>Add transaction</Modal.Header>
                <Modal.Content>
                    <Tab menu={{ secondary: true }} panes={panes} />
                </Modal.Content>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                {this.renderModalAddForm()}
                <Transactions />
            </div>
        )
    }
}

Home.childContextTypes = {
    balance: PropTypes.number,
    transactionsList: PropTypes.array,
    categoriesList: PropTypes.array,
    categories: PropTypes.array
};

export default Home;