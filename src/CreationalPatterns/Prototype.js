class PostPrototype {
  constructor({ title, category, price, username, state, imageDataUrl }) {
    this.title = title;
    this.category = category;
    this.price = price;
    this.username = username;
    this.state = state;
    this.imageDataUrl = imageDataUrl || '';
  }
  clone() {
    return new PostPrototype({
      title: this.title,
      category: this.category,
      price: this.price,
      username: this.username,
      state: this.state,
      imageDataUrl: this.imageDataUrl
    });
  }
  withNewId() {
    const copy = this.clone();
    copy.id = String(Date.now());
    copy.createdAt = new Date().toISOString();
    return copy;
  }
}