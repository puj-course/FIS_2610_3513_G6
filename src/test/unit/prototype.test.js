/**
 * PRUEBAS UNITARIAS del patron prototype
 * Integrantes: Juan Pablo Sánchez, German Rodríguez.
 */

class PostPrototype {
  constructor({ title, category, price, username, state, imageDataUrl }) {
    this.title = title; this.category = category; this.price = price;
    this.username = username; this.state = state; this.imageDataUrl = imageDataUrl || '';
  }
  clone() {
    return new PostPrototype({
      title: this.title, category: this.category, price: this.price,
      username: this.username, state: this.state, imageDataUrl: this.imageDataUrl
    });
  }
  withNewId() {
    const copy = this.clone();
    copy.id = String(Date.now());
    copy.createdAt = new Date().toISOString();
    return copy;
  }
}

describe('Patrón Prototype - Clonación de Publicaciones', () => {
  let originalPost;

  beforeEach(() => {
    originalPost = new PostPrototype({
      title: 'iPhone 15 Pro', category: 'electronics', price: 5000000,
      username: 'juan_pablo', state: 'new', imageDataUrl: 'data:image/png;...'
    });
  });

  // PRUEBAS POSITIVAS (no deberian salir errores)
  test('CP-PROTOTYPE-01: clone() debe crear un objeto idéntico', () => {
    const cloned = originalPost.clone();
    expect(cloned.title).toBe(originalPost.title);
    expect(cloned.price).toBe(originalPost.price);
    expect(cloned.category).toBe(originalPost.category);
  });

  test('CP-PROTOTYPE-02: El clon debe ser un objeto diferente (referencia)', () => {
    const cloned = originalPost.clone();
    expect(cloned).not.toBe(originalPost);
  });

  test('CP-PROTOTYPE-03: Modificar el clon no afecta al original', () => {
    const cloned = originalPost.clone();
    cloned.title = 'Modificado';
    cloned.price = 1000;
    expect(originalPost.title).toBe('iPhone 15 Pro');
    expect(originalPost.price).toBe(5000000);
    expect(cloned.title).toBe('Modificado');
  });

  test('CP-PROTOTYPE-04: withNewId() debe generar un ID único', () => {
    const post1 = originalPost.withNewId();
    const post2 = originalPost.withNewId();
    expect(post1.id).toBeDefined();
    expect(post2.id).toBeDefined();
    expect(post1.id).not.toBe(post2.id);
  });

  test('CP-PROTOTYPE-05: withNewId() debe agregar createdAt timestamp', () => {
    const newPost = originalPost.withNewId();
    expect(newPost.createdAt).toBeDefined();
  });

  test('CP-PROTOTYPE-06: El nuevo post mantiene las propiedades del original', () => {
    const newPost = originalPost.withNewId();
    expect(newPost.title).toBe(originalPost.title);
    expect(newPost.price).toBe(originalPost.price);
  });

  // PRUEBAS DE BORDE
  test('CP-PROTOTYPE-07: Clonar con imagen vacía funciona', () => {
    const postSinImagen = new PostPrototype({
      title: 'Sin foto', category: 'books', price: 50000,
      username: 'test', state: 'used', imageDataUrl: ''
    });
    const cloned = postSinImagen.clone();
    expect(cloned.imageDataUrl).toBe('');
  });

  test('CP-PROTOTYPE-08: Clonar post con precio 0 funciona', () => {
    const freePost = new PostPrototype({
      title: 'Gratis', category: 'home', price: 0,
      username: 'test', state: 'used', imageDataUrl: ''
    });
    const cloned = freePost.clone();
    expect(cloned.price).toBe(0);
  });
});
