import React, { Component } from 'react';
import web3 from './web3';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Accounts from './accounts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BuildParts from './components/build_items/parts/BuildParts';
import BuildProducts from './components/build_items/products/BuildProducts';
import GetParts from './components/build_items/parts/GetParts';
import AddOwnerShip from './components/AddOwnerShip';
import ChangeOwnerShip from './components/ChangeOwnerShip';


class App extends Component {
  state = {
    accounts: []
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts });
  }

  render() {
    const { accounts } = this.state;
    return (
      <div className="container my-2">
        <strong>Your Current account address is : {this.state.accounts}</strong>
        <Router>
          <Switch>
            <Route exact path='/' component={BuildParts} />
            <Route exact path='/products' render={(props) => <BuildProducts {...props} accounts={accounts} />} />
            <Route exact path='/getParts' render={(props) => <GetParts {...props} accounts={accounts} />} />
            <Route exact path='/addOwnerShip' render={(props) => <AddOwnerShip {...props} accounts={accounts} />} />
            <Route exact path='/changeOwnerShip' render={(props) => <ChangeOwnerShip {...props} accounts={accounts} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
