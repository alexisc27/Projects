const Therapist = require('../models/therapistModel');

exports.getAllTherapists = async (req, res) => {
    try {
        const therapists = await Therapist.findAll();
        res.json(therapists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTherapistById = async (req, res) => {
    try {
        const therapist = await Therapist.findByPk(req.params.id);
        if (!therapist) {
            return res.status(404).json({ error: 'Therapist not found' });
        }
        res.json(therapist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTherapist = async (req, res) => {
    try {
        const therapist = await Therapist.create(req.body);
        res.status(201).json(therapist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTherapist = async (req, res) => {
    try {
        const [updated] = await Therapist.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTherapist = await Therapist.findByPk(req.params.id);
            return res.json(updatedTherapist);
        }
        throw new Error('Therapist not found');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTherapist = async (req, res) => {
    try {
        const deleted = await Therapist.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Therapist deleted' });
        }
        throw new Error('Therapist not found');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};