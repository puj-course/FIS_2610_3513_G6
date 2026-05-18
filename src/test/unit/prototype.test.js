const { PostPrototype } = require('../../CreationalPatterns/Prototype');

describe('Patrón Prototype - Clonación de Publicaciones', () => {
  let original;

  beforeEach(() => {
    original = new PostPrototype({ title: 'Libro', category: 'books', price: 30000, username: 'juan', state: 'used', imageDataUrl: '' });
  });

  test('CP-PROTOTYPE-01: clone() debe crear un objeto idéntico', () => {
    const clone = original.clone();
    expect(clone.title).toBe(original.title);
    expect(clone.price).toBe(original.price);
  });

  test('CP-PROTOTYPE-02: El clon debe ser un objeto diferente (referencia)', () => {
    const clone = original.clone();
    expect(clone).not.toBe(original);
  });

  test('CP-PROTOTYPE-03: Modificar el clon no afecta al original', () => {
    const clone = original.clone();
    clone.title = 'Otro';
    expect(original.title).toBe('Libro');
  });

  test('CP-PROTOTYPE-04: withNewId() debe generar un ID único', () => {
    const copy = original.withNewId();
    expect(copy.id).toBeDefined();
  });

  test('CP-PROTOTYPE-05: withNewId() debe agregar createdAt timestamp', () => {
    const copy = original.withNewId();
    expect(copy.createdAt).toBeDefined();
  });

  test('CP-PROTOTYPE-06: El nuevo post mantiene las propiedades del original', () => {
    const copy = original.withNewId();
    expect(copy.title).toBe(original.title);
    expect(copy.category).toBe(original.category);
  });

  test('CP-PROTOTYPE-07: Clonar con imagen vacía funciona', () => {
    const clone = original.clone();
    expect(clone.imageDataUrl).toBe('');
  });

  test('CP-PROTOTYPE-08: Clonar post con precio 0 funciona', () => {
    const free = new PostPrototype({ title: 'Gratis', category: 'other', price: 0, username: 'juan', state: 'used', imageDataUrl: '' });
    const clone = free.clone();
    expect(clone.price).toBe(0);
  });
});
