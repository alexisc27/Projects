import React, { useState, useEffect } from 'react';
import TherapistTable from './TherapistTable';
import TherapistForm from './TherapistForm';
import { getTherapists, createTherapist, updateTherapist, deleteTherapist } from '../../services/therapistService';
import { getErrorMessage } from '../../services/api';

function TherapistDashboard() {
    const [therapists, setTherapists] = useState([]);
    const [editingTherapist, setEditingTherapist] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTherapists();
    }, []);

    const fetchTherapists = async () => {
        try {
            setTherapists(await getTherapists());
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    // Each handler returns true on success so the form knows whether to clear itself.
    const run = async (action) => {
        try {
            setError('');
            await action();
            await fetchTherapists();
            return true;
        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        }
    };

    const handleCreate = (therapist) => run(() => createTherapist(therapist));

    const handleUpdate = async (therapist) => {
        const ok = await run(() => updateTherapist(therapist));
        if (ok) setEditingTherapist(null);
        return ok;
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this therapist? Their sessions will also be deleted.')) {
            run(() => deleteTherapist(id));
        }
    };

    return (
        <div className="dashboard">
            <h1>Therapist Management</h1>
            {error && <p className="error-message">{error}</p>}
            <TherapistForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={() => setEditingTherapist(null)}
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
