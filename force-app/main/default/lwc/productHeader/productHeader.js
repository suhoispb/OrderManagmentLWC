import { LightningElement } from 'lwc';

export default class ProductHeader extends LightningElement {

    showProductCart = false;
    
    openCart() {
       this.showProductCart = true;
    }
    closeCart() {
        this.showProductCart = false;
    }
}