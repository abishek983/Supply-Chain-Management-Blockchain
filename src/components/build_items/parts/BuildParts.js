import React, { Component } from 'react';
import web3 from '../../../web3';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ProductInstance from '../../../interface/product_management';
import ChangeOwnerShipInstance from '../../../interface/change_ownership';
import Spinner from '../../spinner';

class BuildParts extends Component {
    state = {
        serial: '',
        type: '',
        accounts: [],
        part_details: {},
        success: false,
        loading: false,
        exist: false,
        ownership: false,
        message : ''
    };

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        this.setState({ accounts });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        this.setState({ success: false });
        const part_details = await ProductInstance.methods.buildPart(this.state.serial, this.state.type)
            .send({ from: this.state.accounts[0] })
            .catch(() => {
                this.setState({ exist: true })
            })
        this.setState({ loading: false });
        setTimeout(() => this.setState({ exist: false }), 5000);

        if (part_details !== undefined) {
            this.setState({ success: true });
        }
    }

    addOwnership = () => {
        this.setState({loading:true, success : false});
        ChangeOwnerShipInstance.methods.addOwnership(0,this.state.serial)
            .send({from : this.state.accounts[0]} ,(err)=>{
                this.setState({loading:false});
                if(err){
                    this.setState({message : "Add Ownership failed"});
                }
                else{
                    this.setState({message : "Add Ownership Succesful"});
                }
                this.setState({serial : '', type:''});
                setTimeout(() => this.setState({message : ''}),3000)
            })
    }

    render() {
        const { serial, type, exist, loading, success, message } = this.state;
        return (
            <div className="container mx-auto">
                <h1 className="text-uppercase my-10">BuildParts</h1>
                <span>
                    <a href="/getParts" className="btn btn-outline-primary btn-sm mx-1">Part Detials</a>
                    <a href="/addOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Add Ownership</a>
                </span>
                <form onSubmit={this.onSubmit}>
                    {exist && <div className="alert alert-danger" role="alert">
                        This Product Already exists!
                    </div>}
                    <label htmlFor="Serial NUmber">Serial Number</label>
                    <input type="text" className="form-control" name="serial"
                        value={serial} onChange={this.onChange} />
                    <label htmlFor="type">Type</label>
                    <input type="text" className="form-control" name="type"
                        value={type} onChange={this.onChange} />
                    <button className="my-2 btn btn-primary">Build</button>
                    {loading && <Spinner />}
                </form>
                {success &&
                    <div>
                        <div className="text-success">Part Build Successfully</div>
                        <span className="text-danger">Please Add Ownership</span>
                        <button className="btn btn-danger mx-2" onClick={this.addOwnership}>Add Ownership</button>
                    </div>
                }
                <span className="text-danger">{message}</span>
            </div>
        )
    }
}

export default BuildParts;