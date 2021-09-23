import { LightningElement, api, wire, track } from 'lwc';

import { subscribe, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";


const actions = [
    { label: 'Delete', name: 'delete' }
];

const columns = [
    { label: 'Name', fieldName: 'name', wrapText: true },
    { label: 'Price', fieldName: 'price', type: 'currency' },
    { label: 'Quantity', fieldName: 'quantity', type: 'number' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class ProductHeader extends LightningElement {    
    
    @wire(MessageContext)
    messageContext;
    
    
    @api showProductCart;

    @track columns = columns; 
    @track productCart = [];
    

    closeProductCart() {
        this.dispatchEvent(new CustomEvent("closecart"));
    }

    handleRowAction(event) {
        console.log('handle row action:', event.detail.row.Id)
    }

    get totalPrice() {
        return this.productCart.reduce((acc, item) => {
            return acc += item.quantity * item.price;
        }, 0);
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
          this.messageContext,
          OrderMessageChannel,
          (message) => this.handleMessage(message)
        );
      };
    
    handleMessage({ objRecord }) {
        console.log('objRecordInSubscr:', objRecord);
        this.addProductToCart(objRecord);
      }

    connectedCallback() {
        this.subscribeToMessageChannel();
      }

    addProductToCart(objRecord) {        
        let elemIndex = this.productCart.findIndex(elem => {
            console.log(elem.productId);
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
}