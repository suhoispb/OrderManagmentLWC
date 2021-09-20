import { LightningElement } from "lwc";

class Search extends LightningElement {
  
  setSearch() {
    this.dispatchEvent(
      new CustomEvent("cchange", {
        detail: this.template.querySelector("lightning-input").value
      })
    );
  }
}

export default Search;
