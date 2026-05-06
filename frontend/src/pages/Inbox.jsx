import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Search, Tag, RefreshCw } from 'lucide-react';

const Inbox = () => {
  // 1. INITIALIZE FROM LOCAL STORAGE
  // This pulls the tasks you sent from the "Let's go!" button on the Home page
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('inbox_tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    // Fallback dummy data if storage is empty
    return [
      { id: 1, text: "Finalize AI Full Stack roadmap", category: "Academic", time: "09:00 AM" },
      { id: 2, text: "Configure Supabase RLS policies", category: "Office", time: "11:30 AM" },
    ];
  });

  const [taskInput, setTaskInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 2. PERSISTENCE EFFECT
  // Every time 'tasks' changes, we update localStorage so the Home page and Inbox stay in sync
  useEffect(() => {
    localStorage.setItem('inbox_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 3. ENQUEUE (Add Task)
  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      category: "General",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  // 4. DEQUEUE (Complete/Remove task)
  const completeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 5. SEARCH LOGIC
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={pageContainer}>
      {/* Header Section */}
      <header style={header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={title}>Inbox</h1>
            <span style={countBadge}>{tasks.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '12px' }}>
            <RefreshCw size={14} />
            <span>Synced with Home</span>
          </div>
        </div>
      </header>

      {/* Internal Search Bar */}
      <div style={searchWrapper}>
        <Search size={18} color="#999" />
        <input 
          type="text" 
          placeholder="Search roadmap tasks..." 
          style={searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add Task Input */}
      <form onSubmit={addTask} style={inputContainer}>
        <Plus size={20} color="#dc4c3e" />
        <input 
          type="text" 
          placeholder="Add a task to your industrial roadmap..." 
          style={mainInput}
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        {taskInput && <button type="submit" style={addBtn}>Add Task</button>}
      </form>

      {/* Task List Section */}
      <div style={listArea}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} style={taskItem}>
              <div style={taskLeft} onClick={() => completeTask(task.id)}>
                <Circle size={20} style={checkIcon} />
                <div style={textWrapper}>
                  <span style={taskText}>{task.text}</span>
                  <div style={metaRow}>
                    <span style={timeText}>{task.time}</span>
                    <span style={categoryTag}>
                      <Tag size={12} style={{marginRight: '4px'}} />
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>
              <button style={deleteBtn} onClick={(e) => {
                e.stopPropagation(); // Prevent triggerring completeTask from parent div
                completeTask(task.id);
              }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div style={emptyState}>
            <CheckCircle size={48} color="#eee" />
            <p>All caught up! Your industrial roadmap is clear.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- INDUSTRIAL STYLES ---
const pageContainer = { maxWidth: '800px', margin: '0 auto', padding: '40px 20px' };
const header = { marginBottom: '30px', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' };
const title = { fontSize: '28px', fontWeight: '800', margin: 0, color: '#1a1a1a' };
const countBadge = { background: '#f5f5f5', padding: '4px 10px', borderRadius: '12px', fontSize: '14px', color: '#666', fontWeight: '600' };

const searchWrapper = { display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '12px 15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #eee', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' };
const searchInput = { border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '15px' };

const inputContainer = { display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', border: '1px solid #eee', borderRadius: '12px', marginBottom: '35px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' };
const mainInput = { border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontWeight: '500' };
const addBtn = { background: '#dc4c3e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' };

const listArea = { display: 'flex', flexDirection: 'column', gap: '5px' };
const taskItem = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 12px', borderBottom: '1px solid #f7f7f7', cursor: 'pointer', transition: 'all 0.2s ease' };
const taskLeft = { display: 'flex', alignItems: 'flex-start', gap: '15px', flex: 1 };
const checkIcon = { marginTop: '2px', color: '#ccc' };
const textWrapper = { display: 'flex', flexDirection: 'column', gap: '6px' };
const taskText = { fontSize: '16px', color: '#2d2d2d', fontWeight: '500' };

const metaRow = { display: 'flex', gap: '15px', alignItems: 'center' };
const timeText = { fontSize: '12px', color: '#dc4c3e', fontWeight: '700' };
const categoryTag = { fontSize: '11px', color: '#777', display: 'flex', alignItems: 'center', background: '#f0f0f0', padding: '3px 8px', borderRadius: '5px', fontWeight: '500' };

const deleteBtn = { background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', transition: 'color 0.2s' };
const emptyState = { textAlign: 'center', padding: '120px 0', color: '#aaa' };

export default Inbox;