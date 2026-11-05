import React, { useState, useEffect } from 'react';

const EMPTY_FORM = { name: '', email: '', phoneNumber: '', regularity: 'WEEKLY' };

function ClientForm({ onCreate, onUpdate, onCancel, editingClient }) {
    const [formData, setFormData] = useState(EMPTY_FORM);

    useEffect(() => {
        // Fill the form when editing starts; clear it when editing ends.
        setFormData(editingClient ? { name: editingClient.name, email: editingClient.email, phoneNumber: editingClient.phoneNumber, regularity: editingClient.regularity } : EMPTY_FORM);
    }, [editingClient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingClient) {
            await onUpdate({ ...formData, id: editingClient.id });
        } else {
            const ok = await onCreate(formData);
            if (ok) setFormData(EMPTY_FORM);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Regularity:</label>
                <select
                    name="regularity"
                    value={formData.regularity}
                    onChange={handleChange}
                    required
                >
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                </select>
            </div>
            <button type="submit" className="submit-btn">
                {editingClient ? 'Update Client' : 'Add Client'}
            </button>
            {editingClient && (
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

export default ClientForm;