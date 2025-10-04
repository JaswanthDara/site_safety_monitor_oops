const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  startDate: { type: Date },
  endDate: { type: Date },
  environment: {
    type: String,
    enum: ['construction', 'factory', 'warehouse', 'outdoor'],
    default: 'construction',
  },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  safetyRequirements: [String],
  hazards: [String],
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
