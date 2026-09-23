import React, { useState, useEffect } from 'react';
import ClientTable from './ClientTable';
import ClientForm from './ClientForm';
import { getClients, createClient, updateClient, deleteClient } from '../../services/clientService';

function ClientDashboard() {
    const [clients, setClients] = useState([]);
    const [editingClient, setEditingClient] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    const handleCreate = async (client) => {
        await createClient(client);
        fetchClients();
    };

    const handleUpdate = async (client) => {
        await updateClient(client);
        fetchClients();
        setEditingClient(null);
    };

    const handleDelete = async (id) => {
        await deleteClient(id);
        fetchClients();
    };

    return (
        <div className="dashboard">
            <h1>Client Management</h1>
            <ClientForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
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