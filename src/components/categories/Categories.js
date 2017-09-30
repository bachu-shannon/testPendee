import React, {PropTypes} from "react";
import {Table, Form, Input} from 'semantic-ui-react';
import {INCOME, EXPENSES, TRANSACTION_TYPES, DEFAULT_TRANSACTION_TYPE} from "../constants/Contstants";

import CategoriesItem from "./CategoriesItem";

class CategoriesList extends React.Component {
    constructor(props, context) {
        super(props, context);
        const selectedTransactionType = this.context[DEFAULT_TRANSACTION_TYPE];

        this.state = {
            selectedTransactionType
        }
    }

    addCategory(e) {
        e.preventDefault();
        const categoryName = this.valueInput.inputRef.value;
        const selectedTransactionType = this.state.selectedTransactionType;
        const categories = this.context[selectedTransactionType];
        (categoryName !== '') ? categories.push({
            key: categories.length,
            value: categoryName,
            text: categoryName,
            transactionType: selectedTransactionType
        }) : '';

        this.context.updateContext(selectedTransactionType, categories);
        this.valueInput.inputRef.value = '';
    }

    saveCategory(item) {
        const transactionType = item.transactionType;
        const categories = this.context[transactionType];
        categories[item.key] = item;

        this.context.updateContext(transactionType, categories);
    }

    deleteCategory(deletingItem, transactionType) {
        const categories = this.context[transactionType];
        const elementIndex = categories.indexOf(deletingItem);

        categories.splice(elementIndex, 1);
        this.context.updateContext(transactionType, categories);
    }

    renderCategories() {
        const transactionTypes = this.context[TRANSACTION_TYPES];

        return (
            transactionTypes.map(type => {
                return (
                    <Table key={type.key}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>{type.text}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderCategoriesByType(type.value)}
                        </Table.Body>
                    </Table>
                )
            })
        )
    }

    renderCategoriesByType(type) {
        const categories = this.context[type];

        return (
            categories.map(category => {
                return <CategoriesItem
                    item={category}
                    key={category.key}
                    saveCategory={this.saveCategory.bind(this)}
                    deleteCategory={this.deleteCategory.bind(this)}
                />
            })
        )
    }

    renderAddCategory() {
        const transactionTypes = this.context[TRANSACTION_TYPES];

        return (
            <Form onSubmit={this.addCategory.bind(this)}>
                <Form.Group style={{margin: "0 0 1em"}}>
                    <Input ref={input => this.valueInput = input} placeholder="Write a category..."/>
                    <Form.Select
                        onChange={(e, {value}) => this.setState({selectedTransactionType: value})}
                        options={transactionTypes}
                        placeholder='Choose...'
                        defaultValue={this.state.selectedTransactionType}
                    />
                    <Form.Button>Create</Form.Button>
                </Form.Group>
            </Form>
        )
    }

    render() {
        return (
            <div>
                {this.renderAddCategory()}
                {this.renderCategories()}
            </div>
        )
    }
}

CategoriesList.contextTypes = {
    [INCOME]: PropTypes.array,
    [EXPENSES]: PropTypes.array,
    [TRANSACTION_TYPES]: PropTypes.array,
    [DEFAULT_TRANSACTION_TYPE]: PropTypes.string,
    updateContext: PropTypes.func
};

export default CategoriesList;
