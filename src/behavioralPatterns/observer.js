class PostObserver {
  update(post) {
    throw new Error('Implementar update()');
  }
}

class PostEventBus {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }
  notify(post) {
    this.observers.forEach(o => o.update(post));
  }
}

class FeedUpdater extends PostObserver {
  update(post) {
    const posts = JSON.parse(localStorage.getItem('mh_user_posts') || '[]');
    posts.unshift(post);
    localStorage.setItem('mh_user_posts', JSON.stringify(posts));
    localStorage.setItem('mh_user_posts:updatedAt', String(Date.now()));
  }
}

class ProfileUpdater extends PostObserver {
  update(post) {
    const session = JSON.parse(localStorage.getItem('unimercs_current_user') || 'null');
    if (!session) return;
    const users = JSON.parse(localStorage.getItem('unimercs_users') || '[]');
    const idx = users.findIndex(u => u.email === session.email);
    if (idx >= 0) {
      if (!users[idx].profile) users[idx].profile = { posts: [] };
      users[idx].profile.posts.push(post.id);
      localStorage.setItem('unimercs_users', JSON.stringify(users));
    }
  }
}

class NotificationObserver extends PostObserver {
  update(post) {
    window.dispatchEvent(new CustomEvent('unimercs:new-post', { detail: post }));
  }
}