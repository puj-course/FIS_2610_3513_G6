const { AuthFacade, UserStorage } = require('../../structuralPatterns/facade');

describe('Patrón Facade - AuthFacade', () => {
  let auth;

  beforeEach(() => {
    localStorage.clear();
    auth = new AuthFacade();
    const storage = new UserStorage();
    storage.save({ name: 'Juan', email: 'juan@javeriana.edu.co', passwordHash: btoa('pass123_salt'), password: null });
  });

  test('CP-FACADE-01: Login con credenciales válidas debe retornar sesión', () => {
    const session = auth.login('juan@javeriana.edu.co', 'pass123');
    expect(session).toBeDefined();
    expect(session.email).toBe('juan@javeriana.edu.co');
  });

  test('CP-FACADE-02: Después de login, isLoggedIn() debe retornar true', () => {
    auth.login('juan@javeriana.edu.co', 'pass123');
    expect(auth.isLoggedIn()).toBe(true);
  });

  test('CP-FACADE-03: getSession() debe retornar la sesión actual', () => {
    auth.login('juan@javeriana.edu.co', 'pass123');
    const session = auth.getSession();
    expect(session).not.toBeNull();
    expect(session.email).toBe('juan@javeriana.edu.co');
  });

  test('CP-FACADE-04: Login con usuario inexistente debe lanzar error', () => {
    expect(() => auth.login('noexiste@javeriana.edu.co', 'pass123')).toThrow();
  });

  test('CP-FACADE-05: Login con contraseña incorrecta debe lanzar error', () => {
    expect(() => auth.login('juan@javeriana.edu.co', 'wrongpass')).toThrow();
  });

  test('CP-FACADE-06: Login con email vacío debe lanzar error', () => {
    expect(() => auth.login('', 'pass123')).toThrow();
  });

  test('CP-FACADE-07: Login con contraseña vacía debe lanzar error', () => {
    expect(() => auth.login('juan@javeriana.edu.co', '')).toThrow();
  });

  test('CP-FACADE-08: Logout debe destruir la sesión', () => {
    auth.login('juan@javeriana.edu.co', 'pass123');
    auth.logout();
    expect(auth.isLoggedIn()).toBe(false);
  });

  test('CP-FACADE-09: La sesión debe persistir en localStorage', () => {
    auth.login('juan@javeriana.edu.co', 'pass123');
    const raw = localStorage.getItem('unimercs_current_user');
    expect(raw).not.toBeNull();
  });

  test('CP-FACADE-10: Logout debe eliminar la sesión del localStorage', () => {
    auth.login('juan@javeriana.edu.co', 'pass123');
    auth.logout();
    expect(localStorage.getItem('unimercs_current_user')).toBeNull();
  });
});
