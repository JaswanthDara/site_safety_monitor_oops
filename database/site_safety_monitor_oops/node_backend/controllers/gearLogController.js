const GearLog = require('../models/GearLog');

// Create GearLog
exports.createGearLog = async (req, res) => {
  try {
    const gearLog = new GearLog(req.body);
    await gearLog.save();
    res.status(201).json(gearLog);
  } catch (error) {
    console.error('Create GearLog Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all GearLogs
exports.getGearLogs = async (req, res) => {
  try {
    const gearLogs = await GearLog.find()
      .populate({
        path: 'equipment',
        select: 'name serialNumber category status condition',
      })
      .populate({
        path: 'project',
        select: 'name location environment riskLevel',
      })
      .populate({
        path: 'user',
        select: 'name email role',
      })
      .sort({ createdAt: -1 });

    res.status(200).json(gearLogs);
  } catch (error) {
    console.error('Get GearLogs Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get GearLog by ID
exports.getGearLogById = async (req, res) => {
  try {
    const gearLog = await GearLog.findById(req.params.id)
      .populate('equipment project user'); 
    if (!gearLog) return res.status(404).json({ message: 'GearLog not found' });
    res.json(gearLog);
  } catch (error) {
    console.error('Get GearLog By ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update GearLog
exports.updateGearLog = async (req, res) => {
  try {
    const updated = await GearLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'GearLog not found' });
    res.json(updated);
  } catch (error) {
    console.error('Update GearLog Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete GearLog
exports.deleteGearLog = async (req, res) => {
  try {
    const deleted = await GearLog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'GearLog not found' });
    res.json({ message: 'GearLog deleted' });
  } catch (error) {
    console.error('Delete GearLog Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
