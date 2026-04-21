class UserStorage {
  getAll() {
    return JSON.parse(localStorage.getItem('unimercs_users') || '[]');
  }
  findByEmail(email) {
    return this.getAll().find(u => u.email === email.toLowerCase()) || null;
  }
  save(user) {
    const all = this.getAll();
    all.push(user);
    localStorage.setItem('unimercs_users', JSON.stringify(all));
  }
}

class CredentialValidator {
  verify(user, password) {
    if (!user) throw new Error('No existe una cuenta con ese correo');
    const hash = btoa(password + '_salt');
    const legacyMatch = user.password === password;
    const hashMatch = user.passwordHash === hash;
    if (!legacyMatch && !hashMatch)
      throw new Error('Contraseña incorrecta');
  }
}

class SessionManager {
  create(user) {
    const session = { email: user.email, name: user.name, loginTime: new Date().toISOString() };
    localStorage.setItem('unimercs_current_user', JSON.stringify(session));
    return session;
  }
  destroy() {
    localStorage.removeItem('unimercs_current_user');
  }
  get() {
    const raw = localStorage.getItem('unimercs_current_user');
    return raw ? JSON.parse(raw) : null;
  }
  isActive() {
    return this.get() !== null;
  }
}

class AuthFacade {
  constructor() {
    this.storage = new UserStorage();
    this.validator = new CredentialValidator();
    this.session = new SessionManager();
  }
  login(email, password) {
    const user = this.storage.findByEmail(email);
    this.validator.verify(user, password);
    return this.session.create(user);
  }
  logout() {
    this.session.destroy();
  }
  getSession() {
    return this.session.get();
  }
  isLoggedIn() {
    return this.session.isActive();
  }
}