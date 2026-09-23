import React, { useState, useEffect } from 'react';

function SessionForm({ onCreate, onUpdate, editingSession, therapists, clients }) {
    const [formData, setFormData] = useState({
        therapistId: '',
        clientId: '',
        notes: '',
        date: '',
        length: ''
    });

    useEffect(() => {
        if (editingSession) {
            setFormData({
                ...editingSession,
                therapistId: editingSession.therapistId || '',
                clientId: editingSession.clientId || '',
                date: editingSession.date ? editingSession.date.split('T')[0] : ''
            });
        }
    }, [editingSession]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            therapistId: parseInt(formData.therapistId),
            clientId: parseInt(formData.clientId),
            length: parseInt(formData.length)
        };

        if (editingSession) {
            onUpdate({ ...submissionData, id: editingSession.id });
        } else {
            onCreate(submissionData);
        }
        setFormData({
            therapistId: '',
            clientId: '',
            notes: '',
            date: '',
            length: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{editingSession ? 'Edit Session' : 'Add New Session'}</h2>
            <div className="form-group">
                <label>Therapist:</label>
                <select
                    name="therapistId"
                    value={formData.therapistId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Therapist</option>
                    {therapists.map(therapist => (
                        <option key={therapist.id} value={therapist.id}>
                            {therapist.title} {therapist.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Client:</label>
                <select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Length (minutes):</label>
                <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>
            <div className="form-group">
                <label>Notes:</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="submit-btn">
                {editingSession ? 'Update Session' : 'Add Session'}
            </button>
            {editingSession && (
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => onUpdate(null)}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default SessionForm;