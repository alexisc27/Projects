import React, { useState, useEffect } from 'react';
import TherapistTable from './TherapistTable';
import TherapistForm from './TherapistForm';
import { getTherapists, createTherapist, updateTherapist, deleteTherapist } from '../../services/therapistService';

function TherapistDashboard() {
    const [therapists, setTherapists] = useState([]);
    const [editingTherapist, setEditingTherapist] = useState(null);

    useEffect(() => {
        fetchTherapists();
    }, []);

    const fetchTherapists = async () => {
        const data = await getTherapists();
        setTherapists(data);
    };

    const handleCreate = async (therapist) => {
        await createTherapist(therapist);
        fetchTherapists();
    };

    const handleUpdate = async (therapist) => {
        await updateTherapist(therapist);
        fetchTherapists();
        setEditingTherapist(null);
    };

    const handleDelete = async (id) => {
        await deleteTherapist(id);
        fetchTherapists();
    };

    return (
        <div className="dashboard">
            <h1>Therapist Management</h1>
            <TherapistForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                editingTherapist={editingTherapist}
            />
            <TherapistTable
                therapists={therapists}
                onEdit={setEditingTherapist}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default TherapistDashboard;