import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import TravelLogsPage from './pages/TravelLogsPage';
import JourneyPlansPage from './pages/JourneyPlansPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container mx-auto px-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/travel-logs"
                            element={
                                <PrivateRoute>
                                    <TravelLogsPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/journey-plans"
                            element={
                                <PrivateRoute>
                                    <JourneyPlansPage />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
