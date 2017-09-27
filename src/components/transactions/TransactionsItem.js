import React from "react";
import { Table, Button, Input, Select } from 'semantic-ui-react';

class TransactionsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryType: '',
            isEditing: true
        }
    }

    renderItemSection() {
        const { item } = this.props;

        if(this.state.isEditing) {
            return (
                <Table.Row key={this.props.index}>
                    <Table.Cell>
                        <Select value={item.name} onChange={(e, { value }) => this.setState({categoryType: value})} options={this.state.categories} placeholder='Choose...' />
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <Table.Row key={this.props.index}>
                <Table.Cell>
                    {this.props.item.name}
                </Table.Cell>
            </Table.Row>
        )
    }


    render() {
        return this.renderItemSection();
    }
}

export default TransactionsItem;