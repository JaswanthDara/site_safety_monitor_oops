export default class UserFactory {
  static create(type = "user", payload = {}) {
    const base = {
      name: payload.name || "Anonymous",
      email: payload.email || null,
      createdAt: new Date(),
      meta: payload.meta || {},
    };

    if (type === "admin") {
      return {
        ...base,
        role: "admin",
        permissions: payload.permissions || ["manage:all"],
      };
    }

    // regular user
    return {
      ...base,
      role: "user",
      permissions: payload.permissions || ["read:own"],
    };
  }
}
