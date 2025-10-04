export default class HazardService {
  constructor({ hazardModel }) {
    this.hazardModel = hazardModel;
  }

  async create(payload) {
    const hazard = new this.hazardModel(payload);
    return hazard.save();
  }

  async getAll() {
    return this.hazardModel.find().lean();
  }

  async getById(id) {
    return this.hazardModel.findById(id).lean();
  }

  async update(id, updates) {
    return this.hazardModel.findByIdAndUpdate(id, updates, { new: true }).lean();
  }

  async delete(id) {
    return this.hazardModel.findByIdAndDelete(id).lean();
  }

  async findByRiskLevel(level) {
    return this.hazardModel.find({ riskLevel: level }).lean();
  }
}
