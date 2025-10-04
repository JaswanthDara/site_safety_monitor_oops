const express = require('express');
const router = express.Router();
const hazardController = require('../controllers/hazardController');

router.post('/', hazardController.createHazard);
router.get('/', hazardController.getHazards);
router.get('/:id', hazardController.getHazardById);
router.put('/:id', hazardController.updateHazard);
router.delete('/:id', hazardController.deleteHazard);

module.exports = router;
