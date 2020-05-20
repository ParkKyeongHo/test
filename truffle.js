// Allows us to use ES6 in our migrations and tests.
require('babel-register')
//var HDwalletProvider =require('truffle-hdwallet-provider')
// const HDWallet = require('truffle-hdwallet-provider');
//const infuraKey = "405d90835a22404f91c36993be519dc4";
//const fs = require('fs');
//const privateKey = "0x2cd99e17869853a4611434d63387e0a266cac57a";
//const mnemonic = fs.readFileSync(".secret").toString().trim(); 
//const mnemonic = 'stuff enforce intact fork hurt rubber broken useless major shaft pet true'
// var accessToken = '[INFURA ACCESS TOKEN]'
// const HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
  networks: {
    development: {
      //host: '192.168.0.2',
       
      host: '127.0.0.1',
     // host: '0.0.0.0',
      port: '8545',
      network_id: '*', // Match any network id
      //from:"0xf5aeeb8d107f728ebe423b3a8c16e341aaa1383e",
      //gaslimit: 470000
    }
    // ropsten:{
    //   provider:function(){
    //     return new HDwalletProvider( mnemonic, 'https://ropsten.infura.io/v3/405d90835a22404f91c36993be519dc4')
    //   },
    //    network_id : '3',
    //   //  host: '127.0.0.1',
    //   //  port: '7545',
    //   // from:'0x2cd99e17869853a4611434d63387e0a266cac57a',
    //    gas:5500000,
    //   // gasLimit:2000000,

    // }
  }
};
  

