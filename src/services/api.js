import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Turns an axios error into a message we can show the user.
export function getErrorMessage(error) {
    if (error.response?.data?.error) {
        return error.response.data.error;
    }
    if (error.request) {
        return 'Cannot reach the server. Is the backend running on port 5000?';
    }
    return 'Something went wrong';
}

export default api;
