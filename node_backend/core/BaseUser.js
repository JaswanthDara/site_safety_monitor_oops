class BaseUser {
  constructor(name, email, role = 'user') {
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date();
  }

  getProfile() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  }

  canAccessDashboard() {
    return this.role === 'admin';
  }

  updateEmail(newEmail) {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this.email = newEmail;
  }
}

module.exports = BaseUser;
