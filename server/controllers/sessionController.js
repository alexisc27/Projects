const { Session, Therapist, Client } = require('../models');
const { handleError, pick } = require('./errors');

const FIELDS = ['therapistId', 'clientId', 'notes', 'date', 'length'];

const INCLUDE = [
    { model: Therapist, attributes: ['id', 'title', 'name'] },
    { model: Client, attributes: ['id', 'name'] }
];

function startOfToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// Returns an error message, or null if the data is valid.
async function validate(data) {
    if (data.therapistId !== undefined && !(await Therapist.findByPk(data.therapistId))) {
        return 'Therapist not found';
    }
    if (data.clientId !== undefined && !(await Client.findByPk(data.clientId))) {
        return 'Client not found';
    }
    if (data.length !== undefined && !(Number(data.length) > 0)) {
        return 'Session length must be a positive number of minutes';
    }
    return null;
}

exports.getAllSessions = async (req, res) => {
    try {
        res.json(await Session.findAll({ include: INCLUDE, order: [['date', 'ASC']] }));
    } catch (error) {
        handleError(res, error);
    }
};

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findByPk(req.params.id, { include: INCLUDE });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (error) {
        handleError(res, error);
    }
};

exports.createSession = async (req, res) => {
    try {
        const data = pick(req.body, FIELDS);
        const problem = await validate(data);
        if (problem) {
            return res.status(400).json({ error: problem });
        }
        if (new Date(data.date) < startOfToday()) {
            return res.status(400).json({ error: 'Session date cannot be in the past' });
        }
        const session = await Session.create(data);
        res.status(201).json(await Session.findByPk(session.id, { include: INCLUDE }));
    } catch (error) {
        handleError(res, error);
    }
};

exports.updateSession = async (req, res) => {
    try {
        const session = await Session.findByPk(req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        const data = pick(req.body, FIELDS);
        const problem = await validate(data);
        if (problem) {
            return res.status(400).json({ error: problem });
        }
        // Only check the date if it was changed, so notes on past sessions can still be edited.
        const dateChanged = data.date && new Date(data.date).getTime() !== new Date(session.date).getTime();
        if (dateChanged && new Date(data.date) < startOfToday()) {
            return res.status(400).json({ error: 'Session date cannot be moved into the past' });
        }
        await session.update(data);
        res.json(await Session.findByPk(session.id, { include: INCLUDE }));
    } catch (error) {
        handleError(res, error);
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const deleted = await Session.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json({ message: 'Session deleted' });
    } catch (error) {
        handleError(res, error);
    }
};
