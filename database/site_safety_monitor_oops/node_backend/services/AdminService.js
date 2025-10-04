export default class AdminService {
  constructor({ userModel, projectModel, incidentModel }) {
    this.userModel = userModel;
    this.projectModel = projectModel;
    this.incidentModel = incidentModel;
  }

  async getSystemStats() {
    const [userCount, projectCount, incidentCount] = await Promise.all([
      this.userModel.countDocuments(),
      this.projectModel.countDocuments(),
      this.incidentModel.countDocuments(),
    ]);

    return {
      userCount,
      projectCount,
      incidentCount,
      lastUpdated: new Date(),
    };
  }

  async listUsers(filter = {}) {
    return this.userModel.find(filter).lean();
  }

  async deactivateUser(userId) {
    const user = await this.userModel.findByIdAndUpdate(userId, { active: false }, { new: true });
    if (!user) throw new Error("User not found");
    return user;
  }

  async promoteUserToAdmin(userId) {
    const user = await this.userModel.findByIdAndUpdate(userId, { role: "admin" }, { new: true });
    if (!user) throw new Error("User not found");
    return user;
  }
}
