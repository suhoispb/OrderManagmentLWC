import { LightningElement, api, wire, track } from 'lwc';

import { subscribe, MessageContext } from "lightning/messageService";
import AddProduct from "@salesforce/messageChannel/AddProduct__c";

const columns = [
    { label: 'Name', fieldName: 'name', wrapText: true },
    { label: 'Price', fieldName: 'price', type: 'currency' },
    { label: 'Quantity', fieldName: 'quantity', type: 'number' }
];

export default class ProductHeader extends LightningElement {    
    
    @wire(MessageContext)
    messageContextt;
    
    @api showProductCart;
    @api accountId;
    @api accountName;

    @track columns = columns; 
    @track productCart = [];

    objRecord='';

    subscription = null;
    

    closeProductCart() {
        this.dispatchEvent(new CustomEvent("closecart"));
    }

    get totalPrice() {
        return this.productCart.reduce((acc, item) => {
            return acc += item.quantity * item.price;
        }, 0);
    }
    get isProductCartEmpty() {
        return !this.productCart.length;
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
          this.messageContextt,
          AddProduct,
          (message) => this.handleMessage(message)
        );
      };
    
      handleMessage({ objRecord }) {
        this.addProductToCart(objRecord);
      }

    connectedCallback() {
        this.subscribeToMessageChannel();
      }


    addProductToCart(objRecord) {        
        let elemIndex = this.productCart.findIndex(elem => {
            return elem.productId == objRecord.Id
        });

        if (elemIndex != -1) {
            this.productCart[elemIndex].quantity += 1;
        } else {
            this.productCart.push(this.createOrderItem(objRecord)); 
        }
    }

    createOrderItem(product) {
        let orderItem = {
            productId : product.Id,
            name      : product.Name,
            quantity  : 1,
            price     : product.Price__c
        }
        return orderItem;
    }
    
    handleCheckoutClick() {
        if (this.accountId == '') {
            console.log('this.accountId:', this.accountId)
            this.closeProductCart();
            this.productCart = [];
        } else if (this.accountId != '') {
            this.template.querySelector('c-checkout-creator').createOrder(this.productCart, this.accountId, this.accountName);
            this.closeProductCart();
            this.productCart = [];
        }
    }
}
