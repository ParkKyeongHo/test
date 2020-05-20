// var ecommerceStoreArtifacts = require('./build/contracts/EcommerceStore.json')
// var contract = require('truffle-contract')
// var Web3 = require('web3')
// var provider = new Web3.providers.HttpProvider("http://localhost:8545");
// var EcommerceStore = contract(ecommerceStoreArtifacts);
// EcommerceStore.setProvider(provider);

// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var ProductModel = require('./product');
// mongoose.connect("mongodb://localhost:27017/ebay_dapp",{
// useMongoClient:true
// });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// var express = require('express');

// var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.listen(3000, function() {
//   console.log("Ebay on Ethereum server listening on port 3000"); 
// });

// app.get('/',function(req, res){
//   res.send("hello, Ethereum!");
// });

// app.get('/products',function(req,res){
//   current_time = Math.round(new Date() / 1000);
//  query = { productStatus: {$eq: 0} }

//  if (Object.keys(req.query).length === 0) {
//   query['auctionEndTime'] = {$gt: current_time}
//  } else if (req.query.category !== undefined) {
//   query['auctionEndTime'] = {$gt: current_time}
//   query['category'] = {$eq: req.query.category}
//  } else if (req.query.productStatus !== undefined) {
//   if (req.query.productStatus == "reveal") {
//    query['auctionEndTime'] = {$lt: current_time, $gt: current_time - (60*60)}
//   } else if (req.query.productStatus == "finalize") {
//    query['auctionEndTime'] = { $lt: current_time - (60*60) }
//    query['productStatus'] = {$eq: 0}
//   }
//  }
// //   var query= {};
// //   if (req.query.category !== undefined){
// //     query['category'] = {$eq: req.query.category};
// //   }
// //   ProductModel.find(query,null, {sort: 'startTime'}, function(err, items){
// //     console.log(items.length);
// //     res.send(items);
// //   });
// // });

// setupProductEventListner();

// function setupProductEventListner() {
//   var productEvent;
//   EcommerceStore.deployed().then(function(index){
//     productEvent = index.NewProduct({fromBlock: 0, toBlock: 'latest'})
//     productEvent.watch(function(err, result){
//       if(err){
//         console.log(err)
//         return;
//       }
//       console.log(result.args);
//       saveProduct(result.args);
//     });
//   });
// }

// function saveProduct(product){
//   console.log("father: " + JSON.stringify(product));
//   console.log("si father:" + product._name);
//   let tmp1 = product._name;
//   let tmp2 = product._productId;
//   let tmp3 = product._category;
//   let tmp4 = product._imageLink;
//   let tmp5 = product._descLink;
//   let tmp6 = product._startTime;
//   let tmp7 = product._price;
//   let tmp8 = product._productCondition;

  
//   ProductModel.find(query, null, {sort: 'auctionEndTime'}, function (err, items) {
//     console.log(items.length);
//     res.send(items);
//    })

//   // ProductModel.findOne({ 'blockchainId': product._productId.toNumber() } , function (err, dbProduct) {
//   //   if (dbProduct != null){
//   //     return;
//   //   }
//   //     //  var product = new ProductModel({name: product._name, blockchainId: product._productId,
//   //     var product = new ProductModel({name: tmp1, blockchainId: tmp2,
//   //     category: tmp3, ipfsImageHash: tmp4, ipfsDescHash: tmp5,
//   //     startTime: tmp6, price: tmp7, condition: tmp8
//   //   });

//       product.save(function(error){
//         if(error) {
//           console.log(error);
//         }else {
//           ProductModel.count({}, function(err,count){
//             console.log("count is" + count);
//           });
//         }
//       });
//   }
// }
// /*
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.listen(3000, function() {
//   console.log("Ebay on Ethereum server listening on port 3000");
// });
// */
