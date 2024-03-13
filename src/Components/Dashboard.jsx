import React from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = ({ stats }) => {
    const data = {
        labels: ['Clients', 'Anomalie', 'Reclamation'],
        datasets: [
            {
                label: 'Statistics',
                backgroundColor: [
                    'rgb(0,139,202)', // Color for Clients
                    'rgb(255,205,86)', // Color for Reclamation
                    'rgb(109, 176, 26)'   // Color for Anomalie
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [stats.clients, stats.anomalie, stats.reclamation]
            }
        ]
    };
    

    return (
        <div className="dashboard" style={{ textAlign: 'center', marginTop: '10px', margin: 'auto', maxWidth: '700px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Dashboard</h1>
            <Bar
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Statistics',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );
}

export default Dashboard;
