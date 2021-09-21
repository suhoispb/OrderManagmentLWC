import { LightningElement, api, wire, track } from 'lwc';

import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import PRODUCT_NAME_FIELD from '@salesforce/schema/Product__c.Name';
import PRODUCT_IMAGE_FIELD from '@salesforce/schema/Product__c.Image__c';
import PRODUCT_FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c';
import PRODUCT_TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import PRODUCT_PRICE_FIELD from '@salesforce/schema/Product__c.Price__c';
import PRODUCT_DESCRIPTION_FIELD from '@salesforce/schema/Product__c.Description__c';

import{ CurrentPageReference } from 'lightning/navigation';

const actions = [
    { label: 'Delete', name: 'delete' }
];

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Price', fieldName: 'price', type: 'currency' },
    { label: 'Quantity', fieldName: 'quantity', type: 'number' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class ProductHeader extends LightningElement {
    @api recordId;
    
    @wire(CurrentPageReference)
    pageRef;
   
    product = {
        objectApiName : PRODUCT_OBJECT,
        fields : {
            name        : PRODUCT_NAME_FIELD,
            image       : PRODUCT_IMAGE_FIELD,
            family      : PRODUCT_FAMILY_FIELD,
            type        : PRODUCT_TYPE_FIELD,
            price       : PRODUCT_PRICE_FIELD,
            description : PRODUCT_DESCRIPTION_FIELD
        }
    }
    
    
    @api showProductCart = false;

    @track columns = columns; 

    @track productCart = [];

    closeProductCart() {
        this.showProductCart = false;
    }

    
    handleRowAction(event) {
        console.log('handle row action:', event.detail.row.Id)
    }

    get totalPrice() {
        return this.productCart.reduce((acc, item) => {
            return acc += item.quantity * item.price;
        }, 0);
    }
}