// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract SupplyChainContract{

    enum State {Created, InTransit, Delivered}
    address public owner;
    uint public productId;

    constructor() {
        owner = msg.sender;
    }

    State public currentState;

    struct Product {
        uint id;
        string name;
        uint price;
        string description;
        string category;
        uint quantity;
        address farmer;
        address distributor;
        address retailer;
        State state;
        uint createdAt;
        uint updatedAt;
    }

    mapping (uint => Product) public products;
    event productStateChange(uint indexed productId, State state);
    event OwnershipTransferred(address newOwner);
    event quantityUpdated(uint productId, uint quantity);

    modifier onlyOwner(){
        require(msg.sender == owner, "right restricted product owner only");
        _;
    }
    modifier InState(State state){
        require(currentState == state, "Invalid State Passed");
        _;
    }

    modifier validProduct(uint _productId){
        require(products[_productId].farmer != address(0), "Product Doesnot Exits");
        _;
    }


    function createProduct(
        string memory _name,
        uint _price,
        string memory _description,
        string memory _category,
        uint _quantity,
        address _farmer,
        address _distributor,
        address _retailer
    ){
        productId ++;

        products[productId] = Product({
            productId,
            _name,
            _price,
            _description,
            _category,
            _quantity,
            _farmer,
            _distributor,
            _retailer,
            State.Created,
            block.timestamp,
            block.timestamp
        })
        currentState = State.Created;
        emit productStateChange(productId, State.Created);

    }

    function updateQuantity(uint _productId, uint _newQuantity) public onlyOwner validProduct(_productId){
        products[_productId].quantity = _newQuantity;
        emit quantityUpdated(_productId, _newQuantity); 
    }

    function transferOwnership(address _newOwner) public onlyOwner{
        owner = _newOwner;
        emit OwnershipTransferred(_newOwner);
    }

    function updateProductTransitState(uint _productId, State _state){
        products[_productId].state = _state;
        products[_productId].updatedAt = block.timestamp;
        productStateChange(_state);
    }

    function getProductDetails(uint _productId) public view returns (string memory, string memory,  uint, address, address, address) {
        Product storage product = products[_productId];
        return (product.name, product.category, product.quantity, product.farmer, product.distributor, product.retailer);
    }
}