const { Session, Therapist, Client } = require('../models');

exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.findAll({
            include: [
                { model: Therapist, attributes: ['id', 'title', 'name'] },
                { model: Client, attributes: ['id', 'name'] }
            ]
        });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findByPk(req.params.id, {
            include: [
                { model: Therapist, attributes: ['id', 'title', 'name'] },
                { model: Client, attributes: ['id', 'name'] }
            ]
        });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSession = async (req, res) => {
    try {
        // Validate therapist and client exist
        const therapist = await Therapist.findByPk(req.body.therapistId);
        if (!therapist) {
            return res.status(400).json({ error: 'Therapist not found' });
        }

        const client = await Client.findByPk(req.body.clientId);
        if (!client) {
            return res.status(400).json({ error: 'Client not found' });
        }

        // Validate date is in the future
        const sessionDate = new Date(req.body.date);
        if (sessionDate < new Date()) {
            return res.status(400).json({ error: 'Session date must be in the future' });
        }

        // Validate length is positive
        if (req.body.length <= 0) {
            return res.status(400).json({ error: 'Session length must be positive' });
        }

        const session = await Session.create(req.body);
        res.status(201).json(session);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.updateSession = async (req, res) => {
    try {
        // Validate therapist exists if provided
        if (req.body.therapistId) {
            const therapist = await Therapist.findByPk(req.body.therapistId);
            if (!therapist) {
                return res.status(400).json({ error: 'Therapist not found' });
            }
        }

        // Validate client exists if provided
        if (req.body.clientId) {
            const client = await Client.findByPk(req.body.clientId);
            if (!client) {
                return res.status(400).json({ error: 'Client not found' });
            }
        }

        // Validate date is in the future if provided
        if (req.body.date) {
            const sessionDate = new Date(req.body.date);
            if (sessionDate < new Date()) {
                return res.status(400).json({ error: 'Session date must be in the future' });
            }
        }

        // Validate length is positive if provided
        if (req.body.length && req.body.length <= 0) {
            return res.status(400).json({ error: 'Session length must be positive' });
        }

        const [updated] = await Session.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedSession = await Session.findByPk(req.params.id, {
                include: [
                    { model: Therapist, attributes: ['id', 'title', 'name'] },
                    { model: Client, attributes: ['id', 'name'] }
                ]
            });
            return res.json(updatedSession);
        }
        throw new Error('Session not found');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const deleted = await Session.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Session deleted' });
        }
        throw new Error('Session not found');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};