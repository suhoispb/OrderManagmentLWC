import { LightningElement, wire } from 'lwc';

import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import PRODUCT_FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c';
import PRODUCT_TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';


import { publish, MessageContext } from "lightning/messageService";
import OrderMessageChannel from "@salesforce/messageChannel/OrderMessageChannel__c";

export default class Filter extends LightningElement {
    
  @wire(MessageContext)
  messageContext;

    product = {
        objectApiName : PRODUCT_OBJECT,
        fields : {
            family: PRODUCT_FAMILY_FIELD,
            type: PRODUCT_TYPE_FIELD  
        }
    }

        setFilter(event) {
        let familyFiled = this.template.querySelector("lightning-input-field[data-my-id=family]");
        let typeFiled = this.template.querySelector("lightning-input-field[data-my-id=type]");

        let filterData = {
            family: familyFiled.value,
            type: typeFiled.value
        }
        publish(this.messageContext, OrderMessageChannel, {
          family: filterData.family,
          type: filterData.type
        });
    }
}