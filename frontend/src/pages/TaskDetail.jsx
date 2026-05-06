import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Clock, CheckCircle } from 'lucide-react';

const TaskDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the task from state, or fallback if accessed directly via URL
  const task = location.state?.task || {
    text: "Task Not Found",
    category: "General",
    time: "N/A"
  };

  return (
    <div style={pageContainer}>
      {/* Navigation Header */}
      <button onClick={() => navigate(-1)} style={backBtn}>
        <ArrowLeft size={18} />
        <span>Back to Roadmap</span>
      </button>

      <div style={detailCard}>
        {/* Title Section - This was causing your error */}
        <div style={titleSection}>
          <h1 style={mainTitle}>{task.text}</h1>
          <span style={statusBadge}>
            <CheckCircle size={14} />
            In Progress
          </span>
        </div>

        <div style={infoGrid}>
          <div style={infoItem}>
            <Calendar size={18} color="#dc4c3e" />
            <div>
              <p style={label}>Scheduled Date</p>
              <p style={value}>May 06, 2026</p>
            </div>
          </div>

          <div style={infoItem}>
            <Clock size={18} color="#dc4c3e" />
            <div>
              <p style={label}>Execution Time</p>
              <p style={value}>{task.time}</p>
            </div>
          </div>

          <div style={infoItem}>
            <Tag size={18} color="#dc4c3e" />
            <div>
              <p style={label}>Industrial Category</p>
              <p style={value}>{task.category}</p>
            </div>
          </div>
        </div>

        <div style={descriptionSection}>
          <h3 style={sectionTitle}>Project Context</h3>
          <p style={descriptionText}>
            This task is part of your professional engineering roadmap. Ensure all 
            documentation and environment variables (like Supabase keys) are verified 
            before moving this task to completion.
          </p>
        </div>

        <button style={completeBtn} onClick={() => navigate('/inbox')}>
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

// --- INDUSTRIAL STYLES (Fixes the ReferenceError) ---
const pageContainer = { 
  maxWidth: '900px', 
  margin: '0 auto', 
  padding: '60px 20px',
  fontFamily: "'Inter', sans-serif" 
};

const backBtn = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '8px', 
  background: 'none', 
  border: 'none', 
  color: '#666', 
  cursor: 'pointer', 
  marginBottom: '30px',
  fontWeight: '600'
};

const detailCard = { 
  background: 'white', 
  padding: '40px', 
  borderRadius: '24px', 
  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
  border: '1px solid #f0f0f0' 
};

// DEFINED: titleSection fixed here
const titleSection = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'flex-start', 
  marginBottom: '40px',
  borderBottom: '1px solid #f9f9f9',
  paddingBottom: '20px'
};

const mainTitle = { fontSize: '2rem', fontWeight: '800', margin: 0, color: '#1a1a1a', flex: 1 };

const statusBadge = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '6px', 
  background: '#fff9f8', 
  color: '#dc4c3e', 
  padding: '6px 14px', 
  borderRadius: '20px', 
  fontSize: '0.85rem', 
  fontWeight: '700' 
};

const infoGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' };

const infoItem = { display: 'flex', alignItems: 'center', gap: '12px' };

const label = { margin: 0, fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' };

const value = { margin: 0, fontSize: '1rem', fontWeight: '600', color: '#333' };

const descriptionSection = { marginBottom: '40px' };

const sectionTitle = { fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' };

const descriptionText = { color: '#666', lineHeight: '1.6', fontSize: '0.95rem' };

const completeBtn = { 
  width: '100%', 
  padding: '18px', 
  background: '#1a1a1a', 
  color: 'white', 
  border: 'none', 
  borderRadius: '12px', 
  fontWeight: '700', 
  fontSize: '1rem', 
  cursor: 'pointer' 
};

export default TaskDetail;