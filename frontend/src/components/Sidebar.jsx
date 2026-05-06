import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Fixed Icon imports: Removed FolderCanvas, added FolderKanban
import { 
  LayoutDashboard, 
  Inbox, 
  Calendar, 
  FolderKanban, // Corrected export name
  UserCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Rocket
} from 'lucide-react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    // Functional Navigation Object
    const mainNav = [
        { name: 'Inbox', path: '/inbox', icon: <Inbox size={20} /> },
        { name: 'Upcoming', path: '/upcoming', icon: <Calendar size={20} /> },
        { name: 'Workspace', path: '/activity', icon: <LayoutDashboard size={20} /> },
        { name: 'Projects', path: '/projects', icon: <FolderKanban size={20} /> }, // Updated icon
    ];
    return (
        <aside style={{ ...sidebarStyle, width: isCollapsed ? '80px' : '280px' }}>
            {/* Header: Logo & Toggle */}
            <div style={logoSection}>
                <div style={logoIcon}><Rocket size={22} color="#dc4c3e" strokeWidth={2.5} /></div>
                {!isCollapsed && <h2 style={brandName}>Enterprise</h2>}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)} 
                    style={toggleBtn}
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Main Navigation Area */}
            <nav style={navContainer}>
                <div style={sectionLabel}>{!isCollapsed && "Dashboard"}</div>
                {mainNav.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path} 
                        style={getLinkStyle(location.pathname === item.path, isCollapsed)}
                    >
                        <span style={isActive(location.pathname === item.path)}>{item.icon}</span>
                        {!isCollapsed && <span style={{ marginLeft: '12px' }}>{item.name}</span>}
                    </Link>
                ))}

                {/* Footer Section: Profile & Settings */}
                <div style={footerSection}>
                    <div style={sectionLabel}>{!isCollapsed && "System"}</div>
                    <Link to="/profile" style={getLinkStyle(location.pathname === '/profile', isCollapsed)}>
                        <UserCircle size={20} />
                        {!isCollapsed && <span style={{ marginLeft: '12px' }}>Profile</span>}
                    </Link>
                    <Link to="/settings" style={getLinkStyle(location.pathname === '/settings', isCollapsed)}>
                        <Settings size={20} />
                        {!isCollapsed && <span style={{ marginLeft: '12px' }}>Settings</span>}
                    </Link>
                </div>
            </nav>
        </aside>
    );
};

// --- STYLING LOGIC ---

const getLinkStyle = (isActive, isCollapsed) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    textDecoration: 'none',
    color: isActive ? '#dc4c3e' : '#555',
    borderRadius: '12px',
    marginBottom: '4px',
    backgroundColor: isActive ? '#fff2f1' : 'transparent',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    transition: 'all 0.2s ease',
    fontWeight: isActive ? '600' : '400',
    fontSize: '0.95rem'
});

const isActive = (active) => ({
    display: 'flex',
    alignItems: 'center',
    color: active ? '#dc4c3e' : '#666'
});

const sidebarStyle = { 
    backgroundColor: '#ffffff', 
    height: '100vh', 
    borderRight: '1px solid #eee', 
    display: 'flex', 
    flexDirection: 'column', 
    padding: '20px 15px', 
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
};

const logoSection = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    padding: '10px 5px', 
    marginBottom: '30px',
    position: 'relative'
};

const logoIcon = {
    background: '#fff2f1',
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center'
};

const brandName = { margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-0.5px' };

const toggleBtn = {
    position: 'absolute',
    right: '-25px',
    top: '10px',
    background: 'white',
    border: '1px solid #eee',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    zIndex: 10
};

const navContainer = { display: 'flex', flexDirection: 'column', flexGrow: 1 };

const sectionLabel = {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '20px 0 10px 12px'
};

const footerSection = { 
    marginTop: 'auto', 
    borderTop: '1px solid #f5f5f5', 
    paddingTop: '15px' 
};

export default Sidebar;