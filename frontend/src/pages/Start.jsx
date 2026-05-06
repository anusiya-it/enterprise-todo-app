import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const [selectedPlan, setSelectedPlan] = useState('myself'); // Default selection
    const navigate = useNavigate();

    const handleStart = () => {
        // Only navigate if a plan is selected
        if (selectedPlan) {
            navigate('/activity'); 
        }
    };

    return (
        <div style={container}>
            <h2>How do you plan to use Enterprise Todo?</h2>
            
            {/* For Myself Option */}
            <div 
                onClick={() => setSelectedPlan('myself')}
                style={selectedPlan === 'myself' ? activeCard : card}
            >
                <h3>For myself</h3>
                <p>A personal space to organize industrial projects.</p>
                {selectedPlan === 'myself' && <span>✔️</span>}
            </div>

            {/* With My Team Option */}
            <div 
                onClick={() => setSelectedPlan('team')}
                style={selectedPlan === 'team' ? activeCard : card}
            >
                <h3>With my team</h3>
                <p>Powerful collaborative home for engineering tasks.</p>
                {selectedPlan === 'team' && <span>✔️</span>}
            </div>

            <button onClick={handleStart} style={startBtn}>
                Let's go
            </button>
        </div>
    );
};

// Simple Styles for Logic Verification
const container = { padding: '50px', textAlign: 'center' };
const card = { padding: '20px', border: '1px solid #ddd', cursor: 'pointer', marginBottom: '10px', borderRadius: '12px' };
const activeCard = { ...card, border: '2px solid #dc4c3e', backgroundColor: '#fff5f4' };
const startBtn = { padding: '15px 40px', backgroundColor: '#dc4c3e', color: 'white', borderRadius: '8px', cursor: 'pointer', border: 'none', fontWeight: 'bold' };

export default Start;