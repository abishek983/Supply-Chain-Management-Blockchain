import web3 from '../web3';
import ChangeOwnership from '../build/ChangeOwnership.json';

const address = '0x31A3887da35472afdbd44D60D3a8575a94A7a0C8';

const abi = JSON.parse(ChangeOwnership.interface);

console.log(abi);

export default new web3.eth.Contract(abi, address);