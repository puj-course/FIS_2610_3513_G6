class User {
  constructor({ id, name, email, passwordHash, role, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.profile = { posts: [], favorites: [], rating: 0 }; // inicializar el perfil vacío
    this.createdAt = createdAt;
  }
}

//CONCRETE PRODUCT
class StudentUser extends User {
  constructor(data) {
    super({ ...data, role: 'student' });
  }
  validate() {
    if (!this.email.endsWith('@javeriana.edu.co'))
      throw new Error('Correo debe ser @javeriana.edu.co');
  }
}

//ABSTRACT CREATOR
class UserFactory {
  createUser(data) { throw new Error('Implementar en subclase'); }

  // template del metodo que usa el factory method
  register(data) {
    const hashedPassword = this._hashPassword(data.password);
    const user = this.createUser({
      id: String(Date.now()),
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString()
    });
    user.validate();
    return user;
  }

  _hashPassword(password) {
    return btoa(password + '_unimercs_salt');
  }
}

//CONCRETE CREATOR
class JaverianaUserFactory extends UserFactory {
  createUser(data) {
    this._validateDomain(data.email);
    return new StudentUser(data);
  }

  _validateDomain(email) {
    if (!email.endsWith('@javeriana.edu.co'))
      throw new Error('Solo se permiten correos @javeriana.edu.co');
  }
}
