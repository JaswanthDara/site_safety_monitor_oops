import EquipmentAdapter from "../patterns/adapter/EquipmentAdapter.js";
import {
  RecommendationContext,
  CompositeStrategy,
  TypeBasedStrategy,
  EnvironmentBasedStrategy,
  RiskBasedStrategy,
} from "../patterns/strategy/RecommendationStrategy.js";

export default class EquipmentService {
  constructor({ equipmentModel }) {
    this.equipmentModel = equipmentModel;
  }

  async create(payload, { actor } = {}) {
    const adapted = EquipmentAdapter.adapt(payload);
    adapted.createdBy = actor?._id || null;
    const equipment = new this.equipmentModel(adapted);
    return equipment.save();
  }

  async getAll() {
    return this.equipmentModel.find().lean();
  }

  async getById(id) {
    return this.equipmentModel.findById(id).lean();
  }

  async update(id, updates) {
    return this.equipmentModel.findByIdAndUpdate(id, updates, { new: true }).lean();
  }

  async delete(id) {
    return this.equipmentModel.findByIdAndDelete(id).lean();
  }

  // Recommendation system
  async recommend(project) {
    const equipments = await this.getAll();
    const strategy = new CompositeStrategy([
      new TypeBasedStrategy(),
      new EnvironmentBasedStrategy(),
      new RiskBasedStrategy(),
    ]);
    const context = new RecommendationContext(strategy);
    return context.execute(equipments, project);
  }
}
