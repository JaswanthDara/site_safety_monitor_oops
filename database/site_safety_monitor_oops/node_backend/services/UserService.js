export default class ProjectService {
  constructor({ projectModel, incidentService, equipmentService }) {
    this.projectModel = projectModel;
    this.incidentService = incidentService;
    this.equipmentService = equipmentService;
  }

  async create(payload) {
    const project = new this.projectModel({ ...payload, createdAt: new Date() });
    return project.save();
  }

  async getAll() {
    return this.projectModel.find().populate("manager").lean();
  }

  async getById(id) {
    return this.projectModel.findById(id).populate("manager").lean();
  }

  async update(id, updates) {
    return this.projectModel.findByIdAndUpdate(id, updates, { new: true }).lean();
  }

  async delete(id) {
    return this.projectModel.findByIdAndDelete(id).lean();
  }

  async reportIncident(payload) {
    if (!this.incidentService) throw new Error("IncidentService not attached");
    return this.incidentService.createIncident(payload);
  }

  async getEquipmentRecommendations(projectId) {
    const project = await this.getById(projectId);
    if (!project) throw new Error("Project not found");
    return this.equipmentService.recommend(project);
  }
}
