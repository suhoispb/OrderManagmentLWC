import { LightningElement, api } from 'lwc';

export default class ProductCard extends LightningElement {
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
}
    
