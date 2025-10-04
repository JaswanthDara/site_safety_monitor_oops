const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      user: req.user.id, 
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create Project Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all projects 
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name email");
    res.json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("user", "name email");

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user?._id?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get Project By ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(project, req.body);
    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Update Project Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Project Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
