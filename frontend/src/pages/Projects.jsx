import React, { useState, useEffect } from 'react';
import { FolderKanban, Tag, Trash2, Plus, LayoutGrid, CheckCircle } from 'lucide-react';

const Projects = () => {
  // 1. Initial State with LocalStorage Persistence
  const [filter, setFilter] = useState('Academic');
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('industrial_projects');
    // Default dummy data based on your roadmap
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Smart Recruiter Dashboard", cat: "Office", status: "Active" },
      { id: 2, title: "College Bus Tracking System", cat: "Academic", status: "Deployed" },
      { id: 3, title: "Personal Branding Portfolio", cat: "General", status: "Active" }
    ];
  });

  const [newProjTitle, setNewProjTitle] = useState("");

  // 2. Sync projects to storage whenever they change
  useEffect(() => {
    localStorage.setItem('industrial_projects', JSON.stringify(projects));
  }, [projects]);

  // 3. ADD PROJECT FUNCTION (The Fix)
  const addProject = (e) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newProjTitle,
      cat: filter, // Automatically assigns the currently viewed category
      status: "Planning"
    };

    setProjects([...projects, newEntry]); // Enqueue the new project
    setNewProjTitle(""); // Clear input
  };

  // 4. DELETE PROJECT FUNCTION
  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id)); // Dequeue the project
  };

  return (
    <div style={container}>
      <header style={headerSection}>
         <div style={titleRow}>
            <div style={iconBox}><FolderKanban size={28} color="#f9bf3b" fill="#f9bf3b" /></div>
            <h1 style={mainTitle}>Project Workspace</h1>
         </div>
         
         <div style={filterBar}>
            {['Academic', 'Office', 'General'].map(btn => (
              <button 
                key={btn} 
                onClick={() => setFilter(btn)} 
                style={filter === btn ? activeFilter : inactiveFilter}
              >
                {btn}
              </button>
            ))}
         </div>
      </header>

      {/* Input Form for Adding Projects */}
      <form onSubmit={addProject} style={addBox}>
        <Plus size={18} color="#dc4c3e" />
        <input 
          style={addInput} 
          placeholder={`Add a new ${filter} project...`} 
          value={newProjTitle}
          onChange={(e) => setNewProjTitle(e.target.value)}
        />
        {newProjTitle && <button type="submit" style={innerAddBtn}>Add</button>}
      </form>

      {/* Project List Display */}
      <div style={projectList}>
        <div style={listHeader}>
           <LayoutGrid size={14} />
           <span>Current {filter} Sprints</span>
        </div>
        
        {projects.filter(p => p.cat === filter).length > 0 ? (
          projects.filter(p => p.cat === filter).map((p) => (
            <div key={p.id} style={pRow}>
               <div style={leftInfo}>
                  <Tag size={16} color="#888" />
                  <div style={textMeta}>
                    <span style={projectTitle}>{p.title}</span>
                    <span style={statusBadge}>{p.status}</span>
                  </div>
               </div>
               <button 
                 style={delBtn} 
                 onClick={() => deleteProject(p.id)}
                 title="Delete Project"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          ))
        ) : (
          <div style={emptyState}>No {filter} projects yet. Add one above!</div>
        )}
      </div>
    </div>
  );
};

// --- INDUSTRIAL CSS-IN-JS STYLES ---
const container = { maxWidth: '900px', margin: '0 auto', padding: '40px 20px' };
const headerSection = { marginBottom: '30px' };
const titleRow = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' };
const iconBox = { background: '#fff9e6', padding: '10px', borderRadius: '12px' };
const mainTitle = { margin: 0, fontSize: '26px', fontWeight: '800' };

const filterBar = { display: 'flex', gap: '10px', marginBottom: '20px' };
const inactiveFilter = { padding: '8px 16px', border: '1px solid #eee', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: '600', color: '#666' };
const activeFilter = { ...inactiveFilter, background: '#1a1a1a', color: 'white', border: '1px solid #1a1a1a' };

const addBox = { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', border: '1px solid #eee', borderRadius: '12px', marginBottom: '30px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' };
const addInput = { border: 'none', outline: 'none', width: '100%', fontSize: '15px', fontWeight: '500' };
const innerAddBtn = { background: '#dc4c3e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' };

const projectList = { background: 'white', borderRadius: '15px', border: '1px solid #eee', overflow: 'hidden' };
const listHeader = { padding: '12px 25px', background: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: '700', color: '#aaa', textTransform: 'uppercase' };

const pRow = { display: 'flex', justifyContent: 'space-between', padding: '18px 25px', borderBottom: '1px solid #f9f9f9', alignItems: 'center' };
const leftInfo = { display: 'flex', alignItems: 'center', gap: '15px' };
const textMeta = { display: 'flex', flexDirection: 'column', gap: '2px' };
const projectTitle = { fontWeight: '600', fontSize: '15px', color: '#1a1a1a' };
const statusBadge = { fontSize: '9px', background: '#fff2f1', color: '#dc4c3e', padding: '2px 8px', borderRadius: '10px', fontWeight: '800', width: 'fit-content' };

const delBtn = { background: 'none', border: 'none', color: '#ddd', cursor: 'pointer', transition: '0.2s', padding: '5px' };
const emptyState = { padding: '40px', textAlign: 'center', color: '#bbb', fontSize: '14px' };

export default Projects;