import { LightningElement, api, wire } from 'lwc';

import { publish, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";

export default class ProductCard extends LightningElement {

    @wire(MessageContext)
    messageContext;
    
    idProductForDetails = '';

    @api product = {
        Name: "",
        Id: "",
        Description__c: "",
        Type__c: "",
        Family__c: "",
        Image__c: "",
        Price__c: "",
    };
    

    setDetails() {
        this.idProductForDetails =  this.product.Id;
        console.log('adiProduct:', this.idProductForDetails)
  }

  addProductToCart() {
      let productObj = {
        Name: this.product.Name,
        Id: this.product.Id,
        Price__c: this.product.Price__c
      };
      publish(this.messageContext, OrderMessageChannel, {
        objRecord: productObj
      });
  }
}
    
