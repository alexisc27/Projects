import React, { useState, useEffect } from 'react';

function ClientForm({ onCreate, onUpdate, editingClient }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        regularity: 'WEEKLY'
    });

    useEffect(() => {
        if (editingClient) {
            setFormData(editingClient);
        }
    }, [editingClient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingClient) {
            onUpdate(formData);
        } else {
            onCreate(formData);
        }
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            regularity: 'WEEKLY'
        });
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
                    onClick={() => onUpdate(null)}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default ClientForm;