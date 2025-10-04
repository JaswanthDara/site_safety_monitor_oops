export default class IncidentService {
  constructor({ incidentModel, notificationService }) {
    this.incidentModel = incidentModel;
    this.notificationService = notificationService;
  }

  async createIncident(payload) {
    const incident = new this.incidentModel({
      ...payload,
      reportedAt: new Date(),
      status: "open",
    });
    const saved = await incident.save();

    if (this.notificationService) {
      await this.notificationService.dispatchForIncident(saved);
    }

    return saved;
  }

  async getAll() {
    return this.incidentModel.find().populate("project reportedBy").lean();
  }

  async updateStatus(id, status) {
    return this.incidentModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
  }

  async getByProject(projectId) {
    return this.incidentModel.find({ project: projectId }).lean();
  }

  async delete(id) {
    return this.incidentModel.findByIdAndDelete(id).lean();
  }
}
