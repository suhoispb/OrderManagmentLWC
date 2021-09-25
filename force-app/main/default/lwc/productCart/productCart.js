import { LightningElement, api, wire, track } from 'lwc';

import { subscribe, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";

import createOrder from "@salesforce/apex/OrderController.createOrder";

import { ShowToastEvent } from "lightning/platformShowToastEvent";
import{ CurrentPageReference } from 'lightning/navigation';


const columns = [
    { label: 'Name', fieldName: 'name', wrapText: true },
    { label: 'Price', fieldName: 'price', type: 'currency' },
    { label: 'Quantity', fieldName: 'quantity', type: 'number' }
];

export default class ProductHeader extends LightningElement {    
    
    @wire(MessageContext)
    messageContext;
    
    
    @api showProductCart;

    @track columns = columns; 
    @track productCart = [];
    
    @api recordId;
    
    @wire(CurrentPageReference)
    pageRef;

    get recordIdFromState(){
        return this.pageRef.state.c__recordId; 
    }

    renderedCallback() {
        if (!this.recordId && this.recordIdFromState) {
            this.recordId = this.recordIdFromState;
        }
    }

    closeProductCart() {
        this.dispatchEvent(new CustomEvent("closecart"));
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
        let order = {
            accountId : this.recordId,
            orderItems : this.productCart
        }
        console.log('order:', order)

        let orderJSON = JSON.stringify(order);
        
        createOrder({orderJSON: orderJSON})
            .then(result => {
                const evt = new ShowToastEvent({
                    title: "Order created",
                    message: "Order Id: " + result,
                    variant: "success"
                });
                this.dispatchEvent(evt);
                
                this.productCart = [];
                this.showProductCart = false;
            })
            .catch(error => {
                const evt = new ShowToastEvent({
                    title: "Error",
                    message: "Message: " + error.body.message,
                    variant: "error"
                });
                this.dispatchEvent(evt);
            });
    }
}