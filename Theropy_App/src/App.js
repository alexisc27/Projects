import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TherapistDashboard from './components/Therapist/TherapistDashboard';
import ClientDashboard from './components/Client/ClientDashboard';
import SessionDashboard from './components/Session/SessionDashboard';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/therapists">Therapists</Link>
                    <Link to="/clients">Clients</Link>
                    <Link to="/sessions">Sessions</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/therapists" element={<TherapistDashboard />} />
                    <Route path="/clients" element={<ClientDashboard />} />
                    <Route path="/sessions" element={<SessionDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;