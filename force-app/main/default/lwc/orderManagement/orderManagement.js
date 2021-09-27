import { LightningElement, wire, track } from 'lwc';

import getListOfProductsByName from "@salesforce/apex/ProductController.getListOfProductsByName";
import getListOfProductsByType from "@salesforce/apex/ProductController.getListOfProductsByType";
import getListOfProductsByFamily from "@salesforce/apex/ProductController.getListOfProductsByFamily";

import { subscribe, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";


export default class OrderManagement extends LightningElement {

    @track products=[];
    error;

    isLoading = true;

    key='';
    family = '';
    type = '';

    subscription = null;

    @wire(MessageContext)
    messageContext;

    updateKey(event) {
      this.key = event.detail;
    }
    
    subscribeToMessageChannel() {
      this.subscription = subscribe(
        this.messageContext,
        OrderMessageChannel,
        (message) => this.handleMessage(message)
      );
    };
  
    handleMessage({ family, type }) {
      this.family = family;
      this.type = type;
      console.log('productFamily:', this.family)
    }
    
    connectedCallback() {
      this.subscribeToMessageChannel();
    }

    @wire(getListOfProductsByName, { searchKey: "$key" })
    wiredProductsByName(result) {
      const {data, error} = result;
      this.wiredProducts = result;
      if (data) {
        this.products = data;
        this.error = undefined;
        this.isLoading = false;
      } else if (error) {
        this.error = error;
        this.products = undefined;
        this.isLoading = false;
      }
    }
    @wire(getListOfProductsByFamily, { family: "$family" })
    wiredProductsByFamily({ error, data }) {
      if (data) {
        this.products = data;
        this.error = undefined;
        this.isLoading = false;
      } else if (error) {
        this.error = error;
        this.products = undefined;
        this.isLoading = false;
      }
    }
    @wire(getListOfProductsByType, { type: "$type" })
    wiredProductsByType({ error, data }) {
      if (data) {
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