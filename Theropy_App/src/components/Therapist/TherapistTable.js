import React from 'react';

function TherapistTable({ therapists, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <h2>Therapists List</h2>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Years of Practice</th>
                    <th>Availability</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {therapists.map(therapist => (
                    <tr key={therapist.id}>
                        <td>{therapist.title}</td>
                        <td>{therapist.name}</td>
                        <td>{therapist.email}</td>
                        <td>{therapist.location}</td>
                        <td>{therapist.yearsOfPractice}</td>
                        <td>{therapist.availability}</td>
                        <td>
                            <button
                                onClick={() => onEdit(therapist)}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(therapist.id)}
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

export default TherapistTable;