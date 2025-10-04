export default class EquipmentAdapter {
  /**
   * Convert a third-party equipment object to our internal schema.
   * @param {Object} external - raw equipment object from external source
   * @returns {Object} adapted equipment object
   */
  static adapt(external = {}) {
    const adapted = {
      name: external.name || external.title || external.equipmentName || "Unknown Equipment",
      type: external.type || external.category || "General",
      features: Array.isArray(external.features)
        ? external.features
        : (external.features && String(external.features).split(",").map(f => f.trim())) || [],
      conditions: {
        projectType: external.projectTypes || external.projectType || (external.conditions && external.conditions.projectType) || [],
        environment: external.environments || external.environment || (external.conditions && external.conditions.environment) || [],
        riskLevel: external.riskLevel || (external.risk && external.risk.level) || "Low",
      },
      imageUrl: external.imageUrl || external.image || null,
      meta: external.meta || {},
    };

    // Ensure arrays
    adapted.conditions.projectType = Array.isArray(adapted.conditions.projectType)
      ? adapted.conditions.projectType
      : (adapted.conditions.projectType ? [adapted.conditions.projectType] : []);

    adapted.conditions.environment = Array.isArray(adapted.conditions.environment)
      ? adapted.conditions.environment
      : (adapted.conditions.environment ? [adapted.conditions.environment] : []);

    return adapted;
  }
}
