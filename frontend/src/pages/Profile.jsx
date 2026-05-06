// src/pages/Profile.jsx

const Profile = () => {
    return (
        <div className="page-container">
            <h2>👤 Profile</h2>
            <div className="profile-card" style={profileCardStyle}>
                <h3>Aspiring AI Full Stack Developer</h3>
                <p><strong>Target:</strong> 12 LPA Fresher Role</p>
                <p><strong>Focus:</strong> LLMs, Cloud Deployment, System Design</p>
            </div>
        </div>
    );
};

// INDUSTRIAL STYLES
const profileCardStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginTop: '20px'
};

// CRITICAL FIX: This line provides the 'default' export App.jsx is looking for
export default Profile;