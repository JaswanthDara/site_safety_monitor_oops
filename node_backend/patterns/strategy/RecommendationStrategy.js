export class RecommendationStrategy {
  recommend(equipments = [], project = {}) {
    throw new Error("recommend() not implemented");
  }
}

export class RiskBasedStrategy extends RecommendationStrategy {
  recommend(equipments = [], project = {}) {
    const risk = project.riskLevel || "Low";
    return equipments.filter(
      eq => eq.conditions?.riskLevel?.toLowerCase() === risk.toLowerCase()
    );
  }
}

export class TypeBasedStrategy extends RecommendationStrategy {
  recommend(equipments = [], project = {}) {
    const type = project.projectType;
    if (!type) return [];
    return equipments.filter(eq =>
      eq.conditions?.projectType?.map(t => t.toLowerCase()).includes(type.toLowerCase())
    );
  }
}

export class EnvironmentBasedStrategy extends RecommendationStrategy {
  recommend(equipments = [], project = {}) {
    const env = project.environment;
    if (!env) return [];
    return equipments.filter(eq =>
      eq.conditions?.environment?.map(e => e.toLowerCase()).includes(env.toLowerCase())
    );
  }
}

// Combine multiple strategies
export class CompositeStrategy extends RecommendationStrategy {
  constructor(strategies = [], { dedupe = true } = {}) {
    super();
    this.strategies = strategies;
    this.dedupe = dedupe;
  }

  recommend(equipments = [], project = {}) {
    const results = this.strategies.flatMap(s => s.recommend(equipments, project) || []);
    if (!this.dedupe) return results;

    const map = new Map();
    for (const r of results) {
      const id = r._id ? String(r._id) : JSON.stringify(r);
      if (!map.has(id)) map.set(id, r);
    }
    return Array.from(map.values());
  }
}

// Strategy context class
export class RecommendationContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  execute(equipments, project) {
    if (!this.strategy) throw new Error("No strategy set");
    return this.strategy.recommend(equipments, project);
  }
}
