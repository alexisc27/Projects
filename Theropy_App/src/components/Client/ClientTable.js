import React from 'react';

function ClientTable({ clients, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <h2>Clients List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Regularity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phoneNumber}</td>
                        <td>{client.regularity}</td>
                        <td>
                            <button
                                onClick={() => onEdit(client)}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(client.id)}
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

export default ClientTable;