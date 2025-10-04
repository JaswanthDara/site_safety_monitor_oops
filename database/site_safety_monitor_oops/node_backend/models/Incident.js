const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true, trim: true },
  severity: { type: String, enum: ['minor', 'major', 'critical'], default: 'minor' },
  status: { type: String, enum: ['open', 'investigating', 'resolved'], default: 'open' },
  reportedAt: { type: Date, default: Date.now },
  attachments: [{ type: String }], 
}, { timestamps: true });

module.exports = mongoose.model('Incident', IncidentSchema);
