import React from 'react';

function SessionTable({ sessions, therapists, clients, onEdit, onDelete }) {
    const getTherapistName = (therapistId) => {
        const therapist = therapists.find(t => t.id === therapistId);
        return therapist ? `${therapist.title} ${therapist.name}` : 'Unknown';
    };

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.name : 'Unknown';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="table-container">
            <h2>Sessions List</h2>
            <table>
                <thead>
                <tr>
                    <th>Therapist</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Length (minutes)</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sessions.map(session => (
                    <tr key={session.id}>
                        <td>{getTherapistName(session.therapistId)}</td>
                        <td>{getClientName(session.clientId)}</td>
                        <td>{formatDate(session.date)}</td>
                        <td>{session.length}</td>
                        <td className="notes-cell">{session.notes}</td>
                        <td>
                            <button
                                onClick={() => onEdit(session)}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(session.id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SessionTable;