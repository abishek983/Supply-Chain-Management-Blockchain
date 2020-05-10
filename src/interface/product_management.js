import web3 from '../web3';
import ProductManagement from '../build/ProductManagement.json';

const address = '0xe5F5bF1D45fb2f89c363d7e9d80FE90682537Deb';

const abi = JSON.parse(ProductManagement.interface);
   
// console.log(abi);

const productInstance = new web3.eth.Contract(abi, address);

export default productInstance;