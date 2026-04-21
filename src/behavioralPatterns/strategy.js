class FilterStrategy {
  filter(products, value) {
    throw new Error('Implementar filter()');
  }
}

class CategoryFilter extends FilterStrategy {
  filter(products, category) {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category === category);
  }
}

class TextSearchFilter extends FilterStrategy {
  filter(products, term) {
    if (!term || term.trim() === '') return products;
    const lower = term.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(lower) ||
      (p.username && p.username.toLowerCase().includes(lower))
    );
  }
}

class PriceRangeFilter extends FilterStrategy {
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
  constructor() {
    this.strategy = null;
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  apply(products, value) {
    if (!this.strategy) return products;
    return this.strategy.filter(products, value);
  }
}