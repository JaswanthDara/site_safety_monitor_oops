export default class GearLogService {
  constructor({ gearLogModel, equipmentModel, userModel }) {
    this.gearLogModel = gearLogModel;
    this.equipmentModel = equipmentModel;
    this.userModel = userModel;
  }

  async logIssue(equipmentId, userId, projectId, notes = "") {
    const log = new this.gearLogModel({
      equipment: equipmentId,
      user: userId,
      project: projectId,
      type: "issued",
      notes,
      timestamp: new Date(),
    });
    return log.save();
  }

  async logReturn(equipmentId, userId, notes = "") {
    const log = new this.gearLogModel({
      equipment: equipmentId,
      user: userId,
      type: "returned",
      notes,
      timestamp: new Date(),
    });
    return log.save();
  }

  async getLogsByEquipment(equipmentId) {
    return this.gearLogModel.find({ equipment: equipmentId }).populate("user project").lean();
  }

  async getUserActivity(userId) {
    return this.gearLogModel.find({ user: userId }).populate("equipment project").lean();
  }
}
