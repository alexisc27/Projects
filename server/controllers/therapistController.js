const { Therapist } = require('../models');
const { handleError, pick } = require('./errors');

const FIELDS = ['title', 'name', 'email', 'location', 'yearsOfPractice', 'availability'];

exports.getAllTherapists = async (req, res) => {
    try {
        res.json(await Therapist.findAll({ order: [['name', 'ASC']] }));
    } catch (error) {
        handleError(res, error);
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
        handleError(res, error);
    }
};

exports.createTherapist = async (req, res) => {
    try {
        const therapist = await Therapist.create(pick(req.body, FIELDS));
        res.status(201).json(therapist);
    } catch (error) {
        handleError(res, error);
    }
};

exports.updateTherapist = async (req, res) => {
    try {
        const therapist = await Therapist.findByPk(req.params.id);
        if (!therapist) {
            return res.status(404).json({ error: 'Therapist not found' });
        }
        await therapist.update(pick(req.body, FIELDS));
        res.json(therapist);
    } catch (error) {
        handleError(res, error);
    }
};

exports.deleteTherapist = async (req, res) => {
    try {
        const deleted = await Therapist.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Therapist not found' });
        }
        res.json({ message: 'Therapist deleted' });
    } catch (error) {
        handleError(res, error);
    }
};
