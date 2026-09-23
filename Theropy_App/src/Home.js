import React from 'react';
import { Link } from 'react-router-dom';
import './styles/App.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Therapy Management System</h1>
            <div className="home-buttons">
                <Link to="/therapists" className="home-btn therapist-btn">
                    Manage Therapists
                </Link>
                <Link to="/clients" className="home-btn client-btn">
                    Manage Clients
                </Link>
                <Link to="/sessions" className="home-btn session-btn">
                    Manage Sessions
                </Link>
            </div>
        </div>
    );
}

export default Home;