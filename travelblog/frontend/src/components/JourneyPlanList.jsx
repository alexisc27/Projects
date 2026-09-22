function JourneyPlanList({ plans, onEdit, onDelete }) {
    if (plans.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No journey plans found. Create your first plan!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {plans.map(plan => (
                <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium">{plan.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(plan)}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(plan.id)}
                                className="text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {plan.description && (
                        <p className="mt-2 text-gray-700">{plan.description}</p>
                    )}

                    {plan.locations && plan.locations.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700">Locations:</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {plan.locations.map(location => (
                                    <span
                                        key={location}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    >
                    {location}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.activities && plan.activities.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700">Activities:</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {plan.activities.map(activity => (
                                    <span
                                        key={activity}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                    >
                    {activity}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default JourneyPlanList;