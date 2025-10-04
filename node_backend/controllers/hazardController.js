const Hazard = require('../models/Hazard');
const hazardNotifier = require('../observers/HazardNotifier');
const NotificationService = require('../observers/NotificationService');

// Register NotificationService
const notificationService = new NotificationService();
hazardNotifier.subscribe(notificationService);

// Create new hazard
exports.createHazard = async (req, res) => {
  try {
    const hazard = new Hazard({
      ...req.body,
      reportedBy: req.user.id,
    });

    const saved = await hazard.save();

    // Notify observers
    hazardNotifier.notify(saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error('Create Hazard Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get all hazards
exports.getHazards = async (req, res) => {
  try {
    const hazards = await Hazard.find()
      .populate('relatedEquipment reportedBy');
    res.json(hazards);
  } catch (error) {
    console.error('Get Hazards Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get hazard by ID
exports.getHazardById = async (req, res) => {
  try {
    const hazard = await Hazard.findById(req.params.id)
      .populate('relatedEquipment reportedBy');

    if (!hazard) return res.status(404).json({ message: 'Hazard not found' });

    res.json(hazard);
  } catch (error) {
    console.error('Get Hazard By ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update hazard
exports.updateHazard = async (req, res) => {
  try {
    const updated = await Hazard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: 'Hazard not found' });

    res.json(updated);
  } catch (error) {
    console.error('Update Hazard Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Delete hazard
exports.deleteHazard = async (req, res) => {
  try {
    const deleted = await Hazard.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Hazard not found' });

    res.json({ message: 'Hazard deleted' });
  } catch (error) {
    console.error('Delete Hazard Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
