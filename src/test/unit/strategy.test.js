const { CategoryFilter, TextSearchFilter, PriceRangeFilter, ProductFilter } = require('../../behavioralPatterns/strategy');

describe('Patrón Strategy - Sistema de Filtros', () => {
  let products;

  beforeEach(() => {
    products = [
      { title: 'iPhone 15 Pro', category: 'electronics', price: 6000000, username: 'juan' },
      { title: 'Libro de Jest', category: 'books', price: 80000, username: 'maria' },
      { title: 'Audífonos Sony', category: 'electronics', price: 300000, username: 'pedro' },
      { title: 'Mochila Totto', category: 'clothing', price: 150000, username: 'ana' },
    ];
  });

  test('CP-STRATEGY-01: Filtrar por categoría "electronics" debe retornar solo electrónicos', () => {
    const f = new CategoryFilter();
    expect(f.filter(products, 'electronics').length).toBe(2);
  });

  test('CP-STRATEGY-02: Filtrar por categoría "books" debe retornar solo libros', () => {
    const f = new CategoryFilter();
    expect(f.filter(products, 'books').length).toBe(1);
  });

  test('CP-STRATEGY-03: Filtrar con categoría "all" debe retornar todos', () => {
    const f = new CategoryFilter();
    expect(f.filter(products, 'all').length).toBe(4);
  });

  test('CP-STRATEGY-04: Buscar por "iPhone" debe encontrar productos con ese texto', () => {
    const f = new TextSearchFilter();
    expect(f.filter(products, 'iPhone').length).toBe(1);
  });

  test('CP-STRATEGY-05: Búsqueda case-insensitive debe funcionar', () => {
    const f = new TextSearchFilter();
    expect(f.filter(products, 'iphone').length).toBe(1);
  });

  test('CP-STRATEGY-06: Filtrar por precio mínimo 5,000,000 debe retornar productos muy caros', () => {
    const f = new PriceRangeFilter();
    expect(f.filter(products, { min: 5000000 }).length).toBe(1);
  });

  test('CP-STRATEGY-07: Filtrar por precio máximo 100,000 debe retornar productos baratos', () => {
    const f = new PriceRangeFilter();
    expect(f.filter(products, { max: 100000 }).length).toBe(1);
  });

  test('CP-STRATEGY-08: Filtrar por rango de precio (80,000 - 500,000)', () => {
    const f = new PriceRangeFilter();
    expect(f.filter(products, { min: 80000, max: 500000 }).length).toBe(3);
  });

  test('CP-STRATEGY-09: CategoryFilter con categoría inválida retorna array vacío', () => {
    const f = new CategoryFilter();
    expect(f.filter(products, 'furniture').length).toBe(0);
  });

  test('CP-STRATEGY-10: TextSearchFilter con string vacío retorna todos', () => {
    const f = new TextSearchFilter();
    expect(f.filter(products, '').length).toBe(4);
  });

  test('CP-STRATEGY-11: PriceRangeFilter con min negativo debe ignorar valor', () => {
    const f = new PriceRangeFilter();
    expect(f.filter(products, { min: -1 }).length).toBe(4);
  });

  test('CP-STRATEGY-12: Aplicar múltiples filtros secuencialmente', () => {
    const pf = new ProductFilter();
    pf.setStrategy(new CategoryFilter());
    const elec = pf.apply(products, 'electronics');
    pf.setStrategy(new PriceRangeFilter());
    const result = pf.apply(elec, { max: 400000 });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Audífonos Sony');
  });
});
