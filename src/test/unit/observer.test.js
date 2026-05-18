const { PostEventBus, FeedUpdater, PostObserver } = require('../../behavioralPatterns/observer');

describe('Patrón Observer - Sistema de Notificaciones', () => {
  let bus;

  beforeEach(() => {
    localStorage.clear();
    bus = new PostEventBus();
  });

  test('CP-OBSERVER-01: Observer suscrito debe recibir notificación', () => {
    const received = [];
    const obs = { update: (p) => received.push(p) };
    bus.subscribe(obs);
    bus.notify({ id: '1', title: 'Test' });
    expect(received.length).toBe(1);
  });

  test('CP-OBSERVER-02: Múltiples observers deben recibir la notificación', () => {
    const r1 = [], r2 = [];
    bus.subscribe({ update: (p) => r1.push(p) });
    bus.subscribe({ update: (p) => r2.push(p) });
    bus.notify({ id: '1' });
    expect(r1.length).toBe(1);
    expect(r2.length).toBe(1);
  });

  test('CP-OBSERVER-03: FeedUpdater debe guardar el post en localStorage', () => {
    const updater = new FeedUpdater();
    bus.subscribe(updater);
    bus.notify({ id: '1', title: 'Libro' });
    const posts = JSON.parse(localStorage.getItem('mh_user_posts'));
    expect(posts.length).toBe(1);
    expect(posts[0].title).toBe('Libro');
  });

  test('CP-OBSERVER-04: Desuscribir observer debe evitar notificaciones', () => {
    const received = [];
    const obs = { update: (p) => received.push(p) };
    bus.subscribe(obs);
    bus.unsubscribe(obs);
    bus.notify({ id: '1' });
    expect(received.length).toBe(0);
  });

  test('CP-OBSERVER-05: Notificar sin observers no debe causar error', () => {
    expect(() => bus.notify({ id: '1' })).not.toThrow();
  });

  test('CP-OBSERVER-06: Post vacío puede ser notificado', () => {
    const received = [];
    bus.subscribe({ update: (p) => received.push(p) });
    bus.notify({});
    expect(received.length).toBe(1);
  });

  test('CP-OBSERVER-07: Suscribir el mismo observer dos veces causa duplicados', () => {
    const received = [];
    const obs = { update: (p) => received.push(p) };
    bus.subscribe(obs);
    bus.subscribe(obs);
    bus.notify({ id: '1' });
    expect(received.length).toBe(2);
  });
});
