class Project {
  constructor(name, location, hazards = []) {
    this.name = name;
    this.location = location;
    this.hazards = hazards;
    this.createdAt = new Date();
  }

  addHazard(hazard) {
    this.hazards.push(hazard);
  }

  getSummary() {
    return {
      name: this.name,
      location: this.location,
      hazardCount: this.hazards.length,
      createdAt: this.createdAt,
    };
  }

  recommendEquipment() {
    if (this.hazards.length > 5) {
      return ['Safety Helmet', 'High Visibility Vest', 'Emergency Kit'];
    } else {
      return ['Basic PPE Kit'];
    }
  }
}

module.exports = Project;
