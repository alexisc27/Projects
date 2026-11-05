import React, { useState, useEffect } from 'react';

const EMPTY_FORM = { title: '', name: '', email: '', location: '', yearsOfPractice: '', availability: 'TAKING CLIENTS' };

function TherapistForm({ onCreate, onUpdate, onCancel, editingTherapist }) {
    const [formData, setFormData] = useState(EMPTY_FORM);

    useEffect(() => {
        // Fill the form when editing starts; clear it when editing ends.
        setFormData(editingTherapist ? { title: editingTherapist.title, name: editingTherapist.name, email: editingTherapist.email, location: editingTherapist.location, yearsOfPractice: editingTherapist.yearsOfPractice, availability: editingTherapist.availability } : EMPTY_FORM);
    }, [editingTherapist]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTherapist) {
            await onUpdate({ ...formData, id: editingTherapist.id });
        } else {
            const ok = await onCreate(formData);
            if (ok) setFormData(EMPTY_FORM);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{editingTherapist ? 'Edit Therapist' : 'Add New Therapist'}</h2>
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
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
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Years of Practice:</label>
                <input
                    type="number"
                    name="yearsOfPractice"
                    value={formData.yearsOfPractice}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div className="form-group">
                <label>Availability:</label>
                <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                >
                    <option value="TAKING CLIENTS">Taking Clients</option>
                    <option value="NOT TAKING CLIENTS">Not Taking Clients</option>
                </select>
            </div>
            <button type="submit" className="submit-btn">
                {editingTherapist ? 'Update Therapist' : 'Add Therapist'}
            </button>
            {editingTherapist && (
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

export default TherapistForm;