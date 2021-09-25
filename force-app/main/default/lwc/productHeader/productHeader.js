import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

export default class ProductHeader extends LightningElement {

    showProductCart = false;
    @api recordId;
    
    openCart() {
       this.showProductCart = true;
    }
    closeCart() {
        this.showProductCart = false;
    }

    @wire(CurrentPageReference)
    currentPageReference; 


    get recordIdFromState(){
        return this.currentPageReference.state.c__recordId; 
    }

    renderedCallback() {
        if (!this.recordId) {
            this.recordId = this.recordIdFromState;
        }
    }
}