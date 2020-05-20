/* eslint-disable max-len */
// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port:'5001', protocol: 'http'});
//const ipfs = ipfsAPI({host: 'ipfs.infura.io', port:'5001', protocol: 'http'});


// Import our contract artifacts and turn them into usable abstractions.
import ecommerceStoreArtifacts from '../../build/contracts/EcommerceStore.json'
//import { response } from 'express';

// MetaCoin is our usable abstraction, which we'll use through the code below.
var EcommerceStore = contract(ecommerceStoreArtifacts);
var reader;

window.App = {
  start: function () {
    var self = this;
  
    // Bootstrap the MetaCoin abstraction for Use.
    EcommerceStore.setProvider(web3.currentProvider);

    if($("#product-details").length > 0) {
      let productId = new URLSearchParams(window.location.search).get('id');
      renderProductDetails(productId);
    }else{
    renderStore();
  }

  $("#product-image").change(function(event) {
    const file = event.target.files[0]
    reader =new window.FileReader()
    reader.readAsArrayBuffer(file)
  });

  $('#add-item-to-store').submit(function(event) {
    const request = $('#add-item-to-store').serialize();
    //console.error(request);
    let params = JSON.parse('{"'+request.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}' );
    let decodedParams = {}
    Object.keys(params).forEach(function(v) {
      decodedParams[v] = decodeURIComponent(decodeURI(params[v]));
     });
    console.log(decodedParams);
    saveProduct(decodedParams);
    event.preventDefault();
    });
  
  
  $('#buy-now').submit(function(event)  {
    $('#msg').hide();
    var sendAmount = $('#buy-now-price').val();
    console.log(sendAmount);
    var productId = $('#product-id').val();
    // alert(sendAmount/1000000000000000000);
    EcommerceStore.deployed().then(function(f) {
        f.buy(productId, {value: web3.toWei(parseFloat(sendAmount/1000000000000000000), "ether"),from: web3.eth.accounts[0]}) .then(
          function(f)  {
        $('#msg').show();
        $('#msg').html(`상품 구입 완료!`);
      });
  });
  event.preventDefault();
});

  $("#release-funds").click(function(event) {
    let productId = new URLSearchParams(window.location.search).get('id');
    EcommerceStore.deployed().then(function(f) {
      $("#msg").html("Your transaction has been submitted. Please wait for few seconds for the confirmation").show();
      console.log(productId);
      f.releaseAmountToSeller(productId, {from: web3.eth.accounts[0]}).then(function(f) {
      console,log(f);
      location.reload();
    }).catch(function(e) {
      console.log(e);
    })
    });
});
  $("#refund-funds").click(function(event) {
    let productId = new URLSearchParams(window.location.search).get('id');
    EcommerceStore.deployed().then(function(f) {
      $("#msg").html("Your transaction has been submitted. Please wait for few seconds for the confirmation").show();
      console.log(productId);
      f.refundAmountToBuyer(productId, {from: web3.eth.accounts[0]}).then(function(f) {
      console,log(f);
      location.reload();
    }).catch(function(e) {
      console.log(e);
    })
  });
});
  }
};

function renderProductDetails(productId) {
   EcommerceStore.deployed().then(function(f) {
       f.getProduct.call(productId).then(function(product) {
         $('#product-name').html(product[1])
         $('#product-image').html("<img width='100'  src='http://localhost:8080/ipfs/" +product[3]+ "' />")
         $('#product-price').html(displayPrice(product[6]))
         $('#product-id').val(product[0])
         $('#buy-now-price').val(product[6])
         ipfs.cat(product[4]).then(function(file){
           var content = file.toString();
           $("#product-desc").append("<div>"+content+"</div>");
         })
         if(product[8] == '0x0000000000000000000000000000000000000000') {
           $("#escrow-info").hide();
         } else {
           $("#buy-now").hide();
           f.escrowInfo.call(productId).then(function(i) {
             $("#buyer").html(i[0]);
             $("#seller").html(i[1]);
             $("#arbiter").html(i[2]);
              $("#release-count").html(i[4].toNumber());
             $("#refund-count").html(i[5].toNumber());
           });
         }
       })
     })
 }
 
function saveProduct (product) {
  var imageId;
  var descId;
  saveImageOnIpfs(reader).then(function(id){
    imageId = id; 
    saveTextBlobOnIpfs(product["product-description"]).then(function(id) {
      descId = id;
  EcommerceStore.deployed().then(function(f) {
      return f.addProductToStore(product['product-name'],product['product-category'],imageId,
      descId,  Date.parse(product['product-start-time']) / 1000,
        web3.toWei(product['product-price'], 'ether'), product['product-condition'], { from: web3.eth.accounts[0], gas: 4700000});
    }).then(function(f) { 
      alert("상점에 상품 추가 완료!");
      location.href="/";
    });
  });
});
}

function saveImageOnIpfs(reader){
  return new Promise(function(resolve, reject) {
    const buffer = Buffer.from(reader.result);
    ipfs.add(buffer)
    .then((response) =>{
      console.log(response)
      resolve(response[0].hash);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}

function saveTextBlobOnIpfs(blob){
  return new Promise(function(resolve, reject) {
    const descBuffer = Buffer.from(blob,'utf-8');
    ipfs.add(descBuffer)
    .then((response) =>{
      console.log(response)
      resolve(response[0].hash);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}

function renderStore () {
  var instance;
  return EcommerceStore.deployed().then(function(f){
    instance = f;
    return instance.productIndex.call();
  }).then(function(count) {
    for(var i=1;i<=count;i++){
      renderProduct(instance,i);
    }
  });
}


// $.ajax({
//   url:"http://localhost:3000/products",
//   type: 'get',
//   contentType: "application/json; charset=utf-8",
//   data: {},
// }).done(function(data){
//   while(data.length >0) {
//     let chunks = data.splice(0,4);
//     chunks.forEach(function(value){
//       renderProduct(value);
//     });
//   }
// });
// }


function renderProduct (instance, index) {
  instance.getProduct.call(index).then(function(product)  {
    let node = $("<div />")
    //console.log(product);
    //console.error(instance, index);
    node.addClass("col-sm-3 text-center col-margin-bottom-1 product");
    node.append("<img src ='http://localhost:8080/ipfs/" + product[3] +"' />");
    node.append("<div class = 'title'>" + product[1] + "</div>");
    node.append("<div>" + displayPrice(product[6]) + "</div>");
    node.append("<a href='product.html?id=" + product[0] + "'>Details</div>");
    // Check if product was bought already
    if (product[8] === '0x0000000000000000000000000000000000000000') {
      $('#product-list').append(node)
    } else {
      $('#product-purchased').append(node)
    }
  })
}


function displayPrice (amount) {
  return `&Xi; ${web3.fromWei(amount, 'ether')}`
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    // You have to select local server in Metamask!
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local)
    //window.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/405d90835a22404f91c36993be519dc4'));
   
   window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    //window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/405d90835a22404f91c36993be519dc4'));


  }












  window.App.start();
});

