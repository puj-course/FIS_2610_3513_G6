/**
 * PRUEBAS UNITARIAS patron strategy
 * Integrantes: Juan Pablo Sanchez, German Rodriguez
 */

class CategoryFilter {
  filter(products, category) {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category === category);
  }
}

class TextSearchFilter {
  filter(products, term) {
    if (!term || term.trim() === '') return products;
    const lower = term.toLowerCase().trim();
    return products.filter(p => p.title.toLowerCase().includes(lower));
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

describe('Patrón Strategy - Sistema de Filtros', () => {
  let mockProducts;

  beforeEach(() => {
    mockProducts = [
      { id: 1, title: 'iPhone 15 Pro', category: 'electronics', price: 5000000, username: 'juan' },
      { id: 2, title: 'MacBook NEO', category: 'computers', price: 8000000, username: 'maria' },
      { id: 3, title: 'Libro de JavaScript', category: 'books', price: 80000, username: 'carlos' },
      { id: 4, title: 'Samsung Galaxy S21', category: 'electronics', price: 4500000, username: 'juan' },
      { id: 5, title: 'Mouse Logitech', category: 'computers', price: 50000, username: 'ana' },
      { id: 6, title: 'Harry Potter', category: 'books', price: 120000, username: 'luis' }
    ];
  });

  test('CP-STRATEGY-01: Filtrar por categoría "electronics" debe retornar solo electrónicos', () => {
    const filter = new CategoryFilter();
    const result = filter.filter(mockProducts, 'electronics');
    expect(result).toHaveLength(2);
    expect(result[0].category).toBe('electronics');
  });

  test('CP-STRATEGY-02: Filtrar por categoría "books" debe retornar solo libros', () => {
    const filter = new CategoryFilter();
    const result = filter.filter(mockProducts, 'books');
    expect(result).toHaveLength(2);
    expect(result.every(p => p.category === 'books')).toBe(true);
  });

  test('CP-STRATEGY-03: Filtrar con categoría "all" debe retornar todos', () => {
    const filter = new CategoryFilter();
    const result = filter.filter(mockProducts, 'all');
    expect(result).toHaveLength(mockProducts.length);
  });

  test('CP-STRATEGY-04: Buscar por "iPhone" debe encontrar productos con ese texto', () => {
    const filter = new TextSearchFilter();
    const result = filter.filter(mockProducts, 'iPhone');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('iPhone 15 Pro');
  });

  test('CP-STRATEGY-05: Búsqueda case-insensitive debe funcionar', () => {
    const filter = new TextSearchFilter();
    const result = filter.filter(mockProducts, 'IPHONE');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('iPhone 15 Pro');
  });

    test('CP-STRATEGY-06: Filtrar por precio mínimo 5,000,000 debe retornar productos muy caros', () => {
    const filter = new PriceRangeFilter();
    const result = filter.filter(mockProducts, { min: 5000000 });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.price >= 5000000)).toBe(true);
  });

  test('CP-STRATEGY-07: Filtrar por precio máximo 100,000 debe retornar productos baratos', () => {
    const filter = new PriceRangeFilter();
    const result = filter.filter(mockProducts, { max: 100000 });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.price <= 100000)).toBe(true);
  });

  test('CP-STRATEGY-08: Filtrar por rango de precio (80,000 - 500,000)', () => {
    const filter = new PriceRangeFilter();
    const result = filter.filter(mockProducts, { min: 80000, max: 500000 });
    expect(result).toHaveLength(2);
  });

  test('CP-STRATEGY-09: CategoryFilter con categoría inválida retorna array vacío', () => {
    const filter = new CategoryFilter();
    const result = filter.filter(mockProducts, 'categoria_inexistente');
    expect(result).toHaveLength(0);
  });

  test('CP-STRATEGY-10: TextSearchFilter con string vacío retorna todos', () => {
    const filter = new TextSearchFilter();
    const result = filter.filter(mockProducts, '');
    expect(result).toHaveLength(mockProducts.length);
  });

  test('CP-STRATEGY-11: PriceRangeFilter con min negativo debe ignorar valor', () => {
    const filter = new PriceRangeFilter();
    const result = filter.filter(mockProducts, { min: -1000 });
    expect(result).toHaveLength(mockProducts.length);
  });

  test('CP-STRATEGY-12: Aplicar múltiples filtros secuencialmente', () => {
    const categoryFilter = new CategoryFilter();
    const textFilter = new TextSearchFilter();
    let result = categoryFilter.filter(mockProducts, 'computers');
    result = textFilter.filter(result, 'Mouse');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Mouse Logitech');
  });
});
