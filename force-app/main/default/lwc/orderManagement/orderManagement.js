import { LightningElement, wire, track } from 'lwc';

import searchProducts from "@salesforce/apex/ProductController.searchProducts";

import { subscribe, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";


export default class OrderManagement extends LightningElement {

    @track products=[];
    error;

    isLoading = true;

    searchTerm='';
    filterFamily = '';
    filterType = '';

    subscription = null;

    @wire(MessageContext)
    messageContext;

    updateKey(event) {
      this.searchTerm = event.detail;
    }
    
    subscribeToMessageChannel() {
      this.subscription = subscribe(
        this.messageContext,
        OrderMessageChannel,
        (message) => this.handleMessage(message)
      );
    };
  
    handleMessage({ family, type }) {
      this.filterFamily = family;
      this.filterType = type;
    }
    
    connectedCallback() {
      this.subscribeToMessageChannel();
    }

    @wire(searchProducts, {searchTerm: '$searchTerm', filterType: '$filterType', filterFamily: '$filterFamily'})
	  wiredProducts({error, data}) {
      if(data) {
        this.products = data;
        this.error = undefined;
        this.isLoading = false;
      } else if (error) {
        this.error = error;
        this.products = undefined;
        this.isLoading = false;
      }
    }
}