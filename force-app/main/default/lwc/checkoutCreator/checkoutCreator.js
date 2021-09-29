import {LightningElement, api, wire} from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import ORDER_OBJECT from '@salesforce/schema/Order__c';

import ORDER_NAME_FIELD from '@salesforce/schema/Order__c.Name';
import ORDER_ACCOUNT_ID_FIELD from '@salesforce/schema/Order__c.AccountId__c';
import TOTAL_PRICE_FIELD from '@salesforce/schema/Order__c.TotalPrice__c';
import TOTAL_PRODUCT_COUNT_FIELD from '@salesforce/schema/Order__c.TotalProductCount__c';

import ORDER_ITEM_OBJECT from '@salesforce/schema/OrderItem__c';

import PRODUCT_ID_FIELD from '@salesforce/schema/OrderItem__c.ProductId__c';
import ORDER_ID_FIELD from '@salesforce/schema/OrderItem__c.OrderId__c';
import PRODUCT_PRICE_FIELD from '@salesforce/schema/OrderItem__c.Price__c';
import ORDER_ITEM_NAME_FIELD from '@salesforce/schema/OrderItem__c.Name';
import ORDER_ITEM_QUANTITY_OF_PRODUCTS_FIELD from '@salesforce/schema/OrderItem__c.Quantity__c';


export default class CheckoutCreator extends LightningElement {

    accountId;
    recordsData;
    @api
    createOrder(data, accountId, accountName) {
        this.accountId = accountId;
        this.recordsData = data;
        const fields = {};
        fields[ORDER_NAME_FIELD.fieldApiName] = "Order by " + accountName;
        fields[ORDER_ACCOUNT_ID_FIELD.fieldApiName] = accountId;
        fields[TOTAL_PRICE_FIELD.fieldApiName] = 0;
        fields[TOTAL_PRODUCT_COUNT_FIELD.fieldApiName] = 0;
        createRecord({ apiName: ORDER_OBJECT.objectApiName, fields })
            .then((order) => {
                this.addOrderItems(order.id, accountName);
                console.log('order Id:', order.id);
                console.log('order:', order);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Order created',
                        message: 'Order Id: ' + order.id,
                        variant: 'success',
                    })
                );
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: order.id,
                            objectApiName: 'Order',
                            actionName: 'new'
                        }
                    });
            })
            .catch(error => {
                console.log(error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Order cannot be created due to error',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });

    }

    addOrderItems(orderId, accountName) {
        console.log('orderId на items:', orderId)
        for (let i in this.recordsData)
        {
            const fields = {};
            fields[PRODUCT_ID_FIELD.fieldApiName] = this.recordsData[i].id;
            fields[ORDER_ITEM_NAME_FIELD.fieldApiName] = orderId + " placed by: " + accountName;
            fields[ORDER_ID_FIELD.fieldApiName] = orderId;
            fields[PRODUCT_PRICE_FIELD.fieldApiName] = 0;
            fields[ORDER_ITEM_QUANTITY_OF_PRODUCTS_FIELD.fieldApiName] = this.recordsData[i].count;
            createRecord({ apiName: ORDER_ITEM_OBJECT.objectApiName, fields })
        }
    }

    
 }


