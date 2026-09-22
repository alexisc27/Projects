const express = require('express');
const router = express.Router();
const journeyPlanController = require('../controllers/journeyPlanController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET /api/journey-plans
// @desc    Get all journey plans for a user
// @access  Private
router.get('/', auth, journeyPlanController.getJourneyPlans);

// @route   POST /api/journey-plans
// @desc    Create a new journey plan
// @access  Private
router.post(
    '/',
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('startDate', 'Start date is required').not().isEmpty(),
        check('endDate', 'End date is required').not().isEmpty()
    ],
    journeyPlanController.createJourneyPlan
);

// @route   PUT /api/journey-plans/:id
// @desc    Update a journey plan
// @access  Private
router.put('/:id', auth, journeyPlanController.updateJourneyPlan);

// @route   DELETE /api/journey-plans/:id
// @desc    Delete a journey plan
// @access  Private
router.delete('/:id', auth, journeyPlanController.deleteJourneyPlan);

module.exports = router;