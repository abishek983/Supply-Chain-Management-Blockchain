import React, { Component } from 'react';
import ProductInstance from '../../../interface/product_management';
import ChangeOwnerShipInstance from '../../../interface/change_ownership';
import Details from './Details';
import _ from 'lodash';
import Spinner from '../../spinner';


class GetProducts
 extends Component {
    state = {
        part_details: {},
        serial: '',
        loading: false,
        error: false,
        curr_add : ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true, part_details: '',curr_add : '' });
        ProductInstance.methods.getParts(this.state.serial)
            .call({ from: this.props.accounts[0]})
            .then(part_details => this.setState({part_details,loading : false}))
            .catch(() => this.setState({loading : false}))
                    
    }
    onChange = (e) => {
        this.setState({ serial: e.target.value });
    }

    getOwner = (e) => {
        e.preventDefault();
        const {serial} = this.state;
        this.setState({loading : true});
        ChangeOwnerShipInstance.methods.currentOwner(1,serial)
            .call({ from: this.props.accounts[0] })
            .then(curr_add => {
                this.setState({curr_add});
                this.setState({loading : false});
            })
            .catch( () => {
                this.setState({loading : false});
                this.setState({curr_add : "Errpr occured"});         
            })
    }

    render() {
        const { part_details, loading, serial, curr_add } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Get Product Details</h1>
                    <div>
                        <a href="/" className="btn btn-outline-primary btn-sm mx-1">Build Parts</a>
                        <a href="/getParts" className="btn btn-outline-primary btn-sm mx-1">Parts Details</a>
                        <a href="/products" className="btn btn-outline-primary btn-sm mx-1">Build Product</a>
                        <a href="/productInfo" className="btn btn-outline-primary btn-sm mx-1">Product Info</a>
                        <a href="/addOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Add Ownership</a>
                        <a href="/changeOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Change Ownership</a>
                        <a href="/partHistory" className="btn btn-outline-primary btn-sm mx-1">Part History</a>
                        <a href="/productHistory" className="btn btn-outline-primary btn-sm mx-1">Product History</a>
                    </div>
                    <div className="text-danger">If the product doesn't exist or doesn't belong to You,Manufacturer would be 0x0000...</div>
                    <label htmlFor="Serial NUmber">Serial Number</label>
                    <input type="text" className="form-control" name="serial"
                        value={serial} onChange={this.onChange} />
                    <button className="btn btn-primary my-2">Get Details</button>
                </form>
                    <button className="btn btn-primary my-2" onClick={this.getOwner}>Current Owner</button>
                        {curr_add !== '' && <strong className="mx-1">Current Owner : {curr_add}</strong>}
                    {!_.isEmpty(part_details) && <Details part_details={part_details} />}
                    {loading && <Spinner />}
            </div>
        )
    }
}

export default GetProducts
;