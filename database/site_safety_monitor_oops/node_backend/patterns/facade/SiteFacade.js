export default class SiteFacade {
  constructor({ equipmentService, projectService, notificationService }) {
    if (!equipmentService || !projectService) {
      throw new Error("SiteFacade requires equipmentService and projectService instances");
    }
    this.equipmentService = equipmentService;
    this.projectService = projectService;
    this.notificationService = notificationService || null;
  }

  // Create new equipment
  async createEquipment(payload, actor = {}) {
    const created = await this.equipmentService.create(payload, { actor });
    return created;
  }

  // Get recommendations
  async getProjectRecommendations(projectId) {
    const project = await this.projectService.getById(projectId);
    if (!project) throw new Error("Project not found");

    const recommendations = await this.equipmentService.recommend(project);
    return { project, recommendations };
  }

  // Report an incident 
  async reportIncident(incidentPayload) {
    if (!this.projectService.reportIncident)
      throw new Error("projectService does not support reportIncident");

    const incident = await this.projectService.reportIncident(incidentPayload);

    if (this.notificationService) {
      await this.notificationService.dispatchForIncident(incident);
    }

    return incident;
  }
}
