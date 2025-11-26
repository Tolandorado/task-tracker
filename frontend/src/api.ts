import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createTask = (description: string) => api.post('/tasks', { description });
export const stopTask = (id: string) => api.post(`/tasks/stop`, { id });
export const addCompletedTask = (task: any) => api.post('/tasks/completed', task);
export const fetchTasks = () => api.get('/tasks');
