import React, { Component } from 'react';
import ProductInstance from '../../../interface/product_management';

class BuildProducts extends Component {
    state = {
        product : '',
        type : '',
        part1 : '',
        part2 : '',
        part3 : '',
        part4 : '',
        part5 : ''
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {product, type, part1, part2, part3, part4,part5} = this.state;
        ProductInstance.methods.buildProduct(product, type, part1, part2, part3, part4,part5)
        .send({from : this.props.accounts[0]},function(err,data){
            if(err){
                console.log(err);
            }
            else
                console.log(data);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row" onChange={this.onChange}>
                        <div className="col my-5">
                            <label htmlFor="Product Serial Number">Product Serial Number</label>
                            <input type="text" className="form-control" name="product" />
                            <label htmlFor="Product Type">Product Type</label>
                            <input type="text" className="form-control" name="type" />
                            <br/>
                            <span className="my-2"><strong>Enter Serial Number of 5 Parts</strong></span>  <br/>
                            <label htmlFor="Part Serial Number">Part1</label>
                            <input type="text" className="form-control" name="Part1" />
                            <label htmlFor="Part Serial Numbe">Part2</label>
                            <input type="text" className="form-control" name="Part2" />
                            <label htmlFor="Part Serial Numbe">Part3</label>
                            <input type="text" className="form-control" name="Part3" />
                            <label htmlFor="Part Serial Numbe">Part4</label>
                            <input type="text" className="form-control" name="Part4" />
                            <label htmlFor="Part Serial Numbe">Part5</label>
                            <input type="text" className="form-control" name="Part5" />
                            <button className="btn btn-primary my-1" onSubmit={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default BuildProducts;