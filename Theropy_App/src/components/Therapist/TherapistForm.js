import React, { useState, useEffect } from 'react';

function TherapistForm({ onCreate, onUpdate, editingTherapist }) {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        location: '',
        yearsOfPractice: '',
        availability: 'TAKING CLIENTS'
    });

    useEffect(() => {
        if (editingTherapist) {
            setFormData(editingTherapist);
        }
    }, [editingTherapist]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTherapist) {
            onUpdate(formData);
        } else {
            onCreate(formData);
        }
        setFormData({
            title: '',
            name: '',
            email: '',
            location: '',
            yearsOfPractice: '',
            availability: 'TAKING CLIENTS'
        });
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
                    onClick={() => onUpdate(null)}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default TherapistForm;