const { BasePost, TimestampDecorator, SellerDecorator } = require('../../structuralPatterns/decorator');

describe('Patrón Decorator - Enriquecimiento de Publicaciones', () => {
  let basePost;
  let baseData;

  beforeEach(() => {
    baseData = { id: '123', title: 'iPhone 15 Pro', price: 5000000, category: 'electronics', state: 'new', username: 'juan' };
    basePost = new BasePost(baseData);
  });

  test('CP-DECORATOR-01: BasePost.getData() retorna los datos originales', () => {
    const data = basePost.getData();
    expect(data.id).toBe(baseData.id);
    expect(data.title).toBe(baseData.title);
  });

  test('CP-DECORATOR-02: TimestampDecorator agrega createdAt y updatedAt', () => {
    const decorated = new TimestampDecorator(basePost);
    const data = decorated.getData();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
    expect(data.title).toBe(baseData.title);
  });

  test('CP-DECORATOR-03: SellerDecorator agrega el email del vendedor', () => {
    const sellerEmail = 'juan@javeriana.edu.co';
    const decorated = new SellerDecorator(basePost, sellerEmail);
    const data = decorated.getData();
    expect(data.seller).toBe(sellerEmail);
    expect(data.title).toBe(baseData.title);
  });

  test('CP-DECORATOR-04: Múltiples decoradores pueden aplicarse secuencialmente', () => {
    const withTimestamp = new TimestampDecorator(basePost);
    const withSeller = new SellerDecorator(withTimestamp, 'vendedor@javeriana.edu.co');
    const data = withSeller.getData();
    expect(data.createdAt).toBeDefined();
    expect(data.updatedAt).toBeDefined();
    expect(data.seller).toBeDefined();
    expect(data.title).toBe(baseData.title);
  });

  test('CP-DECORATOR-05: Decorar con seller email vacío funciona', () => {
    const decorated = new SellerDecorator(basePost, '');
    const data = decorated.getData();
    expect(data.seller).toBe('');
  });

  test('CP-DECORATOR-06: Decorador anidado profundo debe funcionar', () => {
    let decorated = basePost;
    for (let i = 0; i < 5; i++) { decorated = new TimestampDecorator(decorated); }
    const data = decorated.getData();
    expect(data.title).toBe(baseData.title);
    expect(data.updatedAt).toBeDefined();
  });
});
