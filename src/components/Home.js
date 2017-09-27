import React from "react";
import { Button } from 'semantic-ui-react';

import Transactions from "./transactions/Transactions";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            balance: 3000
        }
    }

    render() {
        return (
            <div>
                <Button positive>Add transaction</Button>
                <Transactions />
            </div>
        )
    }
}

export default Home;