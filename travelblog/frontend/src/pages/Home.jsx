import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold mb-6">Welcome to TravelLog</h1>
            <p className="text-xl mb-8">
                {user ? `Hello, ${user.username}!` : 'Share your travel experiences and plans with the world!'}
            </p>

            <div className="flex justify-center gap-4">
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            Login
                        </Link>
                        <Link
                            to="/login"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/travel-logs"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg"
                        >
                            My Travel Logs
                        </Link>
                        <Link
                            to="/journey-plans"
                            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                        >
                            My Journey Plans
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;