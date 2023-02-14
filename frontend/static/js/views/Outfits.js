import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Outfits");
  }

  async getHtml() {
    return `
        <h1>Outfits</h1>
        <p>You are viewing today's outfits!</p>
    `;
}

  async getOutfits() {
    try {
      const response = await fetch('http://localhost:8080/outfit');
      const outfits = await response.json();
      return outfits;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

