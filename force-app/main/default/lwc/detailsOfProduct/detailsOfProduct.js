import { LightningElement, wire, track, api } from "lwc";
import getListOfProductsById from "@salesforce/apex/ProductController.getListOfProductsById";

export default class DetailsOfProduct extends LightningElement {
  
  @track product;

  @api idProductForDetails;

  @wire(getListOfProductsById, { id: "$idProductForDetails" })
  wiredProducts({ error, data }) {
    if (error) {
      this.product = null;
    }
    if (data) {
      this.product = data;
      console.log(this.product)
    }
  }

  closeModal() {
    this.product = undefined;
  }
  
}
