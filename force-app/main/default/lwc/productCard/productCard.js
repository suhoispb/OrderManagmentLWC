import { LightningElement, api, wire } from 'lwc';



import { publish, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";

export default class ProductCard extends LightningElement {

    @wire(MessageContext)
    messageContext;

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
        const e = new CustomEvent("select", { detail: this.product.Id });
        this.dispatchEvent(e);
        console.log('id1:', this.product.Id)
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

    //   let objRecord = {apiName: "Product__c", productObj};
    //   console.log('objRecordfromClickAddToCart:',objRecord);
     
}
    
