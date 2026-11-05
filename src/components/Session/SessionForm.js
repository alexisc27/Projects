import React, { useState, useEffect } from 'react';

const EMPTY_FORM = { therapistId: '', clientId: '', notes: '', date: '', length: '' };

function SessionForm({ onCreate, onUpdate, onCancel, editingSession, therapists, clients }) {
    const [formData, setFormData] = useState(EMPTY_FORM);

    useEffect(() => {
        // Fill the form when editing starts; clear it when editing ends.
        if (editingSession) {
            setFormData({
                therapistId: editingSession.therapistId,
                clientId: editingSession.clientId,
                notes: editingSession.notes,
                date: editingSession.date ? editingSession.date.split('T')[0] : '',
                length: editingSession.length
            });
        } else {
            setFormData(EMPTY_FORM);
        }
    }, [editingSession]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            therapistId: parseInt(formData.therapistId, 10),
            clientId: parseInt(formData.clientId, 10),
            length: parseInt(formData.length, 10)
        };

        if (editingSession) {
            await onUpdate({ ...submissionData, id: editingSession.id });
        } else {
            const ok = await onCreate(submissionData);
            if (ok) setFormData(EMPTY_FORM);
        }
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
                    onClick={onCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default SessionForm;