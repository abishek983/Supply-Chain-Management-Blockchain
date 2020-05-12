import React, { Component } from 'react';
import web3 from './web3';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Accounts from './accounts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BuildParts from './components/build_items/parts/BuildParts';
import BuildProducts from './components/build_items/products/BuildProducts';
import GetParts from './components/build_items/parts/GetParts';
import GetProducts from './components/build_items/products/GetProducts';
import AddOwnerShip from './components/AddOwnerShip';
import ChangeOwnerShip from './components/ChangeOwnerShip';
import ProductInfo from './components/build_items/products/ProductInfo';
import PartHistory from './components/history/PartHistory';
import ProductHistory from './components/history/ProductHistory';

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
            <Route exact path='/accounts' component={Accounts} />
            <Route exact path='/' component={BuildParts} />
            <Route exact path='/products' render={(props) => <BuildProducts {...props} accounts={accounts} />} />
            <Route exact path='/getParts' render={(props) => <GetParts {...props} accounts={accounts} />} />
            <Route exact path='/getProducts' render={(props) => <GetProducts {...props} accounts={accounts} />} />
            <Route exact path='/productInfo' render={(props) => <ProductInfo {...props} accounts={accounts} />} />
            <Route exact path='/addOwnerShip' render={(props) => <AddOwnerShip {...props} accounts={accounts} />} />
            <Route exact path='/changeOwnerShip' render={(props) => <ChangeOwnerShip {...props} accounts={accounts} />} />
            <Route exact path='/partHistory' render={(props) => <PartHistory {...props} accounts={accounts} />} />
            <Route exact path='/productHistory' render={(props) => <ProductHistory {...props} accounts={accounts} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
