import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJourneyPlans, createJourneyPlan, updateJourneyPlan, deleteJourneyPlan } from '../services/api';
import JourneyPlanForm from '../components/journey/JourneyPlanForm';
import JourneyPlanList from '../components/journey/JourneyPlanList';
import { AuthContext } from '../context/AuthContext';

function JourneyPlansPage() {
    const [plans, setPlans] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchPlans();
    }, [user, navigate]);

    const fetchPlans = async () => {
        try {
            const response = await getJourneyPlans(user.id);
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingPlan) {
                await updateJourneyPlan(editingPlan.id, formData);
            } else {
                await createJourneyPlan({ ...formData, userId: user.id });
            }
            setEditingPlan(null);
            fetchPlans();
        } catch (error) {
            console.error('Error saving plan:', error);
        }
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
    };

    const handleDelete = async (id) => {
        try {
            await deleteJourneyPlan(id);
            fetchPlans();
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Journey Plans</h2>
            <JourneyPlanForm
                onSubmit={handleSubmit}
                initialData={editingPlan}
            />
            <JourneyPlanList
                plans={plans}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default JourneyPlansPage;