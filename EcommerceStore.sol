pragma solidity ^0.4.23;

import "./Escrow.sol";

contract EcommerceStore {

    // Simple enum to store product conditions
    enum ProductCondition {New, Used}

    // Count of products in the blockchain
    uint public productIndex;

    address public arbiter;

    // Sellers (address) have a list of Products identified by their ids
    mapping(address => mapping(uint => Product)) stores;
    // Owners of product
    mapping(uint => address) productIdInStore;

    mapping(uint => address) productEscrow;

    struct Product {
        uint id;
        string name;
        string category;
        string imageLink;
        string descLink;
        uint startTime;
        uint price;
        ProductCondition condition;
        address buyer;
    }

    //event NewProduct(uint _productId, string _name, string _category, string _imageLink, string _descLink, uint _startTime, uint _price, uint _productCondition);

    constructor(address _arbiter) public {
        productIndex = 0;
        arbiter = _arbiter;
    }


    function addProductToStore(string _name, string _category, string _imageLink,
        string _descLink, uint _startTime, uint _price, uint _productCondition) public {

        productIndex += 1;
        Product memory product = Product(productIndex, _name, _category, _imageLink,
            _descLink, _startTime, _price, ProductCondition(_productCondition), 0);

        stores[msg.sender][productIndex] = product;
        productIdInStore[productIndex] = msg.sender;
        //emit NewProduct(productIndex, _name, _category, _imageLink, _descLink, _startTime, _price, _productCondition);
    }

    function getProduct(uint _productId) public view returns (uint, string, string, string,
        string, uint, uint, ProductCondition, address) {
            Product memory product = stores[productIdInStore[_productId]][_productId];

            return (product.id, product.name, product.category, product.imageLink,
                product.descLink, product.startTime, product.price, product.condition,
                product.buyer);
    }

    function buy(uint _productId) payable public {
        Product memory product = stores[productIdInStore[_productId]][_productId];

        // Check if product is not purchased yet
        require(product.buyer == address(0));

        // Check if enough Ether was sent to buy
        require(msg.value >= product.price);

        // Update owner and then save to store
        product.buyer = msg.sender;
        stores[productIdInStore[_productId]][_productId] = product;
       Escrow escrow = (new Escrow).value(msg.value)(_productId, msg.sender,productIdInStore[_productId], arbiter);

        productEscrow[_productId] = escrow;
    }

    function escrowInfo(uint _productId) view public returns (address,address,address,bool,uint,uint)
    {
        return Escrow(productEscrow[_productId]).escrowInfo();
    }

    function releaseAmountToSeller(uint _productId) public {
        Escrow(productEscrow[_productId]).releaseAmountToSeller(msg.sender);
    }
    function refundAmountToBuyer(uint _productId) public {
        Escrow(productEscrow[_productId]).refundAmountToBuyer(msg.sender);
    }
}

