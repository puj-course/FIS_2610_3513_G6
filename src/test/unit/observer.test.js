/**
 * PRUEBAS UNITARIAS del patron observer
 * Integrantes: Juan Pablo Sánchez, German Rodríguez
 */

// Definición de las clases Observer (para ahorrar muchos imports)
class PostEventBus {
  constructor() { this.observers = []; }
  subscribe(observer) { this.observers.push(observer); }
  unsubscribe(observer) { this.observers = this.observers.filter(o => o !== observer); }
  notify(post) { this.observers.forEach(o => o.update(post)); }
}

class FeedUpdater {
  update(post) {
    const posts = JSON.parse(localStorage.getItem('mh_user_posts') || '[]');
    posts.unshift(post);
    localStorage.setItem('mh_user_posts', JSON.stringify(posts));
  }
}

describe('Patrón Observer - Sistema de Notificaciones', () => {
  let eventBus;
  let mockPost;

  beforeEach(() => {
    localStorage.clear();
    eventBus = new PostEventBus();
    mockPost = { id: '123', title: 'iPhone 15 Pro', price: 5000000, username: 'juan' };
  });

  // PRUEBAS POSITIVAS (pruebas que no deberian salir errores
  test('CP-OBSERVER-01: Observer suscrito debe recibir notificación', () => {
    const mockObserver = { update: jest.fn() };
    eventBus.subscribe(mockObserver);
    eventBus.notify(mockPost);
    expect(mockObserver.update).toHaveBeenCalledTimes(1);
    expect(mockObserver.update).toHaveBeenCalledWith(mockPost);
  });

  test('CP-OBSERVER-02: Múltiples observers deben recibir la notificación', () => {
    const observer1 = { update: jest.fn() };
    const observer2 = { update: jest.fn() };
    const observer3 = { update: jest.fn() };
    eventBus.subscribe(observer1);
    eventBus.subscribe(observer2);
    eventBus.subscribe(observer3);
    eventBus.notify(mockPost);
    expect(observer1.update).toHaveBeenCalledTimes(1);
    expect(observer2.update).toHaveBeenCalledTimes(1);
    expect(observer3.update).toHaveBeenCalledTimes(1);
  });

  test('CP-OBSERVER-03: FeedUpdater debe guardar el post en localStorage', () => {
    const feedUpdater = new FeedUpdater();
    eventBus.subscribe(feedUpdater);
    eventBus.notify(mockPost);
    const storedPosts = JSON.parse(localStorage.getItem('mh_user_posts') || '[]');
    expect(storedPosts).toHaveLength(1);
    expect(storedPosts[0].id).toBe(mockPost.id);
  });

  // PRUEBAS NEGATIVAS (osea pruebas que debe salir un error)
  test('CP-OBSERVER-04: Desuscribir observer debe evitar notificaciones', () => {
    const mockObserver = { update: jest.fn() };
    eventBus.subscribe(mockObserver);
    eventBus.unsubscribe(mockObserver);
    eventBus.notify(mockPost);
    expect(mockObserver.update).not.toHaveBeenCalled();
  });

  // PRUEBAS DE BORDE
  test('CP-OBSERVER-05: Notificar sin observers no debe causar error', () => {
    expect(() => { eventBus.notify(mockPost); }).not.toThrow();
  });

  test('CP-OBSERVER-06: Post vacío puede ser notificado', () => {
    const mockObserver = { update: jest.fn() };
    eventBus.subscribe(mockObserver);
    expect(() => { eventBus.notify(null); }).not.toThrow();
    expect(mockObserver.update).toHaveBeenCalledWith(null);
  });

  test('CP-OBSERVER-07: Suscribir el mismo observer dos veces causa duplicados', () => {
    const mockObserver = { update: jest.fn() };
    eventBus.subscribe(mockObserver);
    eventBus.subscribe(mockObserver);
    eventBus.notify(mockPost);
    expect(mockObserver.update).toHaveBeenCalledTimes(2);
  });
});
