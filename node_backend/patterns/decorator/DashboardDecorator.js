export class DashboardDecorator {
  constructor(baseData = {}) {
    this.baseData = baseData;
  }

  withSummary() {
    const { projects = [], equipments = [], incidents = [], notifications = [] } = this.baseData;

    const summary = {
      totalProjects: projects.length,
      totalEquipments: equipments.length,
      totalIncidents: incidents.length,
      unreadNotifications: notifications.filter(n => !n.read).length,
    };

    return { ...this.baseData, summary };
  }

  withTopHazards(limit = 5) {
    const hazards = (this.baseData.hazards || []).slice(0, limit);
    return { ...this.baseData, topHazards: hazards };
  }

  // chainable decorator
  decorateAll({ summary = true, topHazards = 5 } = {}) {
    let out = { ...this.baseData };
    if (summary) out = new DashboardDecorator(out).withSummary();
    if (topHazards) out = new DashboardDecorator(out).withTopHazards(topHazards);
    return out;
  }
}
