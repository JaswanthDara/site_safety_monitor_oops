const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// Public routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
// Protected routes
router.get('/', adminController.getAdmins);

module.exports = router;
