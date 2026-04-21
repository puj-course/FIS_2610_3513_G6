class User {
  constructor({ id, name, email, passwordHash, role, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.profile = { posts: [], favorites: [] };
    this.createdAt = createdAt;
  }
}

class StudentUser extends User {
  constructor(data) {
    super({ ...data, role: 'student' });
  }
  validate() {
    if (!this.email.endsWith('@javeriana.edu.co'))
      throw new Error('Solo se permiten correos @javeriana.edu.co');
  }
}

class UserFactory {
  createUser(data) {
    throw new Error('Implementar en subclase');
  }
  register(data) {
    const user = this.createUser({
      id: String(Date.now()),
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: btoa(data.password + '_salt'),
      createdAt: new Date().toISOString()
    });
    user.validate();
    return user;
  }
}

class JaverianaUserFactory extends UserFactory {
  createUser(data) {
    if (!data.email.endsWith('@javeriana.edu.co'))
      throw new Error('Solo se permiten correos @javeriana.edu.co');
    return new StudentUser(data);
  }
}