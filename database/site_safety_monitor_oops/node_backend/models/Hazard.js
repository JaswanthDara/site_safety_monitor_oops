const mongoose = require('mongoose');

const HazardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  relatedEquipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
}, { timestamps: true });

module.exports = mongoose.model('Hazard', HazardSchema);
