import web3 from '../web3';
import ProductManagement from '../build/ProductManagement.json';

const address = '0xE56B51DBAaa0BD8d50009876687311098D5271a0';

const abi = JSON.parse(ProductManagement.interface);
   
// console.log(abi);

const productInstance = new web3.eth.Contract(abi, address);

export default productInstance;