/**
 * PRUEBAS UNITARIAS del patron facade
 * Integrantes: Juan Pablo Sánchez, German Rodríguez
 */

// Definimos las clases directamente en la prueba HICIMOS ESTO PARA NO TENER QUE METERLE IMPORTS POR MONTONES
class UserStorage {
  getAll() { return JSON.parse(localStorage.getItem('unimercs_users') || '[]'); }
  findByEmail(email) { return this.getAll().find(u => u.email === email.toLowerCase()) || null; }
  save(user) { const all = this.getAll(); all.push(user); localStorage.setItem('unimercs_users', JSON.stringify(all)); }
}

class CredentialValidator {
  verify(user, password) {
    if (!user) throw new Error('No existe una cuenta con ese correo');
    const hash = btoa(password + '_salt');
    const legacyMatch = user.password === password;
    const hashMatch = user.passwordHash === hash;
    if (!legacyMatch && !hashMatch) throw new Error('Contraseña incorrecta');
  }
}

class SessionManager {
  create(user) {
    const session = { email: user.email, name: user.name, loginTime: new Date().toISOString() };
    localStorage.setItem('unimercs_current_user', JSON.stringify(session));
    return session;
  }
  destroy() { localStorage.removeItem('unimercs_current_user'); }
  get() { const raw = localStorage.getItem('unimercs_current_user'); return raw ? JSON.parse(raw) : null; }
  isActive() { return this.get() !== null; }
}

class AuthFacade {
  constructor() { this.storage = new UserStorage(); this.validator = new CredentialValidator(); this.session = new SessionManager(); }
  login(email, password) { const user = this.storage.findByEmail(email); this.validator.verify(user, password); return this.session.create(user); }
  logout() { this.session.destroy(); }
  getSession() { return this.session.get(); }
  isLoggedIn() { return this.session.isActive(); }
}

describe('🧪 Patrón Facade - AuthFacade', () => {
  let authFacade;
  let testUser;

  beforeEach(() => {
    localStorage.clear();
    authFacade = new AuthFacade();
    testUser = {
      email: 'juan.test@javeriana.edu.co',
      name: 'Juan Pablo',
      password: 'Password123!',
      passwordHash: btoa('Password123!_salt')
    };
    const users = [testUser];
    localStorage.setItem('unimercs_users', JSON.stringify(users));
  });

  // PRUEBAS POSITIVAS (AQUI SALEN LAS QUE NO DEBERIAN TIRAR ERROR)
  test('CP-FACADE-01: Login con credenciales válidas debe retornar sesión', () => {
    const session = authFacade.login(testUser.email, 'Password123!');
    expect(session).toBeDefined();
    expect(session.email).toBe(testUser.email);
    expect(session.name).toBe(testUser.name);
  });

  test('CP-FACADE-02: Después de login, isLoggedIn() debe retornar true', () => {
    authFacade.login(testUser.email, 'Password123!');
    expect(authFacade.isLoggedIn()).toBe(true);
  });

  test('CP-FACADE-03: getSession() debe retornar la sesión actual', () => {
    const session = authFacade.login(testUser.email, 'Password123!');
    expect(authFacade.getSession()).toEqual(session);
  });

  // PRUEBAS NEGATIVAS (AQUI SALE LOS ERRORES)
  test('CP-FACADE-04: Login con usuario inexistente debe lanzar error', () => {
    expect(() => {
      authFacade.login('noexiste@javeriana.edu.co', 'cualquierpass');
    }).toThrow('No existe una cuenta con ese correo');
  });

  test('CP-FACADE-05: Login con contraseña incorrecta debe lanzar error', () => {
    expect(() => {
      authFacade.login(testUser.email, 'WrongPassword');
    }).toThrow('Contraseña incorrecta');
  });

  test('CP-FACADE-06: Login con email vacío debe lanzar error', () => {
    expect(() => {
      authFacade.login('', 'password');
    }).toThrow('No existe una cuenta con ese correo');
  });

  // PRUEBAS DE BORDE
  test('CP-FACADE-07: Login con contraseña vacía debe lanzar error', () => {
    expect(() => {
      authFacade.login(testUser.email, '');
    }).toThrow('Contraseña incorrecta');
  });

  test('CP-FACADE-08: Logout debe destruir la sesión', () => {
    authFacade.login(testUser.email, 'Password123!');
    expect(authFacade.isLoggedIn()).toBe(true);
    authFacade.logout();
    expect(authFacade.isLoggedIn()).toBe(false);
    expect(authFacade.getSession()).toBeNull();
  });

  test('CP-FACADE-09: La sesión debe persistir en localStorage', () => {
    const session = authFacade.login(testUser.email, 'Password123!');
    const stored = localStorage.getItem('unimercs_current_user');
    expect(stored).toBeDefined();
    expect(JSON.parse(stored)).toEqual(session);
  });

  test('CP-FACADE-10: Logout debe eliminar la sesión del localStorage', () => {
    authFacade.login(testUser.email, 'Password123!');
    expect(localStorage.getItem('unimercs_current_user')).toBeDefined();
    authFacade.logout();
    expect(localStorage.getItem('unimercs_current_user')).toBeNull();
  });
});
