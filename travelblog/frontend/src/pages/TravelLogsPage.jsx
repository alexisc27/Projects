import { useState, useEffect, useContext } from 'react';
import { getTravelLogs, createTravelLog, updateTravelLog, deleteTravelLog } from '../services/api';
import TravelLogForm from '../components/travel/TravelLogForm';
import TravelLogList from '../components/travel/TravelLogList';

function TravelLogsPage() {
    const [logs, setLogs] = useState([]);
    const [editingLog, setEditingLog] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await getTravelLogs(user.id);
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    // CRUD operations implementations...

    return (
        <div>
            <h2>My Travel Logs</h2>
            <TravelLogForm
                onSubmit={handleSubmit}
                initialData={editingLog}
            />
            <TravelLogList
                logs={logs}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}