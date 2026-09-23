import React, { useState, useEffect } from 'react';
import SessionTable from './SessionTable';
import SessionForm from './SessionForm';
import { getSessions, createSession, updateSession, deleteSession } from '../../services/sessionService';
import { getTherapists } from '../../services/therapistService';
import { getClients } from '../../services/clientService';

function SessionDashboard() {
    const [sessions, setSessions] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [clients, setClients] = useState([]);
    const [editingSession, setEditingSession] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [sessionsData, therapistsData, clientsData] = await Promise.all([
            getSessions(),
            getTherapists(),
            getClients()
        ]);
        setSessions(sessionsData);
        setTherapists(therapistsData);
        setClients(clientsData);
    };

    const handleCreate = async (session) => {
        await createSession(session);
        fetchData();
    };

    const handleUpdate = async (session) => {
        await updateSession(session);
        fetchData();
        setEditingSession(null);
    };

    const handleDelete = async (id) => {
        await deleteSession(id);
        fetchData();
    };

    return (
        <div className="dashboard">
            <h1>Session Management</h1>
            <SessionForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                editingSession={editingSession}
                therapists={therapists}
                clients={clients}
            />
            <SessionTable
                sessions={sessions}
                therapists={therapists}
                clients={clients}
                onEdit={setEditingSession}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default SessionDashboard;