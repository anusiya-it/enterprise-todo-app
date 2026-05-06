import React from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';

const Upcoming = () => {
  const sections = [
    {
      date: "Tomorrow • May 7",
      tasks: [
        { id: 101, title: "Finalize AI Full Stack roadmap", time: "09:00 AM", category: "Academic" },
        { id: 102, title: "Configure Supabase RLS policies", time: "11:30 AM", category: "Office" }
      ]
    },
    {
      date: "Friday • May 8",
      tasks: [
        { id: 103, title: "React Frontend Deployment (Vercel)", time: "10:00 AM", category: "General" }
      ]
    }
  ];

  return (
    <div style={container}>
      <h1 style={title}>Upcoming Roadmap</h1>
      {sections.map((section, idx) => (
        <div key={idx} style={sectionWrap}>
          <div style={dateHeader}>{section.date}</div>
          {section.tasks.map(task => (
            <div key={task.id} style={upcomingItem}>
              <div style={leftSide}>
                <CalendarIcon size={16} color="#dc4c3e" />
                <span style={taskTitle}>{task.title}</span>
              </div>
              <div style={rightSide}>
                <span style={timeTag}><Clock size={12} /> {task.time}</span>
                <ChevronRight size={16} color="#ccc" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container = { maxWidth: '800px', margin: '0 auto' };
const title = { fontSize: '24px', fontWeight: '800', marginBottom: '30px' };
const sectionWrap = { marginBottom: '40px' };
const dateHeader = { fontWeight: '700', fontSize: '14px', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '10px' };
const upcomingItem = { display: 'flex', justifyContent: 'space-between', padding: '15px', borderRadius: '12px', border: '1px solid #f5f5f5', marginBottom: '8px', background: 'white' };
const leftSide = { display: 'flex', alignItems: 'center', gap: '12px' };
const taskTitle = { fontSize: '15px', fontWeight: '500' };
const rightSide = { display: 'flex', alignItems: 'center', gap: '15px' };
const timeTag = { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#888' };

export default Upcoming;