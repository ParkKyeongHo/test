EcommerceStore.deployed().then(function (f) { f.addProductToStore('iphone X', 'phones', 'QmcsnZZ17Hv8B6aXzsLnzcFTjyvcDRB1hnUfhRDkAtXdgM', 'deQmSW4Wp9uLr7a99LHQiG3NBfCftGuxPYCVJManZwg4fPUtscLink', 1536007648, web3.toWei(1, 'ether'), 0).then(function (f) { console.log(f) }) })
// truffle(development)> { tx: '0xf1fa0d904dd2a47884db245d744b7d3c49248f87748814cc5f1920a533fe4f64',
//   receipt:
//    { transactionHash: '0xf1fa0d904dd2a47884db245d744b7d3c49248f87748814cc5f1920a533fe4f64',
//      transactionIndex: 0,
//      blockHash: '0xe982e5c7d527f4669dee1d0b0098967e25c2ebc7ff3ffb13eed7d7430ef462f0',
//      blockNumber: 19,
//      gasUsed: 207349,
//      cumulativeGasUsed: 207349,
//      contractAddress: null,
//      logs: [],
//      status: '0x1',
//      logsBloom: '0x000000000000000000000000...' },
//   logs: [] }
//
// undefined

EcommerceStore.deployed().then(function (f) { f.productIndex.call().then(function (f) { console.log(f) }) })
// truffle(development)> BigNumber { s: 1, e: 0, c: [ 1 ] }
// In the line above, the productIndex is "c: [ 1 ]", not the initial "s"

EcommerceStore.deployed().then(function (f) { f.getProduct.call(1).then(function (f) { console.log(f) }) })
// truffle(development)> [ BigNumber { s: 1, e: 0, c: [ 1 ] },
//   'iphone X',
//   'phones',
//   'imageLink',
//   'descLink',
//   BigNumber { s: 1, e: 9, c: [ 1536007648 ] },
//   BigNumber { s: 1, e: 18, c: [ 10000 ] },
//   BigNumber { s: 1, e: 0, c: [ 0 ] },
//   '0x0000000000000000000000000000000000000000']

// Sample data
EcommerceStore.deployed().then(function (f) { f.addProductToStore('iPhone 8', 'phones', 'imageLink', 'descLink', 1536007648, web3.toWei(2.2, 'ether'), 0).then(function (f) { console.log(f) }) })
EcommerceStore.deployed().then(function (f) { f.addProductToStore('iPhone X', 'phones', 'imageLink', 'descLink', 1536007648, web3.toWei(2.5, 'ether'), 0).then(function (f) { console.log(f) }) })
EcommerceStore.deployed().then(function (f) { f.addProductToStore('Samsung Galaxy S6', 'phones', 'imageLink', 'descLink', 1536007648, web3.toWei(1.3, 'ether'), 0).then(function (f) { console.log(f) }) })

// Buy function
EcommerceStore.deployed().then(function (f) { f.buy(1, {value: web3.toWei(1, 'ether'), from: web3.eth.accounts[1]}).then(function (f){ console.log(f)})})

//escrow
EcommerceStore.deployed().then(function(f) {f.escrowInfo.call(1).then(function(f) {console.log(f)})})

// Check balance of the wallet. Default amount was 100 ETH, so it should be lower by product price
web3.eth.getBalance(web3.eth.accounts[1])

// Call getProduct and check buyer address
EcommerceStore.deployed().then(function (f) { f.getProduct.call(1).then(function (f) { console.log(f) }) })

//구매자 불러오기
EcommerceStore.deployed().then(function(f) {f.releaseAmountToSeller(1).then(function(f) {console.log(f)})})
EcommerceStore.deployed().then(function(f) {f.releaseAmountToSeller(1, {from:web3.eth.accounts[1]}).then(function(f) {console.log(f)})})





//ipfs console
./ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme
./ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
./ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[\"PUT\", \"POST\", \"GET\"]"
./ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'




ganache 
// over vacuum scissors melt burger reject access funny behind dove hold moment

//seed.js
truffle exec seed.js

//mongodb안될떄
sudo rm /var/lib/mongodb/mongod.lock 

mongod -–repair

sudo service mongod start

mongo



window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/405d90835a22404f91c36993be519dc4'));


ganache 다운로드 들어가서 실행
chmod a+x ganache-2.1.2-linux-x86_64.AppImage
./ganache-2.1.2-linux-x86_64.AppImage



web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<your access key>:8545"));


curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}'https://mainnet.infura.io/v3/405d90835a22404f91c36993be519dc4"

geth --rpc --rpccorsdomain "https://ropsten.infura.io/v3/405d90835a22404f91c36993be519dc4"


geth --identity "Ropsten" --rpc --rpcport "8080" --rpccorsdomain "*" --datadir "%GethBase%" --port "8545" --nodiscover --rpcapi "db,eth,net, web3, personal" --networkid 3 --testnet console



ngrok http 8081 -host-header="localhost:8081"
