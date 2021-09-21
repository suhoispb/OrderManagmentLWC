import { LightningElement, wire, track } from "lwc";

import { subscribe, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";

import getListOfProductsById from "@salesforce/apex/ProductController.getListOfProductsById";


export default class DetailsOfProduct extends LightningElement {
  
  id = '';
  @track product;
  subscription = null;

  @wire(MessageContext)
  messageContext;

 
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      OrderMessageChannel,
      (message) => this.handleMessage(message)
    );
  };

  handleMessage({ productId }) {
    this.id = productId;
    console.log('id3',this.id)
  }

  @wire(getListOfProductsById, { id: "$id" })
  wiredProducts({ error, data }) {
    if (error) {
      this.product = null;
    }
    if (data) {
      console.log('id4:', this.id)
      this.product = data;
      console.log(this.product)
    }
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  closeModal() {
    this.product = undefined;
    console.log('close Modal pls')
  }
  
}
