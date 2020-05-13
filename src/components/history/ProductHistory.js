import React, { Component } from 'react';
import Spinner from '../spinner';
import ChangeOwnerShipInstance from '../../interface/change_ownership';

class PartHistory extends Component {
    state = {
        serial : '',
        result : [],
        loading : false
    }

    onChange = (e) => {
        this.setState({ serial: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true});
        ChangeOwnerShipInstance.methods.getProductHistory(this.state.serial)
            .call({ from: this.props.accounts[0] })
            .then(result => this.setState({result, loading  :false }))
            .catch((err) => console.log(err))
    }

    render() {
        const { serial, loading, result } = this.state;
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <h1>Get Product History</h1>
                        <div>
                            <a href="/" className="btn btn-outline-primary btn-sm mx-1">Build Parts</a>
                            <a href="/getParts" className="btn btn-outline-primary btn-sm mx-1">Part Details</a>
                            <a href="/products" className="btn btn-outline-primary btn-sm mx-1">Build Product</a>
                            <a href="/getProducts" className="btn btn-outline-primary btn-sm mx-1">Products Details</a>
                            <a href="/productInfo" className="btn btn-outline-primary btn-sm mx-1">Product Info</a>
                            <a href="/addOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Add Ownership</a>
                            <a href="/changeOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Change Ownership</a>
                            <a href="/partHistory" className="btn btn-outline-primary btn-sm mx-1">Part History</a>
                        </div>
                        <label htmlFor="Serial NUmber">Serial Number</label>
                        <input type="text" className="form-control" name="serial"
                            value={serial} onChange={this.onChange} />
                        <button className="btn btn-primary my-2">Get Details</button>
                    </form>
                    <div class="list-group">
                        { result.length!==0 && result.map(data => 
                        <div className="list-group-item list-group-item-action list-group-item-info">{data}</div>
                        )}
                    </div>
                    {loading && <Spinner />}
                </div>
            </div>
        )
    }
}

export default PartHistory;