class BasePost {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.category = data.category;
    this.state = data.state;
    this.username = data.username;
    this.imageDataUrl = data.imageDataUrl;
    this.createdAt = data.createdAt;
  }
  getData() {
    return { ...this };
  }
}

class PostDecorator {
  constructor(post) {
    this.post = post;
  }
  getData() {
    return this.post.getData();
  }
}

class TimestampDecorator extends PostDecorator {
  getData() {
    const data = this.post.getData();
    data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();
    return data;
  }
}

class SellerDecorator extends PostDecorator {
  constructor(post, sellerEmail) {
    super(post);
    this.sellerEmail = sellerEmail;
  }
  getData() {
    const data = this.post.getData();
    data.seller = this.sellerEmail;
    return data;
  }
}