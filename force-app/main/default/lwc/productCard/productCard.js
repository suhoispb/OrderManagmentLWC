import { LightningElement, api, wire } from 'lwc';

import { publish, MessageContext } from "lightning/messageService";
import AddProduct from "@salesforce/messageChannel/AddProduct__c";

export default class ProductCard extends LightningElement {

    @wire(MessageContext)
    messageContextt;
    
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
  }

  addProductToCart() {
      let productObj = {
        Name: this.product.Name,
        Id: this.product.Id,
        Price__c: this.product.Price__c
      };
      publish(this.messageContextt, AddProduct, {
        objRecord: productObj
      });
  }
}
    
