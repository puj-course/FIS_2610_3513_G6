/**
 * PRUEBAS UNITARIAS del patron factory method
 * Integrantes: Juan Pablo Sánchez, German Rodríguez
 */

// Definición de las clases Factory (evitamos imports)
class User {
  constructor({ id, name, email, passwordHash, role, createdAt }) {
    this.id = id; this.name = name; this.email = email; this.passwordHash = passwordHash;
    this.role = role; this.profile = { posts: [], favorites: [] }; this.createdAt = createdAt;
  }
}

class StudentUser extends User {
  constructor(data) { super({ ...data, role: 'student' }); }
  validate() { if (!this.email.endsWith('@javeriana.edu.co')) throw new Error('Solo se permiten correos @javeriana.edu.co'); }
}

class JaverianaUserFactory {
  createUser(data) {
    if (!data.email.endsWith('@javeriana.edu.co')) throw new Error('Solo se permiten correos @javeriana.edu.co');
    return new StudentUser(data);
  }
  register(data) {
    const user = this.createUser({
      id: String(Date.now()), name: data.name, email: data.email.toLowerCase(),
      passwordHash: btoa(data.password + '_salt'), createdAt: new Date().toISOString()
    });
    user.validate();
    return user;
  }
}

describe('Patrón Factory Method - Creación de Usuarios', () => {
  let factory;

  beforeEach(() => { factory = new JaverianaUserFactory(); });

  // PRUEBAS POSITIVAS (no deberian haber errores)
  test('CP-FACTORY-01: Crear usuario con email @javeriana.edu.co debe ser exitoso', () => {
    const user = factory.register({ name: 'Juan Pablo', email: 'juan@javeriana.edu.co', password: 'Password123!' });
    expect(user).toBeDefined();
    expect(user.email).toBe('juan@javeriana.edu.co');
    expect(user.role).toBe('student');
    expect(user.id).toBeDefined();
  });

  test('CP-FACTORY-02: El usuario creado debe ser instancia de StudentUser', () => {
    const user = factory.register({ name: 'German', email: 'german@javeriana.edu.co', password: 'SecurePass456!' });
    expect(user).toBeInstanceOf(StudentUser);
  });

  test('CP-FACTORY-03: El password debe ser hasheado', () => {
    const user = factory.register({ name: 'Test', email: 'test@javeriana.edu.co', password: 'MiPassword123' });
    expect(user.passwordHash).toBeDefined();
    expect(user.passwordHash).not.toBe('MiPassword123');
  });

  // PRUEBAS NEGATIVAS (deberian haber errores)
  test('CP-FACTORY-04: Email sin @javeriana.edu.co debe lanzar error', () => {
    expect(() => {
      factory.register({ name: 'Invalido', email: 'usuario@gmail.com', password: 'Pass123!' });
    }).toThrow('Solo se permiten correos @javeriana.edu.co');
  });

  test('CP-FACTORY-05: Email con @javeriana pero sin .edu.co debe lanzar error', () => {
    expect(() => {
      factory.register({ name: 'Test', email: 'test@javeriana.com', password: 'Pass123!' });
    }).toThrow('Solo se permiten correos @javeriana.edu.co');
  });

  // PRUEBAS DE BORDE
  test('CP-FACTORY-06: Email con subdominio debe ser válido', () => {
    const user = factory.register({ name: 'Subdominio', email: 'user@estudiante.javeriana.edu.co', password: 'Pass123!' });
    expect(user).toBeDefined();
    expect(user.email).toBe('user@estudiante.javeriana.edu.co');
  });

  test('CP-FACTORY-07: Email con mayúsculas debe normalizarse', () => {
    const user = factory.register({ name: 'Test', email: 'USER@JAVERIANA.EDU.CO', password: 'Pass123!' });
    expect(user.email).toBe('user@javeriana.edu.co');
  });
});
