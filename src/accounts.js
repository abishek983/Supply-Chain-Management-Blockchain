import React, { Component } from 'react';
import web3 from './web3';
// import ProductInstance from './interface/product_management';
import ChangeOwnerShip from './interface/change_ownership';

class accounts extends Component {
    async componentDidMount(){
        // await window.ethereum.enable();
        // web3.eth.getAccounts().then(console.log)
        // const buildParts = await ProductInstance.methods.buildPart('6','test wheel').call();

        // const getParts = await ProductInstance.methods.getParts("0xe455bf8ea6e7463a1046a0b52804526e119b4bf5136279614e0b1e8e296a4e2d").call();
        
        /*
            add ownership is working for all accounts -- that is calling the addOwnerShip function
        */ 
        const accounts = await web3.eth.getAccounts();
        /* const buildParts = await ProductInstance.methods.buildPart('001213','test wheel 10')
                                .send({ from: accounts[0]},function (error, result) {
                                    console.log("Smart Contract Transaction sent")
                                    console.log(result)
                                })
        const showParts = await ProductInstance.methods.showPart('001213')
                                .call({from : accounts[0]},function (error, result) {
                                    console.log("Smart Contract Transaction sent")
                                    console.log(result)
                                });
                                
        console.log(showParts); */

        
        /* const addOwnerShip = await ChangeOwnerShip.methods.addOwnership(0,"0xbdcc5e82121c247eee97f3f143cc7312d49b7b5f83243718529f95dba65d5227")
            .send(
                {
                    from : accounts[0]
                }
            ); */
        // const test = await ProductInstance.methods.Parts("0xe455bf8ea6e7463a1046a0b52804526e119b4bf5136279614e0b1e8e296a4e2d").call();
        // console.log(addOwnerShip);

        ChangeOwnerShip.at(accounts[0])
        .then(data => console.log(data))
        .cathc(err => console.log(err))
         
    }

    render() {
        return (
            <div>
                <h1>hello from accounts</h1>
            </div>
        )
    }
}

export default accounts;