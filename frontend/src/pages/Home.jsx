import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState('myself');
  const [quickTask, setQuickTask] = useState(""); // State for the input field
  const navigate = useNavigate();

  // Dynamic Industrial Data Mapping
  const [planDetails, setPlanDetails] = useState({
    myself: {
      title: "Personal Planning",
      tasks: [
        { id: "roadmap", text: "Finalize AI Full Stack roadmap", time: "9:00 AM", cat: "Academic" },
        { id: "supabase", text: "Configure Supabase RLS policies", time: "11:30 AM", cat: "Office" }
      ]
    },
    team: {
      title: "Team Planning",
      tasks: [
        { id: "sprint", text: "Sync Sprint 1 Database", time: "10:00 AM", cat: "Office" },
        { id: "architecture", text: "Review Enterprise Architecture", time: "2:00 PM", cat: "Academic" }
      ]
    }
  });

  // FUNCTION: Add a task locally to the preview card
  const handleAddQuickTask = (e) => {
    if (e.key === 'Enter' && quickTask.trim() !== "") {
      const newTask = {
        id: Date.now().toString(),
        text: quickTask,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cat: selectedPlan === 'myself' ? "Academic" : "Office"
      };

      setPlanDetails(prev => ({
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          tasks: [newTask, ...prev[selectedPlan].tasks]
        }
      }));
      setQuickTask("");
    }
  };

  // FUNCTION: Transfer all tasks to Main Dashboard and Navigate
  const handleLetsGo = () => {
    // 1. Get current tasks from the selected view
    const currentTasks = planDetails[selectedPlan].tasks;

    // 2. Fetch existing tasks from the Dashboard storage (Inbox)
    const existingInbox = JSON.parse(localStorage.getItem('inbox_tasks') || '[]');

    // 3. Merge and Save
    const updatedInbox = [...existingInbox, ...currentTasks];
    localStorage.setItem('inbox_tasks', JSON.stringify(updatedInbox));

    // 4. Navigate to Inbox/Dashboard
    navigate('/inbox');
  };

  const handleTaskClick = (task) => {
    navigate(`/task/${task.id}`, { state: { task } });
  };

  return (
    <div style={containerStyle}>
      <div style={leftSection}>
        <h1 style={mainTitle}>How do you plan to use Enterprise Todo?</h1>
        <p style={subtitle}>Select a category to customize your industrial roadmap.</p>

        <div onClick={() => setSelectedPlan('myself')} style={selectedPlan === 'myself' ? activeCard : card}>
          <div style={iconBox}>👤</div>
          <div style={cardContent}>
            <h3 style={cardTitle}>For myself</h3>
            <p style={cardDesc}>Personal space for industrial projects and career goals.</p>
          </div>
          {selectedPlan === 'myself' && <span style={checkIcon}>✓</span>}
        </div>

        <div onClick={() => setSelectedPlan('team')} style={selectedPlan === 'team' ? activeCard : card}>
          <div style={iconBox}>👥</div>
          <div style={cardContent}>
            <h3 style={cardTitle}>With my team</h3>
            <p style={cardDesc}>Collaborative workspace for high-tier engineering tasks.</p>
          </div>
          {selectedPlan === 'team' && <span style={checkIcon}>✓</span>}
        </div>
      </div>

      <div style={rightSection}>
        <div style={previewCard}>
          <small style={breadcrumb}>My Projects /</small>
          <h2 style={planningHeader}>{planDetails[selectedPlan].title}</h2>
          
          <div style={taskList}>
            {/* Functional Quick Add Input */}
            <div style={staticTask}>
              <span style={circleSymbol}>⭕</span> 
              <input 
                style={inlineInput}
                placeholder="Add a quick task..." 
                value={quickTask}
                onChange={(e) => setQuickTask(e.target.value)}
                onKeyDown={handleAddQuickTask}
              />
            </div>
            
            {planDetails[selectedPlan].tasks.map((task) => (
              <div key={task.id} style={taskItem} onClick={() => handleTaskClick(task)}>
                <div style={taskRow}>
                  <div style={taskTextContent}>
                    <span style={circleActive}>⭕</span> 
                    <span style={taskText}>{task.text}</span>
                  </div>
                  <span style={timeBadge}>{task.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleLetsGo} style={letGoBtn}>
            Let's go!
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (Including new inlineInput) ---
const containerStyle = { display: 'flex', padding: '80px', gap: '60px', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fdfdfd', fontFamily: "'Inter', sans-serif" };
const leftSection = { flex: 1.2, maxWidth: '550px' };
const rightSection = { flex: 1, display: 'flex', justifyContent: 'center' };
const mainTitle = { fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '15px' };
const subtitle = { fontSize: '1.1rem', color: '#666', marginBottom: '40px' };
const card = { display: 'flex', alignItems: 'center', padding: '24px', border: '1px solid #eee', borderRadius: '16px', marginBottom: '20px', cursor: 'pointer', transition: '0.3s', backgroundColor: '#fff' };
const activeCard = { ...card, border: '2px solid #dc4c3e', background: '#fff9f8', boxShadow: '0 8px 24px rgba(220, 76, 62, 0.1)' };
const iconBox = { width: '50px', height: '50px', background: '#f4f4f4', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.4rem', marginRight: '20px' };
const cardContent = { flex: 1 };
const cardTitle = { margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700' };
const cardDesc = { margin: 0, color: '#666', fontSize: '0.9rem' };
const checkIcon = { color: '#dc4c3e', fontSize: '1.2rem', fontWeight: 'bold' };
const previewCard = { width: '100%', maxWidth: '420px', padding: '45px', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)', background: 'white', border: '1px solid #f0f0f0' };
const breadcrumb = { color: '#888', letterSpacing: '0.5px', fontWeight: '500' };
const planningHeader = { fontSize: '1.8rem', fontWeight: '800', margin: '12px 0 30px 0' };
const taskList = { marginBottom: '35px' };
const taskItem = { padding: '16px 0', borderBottom: '1px solid #f9f9f9', cursor: 'pointer' };
const staticTask = { ...taskItem, cursor: 'default', display: 'flex', alignItems: 'center', gap: '12px' };
const inlineInput = { border: 'none', outline: 'none', fontSize: '1rem', width: '100%', color: '#333' };
const taskRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const taskTextContent = { display: 'flex', alignItems: 'center', gap: '12px' };
const circleSymbol = { color: '#ddd', fontSize: '1.2rem' };
const circleActive = { ...circleSymbol, color: '#dc4c3e' };
const taskText = { fontSize: '1rem', color: '#333', fontWeight: '500' };
const timeBadge = { fontSize: '0.75rem', color: '#777', backgroundColor: '#f5f5f5', padding: '4px 10px', borderRadius: '6px' };
const letGoBtn = { width: '100%', padding: '18px', background: '#dc4c3e', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer' };

export default Home;