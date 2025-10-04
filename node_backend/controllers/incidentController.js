const Incident = require('../models/Incident');

// Create a new incident
exports.createIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json(incident);
  } catch (error) {
    console.error('Create Incident Error:', error);
    res.status(500).json({ message: 'Server error while creating incident' });
  }
};

// Get all incidents
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate({
        path: 'project',
        select: 'name location', 
      })
      .populate({
        path: 'reportedBy',
        select: 'name email role', 
      })
      .sort({ reportedAt: -1 }); 

    res.status(200).json(incidents);
  } catch (error) {
    console.error('Get Incidents Error:', error);
    res.status(500).json({ message: 'Server error while fetching incidents' });
  }
};

// Get single incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate({
        path: 'project',
        select: 'name location',
      })
      .populate({
        path: 'reportedBy',
        select: 'name email role',
      });

    if (!incident) return res.status(404).json({ message: 'Incident not found' });

    res.status(200).json(incident);
  } catch (error) {
    console.error('Get Incident By ID Error:', error);
    res.status(500).json({ message: 'Server error while fetching incident' });
  }
};

// Update incident by ID
exports.updateIncident = async (req, res) => {
  try {
    const updated = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({
        path: 'project',
        select: 'name location',
      })
      .populate({
        path: 'reportedBy',
        select: 'name email role',
      });

    if (!updated) return res.status(404).json({ message: 'Incident not found' });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Update Incident Error:', error);
    res.status(500).json({ message: 'Server error while updating incident' });
  }
};

// Delete incident by ID
exports.deleteIncident = async (req, res) => {
  try {
    const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Incident not found' });
    res.status(200).json({ message: 'Incident deleted successfully' });
  } catch (error) {
    console.error('Delete Incident Error:', error);
    res.status(500).json({ message: 'Server error while deleting incident' });
  }
};
