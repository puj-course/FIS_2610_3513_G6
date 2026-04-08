class PostObserver {
  update(post) { throw new Error('Implementar update()'); }
}

class PostEventBus {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    if (!(observer instanceof PostObserver))
      throw new TypeError('Debe implementar PostObserver');
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  notify(post) {
    this._observers.forEach(observer => observer.update(post));
  }
}

const postBus = new PostEventBus();

class ExploreUpdater extends PostObserver {
  update(post) {
    const posts = JSON.parse(localStorage.getItem('mh_user_posts') || '[]');
    posts.unshift(post);
    localStorage.setItem('mh_user_posts', JSON.stringify(posts));
    localStorage.setItem('mh_user_posts:updatedAt', String(Date.now()));
    console.log(`[ExploreUpdater] Publicación '${post.title}' agregada al feed`);
  }
}

class ProfileUpdater extends PostObserver {
  update(post) {
    const session = JSON.parse(localStorage.getItem('unimercs_current_user') || 'null');
    if (!session) return;
    const users = JSON.parse(localStorage.getItem('unimercs_users') || '[]');
    const userIdx = users.findIndex(u => u.email === session.email);
    if (userIdx >= 0) {
      users[userIdx].profile.posts.push(post.id);
      localStorage.setItem('unimercs_users', JSON.stringify(users));
    }
    console.log(`[ProfileUpdater] Perfil de ${session.name} actualizado`);
  }
}

class NotificationObserver extends PostObserver {
  update(post) {
    // Podría enviar un push notification, email, o mostrar toast
    const event = new CustomEvent('unimercs:new-post', { detail: post });
    window.dispatchEvent(event);
    console.log(`[NotificationObserver] Evento disparado para '${post.title}'`);
  }
}
