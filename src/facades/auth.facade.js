class UserStorageService {
  static USERS_KEY = 'unimercs_users';

  getAll() {
    return JSON.parse(localStorage.getItem(UserStorageService.USERS_KEY) || '[]');
  }

  findByEmail(email) {
    return this.getAll().find(u => u.email === email.toLowerCase()) || null;
  }
}
class CredentialValidator {
  verify(user, password) {
    if (!user) throw new Error('No existe cuenta con ese correo');
    // En producción comparar con bcrypt.compare()
    const inputHash = btoa(password + '_unimercs_salt');
    if (user.passwordHash !== inputHash)
      throw new Error('Contraseña incorrecta');
    return true;
  }
}
class SessionManager {
  static SESSION_KEY = 'unimercs_current_user';

  createSession(user, remember = false) {
    const session = {
      email: user.email, name: user.name,
      loginTime: new Date().toISOString(), remember
    };
    localStorage.setItem(SessionManager.SESSION_KEY, JSON.stringify(session));
    return session;
  }

  destroySession() {
    localStorage.removeItem(SessionManager.SESSION_KEY);
  }

  getSession() {
    const raw = localStorage.getItem(SessionManager.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}

//FACADE 
class AuthFacade {
  constructor() {
    this._storage = new UserStorageService();
    this._validator = new CredentialValidator();
    this._session = new SessionManager();
  }


  login(email, password, remember = false) {
    const user = this._storage.findByEmail(email);
    this._validator.verify(user, password);        
    return this._session.createSession(user, remember);
  }

  logout() {
    this._session.destroySession();
  }

  getCurrentUser() {
    return this._session.getSession();
  }

  isAuthenticated() {
    return this._session.getSession() !== null;
  }
}
