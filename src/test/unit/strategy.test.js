/**
 * PRUEBAS UNITARIAS del patron strategy
 * Integrantes: Juan Pablo Sánchez, German Rodríguez
 */

// Definición de las clases Strategy (evitamos imports extra)
class CategoryFilter {
  filter(products, category) {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category === category);
  }
}

class TextSearchFilter {
  filter(products, term) {
    if (!term || term.trim() === '') return products;
    const lower = term.toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(lower) || (p.username && p.username.toLowerCase().includes(lower)));
  }
}

class PriceRangeFilter {
  filter(products, range) {
    const { min, max } = range;
    return products.filter(p => {
      const price = Number(p.price);
      if (min !== undefined && price < min) return false;
      if (max !== undefined && price > max) return false;
      return true;
    });
  }
}

class ProductFilter {
  constructor() { this.strategy = null; }
  setStrategy(strategy) { this.strategy = strategy; }
  apply(products, value) { if (!this.strategy) return products; return this.strategy.filter(products, value); }
}

describe('Patrón Strategy - Sistema de Filtros', () => {
  let mockProducts;
  let productFilter;

  beforeEach(() => {
    mockProducts = [
      { id: 1, title: 'iPhone 15 Pro max', category: 'electronics', price: 5000000, username: 'juan' },
      { id: 2, title: 'MacBook NEO', category: 'computers', price: 8000000, username: 'maria' },
      { id: 3, title: 'Libro de Fortnite', category: 'books', price: 80000, username: 'carlos' },
      { id: 4, title: 'Samsung Galaxy S21', category: 'electronics', price: 4500000, username: 'juan' },
      { id: 5, title: 'Mouse Logitech ', category: 'computers', price: 50000, username: 'ana' },
      { id: 6, title: 'libro de Harry Potter', category: 'books', price: 120000, username: 'luis' }
    ];
    productFilter = new ProductFilter();
  });

  // PRUEBAS POSITIVAS - CategoryFilter (no deberian haber errores)
  test('CP-STRATEGY-01: Filtrar por categoría "electronics" debe retornar solo electrónicos', () => {
    productFilter.setStrategy(new CategoryFilter());
    const result = productFilter.apply(mockProducts, 'electronics');
    expect(result).toHaveLength(2);
    expect(result.every(p => p.category === 'electronics')).toBe(true);
  });

  test('CP-STRATEGY-02: Filtrar por categoría "books" debe retornar solo libros', () => {
    productFilter.setStrategy(new CategoryFilter());
    const result = productFilter.apply(mockProducts, 'books');
    expect(result).toHaveLength(2);
    expect(result.every(p => p.category === 'books')).toBe(true);
  });

  test('CP-STRATEGY-03: Filtrar con categoría "all" debe retornar todos', () => {
    productFilter.setStrategy(new CategoryFilter());
    const result = productFilter.apply(mockProducts, 'all');
    expect(result).toHaveLength(mockProducts.length);
  });

  // PRUEBAS POSITIVAS - TextSearchFilter (no deberian haber errores)
  test('CP-STRATEGY-04: Buscar por "iPhone" debe encontrar productos con ese texto', () => {
    productFilter.setStrategy(new TextSearchFilter());
    const result = productFilter.apply(mockProducts, 'iPhone');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('iPhone 15 Pro');
  });

  test('CP-STRATEGY-05: Buscar por "juan" debe encontrar productos del usuario Juan', () => {
    productFilter.setStrategy(new TextSearchFilter());
    const result = productFilter.apply(mockProducts, 'juan');
    expect(result).toHaveLength(2);
    expect(result.every(p => p.username === 'juan')).toBe(true);
  });

  test('CP-STRATEGY-06: Búsqueda case-insensitive debe funcionar', () => {
    productFilter.setStrategy(new TextSearchFilter());
    const resultMayus = productFilter.apply(mockProducts, 'IPHONE');
    const resultMinus = productFilter.apply(mockProducts, 'iphone');
    expect(resultMayus).toHaveLength(1);
    expect(resultMinus).toHaveLength(1);
  });

  // PRUEBAS POSITIVAS - PriceRangeFilter (no deberian haber errores)
  test('CP-STRATEGY-07: Filtrar por precio mínimo 1,000,000 debe retornar productos caros', () => {
    productFilter.setStrategy(new PriceRangeFilter());
    const result = productFilter.apply(mockProducts, { min: 1000000 });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.price >= 1000000)).toBe(true);
  });

  test('CP-STRATEGY-08: Filtrar por precio máximo 100,000 debe retornar productos baratos', () => {
    productFilter.setStrategy(new PriceRangeFilter());
    const result = productFilter.apply(mockProducts, { max: 100000 });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.price <= 100000)).toBe(true);
  });

  // PRUEBAS NEGATIVAS (deberian haber errores)
  test('CP-STRATEGY-09: ProductFilter sin estrategia debe retornar productos sin filtrar', () => {
    const result = productFilter.apply(mockProducts, 'anything');
    expect(result).toEqual(mockProducts);
  });

  test('CP-STRATEGY-10: CategoryFilter con categoría inválida retorna array vacío', () => {
    productFilter.setStrategy(new CategoryFilter());
    const result = productFilter.apply(mockProducts, 'categoria_inexistente');
    expect(result).toHaveLength(0);
  });

  // PRUEBAS DE BORDE
  test('CP-STRATEGY-11: TextSearchFilter con string vacío retorna todos', () => {
    productFilter.setStrategy(new TextSearchFilter());
    const result = productFilter.apply(mockProducts, '');
    expect(result).toHaveLength(mockProducts.length);
  });

  test('CP-STRATEGY-12: PriceRangeFilter con min negativo debe ignorar valor', () => {
    productFilter.setStrategy(new PriceRangeFilter());
    const result = productFilter.apply(mockProducts, { min: -1000 });
    expect(result).toHaveLength(mockProducts.length);
  });

  // PRUEBA DE COMPOSICIÓN muchos filtros a la vez
  test('CP-STRATEGY-13: Aplicar múltiples filtros secuencialmente', () => {
    const categoryFilter = new CategoryFilter();
    const textFilter = new TextSearchFilter();
    let result = categoryFilter.filter(mockProducts, 'computers');
    result = textFilter.filter(result, 'Mouse');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Mouse Logitech');
  });
});
