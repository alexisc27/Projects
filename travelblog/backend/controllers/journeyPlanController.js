const JourneyPlan = require('../models/JourneyPlan');
const User = require('../models/User');

// Create a new journey plan
exports.createJourneyPlan = async (req, res) => {
    try {
        const { name, description, startDate, endDate, locations, activities } = req.body;
        const userId = req.user.id;

        const newPlan = new JourneyPlan({
            name,
            description,
            startDate,
            endDate,
            locations: locations || [],
            activities: activities || [],
            user: userId
        });

        const savedPlan = await newPlan.save();

        // Add plan to user's journeyPlans array
        await User.findByIdAndUpdate(userId, {
            $push: { journeyPlans: savedPlan._id }
        });

        res.status(201).json(savedPlan);
    } catch (error) {
        console.error('Error creating journey plan:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all journey plans for a user
exports.getJourneyPlans = async (req, res) => {
    try {
        const plans = await JourneyPlan.find({ user: req.user.id })
            .sort({ startDate: 1 });
        res.json(plans);
    } catch (error) {
        console.error('Error fetching journey plans:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a journey plan
exports.updateJourneyPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, startDate, endDate, locations, activities } = req.body;

        const updatedPlan = await JourneyPlan.findOneAndUpdate(
            { _id: id, user: req.user.id },
            {
                name,
                description,
                startDate,
                endDate,
                locations: locations || [],
                activities: activities || []
            },
            { new: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Journey plan not found' });
        }

        res.json(updatedPlan);
    } catch (error) {
        console.error('Error updating journey plan:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a journey plan
exports.deleteJourneyPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedPlan = await JourneyPlan.findOneAndDelete({
            _id: id,
            user: userId
        });

        if (!deletedPlan) {
            return res.status(404).json({ message: 'Journey plan not found' });
        }

        // Remove plan from user's journeyPlans array
        await User.findByIdAndUpdate(userId, {
            $pull: { journeyPlans: id }
        });

        res.json({ message: 'Journey plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting journey plan:', error);
        res.status(500).json({ message: 'Server error' });
    }
};