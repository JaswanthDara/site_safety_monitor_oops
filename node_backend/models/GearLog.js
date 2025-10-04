const mongoose = require('mongoose');

const GearLogSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: {
    type: String,
    enum: ['Assigned', 'Returned', 'Maintenance', 'Inspection'],
    required: true,
  },
  notes: { type: String, trim: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('GearLog', GearLogSchema);
