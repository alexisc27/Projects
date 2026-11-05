import React, { useState, useEffect } from 'react';
import ClientTable from './ClientTable';
import ClientForm from './ClientForm';
import { getClients, createClient, updateClient, deleteClient } from '../../services/clientService';
import { getErrorMessage } from '../../services/api';

function ClientDashboard() {
    const [clients, setClients] = useState([]);
    const [editingClient, setEditingClient] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setClients(await getClients());
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const run = async (action) => {
        try {
            setError('');
            await action();
            await fetchClients();
            return true;
        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        }
    };

    const handleCreate = (client) => run(() => createClient(client));

    const handleUpdate = async (client) => {
        const ok = await run(() => updateClient(client));
        if (ok) setEditingClient(null);
        return ok;
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this client? Their sessions will also be deleted.')) {
            run(() => deleteClient(id));
        }
    };

    return (
        <div className="dashboard">
            <h1>Client Management</h1>
            {error && <p className="error-message">{error}</p>}
            <ClientForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={() => setEditingClient(null)}
                editingClient={editingClient}
            />
            <ClientTable
                clients={clients}
                onEdit={setEditingClient}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default ClientDashboard;
