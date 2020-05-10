import React, { Component } from 'react';
import ChangeOwnerShipInstance from '../interface/change_ownership';
import Spinner from './spinner';

class ChangeOwnerShip extends Component {
    state = {
        type : '',
        serial : '',
        sendTo : '',
        loading : false,
        message : ''
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.setState({ loading: true });
        const {type, serial, sendTo} = this.state;
        ChangeOwnerShipInstance.methods.changeOwnership(type, serial, sendTo)
                            .send({ from: this.props.accounts[0]})
                            .then(() =>{
                                this.setState({ message: "Change OwnerShip Succesful" }); 
                                this.setState({ loading: false });   
                            })
                            .catch(()=> {
                                this.setState({ message: "Change OwnerShip failed" });
                                this.setState({ loading: false });
                                setTimeout(() => this.setState({ message: '' }), 5000)
                            })
    }

    render() {
        const {message, type, serial, loading, sendTo} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Change Ownership</h1>
                    <div>
                        <a href="/" className="btn btn-outline-primary btn-sm mx-1">Build Parts</a>
                        <a href="/getParts" className="btn btn-outline-primary btn-sm mx-2">Parts Details</a>
                        <a href="/addOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Add Ownership</a>
                    </div>
                    {message !== '' &&
                        <div className="alert alert-primary my-1" role="alert">
                            {message}
                        </div>
                    }
                    <label htmlFor="Type">Type 0 for Part and 1 for Product</label>
                    <input type="text" className="form-control" name="type"
                        value={type} onChange={this.onChange} />
                    <label htmlFor="Type">Serial Number</label>
                    <input type="text" className="form-control" name="serial"
                        value={serial} onChange={this.onChange} />
                    <label htmlFor="Serial NUmber">Sender's Address</label>
                    <input type="text" className="form-control" name="sendTo"
                        value={sendTo} onChange={this.onChange} />

                    <button className="btn btn-primary my-2">Change Ownership</button>
                    {loading && <Spinner />}
                </form>
            </div>
        )
    }
}

export default ChangeOwnerShip;