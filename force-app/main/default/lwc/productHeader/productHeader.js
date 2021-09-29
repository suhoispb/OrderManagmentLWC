import { LightningElement, api, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';

import ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';

import CONTACT_ID from '@salesforce/schema/User.ContactId';

import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import PRODUCT_ID_FIELD from '@salesforce/schema/Product__c.Id';
import PRODUCT_NAME_FIELD from '@salesforce/schema/Product__c.Name';
import PRODUCT_IMAGE_FIELD from '@salesforce/schema/Product__c.Image__c';
import PRODUCT_FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c';
import PRODUCT_TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import PRODUCT_PRICE_FIELD from '@salesforce/schema/Product__c.Price__c';
import PRODUCT_DESCRIPTION_FIELD from '@salesforce/schema/Product__c.Description__c';

import ISMANAGER_FIELD from '@salesforce/schema/User.isManager__c';

import { getRecord } from 'lightning/uiRecordApi';
import currentUserId from '@salesforce/user/Id';

import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord } from "lightning/uiRecordApi";


export default class ProductHeader extends LightningElement {

    @track showCreateProductForm = false;
    showProductCart = false;

    userId = currentUserId;

    isManager = true;

    accountId='';
    accountName = '';
    accountNumber = '';
    contactId = '0035g00000FEHCZAA5';

    // contactId = '0035g00000FEHCZAA5'; - hard code contactId for checking functions


    contacts = [];
    
    product = {
        objectApiName : PRODUCT_OBJECT,
        fields : {
            id          : PRODUCT_ID_FIELD,
            name        : PRODUCT_NAME_FIELD,
            image       : PRODUCT_IMAGE_FIELD,
            family      : PRODUCT_FAMILY_FIELD,
            type        : PRODUCT_TYPE_FIELD,
            price       : PRODUCT_PRICE_FIELD,
            description : PRODUCT_DESCRIPTION_FIELD
        }
    }
    
    

    openCart() {
       this.showProductCart = true;
    }

    closeCart() {
        this.showProductCart = false;
    }


    // @wire (getRecord, { recordId: '$userId', fields: [ CONTACT_ID ] })
    // wiredContactId({error,data}) {
    //     if(error) {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Error loading field',
    //                 message: error.body.message,
    //                 variant: 'error',
    //             }),
    //         )
    //     } else if (data) {
    //         this.contactId = data.fields.ContactId.value;
    //         console.log('data of contactId:', data)
    //     }
    // }
    @wire (getRecord, { recordId: '$contactId', fields: [ ACCOUNT_ID ] })
    wiredAccountId({error,data}) {
        if(error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading field',
                    message: error.body.message,
                    variant: 'error',
                }),
            )
        } else if (data) {
            this.accountId = data.fields.AccountId.value;
        }
    }
    @wire (getRecord, { recordId: '$accountId', fields: [ ACCOUNT_NAME_FIELD, ACCOUNT_NUMBER_FIELD] })
    wiredcurrentAcc({error, data}) {
        if(error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading field',
                    message: error.body.message,
                    variant: 'error',
                }),
            )
        } else if (data) {
            this.accountName = data.fields.Name.value;
            this.accountNumber = data.fields.AccountNumber.value;
        }
    }
    

    @wire (getRecord, { recordId: '$userId', fields: [ISMANAGER_FIELD] })
    wiredcurrentUser({error, data}) {
        if(error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading field',
                    message: error.body.message,
                    variant: 'error',
                }),
            )
        } else if (data) {
            this.isManager = data.fields.isManager__c.value;
        }
    }

    handleCreateProductFormCancel() {
        this.showCreateProductForm = false;
    }

    handleCreateProductClick() {
        this.showCreateProductForm = true;
    }
    
    handleSuccess(event) {
        let fields = {
            Name: this.template.querySelector(".nameInput").value,
            Image__c: this.template.querySelector(".imageInput").value,
            Family__c: this.template.querySelector(".familyInput").value,
            Type__c: this.template.querySelector(".typeInput").value,
            Price__c: this.template.querySelector(".priceInput").value,
            Description__c: this.template.querySelector(".descrInput").value
          };
          let objRecordInput = { apiName: "Product__c", fields };
          createRecord(objRecordInput)
            .then((prod) => {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Success",
                  message: "Product created",
                  variant: "success"
                })
              );
            })
            .catch((error) => {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Error creating product",
                  message: error.body.message,
                  variant: "error"
                })
              );
            });
        this.showCreateProductForm = false;
    }
}