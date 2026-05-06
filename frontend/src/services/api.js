import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getWorks = () => axios.get(`${API_URL}/get_works`);

// CHANGE '/todos' TO '/add_work'
export const addWork = (data) => axios.post(`${API_URL}/add_work`, data);

// CHANGE '/todos' TO '/update_work'
export const updateWork = (id, data) => axios.put(`${API_URL}/update_work/${id}`, data);

// CHANGE '/todos' TO '/remove_work'
export const removeWork = (id) => axios.delete(`${API_URL}/remove_work/${id}`);