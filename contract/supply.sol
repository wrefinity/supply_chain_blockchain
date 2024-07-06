// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract SupplyChain {

    enum State {Created, Dispatched, InTransit, Delivered};

    struct Product {
        uint id;
        string name;
        uint price;
        string description;
        string category;
        uint quantity;
        address owner;
        State state;
        uint createdAt;
        uint updatedAt;
    }
    mapping(unit => Product) public products;
    event ProductStateChange(uint indexed productId, State state);

    function createProduct(
        string memory _name,
        uint _price,
        string memory _description,
        string memory _category,
        uint _quantity,
    ){
        productCount ++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            _description,
            _category,
            _quantity,
            msg.sender,
            State.Created,
            block.timestamp,
            block.timestamp
        );

    }

    function dispatchProduct(uint _productId) public {
        require(products[_productId].owner == msg.sender, "Only farmer that ownes the product can dispatch the product");
        products[_productId].state = State.Dispatched;
        products[_productId].updatedAt = block.timestamp;
        emit ProductStateChange(_productId, State.Dispatched);
    }

    function inTransitProduct(uint _productId) public{
        require(products[_productId].owner == msg.sender, "Only owner can change intransit state");
        products[_productId].state = State.InTransit;
        products[_productId].updatedAt = block.timestamp;
        emit ProductStateChange(_productId, State.InTransit);
    }

    function deliverProduct(uint _productId, address _newOwner) public {
        require(products[_productId].owner == msg.sender, "Only owner can deliver");
        products[_productId].owner = _newOwner;
        products[_productId].state = State.Delivered;
        products[_productId].updatedAt = block.timestamp;
        emit ProductStateChange(_productId, State.Delivered);
    }
}