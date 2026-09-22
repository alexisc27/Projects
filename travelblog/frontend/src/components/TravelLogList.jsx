function TravelLogList({ logs, onEdit, onDelete }) {
    if (logs.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No travel logs found. Create your first log!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {logs.map(log => (
                <div key={log.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium">{log.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                                {new Date(log.startDate).toLocaleDateString()} - {new Date(log.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(log)}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(log.id)}
                                className="text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <p className="mt-2 text-gray-700">{log.description}</p>
                    {log.tags && log.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {log.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TravelLogList;