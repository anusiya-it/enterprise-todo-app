import { useState } from 'react';

const Settings = () => {
    const [isDark, setIsDark] = useState(false);

    return (
        <div>
            <h2>⚙️ Settings</h2>
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
                <div style={rowStyle}>
                    <span>Appearance</span>
                    <button onClick={() => setIsDark(!isDark)}>{isDark ? '🌙 Dark' : '☀️ Light'}</button>
                </div>
                <hr />
                <div style={rowStyle}>
                    <span>Notification Alerts</span>
                    <input type="checkbox" defaultChecked />
                </div>
            </div>
        </div>
    );
};
const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0' };
export default Settings;