import React, { PropTypes } from "react";
import { Table, Button, Input, Select } from 'semantic-ui-react';
import { CATEGORIES_INCOME, CATEGORIES_EXPENSES, TRANSACTIONS } from "../constants/Contstants";

class TransactionsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryType: '',
            isEditing: false
        }
    }

    onEditHandleClick() {
        this.setState({
            isEditing: true
        })
    }

    onSaveHandleClick() {
        this.setState({
            isEditing: false
        })
    }

    renderItemSection() {
        const { item } = this.props;

        if(this.state.isEditing) {
            return (
                <Table.Row key={this.props.index}>
                    <Table.Cell>
                        <Select onChange={(e, { value }) => this.setState({categoryType: value})} options={this.context.categoriesList} placeholder='Choose...' />
                    </Table.Cell>
                    <Table.Cell>
                        <Input size='small' defaultValue={this.props.item.name} />
                    </Table.Cell>
                    <Table.Cell>
                        <Input size='small' defaultValue={this.props.item.note} />
                    </Table.Cell>
                    <Table.Cell>
                        <Input size='small' defaultValue={this.props.item.price} />
                    </Table.Cell>
                    <Table.Cell>
                        <Button compact onClick={this.onSaveHandleClick.bind(this)}>Save changes</Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button compact negative>Delete</Button>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <Table.Row key={this.props.index} onClick={this.onEditHandleClick.bind(this)}>
                <Table.Cell>
                    {this.props.item.name}
                </Table.Cell>
                <Table.Cell>
                    <div>{item.date}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{item.note}</div>
                </Table.Cell>
                <Table.Cell>
                    <div style={{color: item.color}}>{item.price}</div>
                </Table.Cell>
            </Table.Row>
        )
    }


    render() {
        return this.renderItemSection();
    }
}

TransactionsItem.contextTypes = {
    categoriesList: PropTypes.array,
};

export default TransactionsItem;