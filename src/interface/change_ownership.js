import web3 from '../web3';
import ChangeOwnership from '../build/ChangeOwnership.json';

const address = '0x5Fdd44313f6d0a1a4A7554BB513E31eda008B354';

const abi = JSON.parse(ChangeOwnership.interface);

// console.log(abi);

export default new web3.eth.Contract(abi, address);