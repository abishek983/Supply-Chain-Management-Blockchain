import React, { Component } from 'react';
import ProductInstance from '../../../interface/product_management';
import Spinner from '../../spinner';

class BuildProducts extends Component {
    state = {
        product : '',
        type : '',
        part1 : '',
        part2 : '',
        part3 : '',
        part4 : '',
        part5 : '',
        message : '',
        loading : false
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {product, type, part1, part2, part3, part4,part5} = this.state;
        console.log(product, type, part1, part2, part3, part4,part5);
        this.setState({loading : true});
        ProductInstance.methods.buildProduct(product, type, part1, part2, part3, part4,part5)
        .send({from : this.props.accounts[0]})
        .then(() => {
            this.setState({message : "Product added Successfully",loading: false});
            setTimeout(() =>this.setState({message:''}),5000);

        })
        .catch(()=>{
            this.setState({message : "OOPS!! Product couldn't be added",loading:false});
            setTimeout(() =>this.setState({message:''}),5000);
        })
    }

    render() {
        const {message, loading} = this.state;
        return (
            <div>
                <h1 className="text-uppercase my-10">Build Products</h1>
                {message!=='' && 
                    <div className="modal" tabindex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="alert alert-success" role="alert">
                                {message}
                            </div>
                        </div>
                    </div>    
                }
                <span>
                    <a href="/" className="btn btn-outline-primary btn-sm mx-1">Build Parts</a>
                    <a href="/getParts" className="btn btn-outline-primary btn-sm mx-1">Part Detials</a>
                    <a href="/getProducts" className="btn btn-outline-primary btn-sm mx-1">Products Details</a>
                    <a href="/productInfo" className="btn btn-outline-primary btn-sm mx-1">Product Info</a>
                    <a href="/addOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Add Ownership</a>
                    <a href="/changeOwnerShip" className="btn btn-outline-primary btn-sm mx-1">Change Ownership</a>
                    <a href="/partHistory" className="btn btn-outline-primary btn-sm mx-1">Part History</a>
                    <a href="/productHistory" className="btn btn-outline-primary btn-sm mx-1">Product History</a>
                </span>
                {loading && <Spinner />}
                <form onSubmit={this.onSubmit}>
                    <div className="form-row" onChange={this.onChange}>
                        <div className="col my-2">
                            <label htmlFor="Product Serial Number">Product Serial Number</label>
                            <input type="text" className="form-control" name="product" />
                            <label htmlFor="Product Type">Product Type</label>
                            <input type="text" className="form-control" name="type" />
                            <br/>
                            <span className="my-2"><strong>Enter Serial Number of 5 Parts</strong></span>  <br/>
                            <label htmlFor="Part Serial Number">Part1</label>
                            <input type="text" className="form-control" name="part1" />
                            <label htmlFor="Part Serial Numbe">Part2</label>
                            <input type="text" className="form-control" name="part2" />
                            <label htmlFor="Part Serial Numbe">Part3</label>
                            <input type="text" className="form-control" name="part3" />
                            <label htmlFor="Part Serial Numbe">Part4</label>
                            <input type="text" className="form-control" name="part4" />
                            <label htmlFor="Part Serial Numbe">Part5</label>
                            <input type="text" className="form-control" name="part5" />
                            <button className="btn btn-primary my-1" onSubmit={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default BuildProducts;