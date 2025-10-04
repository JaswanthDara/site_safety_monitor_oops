require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const gearLogRoutes = require('./routes/gearLogRoutes');
const hazardRoutes = require('./routes/hazardRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const projectRoutes = require('./routes/projectRoutes');

const { authenticateJWT } = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Check if running in test environment
const isTest = process.env.NODE_ENV === 'test';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

if (isTest) {
  // No auth 
  app.use('/api/equipment', equipmentRoutes);
  app.use('/api/gearlogs', gearLogRoutes);
  app.use('/api/hazards', hazardRoutes);
  app.use('/api/incidents', incidentRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/projects', projectRoutes);
} else {
  // With JWT authentication
  app.use('/api/equipment', authenticateJWT, equipmentRoutes);
  app.use('/api/gearlogs', authenticateJWT, gearLogRoutes);
  app.use('/api/hazards', authenticateJWT, hazardRoutes);
  app.use('/api/incidents', authenticateJWT, incidentRoutes);
  app.use('/api/notifications', authenticateJWT, notificationRoutes);
  app.use('/api/projects', authenticateJWT, projectRoutes);
}

// Health check route
app.get('/', (req, res) => {
  res.send('Site Safety Monitor API is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server only 
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
