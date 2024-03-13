import React, { useEffect, useState } from 'react';
import { adminStats } from '../Controllers/getData';
import { verify } from '../Controllers/login';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard'; // Adjust the path to Dashboard component

const Clients = () => {
    const [stats, setStats] = useState({ clients: '', unpaid: '', revenue: '', anomalie: '', reclamation: '' });

    useEffect(() => {
        adminStats(setStats);
    }, []);

    return (
        <div className='main'>
            <div className='adminDash'>
                {/* Render the Dashboard component */}
                <Dashboard stats={stats} />
            </div>
        </div>
    );
}

export default Clients;
