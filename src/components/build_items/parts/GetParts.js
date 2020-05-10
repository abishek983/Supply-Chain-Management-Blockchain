import React, { Component } from 'react';
import ProductInstance from '../../../interface/product_management';
import Details from './Details';
import _ from 'lodash';
import Spinner from '../../spinner';


class GetParts extends Component {
    state = {
        part_details: {},
        serial: '',
        loading: false,
        error: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true, part_details: '' });
        ProductInstance.methods.showPart(this.state.serial)
            .call({ from: this.props.accounts[0] }, (err, part_details) => {
                if (err) {
                    console.log("part doesn't exist or doesn't belongs to you")
                }
                else {
                    this.setState({ part_details })
                    this.setState({ loading: false });
                }
            })
    }
    onChange = (e) => {
        this.setState({ serial: e.target.value });
    }

    render() {
        const { part_details, loading, serial, error } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Get Parts Details</h1>
                    <div>
                        <a href="/" className="btn btn-outline-primary btn-sm mx-1">Build Parts</a>
                        <a href="/addOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Add Ownership</a>
                    </div>
                    <div className="text-danger">If the product doesn't exist or doesn't belong to You,Manufacturer would be 0x0000...</div>
                    <label htmlFor="Serial NUmber">Serial Number</label>
                    <input type="text" className="form-control" name="serial"
                        value={serial} onChange={this.onChange} />
                    <button className="btn btn-primary my-2">Get Details</button>
                    {loading && <Spinner />}
                    {!_.isEmpty(part_details) && <Details part_details={part_details} />}
                </form>
            </div>
        )
    }
}

export default GetParts;