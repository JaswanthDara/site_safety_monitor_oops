const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    console.error('Create Equipment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const equipmentList = await Equipment.find();
    res.json(equipmentList);
  } catch (error) {
    console.error('Get Equipment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (error) {
    console.error('Get Equipment By ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Equipment not found' });
    res.json(updated);
  } catch (error) {
    console.error('Update Equipment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Equipment not found' });
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    console.error('Delete Equipment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
