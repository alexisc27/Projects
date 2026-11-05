const { Client } = require('../models');
const { handleError, pick } = require('./errors');

const FIELDS = ['name', 'email', 'phoneNumber', 'regularity'];
const VALID_REGULARITIES = ['WEEKLY', 'MONTHLY'];

exports.getAllClients = async (req, res) => {
    try {
        res.json(await Client.findAll({ order: [['name', 'ASC']] }));
    } catch (error) {
        handleError(res, error);
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        handleError(res, error);
    }
};

exports.createClient = async (req, res) => {
    try {
        if (!VALID_REGULARITIES.includes(req.body.regularity)) {
            return res.status(400).json({ error: 'Regularity must be either WEEKLY or MONTHLY' });
        }
        const client = await Client.create(pick(req.body, FIELDS));
        res.status(201).json(client);
    } catch (error) {
        handleError(res, error);
    }
};

exports.updateClient = async (req, res) => {
    try {
        if (req.body.regularity && !VALID_REGULARITIES.includes(req.body.regularity)) {
            return res.status(400).json({ error: 'Regularity must be either WEEKLY or MONTHLY' });
        }
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        await client.update(pick(req.body, FIELDS));
        res.json(client);
    } catch (error) {
        handleError(res, error);
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const deleted = await Client.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json({ message: 'Client deleted' });
    } catch (error) {
        handleError(res, error);
    }
};
