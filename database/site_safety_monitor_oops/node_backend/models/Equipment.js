const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  serialNumber: { type: String, unique: true, sparse: true },
  category: { type: String, enum: ['PPE', 'Machinery', 'Tool'], default: 'PPE' },
  status: { type: String, enum: ['Available', 'In Use', 'Maintenance'], default: 'Available' },
  lastInspectionDate: { type: Date },
  condition: { type: String, enum: ['Good', 'Needs Repair', 'Out of Service'], default: 'Good' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Equipment', EquipmentSchema);
