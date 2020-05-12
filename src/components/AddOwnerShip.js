import React, { Component } from 'react';
import ChangeOwnerShipInstance from '../interface/change_ownership';
import Spinner from './spinner';


class AddOwnerShip extends Component {
    state = {
        serial: '',
        type: '',
        loading: false,
        message: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        // console.log(e.target.name, " " ,e.target.value);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const {type,serial} = this.state;
        ChangeOwnerShipInstance.methods.addOwnership(type, serial)
                            .send({ from: this.props.accounts[0]})
                            .then(() =>{
                                this.setState({ message: "Add Ownership Succesful" }); 
                                this.setState({ loading: false });   
                            })
                            .catch(()=> {
                                this.setState({ message: "Add Ownership failed" });
                                this.setState({ loading: false });
                                setTimeout(() => this.setState({ message: '' }), 5000)
                            })
    }

    render() {
        const { serial, type, loading, message } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Add Ownership</h1>
                    <div>
                        <a href="/" className="btn btn-outline-primary btn-sm mx-1">Build Parts</a>
                        <a href="/getParts" className="btn btn-outline-primary btn-sm mx-2">Parts Details</a>
                        <a href="/products" className="btn btn-outline-primary btn-sm mx-1">Build Product</a>
                        <a href="/getProducts" className="btn btn-outline-primary btn-sm mx-1">Products Details</a>
                        <a href="/productInfo" className="btn btn-outline-primary btn-sm mx-1">Product Info</a>
                        <a href="/changeOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Change Ownership</a>
                        <a href="/partHistory" className="btn btn-outline-primary btn-sm mx-1">Part History</a>
                        <a href="/productHistory" className="btn btn-outline-primary btn-sm mx-1">Product History</a>
                    </div>
                    {message !== '' &&
                        <div className="alert alert-primary my-1" role="alert">
                            {message}
                        </div>
                    }
                    <label htmlFor="Type">Type 0 for Part and 1 for Product</label>
                    <input type="text" className="form-control" name="type"
                        value={type} onChange={this.onChange} />
                    <label htmlFor="Serial NUmber">Serial Number</label>
                    <input type="text" className="form-control" name="serial"
                        value={serial} onChange={this.onChange} />

                    <button className="btn btn-primary my-2">Add Ownership</button>
                    {loading && <Spinner />}
                </form>
            </div>
        )
    }
}

export default AddOwnerShip;