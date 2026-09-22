import { useState, useEffect } from 'react';

function JourneyPlanForm({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        locations: [],
        activities: []
    });
    const [locationInput, setLocationInput] = useState('');
    const [activityInput, setActivityInput] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                startDate: initialData.startDate?.split('T')[0] || '',
                endDate: initialData.endDate?.split('T')[0] || '',
                locations: initialData.locations || [],
                activities: initialData.activities || []
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddLocation = () => {
        if (locationInput.trim() && !formData.locations.includes(locationInput.trim())) {
            setFormData(prev => ({
                ...prev,
                locations: [...prev.locations, locationInput.trim()]
            }));
            setLocationInput('');
        }
    };

    const handleRemoveLocation = (locationToRemove) => {
        setFormData(prev => ({
            ...prev,
            locations: prev.locations.filter(location => location !== locationToRemove)
        }));
    };

    const handleAddActivity = () => {
        if (activityInput.trim() && !formData.activities.includes(activityInput.trim())) {
            setFormData(prev => ({
                ...prev,
                activities: [...prev.activities, activityInput.trim()]
            }));
            setActivityInput('');
        }
    };

    const handleRemoveActivity = (activityToRemove) => {
        setFormData(prev => ({
            ...prev,
            activities: prev.activities.filter(activity => activity !== activityToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-medium mb-4">
                {initialData ? 'Edit Journey Plan' : 'Create New Journey Plan'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Locations</label>
                    <div className="mt-1 flex">
                        <input
                            type="text"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add a location"
                        />
                        <button
                            type="button"
                            onClick={handleAddLocation}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.locations.map(location => (
                            <span
                                key={location}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                {location}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(location)}
                                    className="ml-1.5 inline-flex text-green-400 hover:text-green-600 focus:outline-none"
                                >
                  ×
                </button>
              </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Activities</label>
                    <div className="mt-1 flex">
                        <input
                            type="text"
                            value={activityInput}
                            onChange={(e) => setActivityInput(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add an activity"
                        />
                        <button
                            type="button"
                            onClick={handleAddActivity}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.activities.map(activity => (
                            <span
                                key={activity}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                            >
                {activity}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveActivity(activity)}
                                    className="ml-1.5 inline-flex text-purple-400 hover:text-purple-600 focus:outline-none"
                                >
                  ×
                </button>
              </span>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {initialData ? 'Update Plan' : 'Create Plan'}
                </button>
            </form>
        </div>
    );
}

export default JourneyPlanForm;