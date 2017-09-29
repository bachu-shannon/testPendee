import React, {PropTypes} from "react";
import {Button, Modal, Tab, Select, Input, Form} from 'semantic-ui-react';
import {BALANCE, INCOME, EXPENSES, TRANSACTION_TYPES, DEFAULT_TRANSACTION_TYPE} from "./constants/Contstants";

import Transactions from "./transactions/Transactions";

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // const selectedTransactionType = this.context[DEFAULT_TRANSACTION_TYPE];
        //
        // this.state = {
        //     selectedTransactionType
        // }
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
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Select
                                        label='Categories'
                                        onChange={(e, {value}) => this.setState({categoryType: value})}
                                        options={options}
                                        defaultValue={defaultCategory}
                                        placeholder='Choose category'
                                    />
                                    <Form.Input label='Date' placeholder='Date'/>
                                    <Form.Input label='Note' placeholder='Note'/>
                                    <Form.Input label='Price' placeholder='Price'/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Button>Create</Form.Button>
                                    <Form.Button>Cancel</Form.Button>
                                </Form.Group>
                            </Form>
                        </Tab.Pane>
                    )

                }
            );
        });

        return (
            <Modal size="fullscreen" trigger={<Button positive>Add transaction</Button>}>
                <Modal.Header>Add transaction</Modal.Header>
                <Modal.Content>
                    <Tab panes={panes} renderActiveOnly={false}/>
                </Modal.Content>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                {this.renderModalAddForm()}
                <Transactions/>
            </div>
        )
    }
}

Home.contextTypes = {
    [BALANCE]: PropTypes.number,
    [INCOME]: PropTypes.array,
    [EXPENSES]: PropTypes.array,
    [TRANSACTION_TYPES]: PropTypes.array,
    [DEFAULT_TRANSACTION_TYPE]: PropTypes.string
};

export default Home;
