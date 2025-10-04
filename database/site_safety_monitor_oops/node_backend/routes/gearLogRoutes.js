const express = require('express');
const router = express.Router();
const gearLogController = require('../controllers/gearLogController');

router.post('/', gearLogController.createGearLog);
router.get('/', gearLogController.getGearLogs);
router.get('/:id', gearLogController.getGearLogById);
router.put('/:id', gearLogController.updateGearLog);
router.delete('/:id', gearLogController.deleteGearLog);

module.exports = router;
