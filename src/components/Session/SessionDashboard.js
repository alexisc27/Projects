import React, { useState, useEffect } from 'react';
import SessionTable from './SessionTable';
import SessionForm from './SessionForm';
import { getSessions, createSession, updateSession, deleteSession } from '../../services/sessionService';
import { getTherapists } from '../../services/therapistService';
import { getClients } from '../../services/clientService';
import { getErrorMessage } from '../../services/api';

function SessionDashboard() {
    const [sessions, setSessions] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [clients, setClients] = useState([]);
    const [editingSession, setEditingSession] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sessionsData, therapistsData, clientsData] = await Promise.all([
                getSessions(),
                getTherapists(),
                getClients()
            ]);
            setSessions(sessionsData);
            setTherapists(therapistsData);
            setClients(clientsData);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const run = async (action) => {
        try {
            setError('');
            await action();
            await fetchData();
            return true;
        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        }
    };

    const handleCreate = (session) => run(() => createSession(session));

    const handleUpdate = async (session) => {
        const ok = await run(() => updateSession(session));
        if (ok) setEditingSession(null);
        return ok;
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this session?')) {
            run(() => deleteSession(id));
        }
    };

    return (
        <div className="dashboard">
            <h1>Session Management</h1>
            {error && <p className="error-message">{error}</p>}
            {(therapists.length === 0 || clients.length === 0) && (
                <p className="info-message">Add at least one therapist and one client before booking a session.</p>
            )}
            <SessionForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={() => setEditingSession(null)}
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
