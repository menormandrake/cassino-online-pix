import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cassino-backend-xn3l.onrender.com',
});

export const getGames = () => apiClient.get('/games');
export const deposit = (data) => apiClient.post('/deposit', data);
export const withdraw = (data) => apiClient.post('/withdraw', data);
