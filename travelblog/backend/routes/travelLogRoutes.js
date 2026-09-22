const express = require('express');
const router = express.Router();
const travelLogController = require('../controllers/travelLogController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET /api/travel-logs
// @desc    Get all travel logs for a user
// @access  Private
router.get('/', auth, travelLogController.getTravelLogs);

// @route   POST /api/travel-logs
// @desc    Create a new travel log
// @access  Private
router.post(
    '/',
    auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('startDate', 'Start date is required').not().isEmpty(),
        check('endDate', 'End date is required').not().isEmpty()
    ],
    travelLogController.createTravelLog
);

// @route   PUT /api/travel-logs/:id
// @desc    Update a travel log
// @access  Private
router.put('/:id', auth, travelLogController.updateTravelLog);

// @route   DELETE /api/travel-logs/:id
// @desc    Delete a travel log
// @access  Private
router.delete('/:id', auth, travelLogController.deleteTravelLog);

module.exports = router;