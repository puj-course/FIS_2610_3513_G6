const { JaverianaUserFactory, StudentUser } = require('../../CreationalPatterns/factoryMethod');

describe('Patrón Factory Method - Creación de Usuarios', () => {
  let factory;

  beforeEach(() => {
    factory = new JaverianaUserFactory();
  });

  test('CP-FACTORY-01: Crear usuario con email @javeriana.edu.co debe ser exitoso', () => {
    const user = factory.register({ name: 'Juan', email: 'juan@javeriana.edu.co', password: 'pass123' });
    expect(user).toBeDefined();
    expect(user.email).toBe('juan@javeriana.edu.co');
  });

  test('CP-FACTORY-02: El usuario creado debe ser instancia de StudentUser', () => {
    const user = factory.register({ name: 'Juan', email: 'juan@javeriana.edu.co', password: 'pass123' });
    expect(user instanceof StudentUser).toBe(true);
  });

  test('CP-FACTORY-03: El password debe ser hasheado', () => {
    const user = factory.register({ name: 'Juan', email: 'juan@javeriana.edu.co', password: 'pass123' });
    expect(user.passwordHash).toBeDefined();
    expect(user.passwordHash).not.toBe('pass123');
  });

  test('CP-FACTORY-04: Email sin @javeriana.edu.co debe lanzar error', () => {
    expect(() => factory.register({ name: 'Juan', email: 'juan@gmail.com', password: 'pass123' })).toThrow();
  });

  test('CP-FACTORY-05: Email con @javeriana pero sin .edu.co debe lanzar error', () => {
    expect(() => factory.register({ name: 'Juan', email: 'juan@javeriana.com', password: 'pass123' })).toThrow();
  });

  test('CP-FACTORY-06: Email con subdominio debe ser válido', () => {
  const user = factory.register({ name: 'Juan', email: 'juan.perez@javeriana.edu.co', password: 'pass123' });
  expect(user).toBeDefined();
});

  test('CP-FACTORY-07: Email con mayúsculas debe normalizarse', () => {
    const user = factory.register({ name: 'Juan', email: 'JUAN@javeriana.edu.co', password: 'pass123' });
    expect(user.email).toBe('juan@javeriana.edu.co');
  });
});
