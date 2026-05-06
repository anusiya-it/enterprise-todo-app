import { formatDate } from '../utils/formatDate';

const TaskCard = ({ item, onToggle, onDelete }) => (
    <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input 
                type="checkbox" 
                checked={item.completed} 
                onChange={() => onToggle(item.id, !item.completed)} 
            />
            <div>
                <div style={{ fontWeight: '500' }}>{item.text}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                    {(item.category || 'General')} • {formatDate(item.date || item.created_at)}
                </div>
            </div>
        </div>
        <button onClick={() => onDelete(item.id)} style={deleteBtn}>Delete</button>
    </div>
);

const cardStyle = { 
    display: 'flex', justifyContent: 'space-between', padding: '12px', 
    borderBottom: '1px solid #eee', background: '#fff' 
};
const deleteBtn = { background: 'none', border: 'none', color: 'red', cursor: 'pointer' };

export default TaskCard;