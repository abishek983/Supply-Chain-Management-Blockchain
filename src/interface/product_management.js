import web3 from '../web3';
import ProductManagement from '../build/ProductManagement.json';

const address = '0xf9689b275ffe8bd4D6eDa327C37f7438F9094910';

const abi = JSON.parse(ProductManagement.interface);
   
// console.log(abi);

const productInstance = new web3.eth.Contract(abi, address);

export default productInstance;