const TravelLog = require('../models/TravelLog');

exports.getTravelLogs = async (req, res) => {
    try {
        const logs = await TravelLog.find({ user: req.user.id });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTravelLog = async (req, res) => {
    try {
        const { title, description, startDate, endDate, tags } = req.body;

        const newLog = new TravelLog({
            title,
            description,
            startDate,
            endDate,
            postDate: new Date(),
            tags,
            user: req.user.id
        });

        const savedLog = await newLog.save();

        // Add log to user's travelLogs array
        await User.findByIdAndUpdate(req.user.id, {
            $push: { travelLogs: savedLog._id }
        });

        res.status(201).json(savedLog);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Implement update and delete similarly...