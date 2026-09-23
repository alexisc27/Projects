const { Client } = require('../models');

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
};

exports.createClient = async (req, res) => {
    try {
        // Validate regularity value
        const validRegularities = ['WEEKLY', 'MONTHLY'];
        if (!validRegularities.includes(req.body.regularity)) {
            return res.status(400).json({ error: 'Regularity must be either WEEKLY or MONTHLY' });
        }

        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        // Validate regularity value if provided
        if (req.body.regularity) {
            const validRegularities = ['WEEKLY', 'MONTHLY'];
            if (!validRegularities.includes(req.body.regularity)) {
                return res.status(400).json({ error: 'Regularity must be either WEEKLY or MONTHLY' });
            }
        }

        const [updated] = await Client.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedClient = await Client.findByPk(req.params.id);
            return res.json(updatedClient);
        }
        throw new Error('Client not found');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const deleted = await Client.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Client deleted' });
        }
        throw new Error('Client not found');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};