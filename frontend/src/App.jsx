import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Activity from './pages/Activity'; 
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TaskDetail from './pages/TaskDetail';
import Inbox from './pages/Inbox';
import Projects from './pages/Projects';
import Upcoming from './pages/Upcoming';

/**
 * LayoutManager handles conditional visibility.
 * Hides Sidebar/Header on Home and Task Detail for a focused experience.
 */
const LayoutManager = ({ children }) => {
  const location = useLocation();
  
  // Hide UI on the selection screen OR when viewing a specific task detail
  const isFullWidthPage = location.pathname === "/" || location.pathname.startsWith("/task/");

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#fdfdfd' }}>
      
      {/* 1. Sidebar: Only visible for Dashboard/Inbox/Project views */}
      {!isFullWidthPage && <Sidebar />}
      
      <main style={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden' 
      }}>
        
        {/* 2. Top Header: Only visible for Dashboard/Inbox/Project views */}
        {!isFullWidthPage && (
          <header style={headerStyle}>
            <div style={searchContainer}>
              <span style={{ marginRight: '10px' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Search tasks, activities, or roadmap goals..." 
                style={topSearchStyle} 
              />
            </div>
          </header>
        )}

        {/* 3. Main Content Area */}
        <div style={{ overflowY: 'auto', flexGrow: 1 }}>
          <div style={{ 
            maxWidth: isFullWidthPage ? '100%' : '1100px', 
            margin: '0 auto',
            padding: isFullWidthPage ? '0' : '30px' 
          }}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutManager>
        <Routes>
          {/* Landing / Selection Screen */}
          <Route path="/" element={<Home />} /> 
          
          {/* Separate Task Detail View (Fixes the blank screen issue) */}
          <Route path="/task/:id" element={<TaskDetail />} />
          
          {/* Main Application Dashboard Views */}
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* Settings & Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </LayoutManager>
    </Router>
  );
}

// --- INDUSTRIAL UI STYLES ---
const headerStyle = {
  padding: '12px 40px',
  borderBottom: '1px solid #eee',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60px'
};

const searchContainer = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#f5f5f5',
  padding: '8px 18px',
  borderRadius: '24px',
  border: '1px solid #e0e0e0'
};

const topSearchStyle = {
  width: '100%',
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  fontSize: '0.95rem',
  color: '#333'
};

export default App;