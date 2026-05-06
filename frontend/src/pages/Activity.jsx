import React, { useState, useEffect } from 'react';
import { Zap, Layers, Trash2, Rocket } from 'lucide-react';

const Activity = () => {
  const [sprints, setSprints] = useState(() => {
    const saved = localStorage.getItem('activity_sprints');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Smart Recruiter Backend", progress: 65, tech: "Python + FastAPI" },
      { id: 2, name: "Enterprise-Todo UI", progress: 40, tech: "React + Lucide" }
    ];
  });

  const [name, setName] = useState("");

  useEffect(() => {
    localStorage.setItem('activity_sprints', JSON.stringify(sprints));
  }, [sprints]);

  const addSprint = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newSprint = {
      id: Date.now(),
      name: name,
      progress: 0,
      tech: "New Stack"
    };
    setSprints([...sprints, newSprint]);
    setName("");
  };

  const deleteSprint = (id) => {
    setSprints(sprints.filter(s => s.id !== id));
  };

  return (
    <div style={container}>
      <header style={header}>
        <h1 style={title}>Activity Workspace</h1>
        <form onSubmit={addSprint} style={inlineForm}>
          <input 
            style={inlineInput} 
            placeholder="Name new sprint..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button style={addBtn}><PlusIcon /></button>
        </form>
      </header>

      <div style={grid}>
        {sprints.map(s => (
          <div key={s.id} style={card}>
            <div style={cardHeader}>
              <Layers size={20} color="#dc4c3e" />
              <button onClick={() => deleteSprint(s.id)} style={cardDel}><Trash2 size={16} /></button>
            </div>
            <h3 style={cardName}>{s.name}</h3>
            <p style={cardTech}>{s.tech}</p>
            <div style={progBase}><div style={{...progFill, width: `${s.progress}%`}}></div></div>
            <span style={progText}>{s.progress}% Completion</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlusIcon = () => <Zap size={16} />;

// --- STYLES ---
const container = { maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' };
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' };
const title = { fontSize: '26px', fontWeight: '800' };
const inlineForm = { display: 'flex', gap: '10px' };
const inlineInput = { padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const addBtn = { background: '#1a1a1a', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };
const card = { background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #eee' };
const cardHeader = { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' };
const cardDel = { background: 'none', border: 'none', color: '#ddd', cursor: 'pointer' };
const cardName = { fontSize: '18px', margin: '0 0 5px 0', fontWeight: '700' };
const cardTech = { fontSize: '13px', color: '#888', marginBottom: '15px' };
const progBase = { height: '6px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' };
const progFill = { height: '100%', background: '#dc4c3e', borderRadius: '10px' };
const progText = { fontSize: '12px', color: '#666' };

export default Activity;